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

import Exceptions from "@/library/Exceptions";
import NoWrap from "@/components/NoWrap";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "btr",
    title: <>Bit Test and Reset</>,
    titlePlain: "Bit Test and Complement",
    opcodes: [
        {
            opcode: <>0F B3 /r</>,
            mnemonic: <>BTR <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>r16</i> from <i>r/m16</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
        {
            opcode: <>0F B3 /r</>,
            mnemonic: <>BTR <i>r/m32</i>, <i>r32</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>r32</i> from <i>r/m32</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
        {
            opcode: <>REX.W 0F B3 /r</>,
            mnemonic: <>BTR <i>r/m64</i>, <i>r64</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>r64</i> from <i>r/m64</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
        {
            opcode: <>0F BA /6 <i>ib</i></>,
            mnemonic: <>BTR <i>r/m16</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>imm8</i> from <i>r/m16</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
        {
            opcode: <>0F BA /6 <i>ib</i></>,
            mnemonic: <>BTR <i>r/m32</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>imm8</i> from <i>r/m32</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
        {
            opcode: <>REX.W 0F BA /6 <i>ib</i></>,
            mnemonic: <>BTR <i>r/m64</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Store the bit specified in <i>imm8</i> from <i>r/m64</i> in <Register name="CF" />.
                    Reset (clear) that bit in the source operand.
                </>,
        },
    ],
    encodings: {
        mr: ["ModRM.reg[rw]", "ModRM.r/m[r]"],
        mi: ["ModRM.r/m[rw]", "imm8"],
    },
    description: (
        <>
            <p>
                The <code>BTR</code> instruction selects a bit from the first source operand and stores it in <Register name="CF" />.
                The specific bit that is selected is specified in the second source operand.
                Afterwards, the selected bit is reset (cleared) in the source operand.
            </p>
            <p>
                The operand size determines how many bits of the second source operand are used;
                Any upper bits are ignored.
                For example, if the operand size is <NoWrap>16 bits</NoWrap>, only the lowest five bits are used in the calculation (an effective &quot;mod 16&quot;).
                In other words, attempting to access the 21<sup>st</sup> bit of a <NoWrap>16-bit</NoWrap> register will only access the <em>fifth</em> bit (<span className="whitespace-nowrap">21 mod 16 &equiv; 5</span>).
            </p>
        </>
    ),
    operation:
        `public void BTR(U16 src, U16 idx)
{
    EFLAGS.CF = src.Bit[idx % 16];
    src.Bit[idx % 16] = 0;
}

public void BTR(U32 src, U32 idx)
{
    EFLAGS.CF = src.Bit[idx % 32];
    src.Bit[idx % 32] = 0;
}

public void BTR(U64 src, U64 idx)
{
    EFLAGS.CF = src.Bit[idx % 64];
    src.Bit[idx % 64] = 0;
}`,
    flags: {
        CF: <>Set if the specified bit is set prior to being reset. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Unmodified.</>,
        SF: <>Undefined.</>,
        OF: <>Undefined.</>,
    },
    intrinsics: "autogen",
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: Exceptions.Lock,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonCanon,
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
