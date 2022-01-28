/* =============================================================================
 * File:   cvtpd2dq.tsx
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
    id: "cvtpd2dq",
    title: <>Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers</>,
    titlePlain: "Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers",
    opcodes: [
        {
            opcode: <>F2 0F E6 /r</>,
            mnemonic: <>CVTPD2DQ <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128</i> into packed doubleword integers.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.F2.0F.WIG E6 /r</>,
            mnemonic: <>VCVTPD2DQ <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128</i> into packed doubleword integers.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.F2.0F.WIG E6 /r</>,
            mnemonic: <>VCVTPD2DQ <i>ymm1</i>, <i>ymm2/m256</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>ymm2/m256</i> into packed doubleword integers.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.F2.0F.W1 E6 /r</>,
            mnemonic: <>VCVTPD2DQ {k1z} <i>xmm1</i>, <i>xmm2/m128/m64bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128/m64bcst</i> into packed doubleword integers.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.F2.0F.W1 E6 /r</>,
            mnemonic: <>VCVTPD2DQ {k1z} <i>ymm1</i>, <i>ymm2/m256/m64bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed double-precision floating-point values from <i>ymm2/m256/m64bcst</i> into packed doubleword integers.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.F2.0F.W1 E6 /r</>,
            mnemonic: <>VCVTPD2DQ {k1z} <i>zmm1</i>, <i>zmm2/m512/m64bcst{er}</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>zmm2/m512/m64bcst</i> into packed doubleword integers.
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
                The <code>(V)CVTPD2DQ</code> instruction converts two, four, or eight double-precision floating-point values from the source operand into doubleword integers.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTPD2DQ(SimdI32 dest, SimdF64 src)
{
    dest[0] = ConvertToI32(src[0]);
    dest[1] = ConvertToI32(src[1]);
    // dest[2..] is unmodified
}

void VCVTPD2DQ_Vex(SimdI32 dest, SimdF64 src, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ConvertToI32(src[n]);
    dest[kl..] = 0;
}
public void VCVTPD2DQ_Vex128(SimdI32 dest, SimdF64 src) =>
    VCVTPD2DQ_Vex(dest, src, 2);
public void VCVTPD2DQ_Vex256(SimdI32 dest, SimdF64 src) =>
    VCVTPD2DQ_Vex(dest, src, 4);

void VCVTPD2DQ_EvexMemory(SimdI32 dest, SimdF64 src, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToI32(EVEX.b ? src[0] : src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VCVTPD2DQ_Evex128(SimdI32 dest, SimdF64 src, KMask k) =>
    VCVTPD2DQ_EvexMemory(dest, src, k, 2);
public void VCVTPD2DQ_Evex256(SimdI32 dest, SimdF64 src, KMask k) =>
    VCVTPD2DQ_EvexMemory(dest, src, k, 4);
public void VCVTPD2DQ_Evex512(SimdI32 dest, SimdF64 src, KMask k) =>
    VCVTPD2DQ_EvexMemory(dest, src, k, 8);

void VCVTPD2DQ_EvexRegister(SimdI32 dest, SimdF64 src, KMask k, int kl)
{
    if (kl == 8 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ConvertToI32(src[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}`,
    intrinsics: [
        "__m128i _mm_cvtpd_epi32(__m128d src)",
        "__m128i _mm_mask_cvtpd_epi32(__m128i s, __mmask8 k, __m128d a)",
        "__m128i _mm_maskz_cvtpd_epi32(__mmask8 k, __m128d a)",
        "",
        "__m128i _mm256_cvtpd_epi32(__m256d src)",
        "__m128i _mm256_mask_cvtpd_epi32(__m128i s, __mmask8 k, __m256d a)",
        "__m128i _mm256_maskz_cvtpd_epi32(__mmask8 k, __m256d a)",
        "",
        "__m256i _mm512_cvtpd_epi32(__m512d a)",
        "__m256i _mm512_cvt_roundpd_epi32(__m512d a, const int rounding)",
        "__m256i _mm512_mask_cvtpd_epi32(__m256i s, __mmask8 k, __m512d a)",
        "__m256i _mm512_mask_cvt_roundpd_epi32(__m256i s, __mmask8 k, __m512d a, const int rounding)",
        "__m256i _mm512_maskz_cvtpd_epi32(__mmask8 k, __m512d a)",
        "__m256i _mm512_maskz_cvt_roundpd_epi32(__mmask8 k, __m512d a, const int rounding)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdInvalid,
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
