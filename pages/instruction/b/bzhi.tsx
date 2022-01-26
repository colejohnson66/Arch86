/* =============================================================================
 * File:   bzhi.tsx
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

import Canned from "@library/Canned";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "bzhi",
    title: <>Zero High Bits From Index</>,
    titlePlain: "Zero High Bits From Index",
    opcodes: [
        {
            opcode: <>VEX.L0.NP.0F38.W0 F5 /r</>,
            mnemonic: <>BZHI <i>r32a</i>, <i>r/m32</i>, <i>r32b</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "bmi2",
            description:
                <>
                    Zero bits in <i>r/m32</i> beginning at the bit index specified in <i>r32b</i>.
                    Store the result in <i>r32a</i>.
                </>,
        },
        {
            opcode: <>VEX.L0.NP.0F38.W1 F5 /r</>,
            mnemonic: <>BZHI <i>r64a</i>, <i>r/m64</i>, <i>r64b</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "bmi2",
            description:
                <>
                    Zero bits in <i>r/m64</i> beginning at the bit index specified in <i>r64b</i>.
                    Store the result in <i>r64a</i>.
                </>,
        },
    ],
    encodings: {
        vex: ["ModRM.reg[w]", "ModRM.r/m[r]", "VEX.vvvv[r]"],
    },
    description: (
        <>
            <p>
                The <code>BZHI</code> instruction zeros (clears) bits from the first source operand beginning at the bit position provided in the second source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                From the second source operand, only the lowest eight bits are used in the operation.
                If those eight bits contain a value greater than the operand size, the destination operand will be set to <code>0</code> and <Register name="EFLAGS.CF" /> set.
            </p>
            <p>
                {Canned.WIgnoredIn32}
            </p>
        </>
    ),
    operation:
        `public void BZHI(ref U32 dest, U32 src, U32 idx)
{
    U32 n = idx & 0xFF;
    if (n < 32)
        dest.Bit[n..31] = 0;
    else
        dest = 0.
}

public void BZHI(ref U64 dest, U64 src, U64 idx)
{
    U64 n = idx & 0xFF;
    if (n < 64)
        dest.Bit[n..63] = 0;
    else
        dest = 0.
}`,
    flags: {
        CF: <>Set if the beginning index is out of range. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "uint32_t _bzhi_u32(uint32_t src, uint32_t index)",
        "uint64_t _bzhi_u64(uint64_t src, uint64_t index)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "13",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
