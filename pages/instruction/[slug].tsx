/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Johnson
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
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { Callout, Code, Divider, H1, H2, H3, HTMLTable, IBreadcrumbProps, OL, UL } from "@blueprintjs/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { formatStringPlaintext, formatStringToJsx } from "../../lib/FormatStringToJsx";
import { getAllInstructionsAsParams, getInstructionData } from "../../lib/instruction";

import A from "../../components/A";
import DateTime from "../../components/DateTime";
import IDictionary from "../../types/IDictionary";
import Layout from "../../components/Layout";
import MaybeArray from "../../types/MaybeArray";
import React from "react";
import Ref from "../../components/Ref";
import Scrollable from "../../components/Scrollable";
import SyntaxHighlighter from "react-syntax-highlighter";
import SyntaxHighlighterDarkTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import TOC from "../../components/TOC";

type OpcodeValidityValues = "valid" | "valid*" | "invalid" | "n/e";
const OpcodeValidityMap: { [T in OpcodeValidityValues]: string } = {
    "valid": "Valid",
    "valid*": "Valid*",
    "invalid": "Invalid",
    "n/e": "Not Encodable",
};
type OpcodeValidity = {
    16?: OpcodeValidityValues;
    1632?: OpcodeValidityValues;
    32?: OpcodeValidityValues;
    64: OpcodeValidityValues;
};
// TODO: use <abbr>?
const OpcodeValidityKeyMap: { [T in keyof OpcodeValidity]: string } = {
    16: "16 bit Mode",
    1632: "16 and 32 bit Mode",
    32: "32 bit Mode",
    64: "64 bit Mode",
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
    encodings: IDictionary<string[]>;
};
type BitEncoding = {
    list: BitEncodingEntry[];
};
type BitEncodingEntry = {
    form: string;
    limits?: string;
    bits: MaybeArray<string>;
};
type ExceptionList = IDictionary<MaybeArray<string>>;
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
type Changes = {
    version: number;
    date: string;
    list: MaybeArray<string>;
};
type Reference = {
    name: string;
    value: string; // TODO: Is this how we should do this?
};
type PageProps = {
    id: string;
    title: string;
    validity: string;
    opcode: Opcode[];
    encoding: Encoding;
    bitEncoding?: BitEncoding;
    description: string;
    operation: string;
    operationNotes: string[];
    examples?: MaybeArray<string>;
    flags?: string;
    intrinsicsC?: string;
    intrinsicsRust?: string;
    exceptions: Exceptions;
    changes?: Changes;
    refs?: Reference[];
};

function plural<T>(arr: MaybeArray<T>, singular: string, plural: string): string {
    if (Array.isArray(arr) && arr.length !== 0)
        return plural;
    return singular;
}

function coerceArray<T>(arr: MaybeArray<T>): T[] {
    if (Array.isArray(arr))
        return arr;
    return [arr];
}

function brTagsFromArray(arr: string[]): JSX.Element[] {
    return arr.map((line, idx) => (
        <React.Fragment key={idx}>
            {formatStringToJsx(line)}
            {idx !== arr.length - 1 && <br />}
        </React.Fragment>
    ));
}

function brTagsFromString(str: string): JSX.Element[] {
    return brTagsFromArray(str.split("\n"));
}

function paragraphsFromArray(arr: string[]): JSX.Element[] {
    return arr.map((par, idx) => (
        <p key={idx}>
            {formatStringToJsx(par)}
        </p>
    ));
}

function paragraphsFromString(str: string): JSX.Element[] {
    return paragraphsFromArray(str.split("\n"));
}

function formatEncodingCell(operand: string): JSX.Element {
    // TODO: don't just wrap it all, but parse it and selectively monospace
    return <Code>{operand}</Code>;
}

function bitEncodings(encodings: BitEncodingEntry[]): JSX.Element {
    const rows = encodings.map((entry, idx) => {
        const bits = coerceArray(entry.bits).map((byte, idx, arr) => (
            <React.Fragment key={idx}>
                {formatStringToJsx(byte)}
                {idx !== arr.length - 1 && " : "}
            </React.Fragment>
        ));

        return (
            <React.Fragment key={idx}>
                <dt>{formatStringToJsx(entry.form)}</dt>
                <dd>{bits}</dd>
                {entry.limits && <dd>{entry.limits}</dd>}
            </React.Fragment>
        );
    });
    return <dl>{rows}</dl>;
}

function regularExceptionList(ex: string | ExceptionList): JSX.Element {
    if (typeof ex === "string")
        return <p>{brTagsFromString(ex)}</p>;

    const rows = Object.keys(ex).map((key) => {
        const val = ex[key];

        return (
            <React.Fragment key={key}>
                <dt><Code>{key}</Code></dt>
                <dd>{brTagsFromArray(coerceArray(val))}</dd>
            </React.Fragment>
        );
    });
    return <dl>{rows}</dl>;
}

export default function Page(props: PageProps): JSX.Element {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        {
            text: "Instructions",
            href: "/instruction",
        },
        { text: props.id.toUpperCase() },
    ];

    const sdmTitleWithLink = (
        <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">
            <i>Intel® 64 and IA-32 Architectures Software Developer’s Manual</i>
        </A>);

    return (
        <Layout canonical={`/instruction/${props.id}`} navGroup="instruction" title={`${props.id.toUpperCase()}: ${formatStringPlaintext(props.title)}`} src="/pages/instruction/[slug].tsx" dataSrc={`/data/instructions/${props.id[0]}/${props.id}.yaml`} breadcrumbs={PageBreadcrumbs}>
            <TOC.Root>
                <TOC.Entry href="#headingEncoding" text="Encoding" />
                {props.bitEncoding &&
                    <TOC.Entry href="#headingBitEncoding" text="Bit Encoding" />}
                <TOC.Entry href="#headingDescription" text="Description" />
                {props.operationNotes
                    ? <TOC.Entry href="#headingOperation" text="Operation">
                        <TOC.Entry href="#headingOperationNotes" text="Notes" />
                    </TOC.Entry>
                    : <TOC.Entry href="#headingOperation" text="Operation" />}
                {props.examples &&
                    <TOC.Entry href="#headingExamples" text={plural(props.examples, "Example", "Examples")} />}
                {props.flags &&
                    <TOC.Entry href="#headingFlags" text="Flags Affected" />}
                {props.intrinsicsC &&
                    <TOC.Entry href="#headingIntrinsicsC" text="Intrinsics - C" />}
                {props.intrinsicsRust &&
                    <TOC.Entry href="#headingIntrinsicsRust" text="Intrinsics - Rust" />}
                <TOC.Entry href="#headingExceptions" text="Exceptions">
                    {props.exceptions.protected &&
                        <TOC.Entry href="#headingExceptionsProtected" text="Protected Mode" />}
                    {props.exceptions.real &&
                        <TOC.Entry href="#headingExceptionsReal" text="Real-Address Mode" />}
                    {props.exceptions.virtual &&
                        <TOC.Entry href="#headingExceptionsVirtual" text="Virtual-8086 Mode" />}
                    {props.exceptions.compatibility &&
                        <TOC.Entry href="#headingExceptionsCompatibility" text="Compatibility Mode" />}
                    {props.exceptions.long &&
                        <TOC.Entry href="#headingExceptionsLong" text="Long Mode" />}
                    {props.exceptions.floating &&
                        <TOC.Entry href="#headingExceptionsFloating" text="SIMD Floating-Point" />}
                    {props.exceptions.other &&
                        <TOC.Entry href="#headingExceptionsOther" text="Other" />}
                </TOC.Entry>
                {props.changes &&
                    <TOC.Entry href="#headingChanges" text="Manual Changes" />}
                {props.refs &&
                    <TOC.Entry href="#headingReferences" text="References" />}
            </TOC.Root>
            <div id="content">
                <H1><Code>{props.id.toUpperCase()}</Code>: {formatStringToJsx(props.title)}</H1>
                <Callout intent="primary">
                    For information about interpreting this page, see <A href="/instruction/help">the help page</A>.
                </Callout>
                <Scrollable>
                    <HTMLTable bordered>
                        <thead>
                            <tr>
                                <th>Opcode and Mnemonic</th>
                                <th><A href="#headingEncoding">Encoding</A></th>
                                {props.validity.split(",").map((entry) => (
                                    <th key={entry}>{OpcodeValidityKeyMap[entry]}</th>
                                ))}
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
                                        <Code>{formatStringToJsx(row.opcode)}</Code>
                                        <Divider />
                                        <Code className="mnemonic">{formatStringToJsx(row.mnemonic)}</Code>
                                    </td>
                                    <td><Code>{row.encoding}</Code></td>
                                    {props.validity.split(",").map((entry) => (
                                        // This ensures that they are displayed in the same order as the heading
                                        <td key={entry}>{OpcodeValidityMap[row.validity[entry]]}</td>
                                    ))}
                                    {row.cpuid &&
                                        <td>
                                            {brTagsFromArray(coerceArray(row.cpuid))}
                                        </td>}
                                    <td className="overviewDescription">{formatStringToJsx(row.description)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </HTMLTable>
                </Scrollable>

                <H2 id="headingEncoding">Encoding</H2>
                <Scrollable>
                    <HTMLTable>
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
                                        <td><Code>{key}</Code></td>
                                        {val.map((value, idx) => (
                                            <td key={idx}>
                                                {/* Is this an empty or a "Tuple Type" cell? */}
                                                {value === "" || value.startsWith("None") || (props.encoding.hasTuple && idx === 0)
                                                    ? value
                                                    : formatEncodingCell(value)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </HTMLTable>
                </Scrollable>

                {props.bitEncoding &&
                    <>
                        <H2 id="headingBitEncoding">Bit Encoding</H2>
                        {bitEncodings(props.bitEncoding.list)}
                    </>}

                <H2 id="headingDescription">Description</H2>
                {paragraphsFromString(props.description)}

                <H2 id="headingOperation">Operation</H2>
                <Callout intent="primary">
                    This pseudo-code uses a Rust-like syntax.
                    A list of the types used is <A href="/instruction/help#headingOperation">available here</A>.
                </Callout>
                <Scrollable>
                    <SyntaxHighlighter language="rust" style={SyntaxHighlighterDarkTheme}>
                        {props.operation}
                    </SyntaxHighlighter>
                </Scrollable>
                {props.operationNotes &&
                    <>
                        <H3 id="headingOperationNotes">Notes</H3>
                        <OL>
                            {props.operationNotes.map((note, idx) => (
                                <li key={idx}>{brTagsFromString(note)}</li>
                            ))}
                        </OL>
                    </>}

                {props.examples &&
                    <>
                        <H2 id="headingExamples">{plural(props.examples, "Example", "Examples")}</H2>
                        <Callout intent="primary">
                            {plural(props.examples, "This example uses", "These examples use")} NASM syntax.
                        </Callout>
                        {coerceArray(props.examples).map((example, idx) => (
                            <Scrollable key={idx}>
                                <SyntaxHighlighter language="x86asm" style={SyntaxHighlighterDarkTheme}>
                                    {example}
                                </SyntaxHighlighter>
                            </Scrollable>
                        ))}
                    </>}

                {props.flags &&
                    <>
                        <H2 id="headingFlags">Flags Affected</H2>
                        {paragraphsFromString(props.flags)}
                    </>}

                {props.intrinsicsC &&
                    <>
                        <H2 id="headingIntrinsicsC">Intrinsics - C</H2>
                        <Scrollable>
                            <SyntaxHighlighter language="c-like" style={SyntaxHighlighterDarkTheme}>
                                {props.intrinsicsC}
                            </SyntaxHighlighter>
                        </Scrollable>
                    </>}

                {props.intrinsicsRust &&
                    <>
                        <H2 id="headingIntrinsicsRust">Intrinsics - Rust</H2>
                        <Callout intent="primary">
                            These intrinsics are from an upcoming crate and may change.
                        </Callout>
                        <Scrollable>
                            <SyntaxHighlighter language="rust" style={SyntaxHighlighterDarkTheme}>
                                {props.intrinsicsRust}
                            </SyntaxHighlighter>
                        </Scrollable>
                    </>}

                <H2 id="headingExceptions">Exceptions</H2>
                {props.exceptions.protected &&
                    <>
                        <H3 id="headingExceptionsProtected">Protected Mode</H3>
                        {regularExceptionList(props.exceptions.protected)}
                    </>}
                {props.exceptions.real &&
                    <>
                        <H3 id="headingExceptionsReal">Real-Address Mode</H3>
                        {regularExceptionList(props.exceptions.real)}
                    </>}
                {props.exceptions.virtual &&
                    <>
                        <H3 id="headingExceptionsVirtual">Virtual-8086 Mode</H3>
                        {regularExceptionList(props.exceptions.virtual)}
                    </>}
                {props.exceptions.compatibility &&
                    <>
                        <H3 id="headingExceptionsCompatibility">Compatibility Mode</H3>
                        {regularExceptionList(props.exceptions.compatibility)}
                    </>}
                {props.exceptions.long &&
                    <>
                        <H3 id="headingExceptionsLong">Long Mode</H3>
                        {regularExceptionList(props.exceptions.long)}
                    </>}
                {props.exceptions.floating &&
                    <>
                        <H3 id="headingExceptionsFloating">SIMD Floating-Point</H3>
                        {paragraphsFromArray(coerceArray(props.exceptions.floating))}
                    </>}
                {props.exceptions.other &&
                    <>
                        <H3 id="headingExceptionsOther">Other</H3>
                        {paragraphsFromArray(coerceArray(props.exceptions.other))}
                        {props.exceptions.otherAdditional &&
                            regularExceptionList(props.exceptions.otherAdditional)}
                    </>}

                {props.changes &&
                    <>
                        <H2 id="headingChanges">Manual Changes</H2>
                        <p>
                            This is a list of changes that have been made from the {sdmTitleWithLink}.
                            These changes were against version {props.changes.version} (dated <DateTime dateTime={props.changes.date} />).
                        </p>
                        <UL>
                            {coerceArray(props.changes.list).map((change, idx) => (
                                <li key={idx}>{brTagsFromString(change)}</li>
                            ))}
                        </UL>
                    </>}

                {props.refs &&
                    <>
                        <Ref.Root>
                            {props.refs.map((ref, idx) => (
                                <Ref.Entry key={idx} name={ref.name}>
                                    {ref.value}
                                </Ref.Entry>
                            ))}
                        </Ref.Root>
                    </>}
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllInstructionsAsParams(),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getInstructionData(context.params["slug"] as string);
    return {
        props: data,
    };
};
