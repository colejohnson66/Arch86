/* =============================================================================
 * File:   blsmsk.tsx
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
    id: "blsmsk",
    title: <>Get Mask Up to Lowest Set Bit</>,
    titlePlain: "Get Mask Up to Lowest Set Bit",
    opcodes: [
        {
            opcode: <>VEX.L0.NP.0F38.W0 F3 /3</>,
            mnemonic: <>BLSMSK <i>r32</i>, <i>r/m32</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "bmi1",
            description: <>Set the lower bits in <i>r32</i> from bit 0 up to (and including) the lowest set bit of <i>r/m32</i>.</>,
        },
        {
            opcode: <>VEX.L0.NP.0F38.W1 F3 /3</>,
            mnemonic: <>BLSMSK <i>r64</i>, <i>r/m64</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "bmi1",
            description: <>Set the lower bits in <i>r64</i> from bit 0 up to (and including) the lowest set bit of <i>r/m64</i>.</>,
        },
    ],
    encodings: {
        vex: ["VEX.vvvv[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>BLSMSK</code> instruction sets all the bits in the destination operand from position 0 up to (and including) the lowest set bit of the source operand.
                All other bits in the destination operand are cleared.
            </p>
            <p>
                {Canned.WIgnoredIn32("vex")}
            </p>
        </>
    ),
    operation:
        `public void BLSMSK(ref U32 dest, U32 src)
{
    dest = (-src) ^ src;
}

public void BLSMSK(ref U64 dest, U64 src)
{
    dest = (-src) ^ src;
}`,
    flags: {
        CF: <>Set if the source is not zero. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Cleared.</>,
        SF: <>Set according to the result.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "uint32_t _blsmsk_u32(uint32_t src)",
        "uint64_t _blsmsk_u64(uint64_t src)",
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
