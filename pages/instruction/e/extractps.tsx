/* =============================================================================
 * File:   extractps.tsx
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
    id: "extractps",
    title: <>Extract Packed Single-Precision Floating-Point Values</>,
    titlePlain: "Extract Packed Single-Precision Floating-Point Values",
    opcodes: [
        {
            opcode: <>66 0F 3A 17 /r <i>ib</i></>,
            mnemonic: <>EXTRACTPS <i>r/m32</i>, <i>xmm1</i>, <i>imm8</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "sse4.1",
            description:
                <>
                    Extract a packed single-precision floating-point value from <i>xmm1</i> located at offset <i>imm8</i>.
                    Store the result in <i>r/m32</i>.
                </>,
        },
        {
            opcode: <>VEX.128.66.0F3A.WIG 17 /r <i>ib</i></>,
            mnemonic: <>VEXTRACTPS <i>r/m32</i>, <i>xmm1</i>, <i>imm8</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Extract a packed single-precision floating-point value from <i>xmm1</i> located at offset <i>imm8</i>.
                    Store the result in <i>r/m32</i>.
                </>,
        },
        {
            opcode: <>EVEX.128.66.0F3A.WIG 17 /r <i>ib</i></>,
            mnemonic: <>VEXTRACTPS <i>r/m32</i>, <i>xmm1</i>, <i>imm8</i></>,
            encoding: "ermi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "avx",
            description:
                <>
                    Extract a packed single-precision floating-point value from <i>xmm1</i> located at offset <i>imm8</i>.
                    Store the result in <i>r/m32</i>.
                </>,
        },
    ],
    encodings: {
        rmi: ["n/a", "ModRM.reg[w]", "ModRM.r/m[r]", "imm8"],
        ermi: ["tuple1-scalar", "ModRM.reg[w]", "ModRM.r/m[r]", "imm8"],
    },
    description: (
        <>
            <p>
                The <code>(V)EXTRACTPS</code> instruction extracts a single-precision floating-point value from the source operand.
                The selected value is indicated by the bits <code>0..1</code> in the immediate (the other bits are ignored).
                The extracted value is stored in the destination operand.
            </p>
        </>
    ),
    operation:
        `public void EXTRACTPS(ref U32 dest, SimdU32 src, byte imm8)
{
    dest = src[imm8 & 3];
}

public void VEXTRACTPS_Vex(ref U32 dest, SimdU32 src, byte imm8) =>
    EXTRACTPS(ref dest, src, imm8);

public void VEXTRACTPS_Evex(ref U32 dest, SimdU32 src, byte imm8) =>
    EXTRACTPS(ref dest, src, imm8);`,
    intrinsics: [
        "int32_t _mm_extract_ps (__m128 a, const int idx)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "5",
            evex: "e9nf",
            UD: [
                Exceptions.VexNotL0,
                Exceptions.EvexNotL0,
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
