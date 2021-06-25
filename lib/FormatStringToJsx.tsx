/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
 *
 * This program is free software: you can redistribute it and/or modify it under
 *   the terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 *   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 *   for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable react/display-name */
import IDictionary from "../types/IDictionary";
import Instruction from "../components/Instruction";
import React from "react";
import { strict as assert } from "assert";

// `\bits` may change, so don't combine with `\c`
// `\reg` may change, so don't combine with `\c`
// `\cpuid` is currently fancy syntax around `\c`, but this may change
const functions: IDictionary<(arg: string) => JSX.Element> = {
    bits: (arg) => (<code>{arg}</code>),
    bitRef: (arg) => (<sup>[{arg}]</sup>),
    c: (arg) => (<code>{arg}</code>),
    cpuid: (arg) => {
        /**
         * arg is a comma separated list with an empty parameter for separation of CPUID arguments and result.
         * For example, `eax,07,ecx,00,,ebx,adx,19` will become `CPUID[EAX=07h,ECX=0]:EBX.ADX[bit 19]`.
         * Multiple bit results will use "range syntax" (eg. `0..=1` for the two LSB).
         * Currently, the result portion must only have 3 parameters.
         */
        const args = arg.split(",,");
        assert(args.length === 2);

        const cpuidArgs = args[0].split(",");
        assert(cpuidArgs.length !== 0 && cpuidArgs.length % 2 === 0);
        const cpuidArgsStr: string[] = [];
        for (let i = 0; i < cpuidArgs.length; i += 2)
            cpuidArgsStr.push(`${cpuidArgs[i].toUpperCase()}=${cpuidArgs[i + 1]}h`);

        const cpuidResult = args[1].split(",");
        assert(cpuidResult.length === 3);
        let cpuidResultStr = `${cpuidResult[0].toUpperCase()}.${cpuidResult[1].toUpperCase()}[`;
        cpuidResultStr += (cpuidResult[2].indexOf("..") === -1) ? "bit " : "bits ";
        cpuidResultStr += `${cpuidResult[2]}]`;

        return (
            <code>
                {"CPUID.("}
                {cpuidArgsStr.join(",")}
                {"):"}
                {cpuidResultStr}
            </code>
        );
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    en: (_) => (<>&ndash;</>),
    error: (arg) => (<b className="text-danger">{arg}</b>),
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
 * Formats a string using functions following a syntax similar to Tex
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
export function formatStringToJsx(str?: string): JSX.Element {
    if (str === null || str === undefined)
        return <></>;

    // [idx % 3 === 0]: plaintext
    // [idx % 3 === 1]: "func"
    // [idx % 3 === 2]: "data"
    const arr = str.split(/\\([a-z]+){([^}]*)}/);
    assert(arr.length % 3 === 1);

    const ret: JSX.Element[] = [];
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

    return (<>{ret}</>);
}

export function formatStringPlaintext(str: string): string {
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
