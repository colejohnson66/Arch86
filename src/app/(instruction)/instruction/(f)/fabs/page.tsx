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

import Exceptions from "@/library/Exceptions";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "fabs",
    title: <>Floating-Point Absolute Value</>,
    titlePlain: "Floating-Point Absolute Value",
    opcodes: [
        {
            opcode: <>D9 F1</>,
            mnemonic: <>FABS</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "fpu",
            description: <>Replace <Register name="ST(0)" /> with its absolute value.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>FABS</code> instruction computes the absolute value of the source operand.
                The result is stored in the destination operand.
                The source and destination operands are implicitly <code>ST(0)</code>.
            </p>
        </>
    ),
    operation:
        `public void FABS()
{
    F80 x = FpuPop();
    x.Sign = 0;
    FpuPush(x);
}`,
    flags: {
        C0: <>Undefined.</>,
        C1: <>Cleared.</>,
        C2: <>Undefined.</>,
        C3: <>Undefined.</>,
    },
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        virtual: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        protected: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        compatibility: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        long: {
            UD: Exceptions.Lock,
            NM: Exceptions.EMOrTSSet,
        },
        fpu: {
            MF: [
                Exceptions.FpuStack,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
