/* =============================================================================
 * File:   comiss.tsx
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

import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const sae = "{sae}";

const PageData: InstructionPageLayoutProps = {
    id: "comiss",
    title: <>Compare Ordered Scalar Single-Precision Floating-Point Value and Set <Register name="EFLAGS" /></>,
    titlePlain: "Compare Ordered Scalar Single-Precision Floating-Point Value and Set EFLAGS",
    opcodes: [
        {
            opcode: <>NP 0F 2F /r</>,
            mnemonic: <>COMISS <i>xmm1</i>, <i>xmm2/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse",
            description:
                <>
                    Compare the lowest single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m32</i>.
                    Set <Register name="EFLAGS" /> based on the result.
                </>,
        },
        {
            opcode: <>VEX.LIG.NP.0F.WIG 2F /r</>,
            mnemonic: <>VCOMISS <i>xmm1</i>, <i>xmm2/m32</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compare the lowest single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m32</i>.
                    Set <Register name="EFLAGS" /> based on the result.
                </>,
        },
        {
            opcode: <>EVEX.LLIG.NP.0F.WIG 2F /r</>,
            mnemonic: <>VCOMISS <i>xmm1</i>, <i>xmm2/m32{sae}</i></>,
            encoding: "erm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx512-f",
            description:
                <>
                    Compare the lowest single-precision floating-point values from <i>xmm1</i> and <i>xmm2/m32</i>.
                    Set <Register name="EFLAGS" /> based on the result.
                </>,
        },
    ],
    encodings: {
        rm: ["n/a", "ModRM.reg[r]", "ModRM.r/m[r]"],
        erm: ["tuple1-scalar", "ModRM.reg[r]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)COMISS</code> instruction compares a single single-precision floating-point values from the two source operands.
                The flags are updated (per logic below) and the result discarded.
            </p>
            <p>
                The result of the comparison is indicated using <Register name="EFLAGS.ZF" />, <Register name="EFLAGS.PF" />, and <Register name="EFLAGS.CF" /> in a way that does not match their names.
                The resulting values in the flags is detailed in this table:
            </p>
            <table className="instruction-table">
                <thead>
                    <tr>
                        <th>Comparison Result</th>
                        <th><Register name="EFLAGS.ZF" /></th>
                        <th><Register name="EFLAGS.PF" /></th>
                        <th><Register name="EFLAGS.CF" /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Unordered<sup>1</sup></td>
                        <td><code>1</code></td>
                        <td><code>1</code></td>
                        <td><code>1</code></td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap">A &lt; B</td>
                        <td><code>0</code></td>
                        <td><code>0</code></td>
                        <td><code>1</code></td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap">A = B</td>
                        <td><code>1</code></td>
                        <td><code>0</code></td>
                        <td><code>0</code></td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap">A &gt; B</td>
                        <td><code>0</code></td>
                        <td><code>0</code></td>
                        <td><code>0</code></td>
                    </tr>
                </tbody>
            </table>
            <ol className="ml-4 pb-4">
                <li>If either operand is NaN.</li>
            </ol>
        </>
    ),
    operation:
        `public void COMISS(SimdF32 src1, SimdF32 src2)
{
    _ = OrderedCompare(src1[0], src2[0]);
}

public void VCOMISS_Vex(SimdF32 src1, SimdF32 src2) =>
    COMISS(src1, src2);

public void VCOMISS_Evex(SimdF32 src1, SimdF32 src2) =>
    COMISS(src1, src2);`,
    flags: {
        CF: <>Set if the first source operand is less than the second, or if either operand is NaN. Cleared otherwise.</>,
        PF: <>Set if either operand is NaN. Cleared otherwise.</>,
        AF: <>Cleared.</>,
        ZF: <>Set if both operands are equal, or if either operand is NaN. Cleared otherwise.</>,
        SF: <>Cleared.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "int _mm_comilt_ss(__m128 a, __m128 b)",
        "int _mm_comile_ss(__m128 a, __m128 b)",
        "int _mm_comieq_ss(__m128 a, __m128 b)",
        "int _mm_comige_ss(__m128 a, __m128 b)",
        "int _mm_comigt_ss(__m128 a, __m128 b)",
        "int _mm_comineq_ss(__m128 a, __m128 b)",
        "int _mm_comi_round_ss(__m128 a, __m128 b, int predicate, int sae)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdDenormal,
                Exceptions.SimdInvalid,
            ],
        },
        other: {
            vex: "3",
            evex: "e3",
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
