import { Code } from "@blueprintjs/core";
import IDictionary from "../types/IDictionary";
import Link from "next/link";
import React from "react";
import { strict as assert } from "assert";

// `functions.reg` may change, so don't combine with `functions.c`
const functions: IDictionary<(key: number, str: string) => JSX.Element> = {
    c: (key, str) => (<Code key={key}>{str}</Code>),
    i: (key, str) => (<i key={key}>{str}</i>),
    instr: (key, str) => (<Link key={key} href={`/instruction/${str}`}><a><Code>{str}</Code></a></Link>),
    reg: (key, str) => (<Code key={key}>{str}</Code>),
};

export function processStringToJsx(str: string): JSX.Element {
    // matches a format similar to TeX: "\func{data}"
    // [idx % 3 === 0]: plaintext
    // [idx % 3 === 1]: "func"
    // [idx % 3 === 2]: "data"
    const arr = str.split(/\\([a-z]+){([^}]+)}/);
    assert(arr.length % 3 === 1);

    let ret: JSX.Element[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0) {
            ret.push(<React.Fragment key={i}>{arr[i]}</React.Fragment>);
            continue;
        }

        ret.push(functions[arr[i]](i, arr[i + 1]));
        i++; // skip over [idx % 3 === 2]; used in last line
    }

    return (<>{ret}</>);
}
