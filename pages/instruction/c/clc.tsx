/* =============================================================================
 * File:   clc.tsx
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

import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "clc",
    title: <>Clear Carry Flag</>,
    titlePlain: "Clear Carry Flag",
    opcodes: [
        {
            opcode: <>F8</>,
            mnemonic: <>CLC</>,
            encoding: "ZO",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Clear <Register name="EFLAGS.CF" /> (carry flag).</>,
        },
    ],
    encodings: {
        operands: 1,
        encodings: {
            "ZO": ["None"],
        },
    },
    description: (
        <>
            <p>
                The <code>CLC</code> instruction clears <Register name="EFLAGS.CF" /> (the carry flag).
            </p>
        </>
    ),
    operation:
        `public void CLC()
{
    EFLAGS.CF = 0;
}`,
    flags: {
        CF: <>Cleared.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        OF: <>Unmodified.</>,
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
            UD: Exceptions.Lock,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
