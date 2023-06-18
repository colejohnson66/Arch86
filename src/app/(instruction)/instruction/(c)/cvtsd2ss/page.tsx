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
    id: "cvtsd2ss",
    title: <>Convert Scalar Double-Precision Floating-Point Values to Scalar Single-Precision Floating-Point Values</>,
    titlePlain: "Convert Scalar Double-Precision Floating-Point Values to Scalar Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>F2 0F 5A /r</>,
            mnemonic: <>CVTSD2SS <i>xmm1</i>, <i>xmm2/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm2/m64</i> into a scalar single-precision floating-point value.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F2.0F.WIG 5A /r</>,
            mnemonic: <>VCVTSD2SS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m64</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm3/m64</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F2.0F.W1 5A /r</>,
            mnemonic: <>VCVTSD2SS <i>xmm1</i> {k1z}, <i>xmm2</i>, <i>xmm3/m64{er}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm3/m64</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        rvm: ["n/a", "ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        ervm: ["tuple1-scalar", "ModRM.reg[w]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTSD2SS</code> instruction converts a scalar double-precision floating-point value from the source operand to a scalar single-precision floating-point value.
                The result is stored in the destination operand.
            </p>
            <p>
                The VEX and EVEX forms will copy bits <code>32..127</code> from the first source operand into the destination.
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void CVTSD2SS(SimdF32 dest, SimdF64 src)
{
    dest[0] = ConvertToF32(src[0]);
    // dest[1..] is unmodified
}

public void VCVTSD2SS_Vex(SimdF32 dest, SimdF32 src1, SimdF64 src2)
{
    dest[0] = ConvertToF32(src2[0]);
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}

public void VCVTSD2SS_EvexMemory(SimdF32 dest, SimdF32 src1, SimdF64 src2, KMask k)
{
    if (k[0])
        dest[0] = ConvertToF32(src2[0]);
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}

public void VCVTSD2SS_EvexRegister(SimdF32 dest, SimdF32 src1, SimdF64 src2, KMask k)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);

    if (k[0])
        dest[0] = ConvertToF32(src2[0]);
    else if (EVEX.z)
        dest[0] = 0;
    // otherwise unchanged
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}`,
    intrinsics: [
        "__m128 _mm_cvtsd_ss(__m128 a, __m128d b)",
        "__m128 _mm_cvt_roundsd_ss(__m128 a, __m128d b, const int rounding)",
        "__m128 _mm_mask_cvtsd_ss(__m128 s, __mmask8 k, __m128 a, __m128d b)",
        "__m128 _mm_mask_cvt_roundsd_ss(__m128 s, __mmask8 k, __m128 a, __m128d b, const int rounding)",
        "__m128 _mm_maskz_cvtsd_ss(__mmask8 k, __m128 a,__m128d b)",
        "__m128 _mm_maskz_cvt_roundsd_ss(__mmask8 k, __m128 a,__m128d b, const int rounding)",
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
