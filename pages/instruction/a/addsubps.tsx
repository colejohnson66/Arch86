/* =============================================================================
 * File:   addsubps.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "addsubps",
    title: <>Add/Subtract Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Add/Subtract Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F2 0F D0 /r</>,
            mnemonic: <>ADDSUBPS <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse3",
            description:
                <>
                    Add/subtract packed single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.F2.0F.WIG D0 /r</>,
            mnemonic: <>VADDSUBPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Add/subtract packed single-precision floating-point values from <i>xmm2</i> and <i>xmm3/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.F2.0F.WIG D0 /r</>,
            mnemonic: <>VADDSUBPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Add/subtract packed single-precision floating-point values from <i>ymm2</i> and <i>ymm3/m256</i>.
                    Store the result in <i>ymm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        rvm: ["ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)ADDSUBPS</code> instruction adds/subtracts single-precision floating-point value from the two source operands.
                The result is stored in the destination operand.
            </p>
            <p>
                This instruction&apos;s &quot;add/subtract&quot; operation subtracts even offset and adds odd offset fields in the SIMD register.
            </p>
            <p>
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void ADDSUBPS(SimdF32 dest, SimdF32 src)
{
    dest[0] -= src[0];
    dest[1] += src[1];
    dest[2] -= src[2];
    dest[3] += src[3];
    // dest[4..] is unmodified
}

public void VADDSUBPS_Vex128(SimdF32 dest, SimdF32 src1, SimdF32 src2)
{
    dest[0] -= src[0];
    dest[1] += src[1];
    dest[2] -= src[2];
    dest[3] += src[3];
    dest[4..] = 0;
}

public void VADDSUBPS_Vex256(SimdF32 dest, SimdF32 src1, SimdF32 src2)
{
    dest[0] -= src[0];
    dest[1] += src[1];
    dest[2] -= src[2];
    dest[3] += src[3];
    dest[4] -= src[4];
    dest[5] += src[5];
    dest[6] -= src[6];
    dest[7] += src[7];
    dest[8..] = 0;
}`,
    intrinsics: [
        "__m128d _mm_addsub_pd(__m128d a, __m128d b)",
        "",
        "__m256d _mm256_addsub_pd(__m256d a, __m256d b)",
    ],
    exceptions: {
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
            GP0: Exceptions.NonAlignedMemory(16),
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
