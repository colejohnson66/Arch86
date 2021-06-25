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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Alert, Breadcrumb, Container, ContentCol, Row, Table } from "../../components/Bootstrap";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout, { Title } from "../../components/Layout";
import { formatStringPlaintext, formatStringToJsx } from "../../lib/FormatStringToJsx";
import { getAllInstructionsAsParams, getInstructionData } from "../../lib/instruction";

import A from "../../components/A";
import DateTime from "../../components/DateTime";
import IDictionary from "../../types/IDictionary";
import MaybeArray from "../../types/MaybeArray";
import React from "react";
import Ref from "../../components/Ref";
import Scrollable from "../../components/Scrollable";
import SyntaxHighlighter from "react-syntax-highlighter";
import SyntaxHighlighterDarkTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import TOC from "../../components/TOC";
import WIP from "../../components/WIP";
import { strict as assert } from "assert";
import uppercaseMnemonic from "../../lib/uppercaseMnemonic";

type OpcodeValidityValues = "valid" | "valid*" | "invalid" | "n/e" | "n/s";
const OpcodeValidityMap: IDictionary<string> = {
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
    encodings: IDictionary<string[]>;
};
type Flags = {
    CF: string;
    PF: string;
    AF: string;
    ZF: string;
    SF: string;
    OF: string;
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
    wip?: boolean;
    title: string;
    opcode: Opcode[];
    opcodeNote?: MaybeArray<string>;
    encoding: Encoding;
    description: string;
    operation: string;
    operationImage?: string;
    operationNotes: string[];
    examples?: MaybeArray<string>;
    flags?: Flags;
    intrinsics?: string;
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

function hasValidAsteriskValidity(opcodes: Opcode[]): boolean {
    for (let i = 0; i < opcodes.length; i++) {
        const validity = opcodes[i].validity;
        if (validity[16] === "valid*" ||
            validity[32] === "valid*" ||
            validity[64] === "valid*")
            return true;
    }

    return false;
}

function formatEncodingCell(operand: string): JSX.Element {
    // TODO: don't just wrap it all, but parse it and selectively monospace
    return <code>{operand}</code>;
}

function regularExceptionList(ex: string | ExceptionList): JSX.Element {
    if (typeof ex === "string")
        return <p>{brTagsFromString(ex)}</p>;

    const rows = Object.keys(ex).map((key) => {
        const val = ex[key];

        return (
            <React.Fragment key={key}>
                <dt className="col-sm-1"><code>{key}</code></dt>
                <dd className="col-sm-11">{brTagsFromArray(coerceArray(val))}</dd>
            </React.Fragment>
        );
    });
    return <dl className="row">{rows}</dl>;
}

export default function Page(props: PageProps): JSX.Element {
    const sdmTitleWithLink = (
        <A href="https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html">
            <i>Intel® 64 and IA-32 Architectures Software Developer’s Manual</i>
        </A>);

    return (
        <Layout canonical={`/instruction/${props.id}`} navGroup="instruction" src="/pages/instruction/%5Bslug%5D.tsx" dataSrc={`/data/instructions/${props.id[0]}/${props.id}.yaml`}>
            <Title title={`${uppercaseMnemonic(props.id)}: ${formatStringPlaintext(props.title)}`} />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                    <Breadcrumb.Item>{uppercaseMnemonic(props.id)}</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingEncoding" text="Encoding" />
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
                        {props.intrinsics &&
                            <TOC.Entry href="#headingIntrinsics" text="C Intrinsics" />}
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
                    <ContentCol>
                        <h1><code>{props.id.toUpperCase()}</code>: {formatStringToJsx(props.title)}</h1>
                        {props.wip && <WIP page />}
                        <Alert variant="primary">
                            For information about interpreting this page, see <A href="/instruction/help">the help page</A>.
                        </Alert>
                        <Scrollable>
                            <Table striped>
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
                                                <code className="mnemonic-encoding">{formatStringToJsx(row.opcode)}</code>
                                                <hr />
                                                <code className="mnemonic">{formatStringToJsx(row.mnemonic)}</code>
                                            </td>
                                            <td><code>{row.encoding}</code></td>
                                            <td>{OpcodeValidityMap[row.validity[16]]}</td>
                                            <td>{OpcodeValidityMap[row.validity[32]]}</td>
                                            <td>{OpcodeValidityMap[row.validity[64]]}</td>
                                            {row.cpuid &&
                                                <td>
                                                    {brTagsFromArray(coerceArray(row.cpuid))}
                                                </td>}
                                            <td className="overviewDescription">{formatStringToJsx(row.description)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <style jsx>{`
                                    hr {
                                        margin: 0;
                                    }
                                `}</style>
                            </Table>
                        </Scrollable>
                        {hasValidAsteriskValidity(props.opcode) &&
                            props.opcodeNote &&
                            <>
                                <h5>Notes:</h5>
                                <p>
                                    {"* "}{brTagsFromArray(coerceArray(props.opcodeNote))}
                                </p>
                            </>}

                        <h2 id="headingEncoding">Encoding</h2>
                        <Scrollable>
                            <Table striped>
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
                                                            ? formatStringToJsx(value)
                                                            : formatEncodingCell(value)}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Scrollable>

                        <h2 id="headingDescription">Description</h2>
                        {paragraphsFromString(props.description)}

                        <h2 id="headingOperation">Operation</h2>
                        <Alert variant="primary">
                            This pseudo-code uses C# syntax.
                            A list of the types used is <A href="/instruction/help#headingOperation">available here</A>.
                        </Alert>
                        <Scrollable>
                            <SyntaxHighlighter language="csharp" style={SyntaxHighlighterDarkTheme}>
                                {props.operation}
                            </SyntaxHighlighter>
                        </Scrollable>
                        {props.operationImage &&
                            <Scrollable>
                                <img src={props.operationImage} alt={`The operation of the ${props.id.toUpperCase()} instruction`} />
                            </Scrollable>}
                        {props.operationNotes &&
                            <>
                                <h3 id="headingOperationNotes">Notes</h3>
                                <ol>
                                    {props.operationNotes.map((note, idx) => (
                                        <li key={idx}>{brTagsFromString(note)}</li>
                                    ))}
                                </ol>
                            </>}

                        {props.examples &&
                            <>
                                <h2 id="headingExamples">{plural(props.examples, "Example", "Examples")}</h2>
                                <Alert variant="primary">
                                    {plural(props.examples, "This example uses", "These examples use")} NASM syntax.
                                </Alert>
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
                                <h2 id="headingFlags">Flags Affected</h2>
                                <dl className="row">
                                    <dt className="col-sm-2"><code>CF</code> (carry flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.CF)}</dd>
                                    <dt className="col-sm-2"><code>PF</code> (parity flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.PF)}</dd>
                                    <dt className="col-sm-2"><code>AF</code> (auxiliary flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.AF)}</dd>
                                    <dt className="col-sm-2"><code>ZF</code> (zero flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.ZF)}</dd>
                                    <dt className="col-sm-2"><code>SF</code> (sign flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.SF)}</dd>
                                    <dt className="col-sm-2"><code>OF</code> (overflow flag)</dt>
                                    <dd className="col-sm-10">{brTagsFromString(props.flags.OF)}</dd>
                                </dl>
                            </>}

                        {props.intrinsics &&
                            <>
                                <h2 id="headingIntrinsics">C Intrinsics</h2>
                                <Scrollable>
                                    <SyntaxHighlighter language="c-like" style={SyntaxHighlighterDarkTheme}>
                                        {props.intrinsics}
                                    </SyntaxHighlighter>
                                </Scrollable>
                            </>}

                        <h2 id="headingExceptions">Exceptions</h2>
                        {props.exceptions.protected &&
                            <>
                                <h3 id="headingExceptionsProtected">Protected Mode</h3>
                                {regularExceptionList(props.exceptions.protected)}
                            </>}
                        {props.exceptions.real &&
                            <>
                                <h3 id="headingExceptionsReal">Real-Address Mode</h3>
                                {regularExceptionList(props.exceptions.real)}
                            </>}
                        {props.exceptions.virtual &&
                            <>
                                <h3 id="headingExceptionsVirtual">Virtual-8086 Mode</h3>
                                {regularExceptionList(props.exceptions.virtual)}
                            </>}
                        {props.exceptions.compatibility &&
                            <>
                                <h3 id="headingExceptionsCompatibility">Compatibility Mode</h3>
                                {regularExceptionList(props.exceptions.compatibility)}
                            </>}
                        {props.exceptions.long &&
                            <>
                                <h3 id="headingExceptionsLong">Long Mode</h3>
                                {regularExceptionList(props.exceptions.long)}
                            </>}
                        {props.exceptions.floating &&
                            <>
                                <h3 id="headingExceptionsFloating">SIMD Floating-Point</h3>
                                {paragraphsFromArray(coerceArray(props.exceptions.floating))}
                            </>}
                        {props.exceptions.other &&
                            <>
                                <h3 id="headingExceptionsOther">Other</h3>
                                {paragraphsFromArray(coerceArray(props.exceptions.other))}
                                {props.exceptions.otherAdditional &&
                                    regularExceptionList(props.exceptions.otherAdditional)}
                            </>}

                        {props.changes &&
                            <>
                                <h2 id="headingChanges">Manual Changes</h2>
                                <p>
                                    This is a list of changes that have been made from the {sdmTitleWithLink}.
                                    These changes were against version {props.changes.version} (dated <DateTime dateTime={props.changes.date} />).
                                </p>
                                <ul>
                                    {coerceArray(props.changes.list).map((change, idx) => (
                                        <li key={idx}>{brTagsFromString(change)}</li>
                                    ))}
                                </ul>
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
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}

// gets a list of all valid values of `[slug]`
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllInstructionsAsParams(),
        fallback: false,
    };
};

// gets the props for a specific value of `[slug]` (i.e. a specific instruction)
export const getStaticProps: GetStaticProps = async (context) => {
    assert(context.params);
    const data = await getInstructionData(context.params["slug"] as string) as PageProps;
    return {
        props: data,
    };
};
