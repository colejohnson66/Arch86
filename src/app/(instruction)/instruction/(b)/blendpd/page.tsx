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
import NoWrap from "@/components/NoWrap";

const PageData: InstructionPageLayoutProps = {
    id: "blendpd",
    title: <>Blend Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Blend Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 3A 0D /r <i>ib</i></>,
            mnemonic: <>BLENDPD <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.1",
            description:
                <>
                    Select packed double-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i> using a mask specified in <i>imm8</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.WIG 0D /r <i>ib</i></>,
            mnemonic: <>VBLENDPD <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i>, <i>imm8</i></>,
            encoding: "rvmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Select packed double-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i> using a mask specified in <i>imm8</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F3A.WIG 0D /r <i>ib</i></>,
            mnemonic: <>VBLENDPD <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i>, <i>imm8</i></>,
            encoding: "rvmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Select packed double-precision floating-point values from <i>ymm2</i> and <i>ymm3/m128</i> using a mask specified in <i>imm8</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
    ],
    encodings: {
        rmi: ["ModRM.reg[rw]", "ModRM.r/m[r]", "imm8", ""],
        rvmi: ["ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]", "imm8"],
    },
    description: (
        <>
            <p>
                The <code>(V)BLENDPD</code> instruction conditionally moves double-precision floating-point values from the two source operands.
                From the control byte, each bit, if cleared, will move from the first source operand, and, if set, will move from the second source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                This instruction, despite being named as if it operates on floating-point numbers, will work on <NoWrap>64-bit</NoWrap> integers as well.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void BLENDPD(SimdF64 dest, SimdF64 src, U8 mask)
{
    // if \`mask.Bit[n]\` is 0, \`dest\` will be copied into itself (i.e. nothing happens)
    if (mask.Bit[0])
        dest[0] = src[0];
    if (mask.Bit[1])
        dest[1] = src[1];
    // dest[2..] is unmodified
}

void VBLENDPD_Vex(SimdF64 dest, SimdF64 src1, SimdF64 src2, U8 mask, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = mask.Bit[n] ? src2[n] : src1[n];
    dest[kl..] = 0;
}
public void VBLENDPD_Vex128(SimdF64 dest, SimdF64 src1, SimdF64 src2, U8 mask) =>
    VBLENDPD_Vex(dest, src1, src2, mask, 2);
public void VBLENDPD_Vex256(SimdF64 dest, SimdF64 src1, SimdF64 src2, U8 mask) =>
    VBLENDPD_Vex(dest, src1, src2, mask, 4);`,
    intrinsics: [
        "__m128d _mm_blend_pd(__m128d v1, __m128d v2, const uint32_t mask)",
        "",
        "__m256d _mm256_blend_pd(__m256d a, __m256d b, const uint32_t mask)",
    ],
    exceptionsLegacy: {
        simd: "none",
        other: {
            vex: "4",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
