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
    id: "cvtpd2ps",
    title: <>Convert Packed Double-Precision Floating-Point Values to Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Convert Packed Double-Precision Floating-Point Values to Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 5A /r</>,
            mnemonic: <>CVTPD2PS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F.WIG 5A /r</>,
            mnemonic: <>VCVTPD2PS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F.WIG 5A /r</>,
            mnemonic: <>VCVTPD2PS <i>ymm1</i>, <i>ymm2/m256</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>ymm2/m256</i> into packed single-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F.W1 5A /r</>,
            mnemonic: <>VCVTPD2PS <i>xmm1</i> {k1z}, <i>xmm2/m128/m64bcst</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm2/m128/m64bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.66.0F.W1 5A /r</>,
            mnemonic: <>VCVTPD2PS <i>ymm1</i> {k1z}, <i>ymm2/m256/m64bcst</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed double-precision floating-point values from <i>ymm2/m256/m64bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.66.0F.W1 5A /r</>,
            mnemonic: <>VCVTPD2PS <i>zmm1</i> {k1z}, <i>zmm2/m512/m64bcst{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert packed double-precision floating-point values from <i>zmm2/m512/m64bcst</i> into packed single-precision floating-point values.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        erm: ["full", "ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTPD2PS</code> instruction converts two, four, or eight double-precision floating-point values from the source operand into single-precision floating-point values.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTPD2PS(SimdF32 dest, SimdF64 src)
{
    dest[0] = ConvertToF32(src[0]);
    dest[1] = ConvertToF32(src[1]);
    // dest[2..] is unmodified
}

void VCVTPD2PS_Vex(SimdF32 dest, SimdF64 src, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ConvertToF32(src[n]);
    dest[kl..] = 0;
}
public void VCVTPD2PS_Vex128(SimdF32 dest, SimdF64 src) =>
    VCVTPD2PS_Vex(dest, src, 2);
public void VCVTPD2PS_Vex256(SimdF32 dest, SimdF64 src) =>
    VCVTPD2PS_Vex(dest, src, 4);

void VCVTPD2PS_EvexMemory(SimdF32 dest, SimdF64 src, KMask k, int kl)
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
public void VCVTPD2PS_Evex128Memory(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemory(dest, src, k, 2);
public void VCVTPD2PS_Evex256Memory(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemory(dest, src, k, 4);
public void VCVTPD2PS_Evex512Memory(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemory(dest, src, k, 8);

void VCVTPD2PS_EvexRegister(SimdF32 dest, SimdF64 src, KMask k, int kl)
{
    if (kl == 8 && EVEX.b)
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
public void VCVTPD2PS_Evex128Register(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemoryRegister(dest, src, k, 2);
public void VCVTPD2PS_Evex256Register(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemoryRegister(dest, src, k, 4);
public void VCVTPD2PS_Evex512Register(SimdF32 dest, SimdF64 src, KMask k) =>
    VCVTPD2PS_EvexMemoryRegister(dest, src, k, 8);`,
    intrinsics: [
        "__m128i _mm_cvtpd_ps(__m128d src)",
        "__m128i _mm_mask_cvtpd_ps(__m128i s, __mmask8 k, __m128d a)",
        "__m128i _mm_maskz_cvtpd_ps(__mmask8 k, __m128d a)",
        "",
        "__m128i _mm256_cvtpd_ps(__m256d src)",
        "__m128i _mm256_mask_cvtpd_ps(__m128i s, __mmask8 k, __m256d a)",
        "__m128i _mm256_maskz_cvtpd_ps(__mmask8 k, __m256d a)",
        "",
        "__m256i _mm512_cvtpd_ps(__m512d a)",
        "__m256i _mm512_cvt_roundpd_ps(__m512d a, const int rounding)",
        "__m256i _mm512_mask_cvtpd_ps(__m256i s, __mmask8 k, __m512d a)",
        "__m256i _mm512_mask_cvt_roundpd_ps(__m256i s, __mmask8 k, __m512d a, const int rounding)",
        "__m256i _mm512_maskz_cvtpd_ps(__mmask8 k, __m512d a)",
        "__m256i _mm512_maskz_cvt_roundpd_ps(__mmask8 k, __m512d a, const int rounding)",
    ],
    exceptionsLegacy: {
        simd: {
            XM: [
                Exceptions.SimdDenormal,
                Exceptions.SimdInvalid,
                Exceptions.SimdOverflow,
                Exceptions.SimdPrecision,
                Exceptions.SimdUnderflow,
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
