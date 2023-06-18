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
    id: "enter",
    title: <>Make Stack Frame for Procedure Paramters</>,
    titlePlain: "Make Stack Frame for Procedure Paramters",
    opcodes: [
        {
            opcode: <>C8 <i>iw</i>, <i>ib</i></>,
            mnemonic: <>ENTER <i>imm16</i>, <i>imm8</i></>,
            encoding: "ii",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "invalid",
            },
            description: <>Create a stack frame with <i>imm16</i> bytes reserved for locals and <i>imm8</i> levels of nesting.</>,
        },
    ],
    encodings: {
        ii: ["imm16", "imm8"],
    },
    description: (
        <>
            <p>
                The <code>ENTER</code> instruction is used to create a stack frame for procedure parameters.
                The first operand specifies the number of bytes to be reserved for the callee&apos;s local variables.
                The second operand (modulus 32) specifies the nesting level of the procedure.
            </p>
            <p>
                If the nesting level (the second operand) is <code>0</code>, the processor pushes the frame pointer from <Register name="rBP" /> onto the stack, and moves <Register name="rSP" /> into <Register name="rBP" />.
                For nesting levels of one or more, the processor does the same, but pushes that number of frame pointers onto the stack as well.
            </p>
            <p>
                This instruction&apos;s companion instruction, <code>LEAVE</code>, is used to tear down the stack frame.
            </p>
            <p>
                {Canned.LongModeDefaultsTo64Bit}
            </p>
        </>
    ),
    operation:
        `public void ENTER_16(U16 imm16, U8 imm8)
{
    U8 nesting = imm8 % 32;

    Push(BP);
    U16 frameTemp = SP;

    for (U8 i = 0; i < nesting; i++)
    {
        BP -= 2;
        if (i < nesting - 1)
            Push(Mem16[BP]); // only push the frame pointer if it's not the last one
    }

    BP = frameTemp;
    SP -= imm16;
}

public void ENTER_16(U16 imm16, U8 imm8)
{
    U8 nesting = imm8 % 32;

    Push(EBP);
    U32 frameTemp = ESP;

    for (U8 i = 0; i < nesting; i++)
    {
        EBP -= 4;
        if (i < nesting - 1)
            Push(Mem32[EBP]); // only push the frame pointer if it's not the last one
    }

    EBP = frameTemp;
    ESP -= imm16;
}

public void ENTER_64(U16 imm16, U8 imm8)
{
    U8 nesting = imm8 % 32;

    Push(RBP);
    U64 frameTemp = RSP;

    for (U8 i = 0; i < nesting; i++)
    {
        RBP -= 8;
        if (i < nesting - 1)
            Push(Mem64[RBP]); // only push the frame pointer if it's not the last one
    }

    RBP = frameTemp;
    RSP -= imm16;
}`,
    flags: "none",
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
            SS0: <>If the new value of <Register name="SS" /> is outside the <Register name="SS" /> segment&apos; limit.</>,
        },
        virtual: {
            UD: Exceptions.Lock,
            SS0: <>If the new value of <Register name="SS" /> is outside the <Register name="SS" /> segment&apos; limit.</>,
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        protected: {
            UD: Exceptions.Lock,
            SS0: <>If the new value of <Register name="SS" /> is outside the <Register name="SS" /> segment&apos; limit.</>,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        compatibility: {
            // same as protected
            UD: Exceptions.Lock,
            SS0: <>If the new value of <Register name="SS" /> is outside the <Register name="SS" /> segment&apos; limit.</>,
            GP0: [
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
            ],
            PF: Exceptions.PF,
            AC0: Exceptions.AC,
        },
        long: {
            UD: Exceptions.Lock,
            SS0: [
                Exceptions.NonCanonSS,
                <>If the new value of <Register name="SS" /> is outside the <Register name="SS" /> segment&apos; limit.</>,
            ],
            GP0: [
                Exceptions.NonCanon,
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
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
