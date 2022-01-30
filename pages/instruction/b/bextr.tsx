/* =============================================================================
 * File:   bextr.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "bextr",
    title: <>Bit Extract Field</>,
    titlePlain: "Bit Extract Field",
    opcodes: [
        {
            opcode: <>VEX.L0.NP.0F38.W0 F7 /r</>,
            mnemonic: <>BEXTR <i>r32a</i>, <i>r/m32</i>, <i>r32b</i></>,
            encoding: "rmv",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "bmi1",
            description:
                <>
                    Contiguous bitwise extract from <i>r/m32</i> using <i>r32b</i> as a control.
                    Store the result in <i>r32a</i>.
                </>,
        },
        {
            opcode: <>VEX.L0.NP.0F38.W1 F7 /r</>,
            mnemonic: <>BEXTR <i>r64a</i>, <i>r/m64</i>, <i>r64b</i></>,
            encoding: "rmv",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "bmi1",
            description:
                <>
                    Contiguous bitwise extract from <i>r/m64</i> using <i>r64b</i> as a control.
                    Store the result in <i>r64a</i>.
                </>,
        },
        {
            opcode: <>XOP.L0.NP.0A.W0 10 /r <i>id</i></>,
            mnemonic: <>BEXTR <i>r32</i>, <i>r/m32</i>, <i>imm32</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "tbm",
            description:
                <>
                    Contiguous bitwise extract from <i>r/m32</i> using <i>imm32</i> as a control.
                    Store the result in <i>r32</i>.
                </>,
        },
        {
            opcode: <>XOP.L0.NP.0A.W1 10 /r <i>id</i></>,
            mnemonic: <>BEXTR <i>r64</i>, <i>r/m64</i>, <i>imm32</i></>,
            encoding: "rmi",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "tbm",
            description:
                <>
                    Contiguous bitwise extract from <i>r/m64</i> using <i>imm32</i> as a control.
                    Store the result in <i>r64</i>.
                </>,
        },
    ],
    encodings: {
        rmv: ["ModRM.reg[w]", "ModRM.r/m[r]", "VEX.vvvv[r]"],
        rmi: ["ModRM.reg[w]", "ModRM.r/m[r]", "imm32"],
    },
    description: (
        <>
            <p>
                The <code>BEXTR</code> instruction extracts contiguous bits from the first source operand using using index and length values provided in the second source operand.
                The result is stored in the destination operand.
            </p>
            <p>
                The control register contains 16 bits: the lower eight are the starting index into the slice, and the upper eight is the amount of bits to extract.
                In other words, the destination register will be filled least significant to most significant by copying from the source, beginning at the starting position (where 0 indicates the least significant bit).
                The length field determines how many bits are extracted.
                Bits <code>16..</code> of the control operand are ignored.
            </p>
            <p>
                {Canned.WIgnoredIn32("vex+xop")}
            </p>
        </>
    ),
    operation:
        `public void BEXTR(ref U32 dest, U32 src1, U32 src2)
{
    // both VEX and XOP forms
    U8 start = src2[0..7];
    U8 end = start + src2[8..15];
    dest = src1[start..end];
}

public void BEXTR(ref U64 dest, U64 src1, U32 src2)
{
    // XOP form
    BEXTR(ref dest, src1, (U64)src2);
}

public void BEXTR(ref U64 dest, U64 src1, U64 src2)
{
    // VEX form
    U8 start = src2[0..7];
    U8 end = start + src2[8..15];
    dest = src1[start..end]
}`,
    flags: {
        CF: <>Cleared.</>,
        PF: <>Undefined.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Undefined.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "uint32_t _bextr_u32(uint32_t src, uint32_t start, uint32_t len)",
        "uint64_t _bextr_u64(uint64_t src, uint32_t start, uint32_t len)",
    ],
    exceptions: {
        simd: "none",
        other: {
            vex: "13",
            // xop: ???,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
