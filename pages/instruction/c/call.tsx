/* =============================================================================
 * File:   call.tsx
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

const PageData: InstructionPageLayoutProps = {
    wip: true,
    id: "call",
    title: <>Call Procedure</>,
    titlePlain: "Call Procedure",
    opcodes: [
        {
            opcode: <>E8 <i>cw</i></>,
            mnemonic: <>CALL <i>rel16</i></>,
            encoding: "i",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/s",
            },
            description: <>Call a near procedure with a relative offset of <i>rel16</i>.</>,
        },
        {
            opcode: <>E8 <i>cd</i></>,
            mnemonic: <>CALL <i>rel32</i></>,
            encoding: "i",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Call a near procedure with a relative offset of <i>rel32</i>.</>,
        },
        {
            opcode: <>FF /2</>,
            mnemonic: <>CALL <i>r/m16</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Call a near procedure with an absolute (indirect) offset <i>r/m16</i>.</>,
        },
        {
            opcode: <>FF /2</>,
            mnemonic: <>CALL <i>r/m32</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "n/e",
            },
            description: <>Call a near procedure with an absolute (indirect) offset <i>r/m32</i>.</>,
        },
        {
            opcode: <>FF /2</>,
            mnemonic: <>CALL <i>r/m64</i></>,
            encoding: "m",
            validity: {
                16: "n/e",
                32: "n/e",
                64: "valid",
            },
            description: <>Call a near procedure with an absolute (indirect) offset <i>r/m64</i>.</>,
        },
        {
            opcode: <>9A <i>seg16</i> <i>cw</i></>,
            mnemonic: <>CALLF <i>ptr16:16</i></>,
            encoding: "p",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>Call a far procedure with an absolute offset <i>ptr16:16</i>.</>,
        },
        {
            opcode: <>9A <i>seg16</i> <i>cd</i></>,
            mnemonic: <>CALLF <i>ptr16:32</i></>,
            encoding: "p",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>Call a far procedure with an absolute offset <i>ptr16:32</i>.</>,
        },
        {
            opcode: <>FF mem/3</>,
            mnemonic: <>CALLF <i>m16:16</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>Call a far procedure with an absolute (indirect) offset <i>m16:16</i>.</>,
        },
        {
            opcode: <>FF mem/3</>,
            mnemonic: <>CALLF <i>m16:32</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "invalid",
            },
            description: <>Call a far procedure with an absolute (indirect) offset <i>m16:32</i>.</>,
        },
        {
            opcode: <>FF mem/3</>,
            mnemonic: <>CALLF <i>m16:64</i></>,
            encoding: "m",
            validity: {
                16: "invalid",
                32: "invalid",
                64: "valid",
            },
            description: <>Call a far procedure with an absolute (indirect) offset <i>m16:64</i>.</>,
        },
    ],
    encodings: {
        i: ["imm16/32"],
        m: ["ModRM.r/m[rw]"],
        p: ["imm16+16/32"],
    },
    description: (
        <>
            <p>
                The <code>CALL</code> instruction saves a return address on the stack before jumping to the called procedure specified in the operand.
            </p>
        </>
    ),
    operation:
        `public void CALL()
{
    // TODO
}`,
    flags: {
        CF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
        PF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
        AF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
        ZF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
        SF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
        OF: <>Affected if a task switch occurs. Unmodified otherwise.</>,
    },
    exceptions: {
        real: {
        },
        virtual: {
        },
        protected: {
        },
        compatibility: {
        },
        long: {
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
