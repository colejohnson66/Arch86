/* =============================================================================
 * File:   cmpxchg.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022 Cole Tobin
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

import InstructionPageLayout, { InstructionPageLayoutProps } from "@components/InstructionPageLayout";

import A from "@components/A";
import Canned from "@library/Canned";
import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cmpxchg",
    title: <>Compare and Exchange</>,
    titlePlain: "Compare and Exchange",
    opcodes: [
        {
            opcode: <>0F B0 /r</>,
            mnemonic: <>CMPXCHG <i>r/m8</i>, <i>r8</i></>,
            encoding: "MR",
            validity: {
                16: "valid1",
                32: "valid1",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="AL" /> with <i>r/m8</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <i>r8</i> into <i>r/m8</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>r/m8</i> into <Register name="AL" />.
                </>,
        },
        {
            opcode: <>0F B0 /r</>,
            mnemonic: <>CMPXCHG <i>r/m8<sup>*</sup></i>, <i>r8<sup>*</sup></i></>,
            encoding: "MR",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="AL" /> with <i>r/m8</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <i>r8</i> into <i>r/m8</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>r/m8</i> into <Register name="AL" />.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>0F B1 /r</>,
            mnemonic: <>CMPXCHG <i>r/m16</i>, <i>r16</i></>,
            encoding: "MR",
            validity: {
                16: "valid1",
                32: "valid1",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="AX" /> with <i>r/m16</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <i>r16</i> into <i>r/m16</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>r/m16</i> into <Register name="AX" />
                </>,
        },
        {
            opcode: <>0F B1 /r</>,
            mnemonic: <>CMPXCHG <i>r/m16</i>, <i>r16</i></>,
            encoding: "MR",
            validity: {
                16: "valid1",
                32: "valid1",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="EAX" /> with <i>r/m32</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <i>r32</i> into <i>r/m32</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>r/m32</i> into <Register name="EAX" />
                </>,
        },
        {
            opcode: <>REX.W 0F B1 /r</>,
            mnemonic: <>CMPXCHG <i>r/m64</i>, <i>r64</i></>,
            encoding: "MR",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <Register name="RAX" /> with <i>r/m64</i>.
                    If equal, set <Register name="EFLAGS.ZF" /> and move <i>r64</i> into <i>r/m64</i>.
                    Otherwise, clear <Register name="EFLAGS.ZF" /> and move <i>r/m64</i> into <Register name="RAX" />
                </>,
        },
    ],
    opcodeNotes: <>This instruction is not supported on processors earlier than the <A href="/architecture/80486">80486</A>.</>,
    encodings: {
        operands: 2,
        encodings: {
            "MR": ["ModRM.r/m[rw]", "ModRM.reg[r]"],
        },
    },
    description: (
        <>
            <p>
                The <code>CMPXCHG</code> instruction compares the value in the accumulator with the first (&quot;destination&quot;) operand.
                If the two values are equal, the second (&quot;source&quot;) operand is written into the first, and <Register name="EFLAGS.ZF" /> set.
                Otherwise, the second operand is loaded into the accumulator and <Register name="EFLAGS.ZF" /> cleared.
            </p>
            <p>
                {Canned.Lockable}
                {" "}To simplify bus operation with locked operation, the destination operand is <em>always</em> written to, even if it is not updated (a locked bus cycle cannot end without a write).
            </p>
        </>
    ),
    operation:
        `// if the instruction is LOCKed and \`dest\` and the accumulator are different, \`dest\` is reloaded with itself

public void CMPXCHG_8(ref byte dest, byte src)
{
    if (dest == AL)
        dest = src;
    else
        AL = dest;
}

public void CMPXCHG_16(ref ushort dest, ushort src)
{
    if (dest == AX)
        dest = src;
    else
        AX = dest;
}

public void CMPXCHG_32(ref uint dest, uint src)
{
    if (dest == EAX)
        dest = src;
    else
        EAX = dest;
}

public void CMPXCHG_64(ref ulong dest, ulong src)
{
    if (dest == RAX)
        dest = src;
    else
        RAX = dest;
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
    exceptions: {
        real: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
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
            UD: Exceptions.LockNoMem,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
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
