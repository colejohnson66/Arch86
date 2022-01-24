/* =============================================================================
 * File:   and.tsx
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
    id: "and",
    title: <>Logical AND</>,
    titlePlain: "Logical AND",
    opcodes: [
        {
            opcode: <>20 /r</>,
            mnemonic: <>AND <i>r/m8</i>, <i>r8</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r8</i> into <i>r/m8</i>.</>,
        },
        {
            opcode: <>REX 20 /r</>,
            mnemonic: <>AND <i>r/m8<sup>*</sup></i>, <i>r8<sup>*</sup></i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>
                Logical AND <i>r8</i> into <i>r/m8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>21 /r</>,
            mnemonic: <>AND <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r16</i> into <i>r/m16</i>.</>,
        },
        {
            opcode: <>21 /r</>,
            mnemonic: <>AND <i>r/m32</i>, <i>r32</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r32</i> into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 21 /r</>,
            mnemonic: <>AND <i>r/m64</i>, <i>r64</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Logical AND <i>r64</i> into <i>r/m64</i>.</>,
        },
        {
            opcode: <>22 /r</>,
            mnemonic: <>AND <i>r8</i>, <i>r/m8</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r/m8</i> into <i>r8</i>.</>,
        },
        {
            opcode: <>REX 22 /r</>,
            mnemonic: <>AND <i>r8<sup>*</sup></i>, <i>r/m8<sup>*</sup></i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>
                Logical AND <i>r/m8</i> into <i>r8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>23 /r</>,
            mnemonic: <>AND <i>r16</i>, <i>r/m16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r/m16</i> into <i>r16</i>.</>,
        },
        {
            opcode: <>23 /r</>,
            mnemonic: <>AND <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>r/m32</i> into <i>r32</i>.</>,
        },
        {
            opcode: <>REX.W 23 /r</>,
            mnemonic: <>AND <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Logical AND <i>r/m64</i> into <i>r64</i>.</>,
        },
        {
            opcode: <>24 <i>ib</i></>,
            mnemonic: <>AND AL, <i>imm8</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm8</i> into <Register name="AL" />.</>,
        },
        {
            opcode: <>25 <i>iw</i></>,
            mnemonic: <>AND AX, <i>imm16</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm16</i> into <Register name="AX" />.</>,
        },
        {
            opcode: <>25 <i>id</i></>,
            mnemonic: <>AND EAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm32</i> into <Register name="EAX" />.</>,
        },
        {
            opcode: <>REX.W 25 <i>id</i></>,
            mnemonic: <>AND RAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Logical AND <i>imm32</i> (sign extended to 64 bits) into <Register name="RAX" />.</>,
        },
        {
            opcode: <>80 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm8</i> into <i>r/m8</i>.</>,
        },
        {
            opcode: <>REX 80 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m8<sup>*</sup></i>, <i>imm8<sup>*</sup></i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>
                Logical AND <i>imm8</i> into <i>r/m8</i>.
                {" "}{Canned.RexR8Encoding}
            </>,
        },
        {
            opcode: <>81 /4 <i>iw</i></>,
            mnemonic: <>AND <i>r/m16</i>, <i>imm16</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm16</i> into <i>r/m16</i>.</>,
        },
        {
            opcode: <>81 /4 <i>id</i></>,
            mnemonic: <>AND <i>r/m32</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm32</i> into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 81 /4 <i>id</i></>,
            mnemonic: <>AND <i>r/m64</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Logical AND <i>imm32</i> (sign extended to 64 bits) into <i>r/m64</i>.</>,
        },
        {
            opcode: <>82 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description:
                <>
                    Logical AND <i>imm8</i> (sign extended to 8 bits) into <i>r/m8</i>.
                    {" "}{Canned.UndocumentedOpcode}
                </>,
        },
        {
            opcode: <>83 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m16</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm8</i> (sign extended to 16 bits) into <i>r/m16</i>.</>,
        },
        {
            opcode: <>83 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m32</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Logical AND <i>imm8</i> (sign extended to 32 bits) into <i>r/m32</i>.</>,
        },
        {
            opcode: <>REX.W 83 /4 <i>ib</i></>,
            mnemonic: <>AND <i>r/m64</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Logical AND <i>imm8</i> (sign extended to 64 bits) into <i>r/m64</i>.</>,
        },
    ],
    encodings: {
        mr: ["ModRM.r/m[rw]", "ModRM.reg[rw]"],
        rm: ["ModRM.reg[rw]", "ModRM.r/m[rw]"],
        ai: ["AL/AX/EAX/RAX", "imm8/16/32"],
        mi: ["ModRM.r/m[rw]", "imm8/16/32"],
    },
    description: (
        <>
            <p>
                The <code>AND</code> instruction performs a logical AND with source operand and the destination operand.
                The result is stored in the destination operand.
            </p>
            <p>
                {Canned.Lockable}
            </p>
        </>
    ),
    operation:
        `// \`src\` is sign extended to the width of \`dest\`

public void AND(ref U8 dest, U8 src)
{
    dest &= SRC;
}
public void AND(ref U16 dest, U16 src)
{
    dest &= SRC;
}
public void AND(ref U32 dest, U32 src)
{
    dest &= SRC;
}
public void AND(ref U64 dest, U64 src)
{
    dest &= SRC;
}`,
    flags: {
        CF: <>Cleared.</>,
        PF: <>Set according to the result.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Cleared.</>,
    },
    intrinsics: [
        "uint8_t _addcarry_u8(uint8_t c_in, uint8_t src1, uint8_t src2, uint8_t *sum_out)",
        "uint8_t _addcarry_u16(uint8_t c_in, uint16_t src1, uint16_t src2, uint16_t *sum_out)",
        "uint8_t _addcarry_u32(uint8_t c_in, uint32_t src1, uint32_t src2, uint32_t *sum_out)",
        "uint8_t _addcarry_u64(uint8_t c_in, uint64_t src1, uint64_t src2, uint64_t *sum_out)",
    ],
    exceptions: {
        real: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            UD: Exceptions.LockNoMem,
            SS0: Exceptions.SegLimitSS,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: Exceptions.LockNoMem,
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            GP0: [
                Exceptions.NonCanon,
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
