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
    id: "cvtsd2si",
    title: <>Convert Scalar Double-Precision Floating Point Values to Doubleword and Quadword Integers</>,
    titlePlain: "Convert Scalar Double-Precision Floating Point Values to Doubleword and Quadword Integers",
    opcodes: [
        {
            opcode: <>F2 0F 2D /r</>,
            mnemonic: <>CVTSD2SI <i>r32</i>, <i>xmm1/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>F2 REX.W 0F 2D /r</>,
            mnemonic: <>CVTSD2SI <i>r64</i>, <i>xmm1/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "n/e",
                64: "valid",
            },
            cpuid: "sse2",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a quadword integer.
                    Store the result in <i>r64</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F2.0F.W0 2D /r</>,
            mnemonic: <>VCVTSD2SI <i>r32</i>, <i>xmm1/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>VEX.LIG.F2.0F.W1 2D /r</>,
            mnemonic: <>VCVTSD2SI <i>r64</i>, <i>xmm1/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a quadword integer.
                    Store the result in <i>r64</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F2.0F.W0 2D /r</>,
            mnemonic: <>VCVTSD2SI <i>r32</i>, <i>xmm1/m64{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a doubleword integer.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.F2.0F.W1 2D /r</>,
            mnemonic: <>VCVTSD2SI <i>r64</i>, <i>xmm1/m64{er}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Convert a scalar double-precision floating-point value from <i>xmm1/m64</i> into a quadword integer.
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
                The <code>(V)CVTSD2SI</code> instruction converts a scalar double-precision floating-point value from the source operand into either a doubleword or quadword integer.
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
        `public void CVTSD2SI(ref I32 dest, SimdF64 src)
{
    dest = ConvertToI32(src[0]);
}
public void CVTSD2SI(ref I64 dest, SimdF64 src)
{
    dest = ConvertToI64(src[0]);
}

public void VCVTSD2SI_Vex(ref I32 dest, SimdF64 src) =>
    CVTSD2SI(ref dest, src);
public void VCVTSD2SI_Vex(ref I64 dest, SimdF64 src) =>
    CVTSD2SI(ref dest, src);

public void VCVTSD2SI_EvexMemory(ref I32 dest, SimdF64 src) =>
    CVTSD2SI(ref dest, src);
public void VCVTSD2SI_EvexMemory(ref I64 dest, SimdF64 src) =>
    CVTSD2SI(ref dest, src);

public void VCVTSD2SI_EvexRegister(ref I32 dest, SimdF64 src)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);
    dest = ConvertToI32(src[0]);
}
public void VCVTSD2SI_EvexRegister(ref I64 dest, SimdF64 src)
{
    if (EVEX.b)
        OverrideRoundingModeForThisInstruction(EVEX.rc);
    dest = ConvertToI64(src[0]);
}`,
    intrinsics: [
        "int32_t _mm_cvtsd_i32(__m128d a)",
        "int32_t _mm_cvtsd_si32(__m128d a)",
        "int32_t _mm_cvt_roundsd_i32(__m128d a, const int rounding)",
        "",
        "int64_t _mm_cvtsd_i64(__m128d a)",
        "int64_t _mm_cvtsd_si64(__m128d a)",
        "int64_t _mm_cvt_roundsd_i64(__m128d a, const int rounding)",
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
