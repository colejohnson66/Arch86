/* =============================================================================
 * File:   clts.tsx
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
    id: "clts",
    title: <>Clear Task-Switched Flag in <Register name="CR0" /></>,
    titlePlain: "Clear Task-Switched Flag in CR0",
    opcodes: [
        {
            opcode: <>0F 06</>,
            mnemonic: <>CLTS</>,
            encoding: "zo",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            description: <>Clear <Register name="CR0.TS" /> (task-switched flag).</>,
        },
    ],
    encodings: {
        operands: 1,
        encodings: {
            "zo": ["None"],
        },
    },
    description: (
        <>
            <p>
                The <code>CLTS</code> instruction clears (resets) the task-switched flag in <Register name="CR0" />.
            </p>
            <p>
                <Register name="CR0.TS" /> is a flag that is set whenever a task switch occurs, and is used to synchronize the saving of the FPU context in multitasking environments.
            </p>
            <p>
                {Canned.Cpl0Required}
            </p>
        </>
    ),
    operation:
        `public void CLTS()
{
    EFLAGS.TS = 0;
}`,
    flags: "none",
    exceptions: {
        real: {
            UD: Exceptions.InReal,
        },
        virtual: {
            UD: Exceptions.InVirtual8086,
        },
        protected: {
            UD: Exceptions.Lock,
            GP0: Exceptions.CplGT0,
        },
        compatibility: {
            UD: Exceptions.Lock,
            GP0: Exceptions.CplGT0,
        },
        long: {
            UD: Exceptions.Lock,
            GP0: Exceptions.CplGT0,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
