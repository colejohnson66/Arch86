/* =============================================================================
 * File:   andps.tsx
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

const k1z = "{k1}{z}";

const PageData: InstructionPageLayoutProps = {
    id: "andps",
    title: <>Logical AND Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Logical AND Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>NP 0F 54 /r</>,
            mnemonic: <>ANDPS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.NP.0F.WIG 54 /r</>,
            mnemonic: <>VANDPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.NP.0F.WIG 54 /r</>,
            mnemonic: <>VANDPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.NP.0F.W0 54 /r</>,
            mnemonic: <>VANDPS <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m128/m32bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "avx512-dq"],
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128/m32bcst</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.NP.0F.W0 54 /r</>,
            mnemonic: <>VANDPS <i>ymm1</i> {k1z}, <i>ymm2</i>, <i>ymm3/m256/m32bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "avx512-dq"],
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256/m32bcst</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.NP.0F.W0 54 /r</>,
            mnemonic: <>VANDPS <i>zmm1</i> {k1z}, <i>zmm2</i>, <i>zmm3/m512/m32bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-dq"],
            description:
                <>
                    Logical AND packed single-precision floating-point values from <i>zmm2</i> and <i>zmm3/m512/m32bcst</i>.
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
                The <code>(V)ANDPS</code> instruction ANDs four, eight, or 16 single-precision floating-point values from the two source operands.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void ANDPS(SimdU32 dest, SimdU32 src)
{
    dest[0] &= src[0];
    dest[1] &= src[1];
    dest[2] &= src[2];
    dest[3] &= src[3];
    // dest[4..] is unmodified
}

void VANDPS_Vex(SimdU32 dest, SimdU32 src1, SimdU32 src2, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = src1[n] & src2[n];
    dest[kl..] = 0;
}
public void VANDPS_Vex128(SimdU32 dest, SimdU32 src1, SimdU32 src2) =>
    VANDPS_Vex(dest, src1, src2, 4);
public void VANDPS_Vex256(SimdU32 dest, SimdU32 src1, SimdU32 src2) =>
    VANDPS_Vex(dest, src1, src2, 8);

void VANDPS_EvexMemory(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] & (EVEX.b ? src2[0] : src2[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VANDPS_Evex128Memory(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexMemory(dest, src1, src2, k, 4);
public void VANDPS_Evex256Memory(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexMemory(dest, src1, src2, k, 8);
public void VANDPS_Evex512Memory(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexMemory(dest, src1, src2, k, 16);

void VANDPS_EvexRegister(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k, int kl)
{
    if (kl == 16 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = src1[n] & src2[n];
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VANDPS_Evex128Register(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexRegister(dest, src1, src2, k, 4);
public void VANDPS_Evex256Register(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexRegister(dest, src1, src2, k, 8);
public void VANDPS_Evex512Register(SimdU32 dest, SimdU32 src1, SimdU32 src2, KMask k) =>
    VANDPS_EvexRegister(dest, src1, src2, k, 16);`,
    intrinsics: [
        "__m128d _mm_and_ps(__m128d a, __m128d b)",
        "__m128d _mm_mask_and_ps(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_and_ps(__mmask8 k, __m128d a, __m128d b)",
        "",
        "__m256d _mm256_and_ps(__m256d a, __m256d b)",
        "__m256d _mm256_mask_and_ps(__m256d s, __mmask8 k, __m256d a, __m256d b)",
        "__m256d _mm256_maskz_and_ps(__mmask8 k, __m256d a, __m256d b)",
        "",
        "__m512d _mm512_and_ps(__m512d a, __m512d b)",
        "__m512d _mm512_mask_and_ps(__m512d s, __mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_maskz_and_ps(__mmask8 k, __m512d a, __m512d b)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "4",
            evex: "e4",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
