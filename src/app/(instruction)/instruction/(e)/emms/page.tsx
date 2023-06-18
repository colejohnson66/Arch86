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

import Exception from "@/components/Exception";
import Exceptions from "@/library/Exceptions";
import Register from "@/components/Register";

const PageData: InstructionPageLayoutProps = {
    id: "emms",
    title: <>Empty MMX State</>,
    titlePlain: "Empty MMX State",
    opcodes: [
        {
            opcode: <>NP 0F 77</>,
            mnemonic: <>EMMS</>,
            encoding: "zo",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "mmx",
            description: <>Set all eight fields in <Register name="FPU.TagWord" /> to empty (<code>11b</code>)</>,
        },
    ],
    encodings: {
        zo: ["None"],
    },
    description: (
        <>
            <p>
                The <code>EMMS</code> instruction empties (clears) the MMX state.
                It does so by setting all eight fields in <Register name="FPU.TagWord" /> to empty (<code>11b</code>).
            </p>
            <p>
                This instruction must be used before using the x87 FPU (if any MMX instructions were executed).
                Failure to do so is undefined and could result in an FPU stack overflow that can result in either an <Exception name="MF" /> exception or an incorrect result.
            </p>
        </>
    ),
    operation:
        `public void EMMS()
{
    FPU.TagWord = 0xFFFF;
}`,
    flags: "none",
    intrinsics: [
        "void _mm_empty()",
    ],
    exceptionsLegacy: {
        real: {
            UD: [
                Exceptions.Lock,
                Exceptions.NoFpu,
            ],
            NM: Exceptions.TaskSwitchOccured,
            MF: Exceptions.PendingFpuException,
        },
        virtual: {
            UD: [
                Exceptions.Lock,
                Exceptions.NoFpu,
            ],
            NM: Exceptions.TaskSwitchOccured,
            MF: Exceptions.PendingFpuException,
        },
        protected: {
            UD: [
                Exceptions.Lock,
                Exceptions.NoFpu,
            ],
            NM: Exceptions.TaskSwitchOccured,
            MF: Exceptions.PendingFpuException,
        },
        compatibility: {
            UD: [
                Exceptions.Lock,
                Exceptions.NoFpu,
            ],
            NM: Exceptions.TaskSwitchOccured,
            MF: Exceptions.PendingFpuException,
        },
        long: {
            UD: [
                Exceptions.Lock,
                Exceptions.NoFpu,
            ],
            NM: Exceptions.TaskSwitchOccured,
            MF: Exceptions.PendingFpuException,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
