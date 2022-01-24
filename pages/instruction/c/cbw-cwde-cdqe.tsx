/* =============================================================================
 * File:   cbw-cwde-cdqe.tsx
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
    id: "cbw-cwde-cdqe",
    title: <>Sign Extend Accumulator</>,
    titlePlain: "Sign Extend Accumulator",
    opcodes: [
        {
            opcode: <>98</>,
            mnemonic: <>CBW</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Sign extend <Register name="AL" /> into <Register name="AX" />.</>,
        },
        {
            opcode: <>98</>,
            mnemonic: <>CWDE</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Sign extend <Register name="AX" /> into <Register name="EAX" />.</>,
        },
        {
            opcode: <>REX.W 98</>,
            mnemonic: <>CDQE</>,
            encoding: "zo",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Sign extend <Register name="EAX" /> into <Register name="RAX" />.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>CBW/CWDE/CDQE</code> instructions sign extend the accumulator to the next larger size.
            </p>
        </>
    ),
    operation:
        `public void CBW()
{
    AX = SignExtend(AL);
}

public void CWDE()
{
    EAX = SignExtend(AX);
}

public void CDQE()
{
    RAX = SignExtend(EAX);
}`,
    flags: "none",
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
