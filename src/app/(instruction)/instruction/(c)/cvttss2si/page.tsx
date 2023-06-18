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

const er = "{er}";

const PageData: InstructionPageLayoutProps = {
    id: "cvttss2si",
    title: <>Convert with Truncation Scalar Single-Precision Floating Point Values to Doubleword and Quadword Integers</>,
    titlePlain: "Convert with Truncation Scalar Single-Precision Floating Point Values to Doubleword and Quadword Integers",
    opcodes: [
        {
            opcode: <>F3 0F 2C /r</>,
            mnemonic: <>CVTTSS2SI <i>r32</i>, <i>xmm1/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>F3 REX.W 0F 2C /r</>,
            mnemonic: <>CVTTSS2SI <i>r64</i>, <i>xmm1/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a quadword integer.
                    Store the result in <i>r64</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.W0 2C /r</>,
            mnemonic: <>VCVTTSS2SI <i>r32</i>, <i>xmm1/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F3.0F.W1 2C /r</>,
            mnemonic: <>VCVTTSS2SI <i>r64</i>, <i>xmm1/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a quadword integer.
                    Store the result in <i>r64</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W0 2C /r</>,
            mnemonic: <>VCVTTSS2SI <i>r32</i>, <i>xmm1/m32{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F3.0F.W1 2C /r</>,
            mnemonic: <>VCVTTSS2SI <i>r64</i>, <i>xmm1/m32{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert with truncation a scalar single-precision floating-point value from <i>xmm1/m32</i> into a quadword integer.
                    Store the result in <i>r64</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]"],
        erm: ["tuple1-fixed", "ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)CVTTSS2SI</code> instruction converts with truncation a scalar single-precision floating-point value from the source operand into either a doubleword or quadword integer.
                The result is stored in the destination operand.
            </p>
            <p>
                {/* {Canned.LegacySimdMultiple} Accurate? */}
                {Canned.EvexNoFaultSuppression}
                {" "}{Canned.WIgnoredIn32("vex+evex")}
            </p>
        </>
    ),
    operation:
        `public void CVTTSS2SI(ref I32 dest, SimdF64 src)
{
    dest = ConvertToI32(src[0], truncate: true);
}
public void CVTTSS2SI(ref I64 dest, SimdF64 src)
{
    dest = ConvertToI64(src[0], truncate: true);
}

public void VCVTTSS2SI_Vex(ref I32 dest, SimdF64 src) =>
    CVTTSS2SI(ref dest, src);
public void VCVTTSS2SI_Vex(ref I64 dest, SimdF64 src) =>
    CVTTSS2SI(ref dest, src);

public void VCVTTSS2SI_Evex(ref I32 dest, SimdF64 src) =>
    CVTTSS2SI(ref dest, src);
public void VCVTTSS2SI_Evex(ref I64 dest, SimdF64 src) =>
    CVTTSS2SI(ref dest, src);`,
    intrinsics: [
        "int32_t _mm_cvttss_i32(__m128d a)",
        "int32_t _mm_cvttss_si32(__m128d a)",
        "int32_t _mm_cvtt_roundss_i32(__m128d a, const int sae)",
        "",
        "int64_t _mm_cvttss_i64(__m128d a)",
        "int64_t _mm_cvttss_si64(__m128d a)",
        "int64_t _mm_cvtt_roundss_i64(__m128d a, const int sae)",
    ],
    exceptionsLegacy: {
        simd: {
            XM: [
                Exceptions.SimdInvalid,
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
