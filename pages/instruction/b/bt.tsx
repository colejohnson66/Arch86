/* =============================================================================
 * File:   bt.tsx
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

import Exceptions from "@library/Exceptions";
import Register from "@components/Register";
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "bt",
    title: <>Bit Test</>,
    titlePlain: "Bit Test",
    opcodes: [
        {
            opcode: <>0F A3 /r</>,
            mnemonic: <>BT <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Store the bit specified in <i>r16</i> from <i>r/m16</i> in <Register name="CF" />.</>,
        },
        {
            opcode: <>0F A3 /r</>,
            mnemonic: <>BT <i>r/m32</i>, <i>r32</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Store the bit specified in <i>r32</i> from <i>r/m32</i> in <Register name="CF" />.</>,
        },
        {
            opcode: <>REX.W 0F A3 /r</>,
            mnemonic: <>BT <i>r/m64</i>, <i>r64</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Store the bit specified in <i>r64</i> from <i>r/m64</i> in <Register name="CF" />.</>,
        },
        {
            opcode: <>0F BA /4 <i>ib</i></>,
            mnemonic: <>BT <i>r/m16</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Store the bit specified in <i>imm8</i> from <i>r/m16</i> in <Register name="CF" />.</>,
        },
        {
            opcode: <>0F BA /4 <i>ib</i></>,
            mnemonic: <>BT <i>r/m32</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Store the bit specified in <i>imm8</i> from <i>r/m32</i> in <Register name="CF" />.</>,
        },
        {
            opcode: <>REX.W 0F BA /4 <i>ib</i></>,
            mnemonic: <>BT <i>r/m64</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Store the bit specified in <i>imm8</i> from <i>r/m64</i> in <Register name="CF" />.</>,
        },
    ],
    encodings: {
        operands: 2,
        encodings: {
            mr: ["ModRM.reg[r]", "ModRM.r/m[r]"],
            mi: ["ModRM.r/m[r]", "imm8"],
        },
    },
    description: (
        <>
            <p>
                The <code>BT</code> instruction selects a bit from the first source operand and stores it in <Register name="CF" />.
                The specific bit that is selected is specified in the second source operand.
            </p>
            <p>
                The operand size determines how many bits of the second source operand are used;
                Any upper bits are ignored.
                For example, if the operand size is <Unit value={16} unit="bits" />, only the lowest five bits are used in the calculation (an effective &quot;mod 16&quot;).
                In other words, attempting to access the 21<sup>st</sup> bit of a <Unit value={16} unit="bit" /> register will only access the <em>fifth</em> bit (<span className="whitespace-nowrap">21 mod 16 &equiv; 5</span>).
            </p>
        </>
    ),
    operation:
        `public void BT(U16 src, U16 idx)
{
    EFLAGS.CF = src.Bit[idx % 16];
}

public void BT(U32 src, U32 idx)
{
    EFLAGS.CF = src.Bit[idx % 32];
}

public void BT(U64 src, U64 idx)
{
    EFLAGS.CF = src.Bit[idx % 64];
}`,
    flags: {
        CF: <>Set if the specified bit is set. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Unmodified.</>,
        SF: <>Undefined.</>,
        OF: <>Undefined.</>,
    },
    intrinsics: "autogen",
    exceptions: {
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
