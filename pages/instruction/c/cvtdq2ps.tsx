/* =============================================================================
 * File:   cvtdq2ps.tsx
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
    id: "cvtdq2ps",
    title: <>Convert Packed Doubleword Integers to Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Convert Packed Doubleword Integers to Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>NP 0F 5B /r</>,
            mnemonic: <>CVTDQ2PS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.NP.0F.WIG 5B /r</>,
            mnemonic: <>VCVTDQ2PS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.NP.0F.WIG 5B /r</>,
            mnemonic: <>VCVTDQ2PS <i>ymm1</i>, <i>ymm2/m256</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed doubleword integers from <i>ymm2/m256</i> into packed single-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.NP.0F.W0 5B /r</>,
            mnemonic: <>VCVTDQ2PS {k1z} <i>xmm1</i>, <i>xmm2/m128/m32bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128/m32bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.NP.0F.W0 5B /r</>,
            mnemonic: <>VCVTDQ2PS {k1z} <i>ymm1</i>, <i>ymm2/m256/m32bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed doubleword integers from <i>ymm2/m256/m32bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.NP.0F.W0 5B /r</>,
            mnemonic: <>VCVTDQ2PS {k1z} <i>zmm1</i>, <i>zmm2/m512/m32bcst{er}</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert packed doubleword integers from <i>zmm2/m512/m32bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        legacy: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        vex: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        evex: ["full", "ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTDQ2PS</code> instruction converts four, eight, or 16 doubleword integers from the source operand into single-precision floating-point values.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTDQ2PS(SimdF32 dest, SimdI32 src)
{
    dest[0] = ConvertToF32(src[0]);
    dest[1] = ConvertToF32(src[1]);
    dest[2] = ConvertToF32(src[2]);
    dest[3] = ConvertToF32(src[3]);
    // dest[4..] is unmodified
}

void VCVTDQ2PS_Vex(SimdF32 dest, SimdI32 src, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ConvertToF32(src[n]);
    dest[kl..] = 0;
}
public void VCVTDQ2PS_Vex128(SimdF32 dest, SimdI32 src) =>
    VCVTDQ2PS_Vex(dest, src, 4);
public void VCVTDQ2PS_Vex128(SimdF32 dest, SimdI32 src) =>
    VCVTDQ2PS_Vex(dest, src, 8);

void VCVTDQ2PS_EvexMemory(SimdF32 dest, SimdI32 src, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToF32(EVEX.b ? src[0] : src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VCVTDQ2PS_Evex128Memory(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexMemory(dest, src, k, 4);
public void VCVTDQ2PS_Evex256Memory(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexMemory(dest, src, k, 8);
public void VCVTDQ2PS_Evex512Memory(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexMemory(dest, src, k, 16);

void VCVTDQ2PS_EvexRegister(SimdF32 dest, SimdI32 src, KMask k, int kl)
{
    if (kl == 16 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToF32(src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VCVTDQ2PS_Evex128Register(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexRegister(dest, src, k, 4);
public void VCVTDQ2PS_Evex256Register(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexRegister(dest, src, k, 8);
public void VCVTDQ2PS_Evex512Register(SimdF32 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PS_EvexRegister(dest, src, k, 16);`,
    intrinsics: [
        "__m128 _mm_cvtepi32_ps(__m128i src)",
        "__m128 _mm_mask_cvtepi32_ps(__m128 s, __mmask8 k, __m128i a)",
        "__m128 _mm_maskz_cvtepi32_ps(__mmask8 k, __m128i a)",
        "",
        "__m256 _mm256_cvtepi32_ps(__m256i src)",
        "__m256 _mm256_mask_cvtepi32_ps(__m256 s, __mmask8 k, __m256i a)",
        "__m256 _mm256_maskz_cvtepi32_ps(__mmask8 k, __m256i a)",
        "",
        "__m512 _mm512_cvtepi32_ps(__m512i a)",
        "__m512 _mm512_cvt_roundepi32_ps(__m512i a, const int rounding)",
        "__m512 _mm512_mask_cvtepi32_ps(__m512 s, __mmask16 k, __m512i a)",
        "__m512 _mm512_mask_cvt_roundepi_ps(__m512 s, __mmask16 k, __m512i a, const int rounding)",
        "__m512 _mm512_maskz_cvtepi32_ps(__mmask16 k, __m512i a)",
        "__m512 _mm512_maskz_cvt_roundepi32_ps(__mmask16 k, __m512i a, const int rounding)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdPrecision,
            ],
        },
        other: {
            vex: "2",
            evex: "e2",
            UD: [
                Exceptions.VexVvvv,
                Exceptions.EvexVvvvv,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
