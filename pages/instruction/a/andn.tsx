/* =============================================================================
 * File:   andn.tsx
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
    id: "andn",
    title: <>Logical AND NOT</>,
    titlePlain: "Logical AND NOT",
    opcodes: [
        {
            opcode: <>VEX.L0.NP.0F38.W0 F2 /r</>,
            mnemonic: <>ANDN <i>r32a</i>, <i>r32b</i>, <i>r/m32</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "bmi1",
            description:
                <>
                    Logical AND <i>r32b</i> (inverted) and <i>r/m32</i>.
                    Store the result in <i>r32a</i>.
                </>,
        },
        {
            opcode: <>VEX.L0.NP.0F38.W1 F2 /r</>,
            mnemonic: <>ANDN <i>r64a</i>, <i>r64b</i>, <i>r/m64</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "bmi1",
            description:
                <>
                    Logical AND <i>r64b</i> (inverted) and <i>r/m64</i>.
                    Store the result in <i>r64a</i>.
                </>,
        },
    ],
    encodings: {
        rvm: ["ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>ANDN</code> instruction ANDs the two source operands.
                The first source operand is inverted before being ANDed with the other source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.WIgnoredIn32("vex")}
            </p>
        </>
    ),
    operation:
        `public void ANDN(ref U32 dest, U32 src1, U32 src2)
{
    dest = ~src1 & src2;
}

public void ANDN(ref U64 dest, U64 src1, U64 src2)
{
    dest = ~src1 & src2;
}`,
    flags: {
        CF: <>Cleared.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: "autogen",
    exceptionsLegacy: {
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
