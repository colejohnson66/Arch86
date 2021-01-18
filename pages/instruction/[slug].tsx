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

import { Breadcrumbs, Card, Code, H1, H2, H3, HTMLTable, IBreadcrumbProps, UL } from "@blueprintjs/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllInstructionsAsParams, getInstructionData } from "../../lib/instruction";

import IDictionary from "../../types/IDictionary";
import Layout from "../../components/Layout";
import Link from "next/link";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import TOC from "../../components/TOC";
import renderBreadcrumbs from "../../lib/renderBreadcrumbs";

type OpcodeValidityValues = "valid" | "valid*" | "invalid" | "n/e";
const OpcodeValidityMap: { [T in OpcodeValidityValues]: string } = {
    "valid": "Valid",
    "valid*": "Valid*",
    "invalid": "Invalid",
    "n/e": "Not Encodable"
};
type OpcodeValidity = {
    16?: OpcodeValidityValues,
    1632?: OpcodeValidityValues,
    32?: OpcodeValidityValues,
    64: OpcodeValidityValues,
};
// TODO: use <abbr>?
const OpcodeValidityKeyMap: { [T in keyof OpcodeValidity]: string } = {
    16: "16-bit Mode",
    1632: "16- and 32-bit Mode",
    32: "32-bit Mode",
    64: "64-bit Mode",
};
type Opcode = {
    opcode: string,
    mnemonic: string,
    encoding: string,
    validity: OpcodeValidity,
    cpuid?: string | string[],
    description: string,
};
type Encoding = {
    encoding: string,
    op1: string,
    op2: string,
    op3: string,
    op4: string,
};
type ExceptionList = IDictionary<string | string[]>;
type Exceptions = {
    protected?: string | ExceptionList,
    real?: string | ExceptionList,
    virtual?: string | ExceptionList,
    compatibility?: string | ExceptionList,
    long?: string | ExceptionList,
    floating?: string,
    other?: string,
};
type PageProps = {
    id: string,
    validity: string,
    opcode: Opcode[],
    encoding: Encoding[],
    description: string,
    operation: string,
    flags?: string,
    intrinsics?: string[],
    exceptions: Exceptions,
}

function brTagsFromArray(arr: string[]): JSX.Element[] {
    return arr.map((line, idx) => (
        <React.Fragment key={idx}>
            {line}
            {idx !== arr.length - 1 && <br />}
        </React.Fragment>
    ));
}

function paragraphsFromArray(arr: string[]): JSX.Element[] {
    return arr.map((par, idx) => (<p key={idx}>{par}</p>));
}

function paragraphsFromString(str: string): JSX.Element[] {
    return paragraphsFromArray(str.split("\n"));
}

function regularExceptionList(ex: string | ExceptionList): JSX.Element {
    if (typeof ex === "string")
        return <p>{ex}</p>;

    let rows = Object.keys(ex).map((key) => {
        let val = ex[key];

        return (
            <React.Fragment key={key}>
                <dt><Code>{key}</Code></dt>
                <dd>{Array.isArray(val) ? brTagsFromArray(val) : val}</dd>
            </React.Fragment>
        );
    });
    return <dl>{rows}</dl>;
}

const Page = (props: PageProps) => {
    const PageBreadcrumbs: IBreadcrumbProps[] = [
        { text: "Instructions", href: "/instruction" },
        { text: props.id.toUpperCase() },
    ];

    return (
        <Layout navGroup="instruction" title={`${props.id.toUpperCase()} Instruction`}>
            <Card className="breadcrumbs" interactive>
                <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={PageBreadcrumbs} />
            </Card>
            <div id="main">
                <TOC.Root>
                    <TOC.Entry href="#headingEncoding" text="Encoding" />
                    <TOC.Entry href="#headingDescription" text="Description" />
                    <TOC.Entry href="#headingOperation" text="Operation" />
                    {props.flags &&
                        <TOC.Entry href="#headingFlags" text="Flags Affected" />}
                    {props.intrinsics &&
                        <TOC.Entry href="#headingIntrinsics" text="Intrinsics" />}
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
                            <TOC.Entry href="#headingExceptionsLong" text="64-Bit Mode" />}
                        {props.exceptions.floating &&
                            <TOC.Entry href="#headingExceptionsFloating" text="SIMD Floating-Point" />}
                        {props.exceptions.other &&
                            <TOC.Entry href="#headingExceptionsOther" text="Other" />}
                    </TOC.Entry>
                </TOC.Root>
                <div id="content">
                    <H1><Code>{props.id.toUpperCase()}</Code> Instruction</H1>
                    <HTMLTable striped bordered interactive>
                        <thead>
                            <tr>
                                <th>Opcode</th>
                                <th>Mnemonic</th>
                                <th><a href="#headingEncoding">Encoding</a></th>
                                {props.validity.split(",").map((entry) =>
                                    <th key={entry}>{OpcodeValidityKeyMap[entry]}</th>
                                )}
                                {props.opcode[0].cpuid &&
                                    <th><Link href="/instruction/cpuid"><a>CPUID</a></Link> Feature Flag</th>}
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.opcode.map((row, idx) => (
                                <tr key={idx}>
                                    <td><Code>{row.opcode}</Code></td>
                                    <td><Code>{row.mnemonic}</Code></td>
                                    <td><Code>{row.encoding}</Code></td>
                                    {props.validity.split(",").map((entry) =>
                                        // This ensures that they are displayed in the same order as the heading
                                        <td key={entry}>{OpcodeValidityMap[row.validity[entry]]}</td>
                                    )}
                                    {row.cpuid &&
                                        <td>
                                            {Array.isArray(row.cpuid) ? brTagsFromArray(row.cpuid) : row.cpuid}
                                        </td>}
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </HTMLTable>

                    <H2 id="headingEncoding">Encoding</H2>
                    <HTMLTable striped bordered interactive>
                        <thead>
                            <tr>
                                <th>Op/En</th>
                                <th>Operand 1</th>
                                <th>Operand 2</th>
                                <th>Operand 3</th>
                                <th>Operand 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.encoding.map((row, idx) => (
                                <tr key={idx}>
                                    <td><Code>{row.encoding}</Code></td>
                                    <td>{row.op1}</td>
                                    <td>{row.op2}</td>
                                    <td>{row.op3}</td>
                                    <td>{row.op4}</td>
                                </tr>
                            ))}
                        </tbody>
                    </HTMLTable>

                    <H2 id="headingDescription">Description</H2>
                    {paragraphsFromString(props.description)}

                    <H2 id="headingOperation">Operation</H2>
                    <SyntaxHighlighter language="rust">
                        {props.operation}
                    </SyntaxHighlighter>

                    {props.flags &&
                        <>
                            <H2 id="headingFlags">Flags Affected</H2>
                            {paragraphsFromString(props.flags)}
                        </>}

                    {props.intrinsics &&
                        <>
                            <H2 id="headingIntrinsics">Intrinsics</H2>
                            <SyntaxHighlighter language="c-like">
                                {props.intrinsics}
                            </SyntaxHighlighter>
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
                            <H3 id="headingExceptionsLong">64-Bit Mode</H3>
                            {regularExceptionList(props.exceptions.long)}
                        </>}
                    {props.exceptions.floating &&
                        <>
                            <H3 id="headingExceptionsFloating">SIMD Floating-Point</H3>
                            {paragraphsFromString(props.exceptions.floating)}
                        </>}
                    {props.exceptions.other &&
                        <>
                            <H3 id="headingExceptionsOther">Other</H3>
                            {paragraphsFromString(props.exceptions.other)}
                        </>}
                </div>
            </div>
        </Layout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllInstructionsAsParams(),
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getInstructionData(context.params["slug"] as string);
    return {
        props: data
    };
}
