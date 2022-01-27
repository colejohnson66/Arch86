/* =============================================================================
 * File:   cvtpd2pi.tsx
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
    id: "cvtpd2pi",
    title: <>Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers (MMX)</>,
    titlePlain: "Convert Packed Double-Precision Floating-Point Values to Packed Doubleword Integers (MMX)",
    opcodes: [
        {
            opcode: <>66 0F 2D /r</>,
            mnemonic: <>CVTPD2PI <i>mm</i>, <i>xmm/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["sse2", "mmx"],
            description:
                <>
                    Convert packed double-precision floating-point values from <i>xmm/m128</i> into packed doubleword integers.
                    Store the result in <i>mm</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>CVTPD2PI</code> instruction converts two packed double-precision floating-point values from the source operand into doubleword integer.
                The result is stored in the destination operand.
            </p>
        </>
    ),
    operation:
        `public void CVTPD2PI(MmxU32 dest, SimdF64 src)
{
    dest[0] = ConvertToU32(src[0]);
    dest[1] = ConvertToU32(src[1]);
}`,
    intrinsics: [
        "__m64 _mm_cvtpd_pi32(__m128d a)",
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
