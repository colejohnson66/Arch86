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

import Canned from "@/library/Canned";
import Exceptions from "@/library/Exceptions";

const k1z = "{k1}{z}";
const er = "{er}";

const PageData: InstructionPageLayoutProps = {
    id: "divss",
    title: <>Divide Scalar Single-Precision Floating-Point Values</>,
    titlePlain: "Divide Scalar Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F3 0F 5E /r</>,
            mnemonic: <>DIVSS <i>xmm1</i>, <i>xmm2/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Divide the lowest single-precision floating-point value in <i>xmm1</i> by the same in <i>xmm2/m32</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.WIG 5E /r</>,
            mnemonic: <>VDIVSS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m32</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Divide the lowest single-precision floating-point value in <i>xmm2</i> by the same in <i>xmm3/m32</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W1 5E /r</>,
            mnemonic: <>VDIVSS <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m32{er}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Divide the lowest single-precision floating-point value in <i>xmm2</i> by the same in <i>xmm3/m32</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        rvm: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        ervm: ["tuple1-scalar", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)DIVSS</code> instruction divides a single single-precision floating-point value from the first source operand with the same in the second.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void DIVSS(SimdF32 dest, SimdF32 src)
{
    dest[0] /= src[0];
    // dest[1..] is unmodified
}

public void VDIVSS_Vex(SimdF32 dest, SimdF32 src1, SimdF32 src2)
{
    dest[0] = src1[0] / src[2];
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}

public void VDIVSS_EvexMemory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k)
{
    if (k[0])
        dest[0] = src1[0] / src2[0];
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}

public void VDIVSS_EvexRegister(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    if (k[0])
        dest[0] = src1[0] / src2[0];
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}`,
    intrinsics: [
        "__m128d _mm_div_ss(__m128d a, __m128d b)",
        "__m128d _mm_div_round_ss(__m128d a, __m128d b, int)",
        "__m128d _mm_mask_div_ss(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_mask_div_round_ss(__m128d s, __mmask8 k, __m128d a, __m128d b, int)",
        "__m128d _mm_maskz_div_ss(__mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_div_round_ss(__mmask8 k, __m128d a, __m128d b, int)",
    ],
    exceptionsLegacy: {
        simd: {
            XM: [
                Exceptions.SimdDenormal,
                Exceptions.SimdInvalid,
                Exceptions.SimdOverflow,
                Exceptions.SimdPrecision,
                Exceptions.SimdUnderflow,
                Exceptions.SimdDivideBy0,
            ],
        },
        other: {
            vex: "3",
            evex: "e3",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
