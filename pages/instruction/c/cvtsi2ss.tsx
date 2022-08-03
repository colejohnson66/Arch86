/* =============================================================================
 * File:   cvtsi2ss.tsx
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

const er = "{er}";

const PageData: InstructionPageLayoutProps = {
    id: "cvtsi2ss",
    title: <>Convert Doubleword and Quadword Integers to Scalar Single-Precision Floating Point Values</>,
    titlePlain: "Convert Doubleword and Quadword Integers to Scalar Single-Precision Floating Point Values",
    opcodes: [
        {
            opcode: <>F3 0F 2A /r</>,
            mnemonic: <>CVTSI2SS <i>xmm1</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Convert a doubleword integer from <i>r/m32</i> into a scalar single-precision floating-point value.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>F3 REX.W 0F 2A /r</>,
            mnemonic: <>CVTSI2SS <i>xmm1</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Convert a quadword integer from <i>r/m64</i> into a scalar single-precision floating-point value.
                    Store the result in <i>r64</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.W0 2A /r</>,
            mnemonic: <>VCVTSI2SS <i>xmm1</i>, <i>xmm2</i>, <i>r/m32</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a doubleword integer value from <i>r/m32</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.W1 2A /r</>,
            mnemonic: <>VCVTSI2SS <i>xmm1</i>, <i>xmm2</i>, <i>r/m64</i></>,
            encoding: "rvm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a quadword integer from <i>r/m64</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W0 2A /r</>,
            mnemonic: <>VCVTSI2SS <i>xmm1</i>, <i>xmm2</i>, <i>r/m32{er}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert a doubleword integer from <i>r/m32</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W1 2A /r</>,
            mnemonic: <>VCVTSI2SS <i>xmm1</i>, <i>xmm2</i>, <i>r/m64{er}</i></>,
            encoding: "ervm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert a quadword integer from <i>r/m64</i> into a scalar single-precision floating-point value.
                    Merge the upper bits of the result with those in <i>xmm2</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        rvm: ["n/a", "ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]"],
        ervm: ["tuple1-fixed", "ModRM.reg[w]", "EVEX.vvvvv[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTSI2SS</code> instruction converts either a doubleword or quadword integer into a single-precision floating-point value.
                The result is stored in the destination operand.
            </p>
            <p>
                The VEX and EVEX forms will copy bits <code>32..127</code> from the first source operand into the destination.
                {" "}{Canned.LegacySimdMultiple}
                {" "}{Canned.EvexNoFaultSuppression}
                {" "}{Canned.WIgnoredIn32("vex+evex")}
            </p>
        </>
    ),
    operation:
        `public void CVTSI2SS(SimdF32 dest, I32 src)
{
    dest[0] = ConvertToF32(src);
}
public void CVTSI2SS(SimdF32 dest, I64 src)
{
    dest[0] = ConvertToF32(src);
}

public void VCVTSI2SS_Vex(SimdF32 dest, SimdF32 src1, I32 src2)
{
    dest[0] = ConvertToF32(src2);
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}
public void VCVTSI2SS_Vex(SimdF32 dest, SimdF32 src1, I64 src2)
{
    dest[0] = ConvertToF32(src2);
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}

public void VCVTSI2SS_EvexMemory(SimdF32 dest, I32 src2) =>
    VCVTSI2SS_Vex(dest, src2);
public void VCVTSI2SS_EvexMemory(SimdF32 dest, I64 src2) =>
    VCVTSI2SS_Vex(dest, src2);

public void VCVTSI2SS_EvexRegister(SimdF32 dest, SimdF32 src1, I32 src2)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);
    dest[0] = ConvertToF32(src2);
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}
public void VCVTSI2SS_EvexRegister(SimdF32 dest, SimdF32 src1, I64 src2)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);
    dest[0] = ConvertToF32(src2);
    dest[1] = src1[1];
    dest[2] = src1[2];
    dest[3] = src1[3];
    dest[4..] = 0;
}`,
    intrinsics: [
        "__m128 _mm_cvti32_ss(__m128 s, int a)",
        "__m128 _mm_cvtsi32_ss(__m128 a, int b)",
        "__m128 _mm_cvt_roundi32_ss(__m128 s, int a, const int rounding)",
        "",
        "__m128 _mm_cvti64_ss(__m128 s, __int64 a)",
        "__m128 _mm_cvtsi64_ss(__m128 s, __int64 a)",
        "__m128 _mm_cvt_roundi64_ss(__m128 s, __int64 a, const int rounding)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdPrecision,
            ],
        },
        other: {
            vex: "3",
            evex: "e3nf",
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
