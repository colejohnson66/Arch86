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
import Instruction from "@/components/Instruction";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cmp",
    title: <>Compare</>,
    titlePlain: "Compare",
    opcodes: [
        {
            opcode: <>38 /r</>,
            mnemonic: <>CMP <i>r/m8</i>, <i>r8</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r8</i> with <i>r/m8</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX 38 /r</>,
            mnemonic: <>CMP <i>r/m8<sup>*</sup></i>, <i>r8<sup>*</sup></i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r8</i> with <i>r/m8</i>.
                    Set the flags and discard the result.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>39 /r</>,
            mnemonic: <>CMP <i>r/m16</i>, <i>r16</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r16</i> with <i>r/m16</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>39 /r</>,
            mnemonic: <>CMP <i>r/m32</i>, <i>r32</i></>,
            encoding: "mr",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r32</i> with <i>r/m32</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX.W 39 /r</>,
            mnemonic: <>CMP <i>r/m64</i>, <i>r64</i></>,
            encoding: "mr",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r64</i> with <i>r/m64</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>3A /r</>,
            mnemonic: <>CMP <i>r8</i>, <i>r/m8</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r/m8</i> with <i>r8</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX 3A /r</>,
            mnemonic: <>CMP <i>r8<sup>*</sup></i>, <i>r/m8<sup>*</sup></i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r/m8</i> with <i>r8</i>.
                    Set the flags and discard the result.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>3B /r</>,
            mnemonic: <>CMP <i>r16</i>, <i>r/m16</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r/m16</i> with <i>r16</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>3B /r</>,
            mnemonic: <>CMP <i>r32</i>, <i>r/m32</i></>,
            encoding: "rm",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r/m32</i> with <i>r32</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX.W 3B /r</>,
            mnemonic: <>CMP <i>r64</i>, <i>r/m64</i></>,
            encoding: "rm",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>r/mm648</i> with <i>r64</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>3C <i>ib</i></>,
            mnemonic: <>CMP AL, <i>imm8</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> with <Register name="AL" />.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>3D <i>iw</i></>,
            mnemonic: <>CMP AX, <i>imm16</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm16</i> with <Register name="AX" />.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>3D <i>id</i></>,
            mnemonic: <>CMP EAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm32</i> with <Register name="EAX" />.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX.W 3D <i>id</i></>,
            mnemonic: <>CMP RAX, <i>imm32</i></>,
            encoding: "ai",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm32</i> (sign extended to 64 bits) with <Register name="RAX" />.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>80 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> with <i>r/m8</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX 80 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m8<sup>*</sup></i>, <i>imm8<sup>*</sup></i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> with <i>r/m8</i>.
                    Set the flags and discard the result.
                    {" "}{Canned.RexR8Encoding}
                </>,
        },
        {
            opcode: <>81 /7 <i>iw</i></>,
            mnemonic: <>CMP <i>r/m16</i>, <i>imm16</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm16</i> with <i>r/m16</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>81 /7 <i>id</i></>,
            mnemonic: <>CMP <i>r/m32</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm32</i> with <i>r/m32</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX.W 81 /7 <i>id</i></>,
            mnemonic: <>CMP <i>r/m64</i>, <i>imm32</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm32</i> (sign extended to 64 bits) with <i>r/m64</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>82 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m8</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description:
                <>
                    Compare <i>imm8</i> (sign extended to 8 bits) with <i>r/m8</i>.
                    Set the flags and discard the result.
                    {" "}{Canned.UndocumentedOpcode}
                </>,
        },
        {
            opcode: <>83 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m16</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> (sign extended to 16 bits) with <i>r/m16</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>83 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m32</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> (sign extended to 32 bits) with <i>r/m32</i>.
                    Set the flags and discard the result.
                </>,
        },
        {
            opcode: <>REX.W 83 /7 <i>ib</i></>,
            mnemonic: <>CMP <i>r/m64</i>, <i>imm8</i></>,
            encoding: "mi",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description:
                <>
                    Compare <i>imm8</i> (sign extended to 64 bits) with <i>r/m64</i>.
                    Set the flags and discard the result.
                </>,
        },
    ],
    encodings: {
        mr: ["ModRM.r/m[r]", "ModRM.reg[r]"],
        rm: ["ModRM.reg[r]", "ModRM.r/m[r]"],
        ai: ["AL/AX/EAX/RAX", "imm8/16/32"],
        mi: ["ModRM.r/m[r]", "imm8/16/32"],
    },
    description: (
        <>
            <p>
                The <code>CMP</code> instruction subtracts the second source operand from the first.
                The flags are updated and the result discarded.
            </p>
            <p>
                This instruction internally operates the same as <Instruction name="sub" />, but without writing the result back.
                As such, the <code>CMP</code> instruction is the only one of the eight original ALU instructions that <em>cannot</em> be used with the <Instruction name="lock" noTitle /> prefix.
            </p>
        </>
    ),
    operation:
        `// \`src2\` is sign extended to the width of \`src1\`

public void CMP(ref U8 src1, U8 src2)
{
    _ = src1 - src2;
}
public void CMP(ref U16 src1, U16 src2)
{
    _ = src1 - src2;
}
public void CMP(ref U32 src1, U32 src2)
{
    _ = src1 - src2;
}
public void ADD(ref U64 src1, U64 src2)
{
    _ = src1 - src2;
}`,
    flags: {
        CF: <>Set according to the temporary result.</>,
        PF: <>Set according to the temporary result.</>,
        AF: <>Set according to the temporary result.</>,
        ZF: <>Set according to the temporary result.</>,
        SF: <>Set according to the temporary result.</>,
        OF: <>Set according to the temporary result.</>,
    },
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
        },
        virtual: {
            UD: Exceptions.Lock,
            SS0: Exceptions.SegLimitSS,
            GP0: Exceptions.SegLimit,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.Lock,
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
            UD: Exceptions.Lock,
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
            UD: Exceptions.Lock,
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
