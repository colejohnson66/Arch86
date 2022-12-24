/* =============================================================================
 * File:   adc.tsx
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
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "adc",
    title: <>Add With Carry</>,
    titlePlain: "Add With Carry",
    opcodes: [
        {
            opcode: <>10 /r</>,
            mnemonic: <>ADC <i>r/m8</i>, <i>r8</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m8</i>, the carry flag, and <i>r8</i> into <i>r/m8</i>.</>,
        },
        {
            opcode: <>REX 10 /r</>,
            mnemonic: <>ADC <i>r/m8<sup>*</sup></i>, <i>r8<sup>*</sup></i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>
                Add <i>r/m8</i>, the carry flag, and <i>r8</i> into <i>r/m8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>11 /r</>,
            mnemonic: <>ADC <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m16</i>, the carry flag, and <i>r16</i> into <i>r/m16</i>.</>,
        },
        {
            opcode: <>11 /r</>,
            mnemonic: <>ADC <i>r/m32</i>, <i>r32</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m32</i>, the carry flag, and <i>r32</i> into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 11 /r</>,
            mnemonic: <>ADC <i>r/m64</i>, <i>r64</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Add <i>r/m64</i>, the carry flag, and <i>r64</i> into <i>r/m64</i>.</>,
        },
        {
            opcode: <>12 /r</>,
            mnemonic: <>ADC <i>r8</i>, <i>r/m8</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r8</i>, the carry flag, and <i>r/m8</i> into <i>r8</i>.</>,
        },
        {
            opcode: <>REX 12 /r</>,
            mnemonic: <>ADC <i>r8<sup>*</sup></i>, <i>r/m8<sup>*</sup></i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>
                Add <i>r8</i>, the carry flag, and <i>r/m8</i> into <i>r8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>13 /r</>,
            mnemonic: <>ADC <i>r16</i>, <i>r/m16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r16</i>, the carry flag, and <i>r/m16</i> into <i>r16</i>.</>,
        },
        {
            opcode: <>13 /r</>,
            mnemonic: <>ADC <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r32</i>, the carry flag, and <i>r/m32</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>REX.W 13 /r</>,
            mnemonic: <>ADC <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Add <i>r64</i>, the carry flag, and <i>r/m64</i> into <i>r64</i>.</>,
        },
        {
            opcode: <>14 <i>ib</i></>,
            mnemonic: <>ADC AL, <i>imm8</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <Register name="AL" />, the carry flag, and <i>imm8</i> into <Register name="AL" />.</>,
        },
        {
            opcode: <>15 <i>iw</i></>,
            mnemonic: <>ADC AX, <i>imm16</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <Register name="AX" />, the carry flag, and <i>imm16</i> into <Register name="AX" />.</>,
        },
        {
            opcode: <>15 <i>id</i></>,
            mnemonic: <>ADC EAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <Register name="EAX" />, the carry flag, and <i>imm32</i> into <Register name="EAX" />.</>,
        },
        {
            opcode: <>REX.W 15 <i>id</i></>,
            mnemonic: <>ADC RAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Add <Register name="RAX" />, the carry flag, and <i>imm32</i> (sign extended to 64 bits) into <Register name="RAX" />.</>,
        },
        {
            opcode: <>80 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m8</i>, the carry flag, and <i>imm8</i> into <i>r/m8</i>.</>,
        },
        {
            opcode: <>REX 80 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m8<sup>*</sup></i>, <i>imm8<sup>*</sup></i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>
                Add <i>r/m8</i>, the carry flag, and <i>imm8</i> into <i>r/m8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>81 /2 <i>iw</i></>,
            mnemonic: <>ADC <i>r/m16</i>, <i>imm16</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m16</i>, the carry flag, and <i>imm16</i> into <i>r/m16</i>.</>,
        },
        {
            opcode: <>81 /2 <i>id</i></>,
            mnemonic: <>ADC <i>r/m32</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m32</i>, the carry flag, and <i>imm32</i> into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 81 /2 <i>id</i></>,
            mnemonic: <>ADC <i>r/m64</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Add <i>r/m64</i>, the carry flag, and <i>imm32</i> (sign extended to 64 bits) into <i>r/m64</i>.</>,
        },
        {
            opcode: <>82 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description:
                <>
                    Add <i>r/m8</i>, the carry flag, and <i>imm8</i> (sign extended to 8 bits) into <i>r/m8</i>.
                    {" "}{Canned.UndocumentedOpcode}
                </>,
        },
        {
            opcode: <>83 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m16</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m16</i>, the carry flag, and <i>imm8</i> (sign extended to 16 bits) into <i>r/m16</i>.</>,
        },
        {
            opcode: <>83 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m32</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Add <i>r/m32</i>, the carry flag, and <i>imm8</i> (sign extended to 32 bits) into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 83 /2 <i>ib</i></>,
            mnemonic: <>ADC <i>r/m64</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Add <i>r/m64</i>, the carry flag, and <i>imm8</i> (sign extended to 64 bits) into <i>r/m64</i>.</>,
        },
    ],
    encodings: {
        mr: ["ModRM.r/m[rw]", "ModRM.reg[r]"],
        rm: ["ModRM.reg[rw]", "ModRM.r/m[r]"],
        ai: ["AL/AX/EAX/RAX", "imm8/16/32"],
        mi: ["ModRM.r/m[rw]", "imm8/16/32"],
    },
    description: (
        <>
            <p>
                The <code>ADC</code> instruction adds the source operand, the destination operand, and the carry flag.
                The result is stored in the destination operand.
            </p>
            <p>
                This instruction is designed for use in multiword additions such as in arbitrary precision arithmetic.
            </p>
            <p>
                {Canned.Lockable}
            </p>
        </>
    ),
    operation:
        `// \`src\` is sign extended to the width of \`dest\`

public void ADC(ref U8 dest, U8 src)
{
    dest += src + CF;
}
public void ADC(ref U16 dest, U16 src)
{
    dest += src + CF;
}
public void ADC(ref U32 dest, U32 src)
{
    dest += src + CF;
}
public void ADC(ref U64 dest, U64 src)
{
    dest += src + CF;
}`,
    flags: {
        CF: <>Set according to the result.</>,
        PF: <>Set according to the result.</>,
        AF: <>Set according to the result.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Set according to the result.</>,
    },
    intrinsics: [
        "uint8_t _addcarry_u8(uint8_t c_in, uint8_t src1, uint8_t src2, uint8_t *sum_out)",
        "uint8_t _addcarry_u16(uint8_t c_in, uint16_t src1, uint16_t src2, uint16_t *sum_out)",
        "uint8_t _addcarry_u32(uint8_t c_in, uint32_t src1, uint32_t src2, uint32_t *sum_out)",
        "uint8_t _addcarry_u64(uint8_t c_in, uint64_t src1, uint64_t src2, uint64_t *sum_out)",
    ],
    exceptions: {
        modes: ["real", "v8086", "prot/compat", "long"],
        causes: {
            UD: [
                ["xxxx", Exceptions.LockNoMem],
            ],
            SS0: [
                ["xxxx", Exceptions.SegLimitSS],
                ["    x", Exceptions.NonCanonSS],
            ],
            GP0: [
                ["xxxx", Exceptions.SegLimit],
                ["  xx", Exceptions.NonWritableSegment],
                ["  xx", Exceptions.NullSelector],
                ["    x", Exceptions.NonCanon],
            ],
            PF: [
                [" xxx", Exceptions.PF],
            ],
            AC0: [
                [" xxx", Exceptions.AC],
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
