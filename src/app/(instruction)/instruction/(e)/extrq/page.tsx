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

const PageData: InstructionPageLayoutProps = {
    id: "extrq",
    title: <>Extract Quadword</>,
    titlePlain: "Extract Quadword",
    opcodes: [
        {
            opcode: <>66 0F 78 /0 <i>iw</i></>,
            mnemonic: <>EXTRQ <i>xmm1</i>, <i>imm16</i></>,
            encoding: "mi",
            validity: {
                16: "invalid", // TODO: correct?
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4a",
            description:
                <>
                    Extract the low quadword from <i>xmm1</i>, shift right by <i>imm16[13:8]</i> bits, then clear any bits above position <i>imm16[5:0]</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
        {
            opcode: <>66 0F 79 /r</>,
            mnemonic: <>EXTRQ <i>xmm1</i>, <i>xmm2</i></>,
            encoding: "mr",
            validity: {
                16: "invalid", // TODO: correct?
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4a",
            description:
                <>
                    Extract the low quadword from <i>xmm1</i>, shift right by <i>xmm2[13:8]</i> bits, then clear any bits above position <i>xmm2[5:0]</i>.
                    Store the result in <i>xmm1</i>.
                </>,
        },
    ],
    encodings: {
        mi: ["ModRM.r/m[rw]", "imm16"],
        mr: ["ModRM.r/m[rw]", "ModRM.reg[r]"],
    },
    description: (
        <>
            <p>
                The <code>EXTRQ</code> extracts a quadword from the destination operand, and using the source operand as a control, shifts and masks the value.
                The resulting value is then stored in the destination operand.
            </p>
        </>
    ),
    operation:
        `public void EXTRQ_Immediate(SimdU64 dest, U16 src)
{
    byte shift = (byte)((src >> 8) & 0xFF);
    byte maskCount = (byte)(src & 0xFF);

    ulong mask = (1u << maskCount) - 1;

    dest[0] = (dest[0] >> shift) & mask;
}

public void EXTRQ_Vector(SimdU64 dest, SimdU64 src)
{
    byte shift = (byte)((src[0] >> 8) & 0xFF);
    byte maskCount = (byte)(src[0] & 0xFF);

    ulong mask = (1u << maskCount) - 1;

    dest[0] = (dest[0] >> shift) & mask;
}`,
    flags: "none",
    exceptionsLegacy: {
        simd: "none",
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
