/* =============================================================================
 * File:   aesenc.tsx
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
import Instruction from "@components/Instruction";

const PageData: InstructionPageLayoutProps = {
    id: "aesenc",
    title: <>Perform One Round of AES Encryption</>,
    titlePlain: "Perform One Round of AES Encryption",
    opcodes: [
        {
            opcode: <>66 0F 38 DC /r</>,
            mnemonic: <>AESENC <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "aes",
            description:
                <>
                    Perform one round of AES encryption using one 128 bit state from <i>xmm1</i> with one 128 bit round key from <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F38.WIG DC /r</>,
            mnemonic: <>VAESENC <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx", "aes"],
            description:
                <>
                    Perform one round of AES encryption using one 128 bit state from <i>xmm2</i> with one 128 bit round key from <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F38.WIG DC /r</>,
            mnemonic: <>VAESENC <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx", "vaes"],
            description:
                <>
                    Perform one round of AES encryption using two 128 bit states from <i>ymm2</i> with two 128 bit round keys from <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F38.WIG DC /r</>,
            mnemonic: <>VAESENC <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "vaes"],
            description:
                <>
                    Perform one round of AES encryption using one 128 bit state from <i>xmm2</i> with one 128 bit round key from <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.256.66.0F38.WIG DC /r</>,
            mnemonic: <>VAESENC <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "avx512-vl", "vaes"],
            description:
                <>
                    Perform one round of AES encryption using two 128 bit states from <i>ymm2</i> with two 128 bit round keys from <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F38.WIG DC /r</>,
            mnemonic: <>VAESENC <i>zmm1</i>, <i>zmm2</i>, <i>zmm3/m512</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx512-f", "vaes"],
            description:
                <>
                    Perform one round of AES encryption using four 128 bit states from <i>zmm2</i> with four 128 bit round keys from <i>zmm4/m512</i>.
                    Store the result in <i>zmm1</i>.
                </>,
        },
    ],
    encodings: {
        legacy: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        vex: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        evex: ["full-mem", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)AESENC</code> instruction performs a single round of AES encryption using one, two, or four 128 bit states from the first source operand using 128 bit round keys from the second source operand.
                The result is stored in in the destination operand.
            </p>
            <p>
                Due to the nature of AES, this instruction must be used for <em>all but the last</em> encryption round.
                For that last round, use the <Instruction name="aesenclast" /> instruction.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void AESENC(SimdU128 dest, SimdU128 src)
{
    U128 state = dest[0];
    state = AesShiftRows(state);
    state = AesSubBytes(state);
    state = AesMixColumns(state);
    dest[0] = state ^ src[0];
    // dest[1..] is unmodified
}

void VAESENC(SimdU128 dest, SimdU128 src1, SimdU128 src2, int kl)
{
    for (int n = 0; n < kl, n++)
    {
        U128 state = src1[n];
        state = AesShiftRows(state);
        state = AesSubBytes(state);
        state = AesMixColumns(state);
        dest[n] = state ^ src2[n];
    }
    dest[kl..] = 0;
}

public void VAESENC_Vex128(SimdU128 dest, SimdU128 src1, SimdU128 src2) =>
    VAESENC(dest, src1, src2, 1);
public void VAESENC_Vex256(SimdU128 dest, SimdU128 src1, SimdU128 src2) =>
    VAESENC(dest, src1, src2, 2);

public void VAESENC_Evex128(SimdU128 dest, SimdU128 src1, SimdU128 src2) =>
    VAESENC(dest, src1, src2, 1);
public void VAESENC_Evex256(SimdU128 dest, SimdU128 src1, SimdU128 src2) =>
    VAESENC(dest, src1, src2, 2);
public void VAESENC_Evex512(SimdU128 dest, SimdU128 src1, SimdU128 src2) =>
    VAESENC(dest, src1, src2, 4);`,
    intrinsics: [
        "__m128i _mm_aesenc(__m128i state, __m128i key)",
        "",
        "__m256i _mm256_aesenc_epi128(__m256i state, __m256i key)",
        "",
        "__m512i _mm512_aesenc_epi128(__m512i state, __m512i key)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "4",
            evex: "e4nf",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
