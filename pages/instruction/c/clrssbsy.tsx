/* =============================================================================
 * File:   clrssbsy.tsx
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
    id: "clrssbsy",
    title: <>Clear Busy Flag in a Supervisor Shadow Stack Token</>,
    titlePlain: "Clear Busy Flag in a Supervisor Shadow Stack Token",
    opcodes: [
        {
            opcode: <>F3 0F AE mem/6</>,
            mnemonic: <>CLRSSBSY <i>m64</i></>,
            encoding: "m",
            validity: {
                16: "invalid",
                32: "valid",
                64: "valid",
            },
            cpuid: "cet-ss",
            description: <>Clear the busy flag in a supervisor shadow stack token at <i>m64</i>.</>,
        },
    ],
    encodings: {
        operands: 1,
        encodings: {
            m: ["ModRM.r/m[rw]"],
        },
    },
    description: (
        <>
            <p>
                The <code>CLRSSBSY</code> instruction clears the &quot;busy&quot; flag in a supervisor shadow stack token located at the operand&apos; effective address.
                Afterwards, the <Register name="SSP" /> (shadow stack pointer) is set to <code>0</code>.
            </p>
        </>
    ),
    operation:
        `public void CLRSSBSY(IntPtr addr)
{
    if (!CR4.CET || !IA32_S_CET.SH_STK_EN)
        #UD;

    if (CPL > 0 || !IsAligned(addr, 8))
        #GP(0);

    ulong newToken = addr.ToInt64();
    ulong expectedToken = newToken | 1; // busy bit is bit 0
    CF = ShadowStackLockCmpxchg8b(addr, newToken, expectedToken) != expectedToken;
    SSP = 0;
}`,
    flags: {
        CF: <>Set if an invalid token was detected. Cleared otherwise.</>,
        PF: <>Cleared.</>,
        AF: <>Cleared.</>,
        ZF: <>Cleared.</>,
        SF: <>Cleared.</>,
        OF: <>Cleared.</>,
    },
    exceptions: {
        real: {
            UD: Exceptions.InReal,
        },
        virtual: {
            UD: Exceptions.InVirtual8086,
        },
        protected: {
            UD: [
                Exceptions.Lock,
                <>If <Register name="CR4.CET" /> is <code>0</code>.</>,
                <>If <Register name="IA32_S_CET.SH_STK_EN" /> is <code>0</code>.</>,
            ],
            GP0: [
                Exceptions.CplGT0,
                Exceptions.NonAlignedMemory(8),
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            SS0: Exceptions.SegLimitSS,
            PF: Exceptions.PF,
        },
        compatibility: {
            // same as protected
            UD: [
                Exceptions.Lock,
                <>If <Register name="CR4.CET" /> is <code>0</code>.</>,
                <>If <Register name="IA32_S_CET.SH_STK_EN" /> is <code>0</code>.</>,
            ],
            GP0: [
                Exceptions.CplGT0,
                Exceptions.NonAlignedMemory(8),
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            SS0: Exceptions.SegLimitSS,
            PF: Exceptions.PF,
        },
        long: {
            UD: [
                Exceptions.Lock,
                <>If <Register name="CR4.CET" /> is <code>0</code>.</>,
                <>If <Register name="IA32_S_CET.SH_STK_EN" /> is <code>0</code>.</>,
            ],
            GP0: [
                Exceptions.CplGT0,
                Exceptions.NonAlignedMemory(8),
                Exceptions.NonCanon,
                Exceptions.NonWritableSegment,
                Exceptions.NullSelector,
                Exceptions.SegLimit,
            ],
            SS0: [
                Exceptions.NonCanonSS,
                Exceptions.SegLimitSS,
            ],
            PF: Exceptions.PF,
        },
    },
};

export default function Page(): React.ReactElement {
    return (
        <InstructionPageLayout {...PageData} />
    );
}
