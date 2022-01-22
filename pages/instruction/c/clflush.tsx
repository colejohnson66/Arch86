/* =============================================================================
 * File:   clflush.tsx
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

const PageData: InstructionPageLayoutProps = {
    id: "clflush",
    title: <>Flush Cache Line</>,
    titlePlain: "Flush Cache Line",
    opcodes: [
        {
            opcode: <>NP 0F AE mem/7</>,
            mnemonic: <>CLFLUSH <i>m8</i></>,
            encoding: "M",
            validity: {
                16: "valid",
                32: "valid",
                64: "valid",
            },
            cpuid: "clflush",
            description: <>Flush the cache line containing <i>m8</i>.</>,
        },
    ],
    encodings: {
        operands: 1,
        encodings: {
            "M": ["ModRM.r/m[w]"],
        },
    },
    description: (
        <>
            <p>
                The <code>CLFLUSH</code> instruction invalidates every level of the cache hierarchy containing the operand&apos;s effective address.
                This will force any &quot;dirty&quot; memory in the caches to be written back to main memory.
            </p>
            <p>
                Executions of this instruction are ordered with respect to each other, writes, locked RMW (read&#x2011;modify&#x2011;write), and &quot;fence&quot; instructions.
                However, they are <em>not</em> ordered with respect to executions of <Instruction name="clflushopt" /> and <Instruction name="clwb" />.
            </p>
            <p>
                In some architectures, this instruction may cause a transactional abort with the Transactional Synchronization Extensions (TSX).
                However, programmers must not rely on this behavior.
            </p>
        </>
    ),
    operation:
        `public void CLFLUSH(IntPtr addr)
{
    CacheLineFlush(addr);
}`,
    intrinsics: [
        "void _mm_clflush(const void *ptr)",
    ],
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