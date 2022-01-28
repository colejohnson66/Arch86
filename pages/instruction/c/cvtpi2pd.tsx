/* =============================================================================
 * File:   cvtpi2pd.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "cvtpi2pd",
    title: <>Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values (MMX)</>,
    titlePlain: "Convert Packed Doubleword Integers to Packed Double-Precision Floating-Point Values (MMX)",
    opcodes: [
        {
            opcode: <>66 0F 2A /r</>,
            mnemonic: <>CVTPI2PS <i>xmm</i>, <i>mm/m64</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["sse2", "mmx"], // TODO: SSE or SSE2?
            description:
                <>
                    Convert packed doubleword integers from <i>mm/m64</i> into packed double-precision floating-point values.
                    Store the result in <i>xmm</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>CVTPI2PD</code> instruction converts two packed doubleword integers from the source operand into packed single-precision floating-point values.
                The result is stored in the destination operand.
            </p>
        </>
    ),
    operation:
        `public void CVTPI2PD(SimdF64 dest, MmxI32 src)
{
    dest[0] = ConvertToF64(src[0]);
    dest[1] = ConvertToF64(src[1]);
}`,
    intrinsics: [
        "__m64 _mm_cvtpi32_pd(__m128d a)",
    ],
    exceptions: {
        simd: "none",
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
