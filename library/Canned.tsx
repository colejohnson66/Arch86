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
import assert from "assert";

const Canned = {
    Cpl0Required:
        <>
            This instruction can only be executed when <Register name="CPL" /> is <code>0</code> (i.e. ring 0).
            Attempts to execute this instruction in less privileged rings will cause a <Exception name="UD" /> exception to be raised.
        </>,
    EvexNoFaultSuppression: <>The EVEX form of this instruction does not support memory-fault suppression.</>,
    InvalidLong: <>This instruction is not valid in Long Mode.</>,
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
    VvvvReserved: (arg: "vex" | "xop" | "evex" | "vex+xop" | "vex+evex" | "all") => {
        let jsx: React.ReactNode;
        if (arg === "vex")
            jsx = <><code>VEX.vvvv</code> is reserved and must be <code>b1111</code> (<code>0</code> inverted).</>;
        // else if (arg === "xop")
        //     jsx = <><code>XOP.vvvv</code> is reserved and must be <code>b1111</code> (<code>0</code> inverted).</>;
        // else if (arg === "evex")
        //     jsx = <><code>EVEX.vvvv</code> is reserved and must be <code>b11111</code> (<code>0</code> inverted).</>;
        // else if (arg === "vex+xop")
        //     jsx = <><code>VEX.vvvv</code> and <code>XOP.vvvv</code> are reserved and must both be <code>b1111</code> (<code>0</code> inverted).</>;
        // else if (arg === "vex+evex")
        //     jsx = <><code>VEX.vvvv</code> and <code>EVEX.vvvvv</code> are reserved and must be <code>b1111</code> and <code>b11111</code>, respectively (<code>0</code> inverted).</>;
        // else if (arg === "all")
        //     jsx = <><code>VEX.vvvv</code>, <code>XOP.vvvv</code>, and <code>EVEX.vvvvv</code> are reserved and must all be <code>b1111</code> (VEX and XOP) or <code>b11111</code> (EVEX) (<code>0</code> inverted).</>;
        else
            assert(false);
        return <>{jsx} Any other values will raise a <Exception name="UD" /> exception.</>;
    },
    WIgnoredIn32: (arg: "vex" | "xop" | "vex+xop" | "vex+evex") => {
        let jsx: React.ReactNode;
        if (arg === "vex")
            jsx = <><code>VEX.W1</code> is treated as <code>VEX.W0</code></>;
        else if (arg === "xop")
            jsx = <><code>XOP.W1</code> is treated as <code>XOP.W0</code></>;
        else if (arg === "vex+xop")
            jsx = <><code>VEX.W1</code> and <code>XOP.W1</code> are treated as <code>VEX.W0</code> and <code>XOP.W0</code> (respectively)</>;
        else if (arg === "vex+evex")
            jsx = <><code>VEX.W1</code> and <code>EVEX.W1</code> are treated as <code>VEX.W0</code> and <code>EVEX.W0</code> (respectively)</>;
        return (
            <>
                The operand size is always <Unit value={32} unit="bits" /> if not in Long Mode.
                In other words, {jsx} outside Long Mode.
            </>
        );
    },
};

export default Canned;
