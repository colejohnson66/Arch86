/* =============================================================================
 * File:   cvtps2pi.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "cvtps2pi",
    title: <>Convert Packed Single-Precision Floating-Point Values into Packed Doubleword Integers (MMX)</>,
    titlePlain: "Convert Packed Single-Precision Floating-Point Values into Packed Doubleword Integers (MMX)",
    opcodes: [
        {
            opcode: <>NP 0F 2D /r</>,
            mnemonic: <>CVTPS2PI <i>mm1</i>, <i>xmm1/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["sse2", "mmx"], // TODO: SSE or SSE2?
            description:
                <>
                    Convert packed single-precision floating-point values from <i>xmm1/m64</i> into packed doubleword integers.
                    Store the result in <i>mm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>CVTPS2PI</code> instruction converts two packed single-precision floating-point values from the source operand into packed doubleword integers.
                The result is stored in the destination operand.
            </p>
        </>
    ),
    operation:
        `public void CVTPS2PI(MmxI32 dest, SimdF32 src)
{
    dest[0] = ConvertToI32(src[0]);
    dest[1] = ConvertToI32(src[1]);
}`,
    intrinsics: [
        "__m64 _mm_cvtps_pi32(__m128 a)",
    ],
    exceptions: {
        simd: {
            XM: [
                Exceptions.SimdInvalid,
                Exceptions.SimdPrecision,
            ],
        },
        other: {
            // TODO
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
