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
    id: "clac",
    title: <>Clear Alignment Check Flag</>,
    titlePlain: "Clear Alignment Check Flag",
    opcodes: [
        {
            opcode: <>NP 0F 01 CA</>,
            mnemonic: <>CLAC</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "smap",
            description: <>Clear the <Register name="AC" /> flag (alignment checking) in <Register name="EFLAGS" />.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>CLAC</code> instruction clears the <Register name="AC" /> flag (alignment checking) in the <Register name="EFLAGS" /> register.
            </p>
            <p>
                {Canned.Cpl0Required}
            </p>
        </>
    ),
    operation:
        `public void CLAC()
{
    EFLAGS.AC = 0;
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        OF: <>Unmodified.</>,
        AC: <>Cleared.</>,
    },
    exceptionsLegacy: {
        real: {
            UD: Exceptions.Lock,
        },
        virtual: {
            UD: Exceptions.InVirtual8086,
        },
        protected: {
            UD: [
                Exceptions.CplGT0,
                Exceptions.Lock,
            ],
        },
        compatibility: {
            UD: [
                Exceptions.CplGT0,
                Exceptions.Lock,
            ],
        },
        long: {
            UD: [
                Exceptions.CplGT0,
                Exceptions.Lock,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
