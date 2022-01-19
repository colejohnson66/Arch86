/* =============================================================================
 * File:   aeskeygenassist.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "aeskeygenassist",
    title: <>AES Round Key Generation Assist</>,
    titlePlain: "AES Round Key Generation Assist",
    opcodes: [
        {
            opcode: <>66 0F 3A DF /r <i>ib</i></>,
            mnemonic: <>AESKEYGENASSIST <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "RMI",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "aes",
            description:
                <>
                    Assist in AES round key generation using an 8 bit round constant (RCON) specified in the immediate byte and 128 bits of data specified in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.WIG DF /r <i>ib</i></>,
            mnemonic: <>VAESKEYGENASSIST <i>xmm1</i>, <i>xmm2/m128</i>, <i>imm8</i></>,
            encoding: "RMI",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx", "aes"],
            description:
                <>
                    Assist in AES round key generation using an 8 bit round constant (RCON) specified in the immediate byte and 128 bits of data specified in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        operands: 3,
        encodings: {
            "RMI": ["ModRM.reg[w]", "ModRM.r/m[r]", "imm8"],
        },
    },
    description: (
        <>
            <p>
                The <code>(V)AESKEYGENASSIST</code> instruction assists in expanding the AES cipher key using an 8 bit round constant (RCON) and 128 bits of data from the source operand.
                The result is stored in in the destination operand.
            </p>
            <p>
                {Canned.VvvvReserved("vex")}
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void AESKEYGENASSIST(SimdU32 dest, SimdU32 src, byte roundConstant)
{
    uint x0 = src[0];
    uint x1 = src[1];
    uint x2 = src[2];
    uint x3 = src[3];
    uint rcon = roundConstant;

    dest[0] = SubWord(x1);
    dest[1] = RotWord(SubWord(x1)) ^ rcon;
    dest[2] = SubWord(x3);
    dest[3] = RotWord(SubWord(x3)) ^ rcon;
    // dest[4..] is unmodified
}

public void VAESKEYGENASSIST_Vex128(SimdU32 dest, SimdU32 src, byte roundConstant)
{
    uint x0 = src[0];
    uint x1 = src[1];
    uint x2 = src[2];
    uint x3 = src[3];
    uint rcon = roundConstant;

    dest[0] = SubWord(x1);
    dest[1] = RotWord(SubWord(x1)) ^ rcon;
    dest[2] = SubWord(x3);
    dest[3] = RotWord(SubWord(x3)) ^ rcon;
    dest[4..] = 0;
}`,
    intrinsics: [
        "__m128i _mm_aeskeygenassist(__m128i data, const int roundConstant)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "4",
            UD: Exceptions.VexVvvv,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
