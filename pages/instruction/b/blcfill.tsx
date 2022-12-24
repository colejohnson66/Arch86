/* =============================================================================
 * File:   blcfill.tsx
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
    id: "blcfill",
    title: <>Fill From Lowest Clear Bit</>,
    titlePlain: "Fill From Lowest Clear Bit",
    opcodes: [
        {
            opcode: <>XOP.L0.NP.09.W0 01 /1</>,
            mnemonic: <>BLCFILL <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "tbm",
            description:
                <>
                    Find the least significant cleared bit in <i>r/m32</i> and clear all lower bits.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>XOP.L0.NP.09.W1 01 /1</>,
            mnemonic: <>BLCFILL <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "tbm",
            description:
                <>
                    Find the least significant cleared bit in <i>r/m64</i> and clear all lower bits.
                    Store the result in <i>r64</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>BLCFILL</code> instruction clears, from the source operand, all set bits up to the lowest cleared bit.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.WIgnoredIn32("xop")}
            </p>
        </>
    ),
    operation:
        `public void BLCFILL(ref U32 dest, U32 src)
{
    dest = src & (src + 1);
}

public void BLCFILL(ref U64 dest, U64 src)
{
    dest = src & (src + 1);
}`,
    flags: {
        CF: <>Set according to the result.</>,
        PF: <>Set according to the result.</>,
        AF: <>Set according to the result.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Set according to the result.</>,
    },
    intrinsics: [
        // Cleanup regex: (ensure parameters have names)
        // [A-Z1-3]+:?\s+([^ ]+) ([^ ]+) ?\(([^\)]+)\);?
        // "<1> <2>(<3>)",
    ],
    exceptionsLegacy: {
        simd: "none",
        other: {
            // xop: ???,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
