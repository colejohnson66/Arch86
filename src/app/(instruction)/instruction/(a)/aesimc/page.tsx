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
    id: "aesimc",
    title: <>Perform the AES &quot;Inverse Mix Columns&quot; Transformation</>,
    titlePlain: "Perform the AES \"Inverse Mix Columns\" Transformation",
    opcodes: [
        {
            opcode: <>66 0F 38 DB /r</>,
            mnemonic: <>AESIMC <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "aes",
            description:
                <>
                    Perform the &quot;inverse mix columns&quot; transformation on a 128 bit round key in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F38.WIG DB /r</>,
            mnemonic: <>VAESIMC <i>xmm1</i>, <i>xmm2/m128</i></>,
            encoding: "rm",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: ["avx", "aes"],
            description:
                <>
                    Perform the &quot;inverse mix columns&quot; transformation on a 128 bit round key in <i>xmm2/m128</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        rm: ["ModRM.reg[w]", "ModRM.r/m[r]"],
    },
    description: (
        <>
            <p>
                The <code>(V)AESIMC</code> instruction performs the &quot;inverse mix columns&quot; transformation on a round key stored in the source operand.
                The result is stored in in the destination operand.
            </p>
            <p>
                This instruction should be applied to the expanded AES round keys (excepting the first and last) to prepare them for decryption using the &quot;Equivalent Inverse Cipher&quot; (see FIPS 197).
            </p>
            <p>
                {Canned.VvvvReserved("vex")}
                {" "}{Canned.LegacySimd}
            </p>
        </>
    ),
    operation:
        `public void AESIMC(SimdU128 dest, SimdU128 src)
{
    dest[0] = AesInvMixColumns(src[0]);
    // dest[1..] is unmodified
}

public void VAESIMC_Vex128(SimdU128 dest, SimdU128 src)
{
    dest[0] = AesInvMixColumns(src[0]);
    dest[1..] = 0;
}`,
    intrinsics: [
        "__m128i _mm_aesimc(__m128i)",
    ],
    exceptionsLegacy: {
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
