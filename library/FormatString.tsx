/* =============================================================================
 * File:   FormatString.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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
import Instruction from "../components/Instruction";
import React from "react";
import { strict as assert } from "assert";

const cannedNoArg: Record<string, React.ReactElement> = {
    alternateR8Encoding: <>Uses the <A href="/instruction/help#headingAlternateR8Encoding">alternate <i>reg8</i> encoding</A>.</>,

    evexNoER: <>The EVEX form of this instruction does <i>not</i> support memory fault suppression.</>,

    lockable: <>This instruction can be used with the <Instruction name="LOCK" noTitle /> prefix to allow atomic exectution.</>,

    vexLMustBe0: (
        <>
            The length field (the <code>L</code> bit) <i>must</i> be zero (signifying 128 bit vectors).
            Using <code>L1</code> will raise a <code>#UD</code> exception.
        </>
    ),

    vexLShouldBe0: (
        <>
            Although this instruction works with any value of <code>(E)VEX.L</code> (<code>LIG</code>), Intel reccomends that assemblers set <code>(E)VEX.L</code> to 0.
        </>
    ),

    vexWIgnoredIn32: (
        <>
            The operand size is always 32 bits if not in 64 bit mode.
            In other words, <code>VEX.W1</code> is treated as <code>VEX.W0</code> outside 64 bit mode.
        </>
    ),

    zeroUpperSimd: <>All versions <i>except</i> the legacy SSE form will zero the upper (unused) SIMD register bits.</>,
};

const cannedArgs: Record<string, (arg: string) => React.ReactElement> = {
    no16: (arg) => {
        if (arg === "invalid")
            return <>This instruction is invalid in 16 bit mode, and, if encountered, the processor will raise a <code>#UD</code> exception.</>;
        assert(false);
    },

    no64: (arg) => {
        if (arg === "invalid")
            return <>This instruction is invalid in 64 bit mode, and, if encountered, the processor will raise a <code>#UD</code> exception.</>;
        if (arg.startsWith("ne,"))
            return <>This instruction is not encodable in 64 bit mode, and, if encountered, will be treated as the <Instruction name={arg.substring(3)} /> instruction.</>;
        assert(false);
    },

    vvvvReserved: (arg) => {
        if (arg === "both")
            return <><code>VEX.vvvv</code> and <code>EVEX.vvvvv</code> are reserved and must be <code>b1111</code> and <code>b11111</code> (respectively). Any other values will raise a <code>#UD</code> exception.</>;
        else if (arg === "vex")
            return <><code>VEX.vvvv</code> is reserved and must be <code>b1111</code>. Any other values will raise a <code>#UD</code> exception.</>;
        else if (arg === "evex")
            return <><code>EVEX.vvvvv</code> is reserved and must be <code>b11111</code>. Any other values will raise a <code>#UD</code> exception.</>;
        assert(false);
    },
};

// "canned" exception responses
const exceptions: Record<string, React.ReactElement> = {
    // #UD
    cpl0: <>If <code>CPL</code> is greater than <code>0</code>.</>,
    cpuid: <>If any of the required CPUID feature flags are note set.</>,
    cpuidFeatureFlags: <>If any of the required CPUID feature flags need enabling, but are not.</>,
    "evex.vvvvv": <>If <code>EVEX.vvvvv</code> is not <code>11111b</code>.</>,
    inCompatibility: <>If in Compatibility Mode.</>,
    inReal: <>If in Real Mode.</>,
    inLong: <>If in Long Mode.</>,
    inProtected: <>If in Protected Mode.</>,
    inVirtual8086: <>If in Virtual-8086 Mode.</>,
    lock: <>If the <Instruction name="LOCK" noTitle /> prefix is used.</>,
    lockNoMem: <>If the <Instruction name="LOCK" noTitle /> prefix is used, but the destination is not a memory operand.</>,
    sib: <>If 16 bit addressing is used, or 32 or 64 bit addressing is used, but without an SIB byte (<code>rm</code> is not <code>100b</code>).</>,
    "vex.l0": <>If <code>VEX.L</code> is not 0.</>,
    "vex.l1": <>If <code>VEX.L</code> is not 1.</>,
    "vex.vvvv": <>If <code>VEX.vvvv</code> is not <code>1111b</code>.</>,
    "xop.vvvv": <>If <code>XOP.vvvv</code> is not <code>1111b</code>.</>, // TODO: is this a thing?

    // #SS(0)
    nonCanonSS: <>If a memory operand using the <code>SS</code> segment is in non-canonical form.</>, // TODO: link to a page on canonicalness
    segLimitSS: <>If a memory operand using the <code>SS</code> segment has an effective address that is outside the <code>SS</code> segment limit.</>,

    // #GP(0)
    nonCanon: <>If a memory operand (using a semgent other than <code>SS</code>) is in non-canonical form.</>,
    nullSelector: <>If a memory operand uses a segment containing a <code>NULL</code> selector.</>,
    nonWritableSegment: <>If the destination is located in a non-writable segment.</>,
    segLimit: <>If a memory operand (using a segment other than <code>SS</code>) has an effective address that is outside the segment&apos; limit.</>,

    // #PF(fc)
    pf: <>If a page fault occurs.</>,

    // #AC(0)
    ac: <>If alignment checking is enabled while the current privilege level is 3 and an unaligned memory access is made.</>,
};

// `\bits` may change, so don't combine with `\c`
// `\reg` may change, so don't combine with `\c`
const functions: Record<string, (arg: string) => React.ReactElement> = {
    bits: (arg) => (<code>{arg}</code>),

    bitRef: (arg) => (<sup>[{arg}]</sup>),

    c: (arg) => (<code>{arg}</code>),

    canned: (arg) => {
        const split = arg.split(",");
        if (split.length === 1)
            return cannedNoArg[split[0]];

        const args = split.slice(1).join(",");
        return cannedArgs[split[0]](args);
    },

    cpuid: (arg) => {
        /**
         * arg is formatted as follows:
         *   reg1=val1,,reg=bit=name
         *   reg1=val1,reg2=val2,,reg=bit=name
         *   ...
         * For example, `eax=07,ecx=00,,ebx=19=adx` will become `CPUID[EAX=07h,ECX=0]:EBX[bit 19 (ADX)]`.
         * Currently, the result portion must only have 1 value.
         */
        const args = arg.split(",,");
        assert(args.length === 2);

        const cpuidArgs = args[0].split(",");
        assert(cpuidArgs.length !== 0);
        const cpuidArgsString = cpuidArgs.map((arg) => `${arg.toUpperCase()}h`).join(",");

        let cpuidResult = args[1].split(",");
        assert(cpuidResult.length === 1);
        cpuidResult = cpuidResult[0].split("=").map((item) => item.toUpperCase());

        return (
            <code>
                CPUID.[{cpuidArgsString}]:{cpuidResult[0]}[bit {cpuidResult[1]}] ({cpuidResult[2]})
            </code>
        );
    },

    em: (arg) => (<em>{arg}</em>),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    en: (_) => (<>&ndash;</>),

    error: (arg) => (<b className="text-danger">{arg}</b>),

    exception: (arg) => (exceptions[arg]),

    exceptionEvex: (arg) => (<>EVEX encoded form: see &quot;Exception Type {arg}&quot;.</>),

    exceptionVex: (arg) => (<>VEX encoded form: see &quot;Exception Type {arg}&quot;.</>),

    i: (arg) => (<i>{arg}</i>),

    img: (arg) => {
        /**
         * arg is a comma separated list of parameters of the form:
         *   `{src},{alt}`
         * Only the first (src) is required.
         * Both parameters are passed unaltered to their respective <img> attributes.
         */
        const args = arg.split(",");
        if (args.length === 1)
            return <img src={args[0]} alt="" />;
        return <img src={args[0]} alt={args[1]} />;
    },

    instr: (arg) => (<Instruction name={arg} />),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nbsp: (_) => (<>&nbsp;</>),

    reg: (arg) => (<code>{arg}</code>),
};

/**
 * Formats a string using functions following a syntax similar to TeX
 *
 * @param str The string to format
 *
 * @remarks
 * Functions in `str` *must* follow the syntax of `\func{arg}`.
 *
 * Currently, this function performs a simple "search and replace".
 * Due to this, arguments to `func` *must not* contain a closing brace (`}`) or other function calls.
 * For example, `\c{\i{abc}}` will actually output `<code>\i{abc</code>}`.
 */
export function FormatStringToJsx(str?: string): React.ReactElement {
    if (str === null || str === undefined)
        return <></>;

    // [idx % 3 === 0]: plaintext
    // [idx % 3 === 1]: "func"
    // [idx % 3 === 2]: "data"
    const arr = str.split(/\\([a-zA-Z0-9]+){([^}]*)}/);
    assert(arr.length % 3 === 1);

    const ret: React.ReactElement[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0) {
            ret.push(<React.Fragment key={i}>{arr[i]}</React.Fragment>);
            continue;
        }

        // If that function doesn't exist, wrap the whole function call in `\error{...}`
        if (Object.keys(functions).indexOf(arr[i]) === -1) {
            ret.push(
                <React.Fragment key={i}>
                    {functions.error(`\\${arr[i]}{${arr[i + 1]}}`)}
                </React.Fragment>
            );
        } else {
            ret.push(
                <React.Fragment key={i}>
                    {functions[arr[i]](arr[i + 1])}
                </React.Fragment>
            );
        }

        // skip over [idx % 3 === 2]; used in above `if` block
        i++;
    }

    return <>{ret}</>;
}

export function FormatStringPlaintext(str: string): string {
    // takes a string, and removes all "function" calls
    if (str === null || str === undefined)
        return "";

    // [idx % 3 === 0]: plaintext
    // [idx % 3 === 1]: "func"
    // [idx % 3 === 2]: "data"
    const arr = str.split(/\\([a-z]+){([^}]*)}/);
    assert(arr.length % 3 === 1);

    const ret: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0 || i % 3 === 2) {
            ret.push(arr[i]);
            continue;
        }
        // do nothing for [idx % 3 === 1]; it's the function name
    }

    return ret.join("");
}
