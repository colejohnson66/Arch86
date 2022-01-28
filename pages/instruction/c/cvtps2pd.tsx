/* =============================================================================
 * File:   cvtps2pd.tsx
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
const sae = "{sae}";

const PageData: InstructionPageLayoutProps = {
    id: "cvtps2pd",
    title: <>Convert Packed Single-Precision Floating-Point Values to Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Convert Packed Single-Precision Floating-Point Values to Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>NP 0F 5A /r</>,
            mnemonic: <>CVTPS2PD <i>xmm1</i>, <i>xmm2/m64</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm2/m64</i> into packed double-precision floating point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.NP.0F.WIG 5A /r</>,
            mnemonic: <>VCVTPS2PD <i>xmm1</i>, <i>xmm2/m64</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm2/m64</i> into packed double-precision floating point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.NP.0F.WIG 5A /r</>,
            mnemonic: <>VCVTPS2PD <i>ymm1</i>, <i>xmm2/m128</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm2/m128</i> into packed double-precision floating point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.NP.0F.W0 5A /r</>,
            mnemonic: <>VCVTPS2PD {k1z} <i>xmm1</i>, <i>xmm2/m64/m32bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm2/m64/m32bcst</i> into packed double-precision floating point values.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.NP.0F.W0 5A /r</>,
            mnemonic: <>VCVTPS2PD {k1z} <i>ymm1</i>, <i>xmm2/m128/m32bcst</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm2/m128/m32bcst</i> into packed double-precision floating point values.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.NP.0F.W0 5A /r</>,
            mnemonic: <>VCVTPS2PD {k1z} <i>zmm1</i>, <i>ymm2/m256/m32bcst{sae}</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert packed single-precision floating-point values from <i>ymm2/m256/m32bcst</i> into packed double-precision floating point values.
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
                The <code>(V)CVTPS2PD</code> instruction converts two, four, or eight single-precision floating-point values from the source operand into double-precision floating point values.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTPS2PD(SimdF64 dest, SimdF32 src)
{
    dest[0] = ConvertToF64(src[0]);
    dest[1] = ConvertToF64(src[1]);
    // dest[4..] is unmodified
}

void VCVTPS2PD_Vex(SimdF64 dest, SimdF32 src, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ConvertToF64(src[n]);
    dest[kl..] = 0;
}
public void VCVTPS2PD_Vex128(SimdF64 dest, SimdF32 src) =>
    VCVTPS2PD_Vex(dest, src, 4);
public void VCVTPS2PD_Vex256(SimdF64 dest, SimdF32 src) =>
    VCVTPS2PD_Vex(dest, src, 8);

void VCVTPS2PD_EvexMemory(SimdF64 dest, SimdF32 src, KMask k, int kl)
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
public void VCVTPS2PD_Evex128(SimdF64 dest, SimdF32 src, KMask k) =>
    VCVTPS2PD_EvexMemory(dest, src, k, 4);
public void VCVTPS2PD_Evex256(SimdF64 dest, SimdF32 src, KMask k) =>
    VCVTPS2PD_EvexMemory(dest, src, k, 8);
public void VCVTPS2PD_Evex512(SimdF64 dest, SimdF32 src, KMask k) =>
    VCVTPS2PD_EvexMemory(dest, src, k, 16);

void VCVTPS2PD_EvexRegister(SimdF64 dest, SimdF32 src, KMask k, int kl)
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
}`,
    intrinsics: [
        "__m128i _mm_cvtps_pd(__m128d src)",
        "__m128i _mm_mask_cvtps_pd(__m128i s, __mmask8 k, __m128d a)",
        "__m128i _mm_maskz_cvtps_pd(__mmask8 k, __m128d a)",
        "",
        "__m128i _mm256_cvtps_pd(__m256d src)",
        "__m128i _mm256_mask_cvtps_pd(__m128i s, __mmask8 k, __m256d a)",
        "__m128i _mm256_maskz_cvtps_pd(__mmask8 k, __m256d a)",
        "",
        "__m256i _mm512_cvtps_pd(__m512d a)",
        "__m256i _mm512_cvt_roundps_pd(__m512d a, const int rounding)",
        "__m256i _mm512_mask_cvtps_pd(__m256i s, __mmask8 k, __m512d a)",
        "__m256i _mm512_mask_cvt_roundps_pd(__m256i s, __mmask8 k, __m512d a, const int rounding)",
        "__m256i _mm512_maskz_cvtps_pd(__mmask8 k, __m512d a)",
        "__m256i _mm512_maskz_cvt_roundps_pd(__mmask8 k, __m512d a, const int rounding)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdInvalid,
                Exceptions.SimdPrecision,
            ],
        },
        other: {
            vex: "3",
            evex: "e3",
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
