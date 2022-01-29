/* =============================================================================
 * File:   addss.tsx
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
    id: "addss",
    title: <>Add Scalar Single-Precision Floating-Point Values</>,
    titlePlain: "Add Scalar Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F3 0F 58 /r</>,
            mnemonic: <>ADDSS <i>xmm1</i>, <i>xmm2/m64</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Add the lowest single-precision floating-point value from <i>xmm1</i> and <i>xmm2/m64</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.WIG 58 /r</>,
            mnemonic: <>VADDSS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m64</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Add the lowest single-precision floating-point value from <i>xmm2</i> and <i>xmm3/m64</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W0 58 /r</>,
            mnemonic: <>VADDSS {k1z} <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m64{er}</i></>,
            encoding: "evex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Add the lowest single-precision floating-point value from <i>xmm2</i> and <i>xmm3/m64</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        legacy: ["n/a", "ModRM.reg[rw]", "ModRM.r/m[r]", ""],
        vex: ["n/a", "ModRM.reg[rw]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        evex: ["tuple1-scalar", "ModRM.reg[rw]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)ADDSS</code> instruction adds a single single-precision floating-point value from the two source operands.
                The result is stored in the destination operand.
            </p>
            <p>
                The VEX and EVEX forms will copy bits <code>32..127</code> from the first source operand into the destination.
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void ADDSS(SimdF32 dest, SimdF32 src)
{
    dest[0] += src[0];
    // dest[1..] is unmodified
}

public void VADDSS_Vex(SimdF32 dest, SimdF32 src1, SimdF32 src2)
{
    dest[0] = src1[0] + src[2];
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[2..] = 0;
}

public void VADDSS_EvexMemory(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k)
{
    if (k[0])
        dest[0] = src1[0] + src2[0];
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[2..] = 0;
}

public void VADDSS_EvexRegister(SimdF32 dest, SimdF32 src1, SimdF32 src2, KMask k)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    if (k[0])
        dest[0] = src1[0] + src2[0];
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[2..] = 0;
}`,
    intrinsics: [
        "__m128d _mm_add_ss(__m128d a, __m128d b)",
        "__m128d _mm_add_round_ss(__m128d a, __m128d b, const int rounding)",
        "__m128d _mm_mask_add_ss(__m128d s, __mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_mask_add_round_ss(__m128d s, __mmask8 k, __m128d a, __m128d b, const int rounding)",
        "__m128d _mm_maskz_add_ss(__mmask8 k, __m128d a, __m128d b)",
        "__m128d _mm_maskz_add_round_ss(__mmask8 k, __m128d a, __m128d b, const int rounding)",
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
            vex: "3",
            evex: "e3",
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
