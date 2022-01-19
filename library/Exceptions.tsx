/* =============================================================================
 * File:   Exceptions.tsx
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

import Instruction from "@components/Instruction";
import Register from "@components/Register";
import Unit from "@components/Unit";

const Exceptions = {
    // misc
    CplGT0: <>If <Register name="CPL" /> is greater than <code>0</code>.</>,

    // #UD
    Cpuid: <>If any of the required CPUID feature flags are not set.</>,
    CpuidFeatureFlags: <>If any of the required CPUID feature flags need enabling, but are not.</>,
    EvexVvvvv: <>If <code>EVEX.vvvvv</code> is not <code>11111b</code>.</>,
    InCompatibility: <>If in Compatibility Mode.</>,
    InReal: <>If in Real Mode.</>,
    InLong: <>If in Long Mode.</>,
    InProtected: <>If in Protected Mode.</>,
    InVirtual8086: <>If in Virtual-8086 Mode.</>,
    Lock: <>If the <Instruction name="lock" noTitle /> prefix is used.</>,
    LockNoMem: <>If the <Instruction name="lock" noTitle /> prefix is used, but the destination is not a memory operand.</>,
    SibRequired: <>If 16 bit addressing is used, or 32 or 64 bit addressing is used, but without an SIB byte (<code>rm</code> is not <code>100b</code>).</>,
    VexNotL0: <>If <code>VEX.L</code> is not 0.</>,
    VexNotL1: <>If <code>VEX.L</code> is not 1.</>,
    VexNotW0: <>If <code>VEX.W</code> is not 0.</>,
    VexNotW1: <>If <code>VEX.W</code> is not 1.</>,
    VexVvvv: <>If <code>VEX.vvvv</code> is not <code>1111b</code>.</>,
    XopVvvv: <>If <code>XOP.vvvv</code> is not <code>1111b</code>.</>, // TODO: is this a thing?

    // #SS(0)
    NonCanonSS: <>If a memory operand using the <code>SS</code> segment is in non-canonical form.</>, // TODO: link to a page on canonicalness
    SegLimitSS: <>If a memory operand using the <code>SS</code> segment has an effective address that is outside the <code>SS</code> segment&apos;s limit.</>,

    // #GP(0)
    NonAlignedMemory: (bytes: number) => (
        <>If a memory operand is not aligned to a <Unit value={bytes} unit="byte" /> boundary.</>
    ),
    NonCanon: <>If a memory operand (using a semgent other than <code>SS</code>) is in non-canonical form.</>,
    NullSelector: <>If a memory operand uses a segment containing a <code>NULL</code> selector.</>,
    NonWritableSegment: <>If the destination is located in a non-writable segment.</>,
    SegLimit: <>If a memory operand (using a segment other than <code>SS</code>) has an effective address that is outside the segment&apos;s limit.</>,

    // #PF(fc)
    PF: <>If a page fault occurs.</>,

    // #AC(0)
    AC: <>If alignment checking is enabled while the current privilege level is 3 and an unaligned memory access is made.</>,
};

export default Exceptions;
