/* =============================================================================
 * File:   dpps.tsx
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
import Unit from "@components/Unit";

const PageData: InstructionPageLayoutProps = {
    id: "dpps",
    title: <>Dot Product of Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Dot Product of Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 3A 40 /r <i>ib</i></>,
            mnemonic: <>DPPS <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "legacy",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.1",
            description:
                <>
                    Compute the dot product of packed double-precision floating-point values in <i>xmm1</i> and <i>xmm2/m128</i>.
                    Use <i>imm8</i> to control the operation.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.WIG 40 /r <i>ib</i></>,
            mnemonic: <>VDPPS <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i>, <i>imm8</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compute the dot product of packed double-precision floating-point values in <i>xmm2</i> and <i>xmm3/m128</i>.
                    Use <i>imm8</i> to control the operation.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.256.66.0F3A.WIG 40 /r <i>ib</i></>,
            mnemonic: <>VDPPS <i>ymm1</i>, <i>ymm2</i>, <i>ymm3/m256</i>, <i>imm8</i></>,
            encoding: "vex",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compute two dot products of packed double-precision floating-point values in <i>ymm2</i> and <i>ymm3/m256</i>.
                    Use <i>imm8</i> to control the operation.
                    Store the result in <i>ymm1</i>.
                </>,
        },
    ],
    encodings: {
        legacy: ["ModRM.reg[rw]", "ModRM.r/m[r]", "imm8", ""],
        vex: ["ModRM.reg[w]", "VEX.vvvv[r]", "ModRM.r/m[r]", "imm8"],
    },
    description: (
        <>
            <p>
                The <code>(V)DPPD</code> instruction conditionally computes the dot product of packed double-precision floating-point values from the two source operands.
                The operation is controlled by the immediate.
                The result is stored in the destination operand.
            </p>
            <p>
                Beginning with a sum of 0, the immediate&apos;s bits are interpreted as per this table:
            </p>
            <table className="instruction-table">
                <thead>
                    <tr>
                        <th>Bit</th>
                        <th>Meaning if Set</th>
                        <th>Meaning if Clear</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>0</code></td>
                        <td>Store the computed dot product in <code>dest(0..31)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(0..31)</code></td>
                    </tr>
                    <tr>
                        <td><code>1</code></td>
                        <td>Store the computed dot product in <code>dest(32..63)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(32..63)</code></td>
                    </tr>
                    <tr>
                        <td><code>2</code></td>
                        <td>Store the computed dot product in <code>dest(64..95)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(64..95)</code></td>
                    </tr>
                    <tr>
                        <td><code>3</code></td>
                        <td>Store the computed dot product in <code>dest(96..127)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(96..127)</code></td>
                    </tr>
                    <tr>
                        <td><code>4</code></td>
                        <td>Add <code>src1(0..31) &times; src2(0..31)</code> to the sum</td>
                        <td rowSpan={4}>Add <code>0.0</code> to the sum</td>
                    </tr>
                    <tr>
                        <td><code>5</code></td>
                        <td>Add <code>src1(32..63) &times; src2(32..63)</code> to the sum</td>
                    </tr>
                    <tr>
                        <td><code>6</code></td>
                        <td>Add <code>src1(64..95) &times; src2(64..95)</code> to the sum</td>
                    </tr>
                    <tr>
                        <td><code>7</code></td>
                        <td>Add <code>src1(96..127) &times; src2(96..127)</code> to the sum</td>
                    </tr>
                </tbody>
            </table>
            <p className="pt-2">
                The <code>VEX.256</code> form of the instruction operates in a manner similar to the legacy SSE form (only on <Unit value={128} unit="bits" />), but on both halves of the operands.
                In other words, each bit of the immediate controls <em>two</em> operations &ndash; one for the lower half, and one for the upper half.
            </p>
            <p>
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void DPPS(SimdF32 dest, SimdF32 src, byte imm8)
{
    // see note 1

    F32 partial0 = imm8.Bit[4] ? dest[0] * src[0] : 0.0;
    F32 partial1 = imm8.Bit[5] ? dest[1] * src[1] : 0.0;
    F32 partial2 = imm8.Bit[6] ? dest[2] * src[2] : 0.0;
    F32 partial3 = imm8.Bit[7] ? dest[3] * src[3] : 0.0;

    F32 sum = partial0 + partial1 + partial2 + partial3;

    dest[0] = imm8.Bit[0] ? sum : 0.0;
    dest[1] = imm8.Bit[1] ? sum : 0.0;
    dest[2] = imm8.Bit[2] ? sum : 0.0;
    dest[3] = imm8.Bit[3] ? sum : 0.0;

    // dest[4..] is unmodified
}

public void VDPPS_Vex128(SimdF32 dest, SimdF32 src1, SimdF32 src2, byte imm8)
{
    // see note 1

    F32 partial0 = imm8.Bit[4] ? src1[0] * src2[0] : 0.0;
    F32 partial1 = imm8.Bit[5] ? src1[1] * src2[1] : 0.0;
    F32 partial2 = imm8.Bit[6] ? src1[2] * src2[2] : 0.0;
    F32 partial3 = imm8.Bit[7] ? src1[3] * src2[3] : 0.0;

    F32 sum = partial0 + partial1 + partial2 + partial3;

    dest[0] = imm8.Bit[0] ? sum : 0.0;
    dest[1] = imm8.Bit[1] ? sum : 0.0;
    dest[2] = imm8.Bit[2] ? sum : 0.0;
    dest[3] = imm8.Bit[3] ? sum : 0.0;

    // dest[4..] is unmodified
}
public void VDPPS_Vex256(SimdF32 dest, SimdF32 src1, SimdF32 src2, byte imm8)
{
    // see note 1

    F32 partial00 = imm8.Bit[4] ? src1[0] * src2[0] : 0.0;
    F32 partial01 = imm8.Bit[5] ? src1[1] * src2[1] : 0.0;
    F32 partial02 = imm8.Bit[6] ? src1[2] * src2[2] : 0.0;
    F32 partial03 = imm8.Bit[7] ? src1[3] * src2[3] : 0.0;

    F32 partial10 = imm8.Bit[4] ? src1[4] * src2[0] : 0.0;
    F32 partial11 = imm8.Bit[5] ? src1[5] * src2[5] : 0.0;
    F32 partial12 = imm8.Bit[6] ? src1[6] * src2[6] : 0.0;
    F32 partial13 = imm8.Bit[7] ? src1[7] * src2[7] : 0.0;

    F32 sum0 = partial00 + partial01 + partial02 + partial03;
    F32 sum1 = partial10 + partial11 + partial12 + partial13;

    dest[0] = imm8.Bit[0] ? sum0 : 0.0;
    dest[1] = imm8.Bit[1] ? sum0 : 0.0;
    dest[2] = imm8.Bit[2] ? sum0 : 0.0;
    dest[3] = imm8.Bit[3] ? sum0 : 0.0;

    dest[4] = imm8.Bit[0] ? sum1 : 0.0;
    dest[5] = imm8.Bit[1] ? sum1 : 0.0;
    dest[6] = imm8.Bit[2] ? sum1 : 0.0;
    dest[7] = imm8.Bit[3] ? sum1 : 0.0;

    dest[8..] = 0;
}`,
    operationNotes:
        <>
            The SIMD exception flags are updated after each multiplication (if it occurs), and after the addition.
            If an unmasked exception is reported during the multiplications, it will be raised before the sums.
            If the sums report an unmasked exception, it will be raised before the destination is updated.
            Any unmasked exceptions will leave the destination unmodified.
        </>,
    intrinsics: [
        "__m128 _mm_dp_ps(__m128 a, __m128 b, const int mask)",
        "",
        "__m256 _mm256_dp_ps(__m256 a, __m256 b, const int mask)",
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
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
