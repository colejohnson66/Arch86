/* =============================================================================
 * File:   blsr.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "blsr",
    title: <>Clear Lowest Set Bit</>,
    titlePlain: "Clear Lowest Set Bit",
    opcodes: [
        {
            opcode: <>VEX.L0.NP.0F38.W0 F3 /1</>,
            mnemonic: <>BLSR <i>r32</i>, <i>r/m32</i></>,
            encoding: "vm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "bmi1",
            description: <>Move from <i>r/m32</i> into <i>r32</i> while clearing the lowest set bit.</>,
        },
        {
            opcode: <>VEX.L0.NP.0F38.W1 F3 /1</>,
            mnemonic: <>BLSR <i>r64</i>, <i>r/m64</i></>,
            encoding: "vm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "bmi1",
            description: <>Move from <i>r/m64</i> into <i>r64</i> while clearing the lowest set bit.</>,
        },
    ],
    encodings: {
        vm: ["VEX.vvvv[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>BLSR</code> instruction copies from the source operand into the destination operand while, at the same time, clearing (resetting) the lowest set bit.
            </p>
            <p>
                {Canned.WIgnoredIn32}
            </p>
        </>
    ),
    operation:
        `public void BLSR((ref U32 dest, U32 src)
{
    dest = src & (src - 1);
}

public void BLSR((ref U64 dest, U64 src)
{
    dest = src & (src - 1);
}`,
    flags: {
        CF: <>Set if the source is not zero. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "uint32_t _blsr_u32(uint32_t src)",
        "uint64_t _blsr_u64(uint64_t src)",
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
