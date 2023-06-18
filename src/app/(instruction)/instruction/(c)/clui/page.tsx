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
    id: "clui",
    title: <>Clear User Interrupt Flag</>,
    titlePlain: "Clear User Interrupt Flag",
    opcodes: [
        {
            opcode: <>F3 0F 01 EE</>,
            mnemonic: <>CLUI</>,
            encoding: "zo",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            cpuid: "uintr",
            description: <>Clear the user interrupt flag.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>CLUI</code> instruction clears the user interrupt flag (<Register name="UIF" />).
                The effect takes place immediately.
                When cleared, user interrupts cannot be delivered.
            </p>
        </>
    ),
    operation:
        `public void CLUI()
{
    UIF = false;
}`,
    exceptions: {
        modes: ["real", "v8086", "prot/compat", "long"],
        causes: {
            UD: [
                ["xx  ", Exceptions.InRealOrVirtual8086],
                ["  x ", Exceptions.InProtectedOrLong],
                ["   x", Exceptions.Lock],
                ["   x", Exceptions.InsideEnclave],
                ["   x", <>If <Register name="CR4.UINTR" /> is cleared.</>],
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
