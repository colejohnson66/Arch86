/* =============================================================================
 * File:   Canned.tsx
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

import A from "@components/A";
import Exception from "@components/Exception";
import Instruction from "@components/Instruction";
import Register from "@components/Register";
import Unit from "@components/Unit";

const Canned = {
    Cpl0Required:
        <>
            This instruction can only be executed when <Register name="CPL" /> is <code>0</code> (i.e. ring 0).
            Attempts to execute this instruction in less privileged rings will cause a <Exception name="UD" /> exception to be raised.
        </>,
    EvexNoFaultSuppression: <>The EVEX form of this instruction does not support memory-fault suppression.</>,
    InvalidLong: <>This instruction is not valid in long mode.</>,
    LegacySimd: <>All forms except the legacy SSE one will zero the upper (untouched) bits.</>,
    LegacySimdMultiple: <>All forms except the legacy SSE ones will zero the upper (untouched) bits.</>,
    Lockable: <>This instruction can be used with the <Instruction name="lock" noTitle /> prefix to allow atomic exectution.</>,
    NoLongNE: (otherInstr: string) => {
        const prefix = "This instruction is not encodable in Long Mode, and, if encountered, will be interpreted as";
        if (otherInstr === "evex")
            return <>{prefix} the EVEX prefix.</>;
        if (otherInstr === "vex")
            return <>{prefix} the VEX prefix.</>;
        return <>{prefix} <Instruction name={otherInstr} />.</>;
    },
    RexR8Encoding: <>This uses the <A href="/instruction/help#headingOverviewAlternateGpr8Encoding">alterate <code>gpr8</code> encoding</A>.</>,
    UndocumentedOpcode: <>Undocumented.</>, // TODO: link to a page about undocumented opcodes
    VvvvReserved: (arg: "both" | "vex" | "evex") => {
        if (arg === "both")
            return <><code>VEX.vvvv</code> and <code>EVEX.vvvvv</code> are reserved and must be <code>b1111</code> and <code>b11111</code> (respectively). Any other values will raise a <code>#UD</code> exception.</>;
        if (arg === "vex")
            return <><code>VEX.vvvv</code> is reserved and must be <code>b1111</code>. Any other values will raise a <code>#UD</code> exception.</>;
        if (arg === "evex")
            return <><code>EVEX.vvvvv</code> is reserved and must be <code>b11111</code>. Any other values will raise a <code>#UD</code> exception.</>;
    },
    WIgnoredIn32: (
        <>
            The operand size is always <Unit value={32} unit="bits" /> if not in 64 bit mode.
            In other words, <code>VEX.W1</code> is treated as <code>VEX.W0</code> outside 64 bit mode.
        </>
    ),
};

export default Canned;
