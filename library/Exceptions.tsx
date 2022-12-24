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
    EvexNotL0: <>If <code>EVEX.LL</code> is not <code>00b</code>.</>,
    EvexVvvvv: <>If <code>EVEX.vvvvv</code> is not <code>11111b</code>.</>,
    InCompatibility: <>If in Compatibility Mode.</>,
    InReal: <>If in Real Mode.</>,
    InRealOrVirtual8086: <>If in Real or Virtual-8086 Mode.</>,
    InLong: <>If in Long Mode.</>,
    InProtected: <>If in Protected Mode.</>,
    InProtectedOrLong: <>If in Protected or Compatibility Mode.</>,
    InVirtual8086: <>If in Virtual-8086 Mode.</>,
    InsideEnclave: <>If inside an enclave.</>,
    Lock: <>If the <Instruction name="lock" noTitle /> prefix is used.</>,
    LockNoMem: <>If the <Instruction name="lock" noTitle /> prefix is used, but the destination is not a memory operand.</>,
    NoFpu: <>If <Register name="CR0.EM" /> is set (no internal or external FPU)</>,
    SibRequired: <>If 16 bit addressing is used, or 32 or 64 bit addressing is used, but without an SIB byte (<code>rm</code> is not <code>100b</code>).</>,
    VexNotL0: <>If <code>VEX.L</code> is not <code>0</code>.</>,
    VexNotL1: <>If <code>VEX.L</code> is not <code>1</code>.</>,
    VexNotW0: <>If <code>VEX.W</code> is not <code>0</code>.</>,
    VexNotW1: <>If <code>VEX.W</code> is not <code>1</code>.</>,
    VexVvvv: <>If <code>VEX.vvvv</code> is not <code>1111b</code>.</>,
    XopVvvv: <>If <code>XOP.vvvv</code> is not <code>1111b</code>.</>, // TODO: is this a thing?

    // #NM
    EMOrTSSet: <>If <Register name="CR0.EM" /> or <Register name="CR0.TS" /> are <code>1</code>.</>,
    TaskSwitchOccured: <>If <Register name="CR0.TS" /> is set (a task switch occurred).</>,

    // #SS(0)
    NonCanonSS: <>If a memory operand using the <code>SS</code> segment is in non-canonical form.</>, // TODO: link to a page on canonicalness
    SegLimitSS: <>If a memory operand using the <code>SS</code> segment has an effective address that is outside the <code>SS</code> segment&apos;s limit.</>,

    // #GP(0)
    NonAlignedMemory: (bytes: number) => (
        <>If a memory operand is not aligned to a <Unit value={bytes} unit="byte" /> boundary.</>
    ),
    NonCanon: <>If a memory operand (using a segment other than <code>SS</code>) is in non-canonical form.</>,
    NullSelector: <>If a memory operand uses a segment containing a <code>NULL</code> selector.</>,
    NonWritableSegment: <>If the destination is located in a non-writable segment.</>,
    SegLimit: <>If a memory operand (using a segment other than <code>SS</code>) has an effective address that is outside the segment&apos;s limit.</>,

    // #PF(fc)
    PF: <>If a page fault occurs.</>,

    // #MF
    FpuDenormal: <><code>#D</code> - Denormal operand.</>,
    FpuInvalid: <><code>#IA</code> - Invalid arithmetic operation.</>,
    FpuStack: <><code>#IS</code> - Stack overflow or underflow.</>,
    FpuOverflow: <><code>#O</code> - Numeric overflow.</>,
    FpuPrecision: <><code>#P</code> - Inexact result.</>,
    FpuUnderflow: <><code>#U</code> - Numeric underflow.</>,
    FpuDivideBy0: <><code>#Z</code> - Divide-by-zero.</>,
    PendingFpuException: <>If an FPU exception is pending.</>,

    // #AC(0)
    AC: <>If alignment checking is enabled while the current privilege level is 3 and an unaligned memory access is made.</>,

    // #XM
    SimdDenormal: <><code>#D</code> - Denormal operand.</>,
    SimdInvalid: <><code>#I</code> - Invalid operation.</>,
    SimdOverflow: <><code>#O</code> - Numeric overflow.</>,
    SimdPrecision: <><code>#P</code> - Inexact result.</>,
    SimdUnderflow: <><code>#U</code> - Numeric underflow.</>,
    SimdDivideBy0: <><code>#Z</code> - Divide-by-zero.</>,
};

export default Exceptions;
