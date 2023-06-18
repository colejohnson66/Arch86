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
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "aam",
    title: <>ASCII Adjust <Register name="AX" /> After Multiplication</>,
    titlePlain: "ASCII Adjust AX After Multiplication",
    opcodes: [
        {
            opcode: <>D4 0A</>,
            mnemonic: <>AAM</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>ASCII adjust <Register name="AX" /> after multiplication.</>,
        },
        {
            opcode: <>D4 <i>ib</i></>,
            mnemonic: <>AAM <i>imm8</i></>,
            encoding: "i",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>ASCII adjust <Register name="AX" /> after multiplication to number base <i>imm8</i>.</>,
        },
    ],
    encodings: {
        zo: ["None (implicitly 10)"],
        i: ["imm8"],
    },
    description: (
        <>
            <p>
                The <code>AAM</code> instruction converts the result of a multiplication of two BCD digits to a valid 2-digit BCD number.
            </p>
            <p>
                Traditionally, this instruction is &apos;ASCII Adjust After Multiplication&apos;.
                This would lead one to believe that it works on ASCII digits (<code>30h</code> (<code>&quot;0&quot;</code>) through <code>39h</code> (<code>&apos;9&apos;</code>)), however, this is incorrect.
                This instruction <em>actually</em> operates on binary coded decimal (BCD) digits (<code>00h</code> through <code>09h</code>).
            </p>
            <p>
                Due to a quirk of history, this instruction encodes the base of the result in the instruction (the second byte).
                As such, it is possible to have this instruction work on other bases through an immediate 8 bit operand.
                Such methods are not guaranteed to be supported by your assembler, and in such situations, one must encode the instruction directly.
            </p>
            <p>
                {Canned.InvalidLong}
            </p>
        </>
    ),
    operation:
        `public void AAM(U8 imm8)
{
    AH = AL / imm8;
    AL = AL % imm8;
}`,
    flags: {
        CF: <>Undefined.</>,
        PF: <>Set according to the result.</>,
        AF: <>Undefined.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Undefined.</>,
    },
    exceptions: {
        modes: ["real", "v8086", "prot/compat", "long"],
        causes: {
            DE: [
                ["xxx ", <>If an immediate value of <code>0</code> is used.</>],
            ],
            UD: [
                ["xxx ", Exceptions.Lock],
                ["   x", Exceptions.InLong],
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
