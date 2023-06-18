/* =============================================================================
 * File:   page.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022-2023 Cole Tobin
 *
 * This file is part of Arch86.
 *
 * Arch86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * Arch86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with Arch86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import InstructionPageLayout, { InstructionPageLayoutProps } from "@/components/InstructionPageLayout";

import Cpuid from "@/components/Cpuid";
import Exceptions from "@/library/Exceptions";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "bndldx",
    title: <>Load Extended Bounds Using Address Translation</>,
    titlePlain: "Load Extended Bounds Using Address Translation",
    opcodes: [
        {
            opcode: <>NP 0F 1A mem/r+sib</>,
            mnemonic: <>BNDLDX <i>bnd</i>, <i>mib</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "mpx",
            description: <>Load the bounds stored in a bound table entry (BTE) from <i>mib</i> into <i>bnd</i>.</>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "SIB.base + SIB.index"],
    },
    description: (
        <>
            <p>
                The <code>BNDLDX</code> instruction conditionally loads the destination operand with the bounds referenced at the address pointed to by the source operand.
                This is conditional on the value contained in the register referenced in the SIB byte&apos;s <code>index</code> field matching the value stored in the bounds table entry.
                If the check fails, the destination is set to the <code>INIT</code> bounds value (<span className="whitespace-nowrap">lower = <code>0</code></span>, <span className="whitespace-nowrap">upper = <code>0</code></span>), allowing access to all available memory.
            </p>
            <p>
                The second source operand <em>must</em> be a memory operand encoded using an SIB byte.
                The <code>base</code> field of the SIB byte contains the address of the bounds table, and the <code>index</code> field containing the buffer&apos; offset.
                The <code>scale</code> field is ignored.
                If a displacement is provided, it is added to the <code>base</code> value.
                At no time is memory directly referenced by the SIB byte accessed (the memory contained at the address <em>referenced</em> by the <code>base</code> is, however), and the flags are untouched.
            </p>
        </>
    ),
    operation:
        `public void BNDLDX_1632(Bound dest, Sib addr)
{
    IntPtr @base = addr.Base + addr.Displacement;
    U32 ptr = GPR(addr.Index);

    U32 a_bde = (@base[12..31] << 2) + (BNDCFG[12..31] << 12);
    U32 a_bt = Mem32[a_bde];
    if (a_bt.Bit[0] == 0)
    {
        BNDSTATUS.Bde = a_bde;
        BNDSTATUS.EC = 2; // invalid BDE
        #BR;
    }

    U32 a_bte = (@base[2..11] << 4) + (a_bt[2..31] << 2);
    U32 tmpLower = Mem32[a_bte];
    U32 tmpUpper = Mem32[a_bte + 4];
    U32 tmpPtr = Mem32[a_bte + 8];
    if (tmpPtr == ptr)
    {
        dest.Lower = tmpLower;
        dest.Upper = tmpUpper;
    }
    else
    {
        dest.Lower = 0;
        dest.Upper = 0;
    }
}

public void BNDLDX(Bound dest, Sib addr)
{
    IntPtr @base = addr.Base + addr.Displacement;
    U64 ptr = GPR(addr.Index);

    U64 a_bde = (@base[20..(48+MAWA-1)] << 3) + (BNDCFG[12..63] << 12); // see note 1
    U64 a_bt = Mem64[a_bde];
    if (a_bt.Bit[0] == 0)
    {
        BNDSTATUS.Bde = a_bde;
        BNDSTATUS.EC = 2; // invalid BDE
        #BR;
    }

    U64 a_bte = (@base[3..19] << 5) + (a_bt[3..63] << 3);
    U64 tmpLower = Mem64[a_bte];
    U64 tmpUpper = Mem64[a_bte + 8];
    U64 tmpPtr = Mem64[a_bte + 16];
    if (tmpPtr == ptr)
    {
        dest.Lower = tmpLower;
        dest.Upper = tmpUpper;
    }
    else
    {
        dest.Lower = 0;
        dest.Upper = 0;
    }
}`,
    operationNotes:
        <>
            If <Register name="CPL" /> is 3, the user <code>MAWA</code> (<code>MAWAU</code>) is used.
            It&apos;s value is enumerated in <Cpuid featureID="mawau" eax={7} ecx={0} output="ecx" bit={17} bitEnd={23} />.
            Otherwise, the supervisor <code>MAWA</code> (<code>MAWAS</code>) is used, which is 0.
        </>,
    flags: "none",
    intrinsics: "autogen",
    exceptionsLegacy: {
        real: {
            BR: <>If the Bound Directory Entry is invalid.</>,
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            GP0: <>If the effective address of the Bound Table Entry is outside the <Register name="DS" /> segment limit.</>,
        },
        virtual: {
            BR: <>If the Bound Directory Entry is invalid.</>,
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            GP0: <>If the effective address of the Bound Table Entry is outside the <Register name="DS" /> segment limit.</>,
            PF: Exceptions.PF,
        },
        protected: {
            BR: <>If the Bound Directory Entry is invalid.</>,
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            GP0: [
                <>If the <Register name="DS" /> segment contains a <code>NULL</code> segment selector.</>,
                <>If the effective address of the Bound Table Entry is outside the <Register name="DS" /> segment limit.</>,
            ],
            PF: Exceptions.PF,
        },
        compatibility: {
            // same as protected
            BR: <>If the Bound Directory Entry is invalid.</>,
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            GP0: [
                <>If the <Register name="DS" /> segment contains a <code>NULL</code> segment selector.</>,
                <>If the effective address of the Bound Table Entry is outside the <Register name="DS" /> segment limit.</>,
            ],
            PF: Exceptions.PF,
        },
        long: {
            BR: <>If the Bound Directory Entry is invalid.</>,
            UD: [
                Exceptions.Lock,
                Exceptions.SibRequired,
                <>If a register operand encodes <Register name="BND4" /> through <Register name="BND7" />.</>,
            ],
            GP0: [
                <>If the <Register name="DS" /> segment contains a <code>NULL</code> segment selector.</>,
                <>If the effective address of the Bound Table Entry is outside the <Register name="DS" /> segment limit.</>,
                <>If the memory address (<code>A_BDE</code> or <code>A_BTE</code>) is in non-canonical form.</>,
            ],
            PF: Exceptions.PF,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
