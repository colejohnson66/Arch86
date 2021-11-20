/* =============================================================================
 * File:   [slug].tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021 Cole Tobin
 *
 * This file is part of 80x86.
 *
 * 80x86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * 80x86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with 80x86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import { FormatStringPlaintext, FormatStringToJsx } from "@library/FormatString";
import { GetAllInstructionsAsParams, GetInstructionData } from "@library/Instruction";
import { GetStaticPaths, GetStaticProps } from "next";

import A from "@components/A";
import Breadcrumb from "@components/Breadcrumb";
import Clear from "@components/Clear";
import Layout from "@components/Layout";
import MaybeArray from "@myTypes/MaybeArray";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import SyntaxHighlighterTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import Toc from "@components/Toc";
import UppercaseMnemonic from "@library/UppercaseMnemonic";
import assert from "assert";

type OpcodeValidityValues = "valid" | "valid*" | "invalid" | "n/e" | "n/s";
const OpcodeValidityMap: Record<string, string> = {
    "valid": "Valid",
    "valid*": "Valid*",
    "invalid": "Invalid",
    "n/e": "Not Encodable",
    "n/p": "Not Prefixable",
    "n/s": "Not Supported",
};
type OpcodeValidity = {
    16: OpcodeValidityValues;
    32: OpcodeValidityValues;
    64: OpcodeValidityValues;
};
type Opcode = {
    opcode: string;
    mnemonic: string;
    encoding: string;
    validity: OpcodeValidity;
    cpuid?: MaybeArray<string>;
    description: string;
};
type Encoding = {
    operands: number;
    hasTuple?: boolean;
    encodings: Record<string, string[]>;
};
type Flags = {
    CF: string;
    PF: string;
    AF: string;
    ZF: string;
    SF: string;
    OF: string;
};
type ExceptionList = Record<string, MaybeArray<string>>;
type Exceptions = {
    protected?: string | ExceptionList;
    real?: string | ExceptionList;
    virtual?: string | ExceptionList;
    compatibility?: string | ExceptionList;
    long?: string | ExceptionList;
    floating?: MaybeArray<string>;
    other?: MaybeArray<string>;
    otherAdditional?: string | ExceptionList;
};
type PageProps = {
    id: string;
    wip?: boolean;
    title: string;
    opcode: Opcode[];
    opcodeNote?: MaybeArray<string>;
    encoding: Encoding;
    description: string;
    operation: string;
    operationNotes: string[];
    examples?: MaybeArray<string>;
    flags?: Flags;
    intrinsics?: string;
    exceptions: Exceptions;
};

function Plural<T>(arr: MaybeArray<T>, singular: string, plural: string): string {
    if (Array.isArray(arr) && arr.length !== 0)
        return plural;
    return singular;
}

function CoerceArray<T>(arr: MaybeArray<T>): T[] {
    if (Array.isArray(arr))
        return arr;
    return [arr];
}

function BreakTagsFromArray(arr: string[]): React.ReactElement[] {
    return arr.map((line, idx) => (
        <React.Fragment key={idx}>
            {FormatStringToJsx(line)}
            {idx !== arr.length - 1 && <br />}
        </React.Fragment>
    ));
}

function BreakTagsFromNewLines(str: string): React.ReactElement[] {
    return BreakTagsFromArray(str.split("\n"));
}

function ParagraphsFromArray(arr: string[]): React.ReactElement[] {
    return arr.map((par, idx) => (
        <p key={idx}>
            {FormatStringToJsx(par)}
        </p>
    ));
}

function ParagraphsFromNewLines(str: string): React.ReactElement[] {
    return ParagraphsFromArray(str.split("\n"));
}

function HasAsteriskValidity(opcodes: Opcode[]): boolean {
    for (let i = 0; i < opcodes.length; i++) {
        const validity = opcodes[i].validity;
        if (validity[16] === "valid*" ||
            validity[32] === "valid*" ||
            validity[64] === "valid*")
            return true;
    }

    return false;
}

function FormatEncodingCell(operand: string): React.ReactElement {
    // TODO: don't just wrap it all, but parse it and selectively monospace
    return <code>{operand}</code>;
}

function RegularExceptionList(ex: string | ExceptionList): React.ReactElement {
    if (typeof ex === "string")
        return <p>{BreakTagsFromNewLines(ex)}</p>;

    const rows = Object.keys(ex).map((key) => {
        const val = ex[key];

        return (
            <React.Fragment key={key}>
                <dt className="col-sm-1"><code>{key}</code></dt>
                <dd className="col-sm-11">{BreakTagsFromArray(CoerceArray(val))}</dd>
            </React.Fragment>
        );
    });
    return <dl className="row">{rows}</dl>;
}

export default function Page(props: PageProps): React.ReactElement {
    const titlePlain = `${UppercaseMnemonic(props.id)}: ${FormatStringPlaintext(props.title)}`;
    const titleFormat = <>{UppercaseMnemonic(props.id)}: {FormatStringToJsx(props.title)}</>;

    return (
        <Layout.Root navGroup="instruction" pageTitle={titleFormat}>
            <Layout.Title title={titlePlain} />
            <Breadcrumb.Root>
                <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                <Breadcrumb.Item>{titleFormat}</Breadcrumb.Item>
            </Breadcrumb.Root>
            <Layout.Content>
                <Toc.Root>
                    <Toc.Entry href="#headingEncoding" text="Encoding" />
                    <Toc.Entry href="#headingDescription" text="Description" />
                    {props.operationNotes
                        ? <Toc.Entry href="#headingOperation" text="Operation">
                            <Toc.Entry href="#headingOperationNotes" text="Notes" />
                        </Toc.Entry>
                        : <Toc.Entry href="#headingOperation" text="Operation" />}
                    {props.examples &&
                        <Toc.Entry href="#headingExamples" text={Plural(props.examples, "Example", "Examples")} />}
                    {props.flags &&
                        <Toc.Entry href="#headingFlags" text="Flags Affected" />}
                    {props.intrinsics &&
                        <Toc.Entry href="#headingIntrinsics" text="C Intrinsics" />}
                    <Toc.Entry href="#headingExceptions" text="Exceptions">
                        {props.exceptions.protected &&
                            <Toc.Entry href="#headingExceptionsProtected" text="Protected Mode" />}
                        {props.exceptions.real &&
                            <Toc.Entry href="#headingExceptionsReal" text="Real-Address Mode" />}
                        {props.exceptions.virtual &&
                            <Toc.Entry href="#headingExceptionsVirtual" text="Virtual-8086 Mode" />}
                        {props.exceptions.compatibility &&
                            <Toc.Entry href="#headingExceptionsCompatibility" text="Compatibility Mode" />}
                        {props.exceptions.long &&
                            <Toc.Entry href="#headingExceptionsLong" text="Long Mode" />}
                        {props.exceptions.floating &&
                            <Toc.Entry href="#headingExceptionsFloating" text="SIMD Floating-Point" />}
                        {props.exceptions.other &&
                            <Toc.Entry href="#headingExceptionsOther" text="Other" />}
                    </Toc.Entry>
                </Toc.Root>
                <table>
                    <thead>
                        <tr>
                            <th>Opcode and Mnemonic</th>
                            <th><A href="#headingEncoding">Encoding</A></th>
                            <th>16 bit Mode</th>
                            <th>32 bit Mode</th>
                            <th>64 bit Mode</th>
                            {props.opcode[0].cpuid &&
                                /* Don't use <Instruction ... /> to avoid <code> block */
                                <th><A href="/instruction/cpuid">CPUID</A> Feature Flag</th>}
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.opcode.map((row, idx) => (
                            <tr key={idx}>
                                <td>
                                    <code className="mnemonic-encoding">{FormatStringToJsx(row.opcode)}</code>
                                    <hr />
                                    <code className="whitespace-nowrap">{FormatStringToJsx(row.mnemonic)}</code>
                                </td>
                                <td><code>{row.encoding}</code></td>
                                <td>{OpcodeValidityMap[row.validity[16]]}</td>
                                <td>{OpcodeValidityMap[row.validity[32]]}</td>
                                <td>{OpcodeValidityMap[row.validity[64]]}</td>
                                {row.cpuid &&
                                    <td>
                                        {BreakTagsFromArray(CoerceArray(row.cpuid))}
                                    </td>}
                                <td className="w-72">{FormatStringToJsx(row.description)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {HasAsteriskValidity(props.opcode) &&
                    props.opcodeNote &&
                    <>
                        <h5>Notes:</h5>
                        <p>
                            {"* "}{BreakTagsFromArray(CoerceArray(props.opcodeNote))}
                        </p>
                    </>}

                <h2 id="headingEncoding">Encoding</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Encoding</th>
                            {props.encoding.hasTuple &&
                                <th>Tuple Type</th>}
                            {props.encoding.operands === 1
                                ? <th>Operand</th>
                                : [...Array(props.encoding.operands)].map((_, idx) => (
                                    <th key={idx}>Operand {idx + 1}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(props.encoding.encodings).map((key) => {
                            const val = props.encoding.encodings[key];
                            return (
                                <tr key={key}>
                                    <td><code>{key}</code></td>
                                    {val.map((value, idx) => (
                                        <td key={idx}>
                                            {/* Is this an empty or a "Tuple Type" cell? */}
                                            {value === "" || value.startsWith("None") || (props.encoding.hasTuple && idx === 0)
                                                ? FormatStringToJsx(value)
                                                : FormatEncodingCell(value)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Clear />

                <h2 id="headingDescription">Description</h2>
                {ParagraphsFromNewLines(props.description)}

                <h2 id="headingOperation">Operation</h2>
                <div className="pt-2">
                    <SyntaxHighlighter language="csharp" style={SyntaxHighlighterTheme}>
                        {props.operation}
                    </SyntaxHighlighter>
                </div>
                {props.operationNotes &&
                    <>
                        <h3 id="headingOperationNotes">Notes</h3>
                        <ol>
                            {props.operationNotes.map((note, idx) => (
                                <li key={idx}>{BreakTagsFromNewLines(note)}</li>
                            ))}
                        </ol>
                    </>}

                {props.examples &&
                    <>
                        <h2 id="headingExamples">{Plural(props.examples, "Example", "Examples")}</h2>
                        {CoerceArray(props.examples).map((example, idx) => (
                            <SyntaxHighlighter key={idx} language="x86asm" style={SyntaxHighlighterTheme}>
                                {example}
                            </SyntaxHighlighter>
                        ))}
                    </>}

                {props.flags &&
                    <>
                        <h2 id="headingFlags">Flags Affected</h2>
                        <dl>
                            <dt><code>CF</code> (carry flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.CF)}</dd>
                            <dt><code>PF</code> (parity flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.PF)}</dd>
                            <dt><code>AF</code> (auxiliary flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.AF)}</dd>
                            <dt><code>ZF</code> (zero flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.ZF)}</dd>
                            <dt><code>SF</code> (sign flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.SF)}</dd>
                            <dt><code>OF</code> (overflow flag)</dt>
                            <dd>{BreakTagsFromNewLines(props.flags.OF)}</dd>
                        </dl>
                    </>}

                {props.intrinsics &&
                    <>
                        <h2 id="headingIntrinsics">C Intrinsics</h2>
                        <SyntaxHighlighter language="c-like" style={SyntaxHighlighterTheme}>
                            {props.intrinsics}
                        </SyntaxHighlighter>
                    </>}

                <h2 id="headingExceptions">Exceptions</h2>
                {props.exceptions.protected &&
                    <>
                        <h3 id="headingExceptionsProtected">Protected Mode</h3>
                        {RegularExceptionList(props.exceptions.protected)}
                    </>}
                {props.exceptions.real &&
                    <>
                        <h3 id="headingExceptionsReal">Real-Address Mode</h3>
                        {RegularExceptionList(props.exceptions.real)}
                    </>}
                {props.exceptions.virtual &&
                    <>
                        <h3 id="headingExceptionsVirtual">Virtual-8086 Mode</h3>
                        {RegularExceptionList(props.exceptions.virtual)}
                    </>}
                {props.exceptions.compatibility &&
                    <>
                        <h3 id="headingExceptionsCompatibility">Compatibility Mode</h3>
                        {RegularExceptionList(props.exceptions.compatibility)}
                    </>}
                {props.exceptions.long &&
                    <>
                        <h3 id="headingExceptionsLong">Long Mode</h3>
                        {RegularExceptionList(props.exceptions.long)}
                    </>}
                {props.exceptions.floating &&
                    <>
                        <h3 id="headingExceptionsFloating">SIMD Floating-Point</h3>
                        {ParagraphsFromArray(CoerceArray(props.exceptions.floating))}
                    </>}
                {props.exceptions.other &&
                    <>
                        <h3 id="headingExceptionsOther">Other</h3>
                        {ParagraphsFromArray(CoerceArray(props.exceptions.other))}
                        {props.exceptions.otherAdditional &&
                            RegularExceptionList(props.exceptions.otherAdditional)}
                    </>}
            </Layout.Content>
        </Layout.Root>
    );
}


// gets a list of all valid values of `[slug]`
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: GetAllInstructionsAsParams(),
        fallback: false,
    };
};


// gets the props for a specific value of `[slug]` (i.e. a specific instruction)
export const getStaticProps: GetStaticProps = async (context) => {
    assert(context.params);
    const data = await GetInstructionData(context.params["slug"] as string) as PageProps;
    return {
        props: data,
    };
};
