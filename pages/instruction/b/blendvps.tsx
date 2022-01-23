/* =============================================================================
 * File:   blendvps.tsx
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
import Register from "@components/Register";
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "blendvps",
    title: <>Variable Blend Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Variable Blend Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 38 14 /r <i>ib</i></>,
            mnemonic: <>BLENDVPS <i>xmm1</i>, <i>xmm2/m128</i>, XMM0</>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.1",
            description:
                <>
                    Select packed single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i> using a mask specified in <Register name="XMM0" />.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.W0 4A /r <i>/is4</i></>,
            mnemonic: <>VBLENDVPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i>, <i>xmm4</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Select packed single-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i> using a mask specified in <i>xmm4</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F3A.W0 4A /r <i>/is4</i></>,
            mnemonic: <>VBLENDVPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i>, <i>ymm4</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Select packed single-precision floating-point values from <i>ymm2</i> and <i>ymm3/m128</i> using a mask specified in <i>ymm4</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
    ],
    encodings: {
        operands: 4,
        encodings: {
            legacy: ["ModRM.reg[rw]", "ModRM.r/m[r]", "imm8(4..7)", ""],
            vex: ["ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]", "imm8(4..7)"],
        },
    },
    description: (
        <>
            <p>
                The <code>(V)BLENDVPS</code> instruction conditionally moves single-precision floating-point values from the two source operands.
                From the control operand, each bit, if cleared, will move from the first source operand, and, if set, will move from the second source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                This instruction, despite being named as if it operates on floating-point numbers, will work on <Unit value={64} unit="bit" /> integers as well.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void BLENDVPS(SimdF32 dest, SimdF32 src)
{
    // if \`XMM0.Bit[n]\` is 0, \`dest\` will be copied into itself (i.e. nothing happens)
    if (XMM0.Bit[0])
        dest[0] = src[0];
    if (XMM0.Bit[1])
        dest[1] = src[1];
    if (XMM0.Bit[2])
        dest[2] = src[2];
    if (XMM0.Bit[3])
        dest[3] = src[3];
    // dest[4..] is unmodified
}

void VBLENDVPS_Vex(SimdF32 dest, SimdF32 src1, SimdF32 src2, SimdF32 mask, int kl)
{
    for (int n = 0; n < kl; n++)
        dest[n] = mask.Bit[n] ? src2[n] : src1[n];
    dest[kl..] = 0;
}
public void VBLENDVPS_Vex128(SimdF32 dest, SimdF32 src1, SimdF32 src2, SimdF32 mask) =>
    VBLENDVPS_Vex(dest, src1, src2, mask, 4);
public void VBLENDVPS_Vex256(SimdF32 dest, SimdF32 src1, SimdF32 src2, SimdF32 mask) =>
    VBLENDVPS_Vex(dest, src1, src2, mask, 8);`,
    intrinsics: [
        "__m128 _mm_blendv_ps(__m128d a, __m128d b, __m128d mask)",
        "",
        "__m256 _mm256_blendv_ps(__m256d a, __m256d b, __m256d mask)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "4",
            UD: Exceptions.VexNotW0,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
