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

const PageData: InstructionPageLayoutProps = {
    id: "dppd",
    title: <>Dot Product of Packed Double-Precision Floating-Point Values</>,
    titlePlain: "Dot Product of Packed Double-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 3A 41 /r <i>ib</i></>,
            mnemonic: <>DPPD <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.1",
            description:
                <>
                    Compute the dot product of packed double-precision floating-point values in <i>xmm1</i> and <i>xmm2/m128</i>.
                    Use bits <code>0..1</code> and <code>4..5</code> of <i>imm8</i> to control the operation.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.WIG 41 /r <i>ib</i></>,
            mnemonic: <>VDPPD <i>xmm1</i>, <i>xmm2</i>, <i>xmm3/m128</i>, <i>imm8</i></>,
            encoding: "rvmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Compute the dot product of packed double-precision floating-point values in <i>xmm2</i> and <i>xmm3/m128</i>.
                    Use bits <code>0..1</code> and <code>4..5</code> of <i>imm8</i> to control the operation.
                    Store the result in <i>xmm1</i>.
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
                The <code>(V)DPPD</code> instruction conditionally computes the dot product of packed double-precision floating-point values from the two source operands.
                The operation is controlled by the bits <code>0..1</code> and <code>4..5</code> of the immediate.
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
                        <td>Store the computed dot product in <code>dest(0..63)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(0..63)</code></td>
                    </tr>
                    <tr>
                        <td><code>1</code></td>
                        <td>Store the computed dot product in <code>dest(64..127)</code></td>
                        <td>Store <code>0.0</code> in <code>dest(64..127)</code></td>
                    </tr>
                    <tr>
                        <td><code>2..3</code></td>
                        <td colSpan={2}>Reserved</td>
                    </tr>
                    <tr>
                        <td><code>4</code></td>
                        <td>Add <code>src1(0..63) &times; src2(0..63)</code> to the sum</td>
                        <td rowSpan={2}>Add <code>0.0</code> to the sum</td>
                    </tr>
                    <tr>
                        <td><code>5</code></td>
                        <td>Add <code>src1(64..127) &times; src2(64..127)</code> to the sum</td>
                    </tr>
                    <tr>
                        <td><code>6..7</code></td>
                        <td colSpan={2}>Reserved</td>
                    </tr>
                </tbody>
            </table>
            <p className="pt-2">
                {Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void DPPD(SimdF64 dest, SimdF64 src, byte imm8)
{
    // see note 1

    F64 partial0 = imm8.Bit[4] ? dest[0] * src[0] : 0.0;
    F64 partial1 = imm8.Bit[5] ? dest[1] * src[1] : 0.0;

    F64 sum = partial0 + partial1;

    dest[0] = imm8.Bit[0] ? sum : 0.0;
    dest[1] = imm8.Bit[1] ? sum : 0.0;

    // dest[2..] is unmodified
}

public void VDPPD_Vex128(SimdF64 dest, SimdF64 src1, SimdF64 src2, byte imm8)
{
    // see note 1

    F64 partial0 = imm8.Bit[4] ? src1[0] * src2[0] : 0.0;
    F64 partial1 = imm8.Bit[5] ? src1[1] * src2[1] : 0.0;

    F64 sum = partial0 + partial1;

    dest[0] = imm8.Bit[0] ? sum : 0.0;
    dest[1] = imm8.Bit[1] ? sum : 0.0;

    dest[2..] = 0;
}`,
    operationNotes:
        <>
            The SIMD exception flags are updated after each multiplication (if it occurs), and after the addition.
            If an unmasked exception is reported during the multiplications, it will be raised before the sum.
            If the sum reports an unmasked exception, it will be raised before the destination is updated.
            Any unmasked exceptions will leave the destination unmodified.
        </>,
    intrinsics: [
        "__m128d _mm_dp_pd(__m128d a, __m128d b, const int mask)",
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
            vex: "2",
            UD: Exceptions.VexNotL0,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
