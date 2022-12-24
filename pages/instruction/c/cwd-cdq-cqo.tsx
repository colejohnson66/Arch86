/* =============================================================================
 * File:   cwd-cdq-cqo.tsx
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
import Instruction from "@components/Instruction";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cwd-cdq-cqo",
    title: <>Sign Extend Accumulator Into <Register name="rDX" /></>,
    titlePlain: "Sign Extend Accumulator Into rDX",
    opcodes: [
        {
            opcode: <>99</>,
            mnemonic: <>CWD</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Sign extend <Register name="AX" /> into <Register name="DX" />.</>,
        },
        {
            opcode: <>99</>,
            mnemonic: <>CDQ</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Sign extend <Register name="EAX" /> into <Register name="EDX" />.</>,
        },
        {
            opcode: <>REX.W 99</>,
            mnemonic: <>CQO</>,
            encoding: "zo",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Sign extend <Register name="RAX" /> into <Register name="RDX" />.</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>CWD/CDQ/CQO</code> instructions sign extend the accumulator into the data register (<Register name="rDX" />).
                This essentially sets every bit of the data register to that of the accumulator.
            </p>
            <p>
                This instruction is similar to <Instruction name="cbw-cwde-cdqe" />, but working into the data register.
            </p>
        </>
    ),
    operation:
        `public void CWD()
{
    // DX:AX = SignExtend(AX)
    DX = AX.Bit[15] ? 0xFFFF : 0;
}

public void CDQ()
{
    // EDX:EAX = SignExtend(EAX)
    EDX = EAX.Bit[31] ? 0xFFFFFFFF : 0;
}

public void CQO()
{
    // RDX:RAX = SignExtend(RAX)
    RDX = RAX.Bit[63] ? 0xFFFFFFFFFFFFFFFF : 0;
}`,
    flags: "none",
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
            UD: Exceptions.Lock,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
