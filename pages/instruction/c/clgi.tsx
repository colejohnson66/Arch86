/* =============================================================================
 * File:   clgi.tsx
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
    id: "clgi",
    title: <>Clear Global Interrupt Flag</>,
    titlePlain: "Clear Global Interrupt Flag",
    opcodes: [
        {
            opcode: <>0F 01 DD</>,
            mnemonic: <>CLGI</>,
            encoding: "zo",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "svm",
            description: <>Clear <code>GIF</code> (global interrupt flag).</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>CLGI</code> instruction clears the <code>GIF</code> (global interrupt flag).
                While the <code>GIF</code> is cleared, external interupts are disabled.
            </p>
            <p>
                This instruction is a Secure Virtual Machine (SVM) instruction.
                If SVM is disabled, execution of this instruction will raise a <Exception name="UD" /> exception.
            </p>
        </>
    ),
    operation:
        `public void CLGI()
{
    if (!SVM.Enabled)
        #UD;
    GIF = 0;
}`,
    flags: "none",
    exceptionsLegacy: {
        real: {
            UD: Exceptions.InReal,
        },
        virtual: {
            UD: Exceptions.InVirtual8086,
        },
        protected: {
            UD: <>If <Register name="EFER.SVME" /> is <code>0</code> (SVM disabled)</>,
            GP0: Exceptions.CplGT0,
        },
        compatibility: {
            UD: <>If <Register name="EFER.SVME" /> is <code>0</code> (SVM disabled)</>,
            GP0: Exceptions.CplGT0,
        },
        long: {
            UD: <>If <Register name="EFER.SVME" /> is <code>0</code> (SVM disabled)</>,
            GP0: Exceptions.CplGT0,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
