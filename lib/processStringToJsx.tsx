import { Code, Colors } from "@blueprintjs/core";

import IDictionary from "../types/IDictionary";
import Link from "next/link";
import React from "react";
import { strict as assert } from "assert";

// `functions.reg` may change, so don't combine with `functions.c`
// `functions.cpuid` is currently fancy syntax around `functions.c`, but this may change
const functions: IDictionary<(key: number, arg: string) => JSX.Element> = {
    abbr: (key, arg) => (<i key={key}>{arg}</i>),
    c: (key, arg) => (<Code key={key}>{arg}</Code>),
    cpuid: (key, arg) => {
        // arg is a comma separated list with an empty parameter for separation of CPUID arguments and result
        // for example, `CPUID[EAX=07h,ECX=0]:EBX.ADX[bit 19]` will be `eax,07,ecx,00,,ebx,adx,19`
        // multiple bit results will use "range syntax" (eg. `0..=1` for the two LSB)
        // currently, the result portion must only have 3 parameters

        const args = arg.split(",,");
        assert(args.length == 2);

        const cpuidArgs = args[0].split(",");
        assert(cpuidArgs.length !== 0 && cpuidArgs.length % 2 === 0);
        const cpuidArgsStr: string[] = [];
        for (let i = 0; i < cpuidArgs.length; i += 2)
            cpuidArgsStr.push(`${cpuidArgs[i].toUpperCase()}=${cpuidArgs[i + 1]}h`);

        const cpuidResult = args[1].split(",");
        assert(cpuidResult.length === 3);
        let cpuidResultStr = `${cpuidResult[0].toUpperCase()}.${cpuidResult[1].toUpperCase()}[`
        cpuidResultStr += (cpuidResult[2].indexOf("..") === -1) ? "bit " : "bits ";
        cpuidResultStr += cpuidResult[2] + "]";

        return (
            <Code key={key}>
                {"CPUID.("}
                {cpuidArgsStr.join(",")}
                {"):"}
                {cpuidResultStr}
            </Code>
        );
    },
    en: (key, arg) => (<React.Fragment key={key}>&ndash;</React.Fragment>),
    error: (key, arg) => (<b key={key} style={{ color: Colors.RED3 }}>{arg}</b>),
    i: (key, arg) => (<i key={key}>{arg}</i>),
    instr: (key, arg) => (<Link key={key} href={`/instruction/${arg.toLowerCase()}`}><a><Code>{arg}</Code></a></Link>),
    reg: (key, arg) => (<Code key={key}>{arg}</Code>),
};

/**
 * Formats a string using functions following a syntax similar to Tex
 * 
 * @param str The string to format
 * 
 * @remarks
 * Functions in `str` *must* follow the syntax of `\func{arg}`.
 * 
 * Arguments to `func` *must not* contain a closing brace (`}`) or other function calls.
 * For example, `\c{\i{abc}}` will actually output `<code>\i{abc</code>}`.
 */
export function processStringToJsx(str: string): JSX.Element {
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

        if (Object.keys(functions).indexOf(arr[i]) === -1)
            ret.push(functions.error(i, `\\${arr[i]}{${arr[i + 1]}}`));
        else
            ret.push(functions[arr[i]](i, arr[i + 1]));
        i++; // skip over [idx % 3 === 2]; used in last line
    }

    return (<>{ret}</>);
}
