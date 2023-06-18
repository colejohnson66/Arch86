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

import A from "@/components/A";
import Canned from "@/library/Canned";
import Exceptions from "@/library/Exceptions";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cmpxchg8b-cmpxchg16b",
    title: <>Compare and Exchange 8/16 Bytes</>,
    titlePlain: "Compare and Exchange 8/16 Bytes",
    opcodes: [
        {
            opcode: <>0F C7 mem/1</>,
            mnemonic: <>CMPXCHG8B <i>m64</i></>,
            encoding: "m",
            validity: {
                16: "valid1",
                32: "valid1",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="EDX:EAX" /> with <i>m64</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <Register name="ECX:EBX" /> into <i>m64</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>m64</i> into <Register name="EDX:EAX" />.
                </>,
        },
        {
            opcode: <>REX.W 0F C7 mem/1</>,
            mnemonic: <>CMPXCHG8B <i>m128</i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="RDX:RAX" /> with <i>m128</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <Register name="RCX:RBX" /> into <i>m128</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>m64</i> into <Register name="RDX:RAX" />.
                </>,
        },
    ],
    opcodeNotes: <>This instruction is not supported on processors earlier than the <A href="/architecture/p5">Pentium</A>.</>,
    encodings: {
        m: ["ModRM.r/m[rw]"],
    },
    description: (
        <>
            <p>
                The <code>CMPXCHG8B</code> and <code>CMPXCHG16B</code> instructions compares the value in the data-accumulator register pair with the memory operand.
                If the two values are equal, the counter-base register pair is written into the operand, and <Register name="EFLAGS.ZF" /> set.
                Otherwise, the second operand is loaded into the accumulator and <Register name="EFLAGS.ZF" /> cleared.
            </p>
            <p>
                {Canned.Lockable}
                {" "}To simplify bus operation with locked operation, the destination operand is <em>always</em> written to, even if it is not updated (a locked bus cycle cannot end without a write).
            </p>
        </>
    ),
    operation:
        `// if the instruction is LOCKed and \`addr\` and the data-accumulator register pair are different, \`addr\` is reloaded with itself

public void CMPXCHG8B(ref IntPtr addr)
{
    if (Mem32[addr] == EAX && Mem32[addr + 4] == EDX)
    {
        Mem32[addr] = EBX;
        Mem32[addr + 4] = ECX;
    }
    else
    {
        EAX = Mem32[addr];
        EDX = Mem32[addr + 4];
    }
}

public void CMPXCHG16B(ref IntPtr addr)
{
    if (Mem64[addr] == RAX && Mem64[addr + 8] == RDX)
    {
        Mem64[addr] = RBX;
        Mem64[addr + 8] = RCX;
    }
    else
    {
        RAX = Mem64[addr];
        RDX = Mem64[addr + 8];
    }
}`,
    flags: {
        CF: <>Set according to the temporary result.</>,
        PF: <>Set according to the temporary result.</>,
        AF: <>Set according to the temporary result.</>,
        ZF: <>Set if an exchange occurs. Cleared otherwise.</>,
        SF: <>Set according to the temporary result.</>,
        OF: <>Set according to the temporary result.</>,
    },
    intrinsics: "autogen",
    exceptionsLegacy: {
        real: {
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonAlignedMemory(16),
                Exceptions.NonCanon,
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
