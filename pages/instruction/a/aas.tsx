/* =============================================================================
 * File:   aas.tsx
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
    id: "aas",
    title: <>ASCII Adjust <Register name="AX" /> After Subtraction</>,
    titlePlain: "ASCII Adjust AX After Subtraction",
    opcodes: [
        {
            opcode: <>3F</>,
            mnemonic: <>AAS</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>ASCII adjust <Register name="AX" /> after subtraction.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>AAS</code> instruction converts the result of a subtraction of two BCD digits to a valid 2-digit BCD number.
            </p>
            <p>
                Traditionally, this instruction is &apos;ASCII Adjust After Subtraction&apos;.
                This would lead one to believe that it works on ASCII digits (<code>30h</code> (<code>&quot;0&quot;</code>) through <code>39h</code> (<code>&apos;9&apos;</code>)), however, this is incorrect.
                This instruction <em>actually</em> operates on binary coded decimal (BCD) digits (<code>00h</code> through <code>09h</code>).
            </p>
            <p>
                {Canned.InvalidLong}
            </p>
        </>
    ),
    operation:
        `public void AAS(U8 imm8)
{
    if ((AL & 0xF) > 9 || EFLAGS.AF)
        AX -= 0x106;
    AL &= 0xF;
}`,
    flags: {
        CF: <>Set if an adjustment is made. Cleared otherwise.</>,
        PF: <>Undefined.</>,
        AF: <>Set if an adjustment is made. Cleared otherwise.</>,
        ZF: <>Undefined.</>,
        SF: <>Undefined.</>,
        OF: <>Undefined.</>,
    },
    exceptions: {
        real: {
            UD: Exceptions.Lock,
        },
        virtual: {
            UD: Exceptions.Lock,
        },
        protected: {
            UD: Exceptions.Lock,
        },
        compatibility: {
            UD: Exceptions.Lock,
        },
        long: {
            UD: Exceptions.InLong,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
