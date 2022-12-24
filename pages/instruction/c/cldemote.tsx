/* =============================================================================
 * File:   cldemote.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "cldemote",
    title: <>Demote Cache Line</>,
    titlePlain: "Demote Cache Line",
    opcodes: [
        {
            opcode: <>NP 0F 1C mem/0</>,
            mnemonic: <>CLDEMOTE <i>m8</i></>,
            encoding: "m",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "cldemote",
            description: <>Hint to the processor that the memory at <i>m8</i> will not be accessed for a while and can be moved to a more distant cache level.</>,
        },
    ],
    encodings: {
        m: ["ModRM.r/m"],
    },
    description: (
        <>
            <p>
                The <code>CLDEMOTE</code> instruction hints to the processor that the cache line containing the operand&apos;s effective address should be moved (&quot;demoted&quot;) to a cache further away from the core.
            </p>
            <p>
                Software using this instruction should ensure that the referenced memory is <em>not</em> accessed afterwards to avoid cache data move penalties.
            </p>
            <p>
                This instruction has no guarantees and may be ignored by the processor.
                For example, usage of this instruction with an effective memory address that is not in the cache will do nothing.
            </p>
            <p>
                In some architectures, this instruction may cause a transactional abort with the Transactional Synchronization Extensions (TSX).
                However, programmers must not rely on this behavior.
            </p>
        </>
    ),
    operation:
        `public void CLDEMOTE(IntPtr addr)
{
    CacheLineDemote(addr);
}`,
    intrinsics: [
        "void _cldemote(const void *ptr)",
    ],
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
