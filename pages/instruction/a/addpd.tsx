/* =============================================================================
 * File:   addpd.tsx
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
    id: "addpd",
    title: <>Add Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Add Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 58 /r</>,
            mnemonic: <>ADDPD <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Add packed double-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F.WIG 58 /r</>,
            mnemonic: <>VADDPD <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Add packed double-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F.WIG 58 /r</>,
            mnemonic: <>VADDPD <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Add packed double-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F.W1 58 /r</>,
            mnemonic: <>VADDPD <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m128/bcst64</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Add packed double-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128/bcst64</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.66.0F.W1 58 /r</>,
            mnemonic: <>VADDPD <i>ymm1</i> {k1z}, <i>ymm2</i>, <i>ymm3/m256/bcst64</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl"],
            description:
                <>
                    Add packed double-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256/bcst64</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.66.0F.W1 58 /r</>,
            mnemonic: <>VADDPD <i>zmm1</i> {k1z}, <i>zmm2</i>, <i>zmm3/m512/bcst64{er}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f"],
            description:
                <>
                    Add packed double-precision floating-point values from <i>zmm2</i> and <i>zmm3/m512/bcst64</i>.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        rvm: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        ervm: ["full", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)ADDPD</code> instruction adds two, four, or eight double-precision floating-point values from the two source operands.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void ADDPD(SimdF64 dest, SimdF64 src)
{
    dest[0] += src[0];
    dest[1] += src[1];
    // dest[2..] is unmodified
}

void VADDPD_Vex(SimdF64 dest, SimdF64 src1, SimdF64 src2, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = src1[n] + src2[n];
    dest[kl..] = 0;
}
public void VADDPD_Vex128(SimdF64 dest, SimdF64 src1, SimdF64 src2) =>
    VADDPD_Vex(dest, src1, src2, 2);
public void VADDPD_Vex256(SimdF64 dest, SimdF64 src1, SimdF64 src2) =>
    VADDPD_Vex(dest, src1, src2, 4);

void VADDPD_EvexMemory(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] + (EVEX.b ? src2[0] : src2[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VADDPD_Evex128Memory(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexMemory(dest, src1, src2, k, 2);
public void VADDPD_Evex256Memory(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexMemory(dest, src1, src2, k, 4);
public void VADDPD_Evex512Memory(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexMemory(dest, src1, src2, k, 8);

void VADDPD_EvexRegister(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k, int kl)
{
    if (kl == 8 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] + src2[n];
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VADDPD_Evex128Register(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexRegister(dest, src1, src2, k, 2);
public void VADDPD_Evex256Register(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexRegister(dest, src1, src2, k, 4);
public void VADDPD_Evex512Register(SimdF64 dest, SimdF64 src1, SimdF64 src2, KMask k) =>
    VADDPD_EvexRegister(dest, src1, src2, k, 8);`,
    intrinsics: [
        "__m128d _mm_add_pd(__m128d a, __m128d b)",
        "__m128d _mm_mask_add_pd(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_add_pd(__mmask8 k, __m128d a, __m128d b)",
        "",
        "__m256d _mm256_add_pd(__m256d a, __m256d b)",
        "__m256d _mm256_mask_add_pd(__m256d s, __mmask8 k, __m256d a, __m256d b)",
        "__m256d _mm256_maskz_add_pd(__mmask8 k, __m256d a, __m256d b)",
        "",
        "__m512d _mm512_add_pd(__m512d a, __m512d b)",
        "__m512d _mm512_add_round_pd(__m512d a, __m512d b, const int rounding)",
        "__m512d _mm512_mask_add_pd(__m512d s, __mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_mask_add_round_pd(__m512d s, __mmask8 k, __m512d a, __m512d b, const int rounding)",
        "__m512d _mm512_maskz_add_pd(__mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_maskz_add_round_pd(__mmask8 k, __m512d a, __m512d b, const int rounding)",
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
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
