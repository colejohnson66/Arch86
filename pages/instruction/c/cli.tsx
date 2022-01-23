/* =============================================================================
 * File:   cli.tsx
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

import Exception from "@components/Exception";
import Exceptions from "@library/Exceptions";
import Register from "@components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "cli",
    title: <>Clear Interrupt Enable Flag</>,
    titlePlain: "Clear Interrupt Enable Flag",
    opcodes: [
        {
            opcode: <>FA</>,
            mnemonic: <>CLI</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            description: <>Clear <Register name="EFLAGS.IF" />.</>,
        },
    ],
    encodings: {
        operands: 1,
        encodings: {
            zo: ["None"],
        },
    },
    description: (
        <>
            <p>
                The <code>CLI</code> instruction clears <Register name="EFLAGS.IF" /> (the interrupt enable flag).
                Doing so will cause the processor to ignore maskable (external) interrupts.
            </p>
            <p>
                Operation depends on the operating mode and the current privilege level of the executing code.
                In addition, two seprate conditions regarding virtual interrupts are used:
            </p>
            <dl>
                <dt><code>VME</code> Mode (Virtual-8086 Mode Extensions)</dt>
                <dd>If in Virtual-8086 Mode and <Register name="CR4.VME" /> is <code>1</code>.</dd>
                <dt><code>PVI</code> Mode (Protected Mode Virtual Interrupts)</dt>
                <dd>If in Protected Mode, <Register name="CPL" /> is <code>3</code>, and <Register name="CR4.PVI" /> is <code>1</code>.</dd>
            </dl>
            <p>
                With those two definitions, operation follows this truth table:
            </p>
            <table className="instruction-table">
                <thead>
                    <tr>
                        <th>Mode</th>
                        <th><code>IOPL</code></th>
                        <th><code>CLI</code> Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Real Mode</td>
                        <td>n/a</td>
                        <td><code>IF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Virtual-8086 Mode, not <code>VME</code></td>
                        <td><code>0-2</code></td>
                        <td><Exception name="GP" /> fault</td>
                    </tr>
                    <tr>
                        <td><code>3</code></td>
                        <td><code>IF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Virtual-8086 Mode, <code>VME</code></td>
                        <td><code>0-2</code></td>
                        <td><code>VIF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td><code>3</code></td>
                        <td><code>IF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Protected Mode, not <code>PVI</code></td>
                        <td><code>&lt;CPL</code></td>
                        <td><Exception name="GP" /> fault</td>
                    </tr>
                    <tr>
                        <td><code>&ge;CPL</code></td>
                        <td><code>IF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Protected Mode, <code>PVI</code></td>
                        <td><code>0-2</code></td>
                        <td><code>VIF &larr; 0</code></td>
                    </tr>
                    <tr>
                        <td><code>3</code></td>
                        <td><code>IF &larr; 0</code></td>
                    </tr>
                </tbody>
            </table>
        </>
    ),
    operation:
        `public void CLI()
{
    if (!CR0.PE)
    {
        // real mode
        EFLAGS.IF = 0;
        return;
    }

    if (IOPL > CPL)
    {
        // NOTE: CPL is 3 in virtual-8086 mode
        EFLAGS.IF = 0;
        return;
    }

    bool vme = EFLAGS.VM && CR4.VME;
    bool pvi = !EFLAGS.VM && CPL > 3 && CR4.PVI;
    if (vme || pvi)
        EFLAGS.VIF = 0;
    #GP(0);
}`,
    flags: {
        CF: <>Unmodified.</>,
        PF: <>Unmodified.</>,
        AF: <>Unmodified.</>,
        ZF: <>Unmodified.</>,
        SF: <>Unmodified.</>,
        IF: <>Cleared if in Real Mode or if <Register name="IOPL" /> is greater than or equal to <Register name="CPL" />.</>,
        OF: <>Unmodified.</>,
        VIF: <>Cleared if in <code>VME</code> or <code>PVI</code> submodes and <Register name="EFLAGS.IF" /> is unmodified.</>,
    },
    exceptions: {
        real: {
            UD: Exceptions.Lock,
        },
        virtual: {
            UD: Exceptions.Lock,
            GP0: <>If <Register name="IOPL" /> is less than <code>3</code> and the <code>VME</code> submode is not active.</>,
        },
        protected: {
            UD: Exceptions.Lock,
            GP0: [
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> but also less than <code>3</code>.</>,
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> and the <code>PVI</code> submode is not active.</>,
            ],
        },
        compatibility: {
            UD: Exceptions.Lock,
            GP0: [
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> but also less than <code>3</code>.</>,
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> and the <code>PVI</code> submode is not active.</>,
            ],
        },
        long: {
            UD: Exceptions.Lock,
            GP0: [
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> but also less than <code>3</code>.</>,
                <>If <Register name="CPL" /> is greater than <Register name="IOPL" /> and the <code>PVI</code> submode is not active.</>,
            ],
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
