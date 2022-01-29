/* =============================================================================
 * File:   divps.tsx
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
import Exceptions from "@library/Exceptions";

const k1z = "{k1}{z}";
const er = "{er}";

const PageData: InstructionPageLayoutProps = {
    id: "divps",
    title: <>Divide Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Divide Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>NP 0F 5E /r</>,
            mnemonic: <>DIVPS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Divide packed single-precision floating-point values in <i>xmm1</i> by those in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.NP.0F.WIG 5E /r</>,
            mnemonic: <>VDIVPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Divide packed single-precision floating-point values in <i>xmm2</i> by those in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.NP.0F.WIG 5E /r</>,
            mnemonic: <>VDIVPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Divide packed single-precision floating-point values in <i>ymm2</i> by those in <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.NP.0F.W0 5E /r</>,
            mnemonic: <>VDIVPS {k1z} <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128/m64bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Divide packed single-precision floating-point values in <i>xmm2</i> by those in <i>xmm3/m128/m64bcst</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.NP.0F.W0 5E /r</>,
            mnemonic: <>VDIVPS {k1z} <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256/m64bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Divide packed single-precision floating-point values in <i>ymm2</i> by those in <i>ymm3/m256/m64bcst</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.NP.0F.W0 5E /r</>,
            mnemonic: <>VDIVPS {k1z} <i>zmm1</i>, <i>zmm2</i>, <i>zmm3/m512/m64bcst{er}</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Divide packed single-precision floating-point values in <i>zmm2</i> by those in <i>zmm3/m512/m64bcst</i>.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        legacy: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        vex: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        evex: ["full", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)DIVPS</code> instruction divides four, eight, or 16 packed single-precision floating-point values from the first source operand by those in the second.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void DIVPS(SimdF32 dest, SimdF32 src)
{
    dest[0] /= src[0];
    dest[1] /= src[1];
    dest[2] /= src[2];
    dest[3] /= src[3];
    // dest[4..] is unmodified
}

void VDIVPS_Vex(SimdF32 dest, SimdF32 src1, SimdF32 src2, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = src1[n] / src2[n];
    dest[kl..] = 0;
}
public void VDIVPS_Vex128(SimdF32 dest, SimdF32 src1, SimdF32 src2) =>
    VDIVPS_Vex(dest, src1, src2, 4);
public void VDIVPS_Vex256(SimdF32 dest, SimdF32 src1, SimdF32 src2) =>
    VDIVPS_Vex(dest, src1, src2, 8);

void VDIVPS_EvexMemory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] / (EVEX.b ? src2[0] : src2[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VDIVPS_Evex128Memory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexMemory(dest, src1, src2, k, 4);
public void VDIVPS_Evex256Memory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexMemory(dest, src1, src2, k, 8);
public void VDIVPS_Evex512Memory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexMemory(dest, src1, src2, k, 16);

void VDIVPS_EvexRegister(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k, int kl)
{
    if (kl == 16 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] / src2[n];
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VDIVPS_Evex128Register(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexRegister(dest, src1, src2, k, 4);
public void VDIVPS_Evex256Register(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexRegister(dest, src1, src2, k, 8);
public void VDIVPS_Evex512Register(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k) =>
    VDIVPS_EvexRegister(dest, src1, src2, k, 16);`,
    intrinsics: [
        "__m128d _mm_div_ps(__m128d a, __m128d b)",
        "__m128d _mm_mask_div_ps(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_div_ps(__mmask8 k, __m128d a, __m128d b)",
        "",
        "__m256d _mm256_div_ps(__m256d a, __m256d b)",
        "__m256d _mm256_mask_div_ps(__m256d s, __mmask8 k, __m256d a, __m256d b)",
        "__m256d _mm256_maskz_div_ps(__mmask8 k, __m256d a, __m256d b)",
        "",
        "__m512d _mm512_div_ps(__m512d a, __m512d b)",
        "__m512d _mm512_div_round_ps(__m512d a, __m512d b, const int rounding)",
        "__m512d _mm512_mask_div_ps(__m512d s, __mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_mask_div_round_ps(__m512d s, __mmask8 k, __m512d a, __m512d b, const int rounding)",
        "__m512d _mm512_maskz_div_ps(__mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_maskz_div_round_ps(__mmask8 k, __m512d a, __m512d b, const int rounding)",
    ],
    exceptions: {
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
            vex: "2",
            evex: "e2",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
