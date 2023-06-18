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
    id: "cvtdq2pd",
    title: <>Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F3 0F E6 /r</>,
            mnemonic: <>CVTDQ2PD <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128</i> into packed double-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.F3.0F.WIG E6 /r</>,
            mnemonic: <>VCVTDQ2PD <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128</i> into packed double-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.F3.0F.WIG E6 /r</>,
            mnemonic: <>VCVTDQ2PD <i>ymm1</i>, <i>ymm2/m256</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed doubleword integers from <i>ymm2/m256</i> into packed double-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.F3.0F.W0 E6 /r</>,
            mnemonic: <>VCVTDQ2PD <i>xmm1</i> {k1z}, <i>xmm2/m128/m64bcst</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed doubleword integers from <i>xmm2/m128/m64bcst</i> into packed double-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.F3.0F.W0 E6 /r</>,
            mnemonic: <>VCVTDQ2PD <i>ymm1</i> {k1z}, <i>ymm2/m256/m64bcst</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed doubleword integers from <i>ymm2/m256/m64bcst</i> into packed double-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.F3.0F.W0 E6 /r</>,
            mnemonic: <>VCVTDQ2PD <i>zmm1</i> {k1z}, <i>zmm2/m512/m64bcst{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert packed doubleword integers from <i>zmm2/m512/m64bcst</i> into packed double-precision floating-point values.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        erm: ["half", "ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTDQ2PD</code> instruction converts two, four, or eight doubleword integers from the source operand into double-precision floating-point values.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTDQ2PD(SimdF64 dest, SimdI32 src)
{
    dest[0] = ConvertToF64(src[0]);
    dest[1] = ConvertToF64(src[1]);
    // dest[2..] is unmodified
}

void VCVTDQ2PD_Vex(SimdF64 dest, SimdI32 src, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ConvertToF64(src[n]);
    dest[kl..] = 0;
}
public void VCVTDQ2PD_Vex128(SimdF64 dest, SimdI32 src) =>
    VCVTDQ2PD_Vex(dest, src, 2);
public void VCVTDQ2PD_Vex128(SimdF64 dest, SimdI32 src) =>
    VCVTDQ2PD_Vex(dest, src, 4);

void VCVTDQ2PD_EvexMemory(SimdF64 dest, SimdI32 src, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToF64(EVEX.b ? src[0] : src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VCVTDQ2PD_Evex128Memory(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexMemory(dest, src, k, 2);
public void VCVTDQ2PD_Evex256Memory(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexMemory(dest, src, k, 4);
public void VCVTDQ2PD_Evex512Memory(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexMemory(dest, src, k, 8);

void VCVTDQ2PD_EvexRegister(SimdF64 dest, SimdI32 src, KMask k, int kl)
{
    if (kl == 8 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToF64(src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VCVTDQ2PD_Evex128Register(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexRegister(dest, src, k, 2);
public void VCVTDQ2PD_Evex256Register(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexRegister(dest, src, k, 4);
public void VCVTDQ2PD_Evex512Register(SimdF64 dest, SimdI32 src, KMask k) =>
    VCVTDQ2PD_EvexRegister(dest, src, k, 8);`,
    intrinsics: [
        "__m128 _mm_cvtepi32_pd(__m128i src)",
        "__m128 _mm_mask_cvtepi32_pd(__m128 s, __mmask8 k, __m128i a)",
        "__m128 _mm_maskz_cvtepi32_pd(__mmask8 k, __m128i a)",
        "",
        "__m256 _mm256_cvtepi32_pd(__m256i src)",
        "__m256 _mm256_mask_cvtepi32_pd(__m256 s, __mmask8 k, __m256i a)",
        "__m256 _mm256_maskz_cvtepi32_pd(__mmask8 k, __m256i a)",
        "",
        "__m512 _mm512_cvtepi32_pd(__m512i a)",
        "__m512 _mm512_cvt_roundepi32_pd(__m512i a, const int rounding)",
        "__m512 _mm512_mask_cvtepi32_pd(__m512 s, __mmask8 k, __m512i a)",
        "__m512 _mm512_mask_cvt_roundepi_pd(__m512 s, __mmask8 k, __m512i a, const int rounding)",
        "__m512 _mm512_maskz_cvtepi32_pd(__mmask8 k, __m512i a)",
        "__m512 _mm512_maskz_cvt_roundepi32_pd(__mmask8 k, __m512i a, const int rounding)",
    ],
    exceptionsLegacy: {
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
