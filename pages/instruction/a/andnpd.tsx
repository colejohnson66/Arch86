/* =============================================================================
 * File:   andnpd.tsx
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
    id: "andnpd",
    title: <>Logical AND NOT Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Logical AND NOT Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 55 /r</>,
            mnemonic: <>ANDNPD <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>xmm1</i> (inverted) and <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F.WIG 55 /r</>,
            mnemonic: <>VANDNPD <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>xmm2</i> (inverted) and <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F.WIG 55 /r</>,
            mnemonic: <>VANDNPD <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>ymm2</i> (inverted) and <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F.W1 55 /r</>,
            mnemonic: <>VANDNPD <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m128/m64bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "avx512-dq"],
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>xmm2</i> (inverted) and <i>xmm3/m128/m64bcst</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.66.0F.W1 55 /r</>,
            mnemonic: <>VANDNPD <i>ymm1</i> {k1z}, <i>ymm2</i>, <i>ymm3/m256/m64bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "avx512-dq"],
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>ymm2</i> (inverted) and <i>ymm3/m256/m64bcst</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.512.66.0F.W1 55 /r</>,
            mnemonic: <>VANDNPD <i>zmm1</i> {k1z}, <i>zmm2</i>, <i>zmm3/m512/m64bcst</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-dq"],
            description:
                <>
                    Logical AND packed double-precision floating-point values from <i>zmm2</i> (inverted) and <i>zmm3/m512/m64bcst</i>.
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
                The <code>(V)ANDNPD</code> instruction ANDs two, four, or eight double-precision floating-point values from the two source operands.
                The first source operand is inverted before being ANDed with the other source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void ANDNPD(SimdU64 dest, SimdU64 src)
{
    dest[0] = ~dest[0] & src[0];
    dest[1] = ~dest[1] & src[1];
    // dest[2..] is unmodified
}

void VANDNPD_Vex(SimdU64 dest, SimdU64 src1, SimdU64 src2, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = ~src1[n] & src2[n];
    dest[kl..] = 0;
}
public void VANDNPD_Vex128(SimdU64 dest, SimdU64 src1, SimdU64 src2) =>
    VANDNPD_Vex(dest, src1, src2, 2);
public void VANDNPD_Vex256(SimdU64 dest, SimdU64 src1, SimdU64 src2) =>
    VANDNPD_Vex(dest, src1, src2, 4);

void VANDNPD_EvexMemory(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k, int kl)
{
    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ~src1[n] & (EVEX.b ? src2[0] : src2[n]);
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VANDNPD_Evex128Memory(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexMemory(dest, src1, src2, k, 2);
public void VANDNPD_Evex256Memory(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexMemory(dest, src1, src2, k, 4);
public void VANDNPD_Evex512Memory(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexMemory(dest, src1, src2, k, 8);

void VANDNPD_EvexRegister(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k, int kl)
{
    if (kl == 8 && EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    for (int n = 0; n < kl; n++)
    {
        if (k[n])
            dest[n] = ~src1[n] & src2[n];
        else if (EVEX.z)
            dest[n] = 0;
        // otherwise unchanged
    }
    dest[kl..] = 0;
}
public void VANDNPD_Evex128Register(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexRegister(dest, src1, src2, k, 2);
public void VANDNPD_Evex256Register(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexRegister(dest, src1, src2, k, 4);
public void VANDNPD_Evex512Register(SimdU64 dest, SimdU64 src1, SimdU64 src2, KMask k) =>
    VANDNPD_EvexRegister(dest, src1, src2, k, 8);`,
    intrinsics: [
        "__m128d _mm_andnot_pd(__m128d a, __m128d b)",
        "__m128d _mm_mask_andnot_pd(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_andnot_pd(__mmask8 k, __m128d a, __m128d b)",
        "",
        "__m256d _mm256_andnot_pd(__m256d a, __m256d b)",
        "__m256d _mm256_mask_andnot_pd(__m256d s, __mmask8 k, __m256d a, __m256d b)",
        "__m256d _mm256_maskz_andnot_pd(__mmask8 k, __m256d a, __m256d b)",
        "",
        "__m512d _mm512_andnot_pd(__m512d a, __m512d b)",
        "__m512d _mm512_mask_andnot_pd(__m512d s, __mmask8 k, __m512d a, __m512d b)",
        "__m512d _mm512_maskz_andnot_pd(__mmask8 k, __m512d a, __m512d b)",
    ],
    exceptionsLegacy: {
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
