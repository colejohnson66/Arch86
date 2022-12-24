/* =============================================================================
 * File:   das.tsx
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
import Instruction from "@components/Instruction";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "das",
    title: <>Decimal Adjust <Register name="AL" /> After Subtraction</>,
    titlePlain: "Decimal Adjust AL After Subtraction",
    opcodes: [
        {
            opcode: <>2F</>,
            mnemonic: <>DAS</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>Decimal adjust <Register name="AL" /> after subtraction.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>DAS</code> instruction converts the result of a subtraction of two (packed) BCD digits to a valid 2-digit BCD number.
            </p>
            <p>
                An &quot;packed&quot; BCD number is one where each byte contains two digits &ndash; one in each nibble.
                In contrast, an unpacked BCD number is one where each byte contains a single digit.
                The <Instruction name="aas" /> instruction handles that case.
            </p>
            <p>
                {Canned.InvalidLong}
            </p>
        </>
    ),
    operation:
        `public void DAS()
{
    byte oldAL = AL;
    bool oldCF = EFLAGS.CF; // CF could be set in the ones place adjustment

    // adjust ones place
    if ((AL & 0xF) > 9 || EFLAGS.AF)
        AL -= 6;

    // adjust tens place
    if (oldAL > 0x99 || oldCF)
        AL -= 0x60;
}`,
    examples: [
        `mov al, 0x35 ; 35 (decimal) in packed BCD
sub al, 0x79 ; AL == 0xBC
das          ; AL == 0x56 with carry set (giving -0x44)`,
    ],
    flags: {
        CF: <>Set if an adjustment results in a decimal borrow into either digit. Cleared otherwise.</>,
        PF: <>Set according to the result.</>,
        AF: <>Set if an adjustment results in a decimal borrow into either digit. Cleared otherwise.</>,
        ZF: <>Set according to the result.</>,
        SF: <>Set according to the result.</>,
        OF: <>Undefined.</>,
    },
    exceptionsLegacy: {
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
