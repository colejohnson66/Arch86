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
const sae = "{sae}";

const PageData: InstructionPageLayoutProps = {
    id: "cvtss2sd",
    title: <>Convert Scalar Single-Precision Floating-Point Values to Scalar Double-Precision Floating-Point Values</>,
    titlePlain: "Convert Scalar Single-Precision Floating-Point Values to Scalar Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F3 0F 5A /r</>,
            mnemonic: <>CVTSS2SD <i>xmm1</i>, <i>xmm2/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm2/m32</i> into a scalar single-precision floating-point value.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.WIG 5A /r</>,
            mnemonic: <>VCVTSS2SD <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m32</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm3/m32</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W1 5A /r</>,
            mnemonic: <>VCVTSS2SD <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m32{sae}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm3/m32</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        rvm: ["n/a", "ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        ervm: ["tuple1-scalar", "ModRM.reg[w]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTSS2SD</code> instruction converts a scalar single-precision floating-point value from the source operand to a scalar double-precision floating-point value.
                The result is stored in the destination operand.
            </p>
            <p>
                The VEX and EVEX forms will copy bits <code>64..127</code> from the first source operand into the destination.
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTSS2SD(SimdF64 dest, SimdF32 src)
{
    dest[0] = ConvertToF32(src[0]);
    // dest[1..] is unmodified
}

public void VCVTSS2SD_Vex(SimdF64 dest, SimdF64 src1, SimdF32 src2)
{
    dest[0] = ConvertToF32(src2[0]);
    dest[1] = src1[1];
    dest[2..] = 0;
}

public void VCVTSS2SD_EvexMemory(SimdF64 dest, SimdF64 src1, SimdF32 src2, KMask k)
{
    if (k[0])
        dest[0] = ConvertToF32(src2[0]);
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2..] = 0;
}

public void VCVTSS2SD_EvexRegister(SimdF64 dest, SimdF64 src1, SimdF32 src2, KMask k)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    if (k[0])
        dest[0] = ConvertToF32(src2[0]);
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2..] = 0;
}`,
    intrinsics: [
        "__m128 _mm_cvtss_sd(__m128 a, __m128d b)",
        "__m128 _mm_cvt_roundss_sd(__m128 a, __m128d b, const int rounding)",
        "__m128 _mm_mask_cvtss_sd(__m128 s, __mmask8 k, __m128 a, __m128d b)",
        "__m128 _mm_mask_cvt_roundss_sd(__m128 s, __mmask8 k, __m128 a, __m128d b, const int rounding)",
        "__m128 _mm_maskz_cvtss_sd(__mmask8 k, __m128 a,__m128d b)",
        "__m128 _mm_maskz_cvt_roundss_sd(__mmask8 k, __m128 a,__m128d b, const int rounding)",
    ],
    exceptionsLegacy: {
        simd: {
            XM: [
                Exceptions.SimdDenormal,
                Exceptions.SimdInvalid,
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
