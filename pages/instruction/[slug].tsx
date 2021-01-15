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

import { Breadcrumb, Col, Container, Row, Table } from "react-bootstrap";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllInstructionsAsParams, getInstructionData } from "../../lib/instruction";

import IDictionary from "../../types/IDictionary";
import Layout from "../../components/Layout";
import Link from "next/link";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import TOC from "../../components/TOC";
import constants from "../../constants";

type OpcodeValidity = "valid" | "valid*" | "invalid" | "n/e";
const OpcodeValidityMap: { [T in OpcodeValidity]: string } = {
    "valid": "Valid",
    "valid*": "Valid*",
    "invalid": "Invalid",
    "n/e": "Not Encodable"
};
type Opcode = {
    opcode: string,
    mnemonic: string,
    encoding: string,
    long: OpcodeValidity,
    notLong: OpcodeValidity,
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
    opcode: Opcode[],
    encoding: Encoding[],
    description: string,
    operation: string,
    flags?: string,
    intrinsics?: string[],
    exceptions: Exceptions,
}

function brTagsFromArray(str: string[]): JSX.Element[] {
    return str.map((line, idx) => (
        <React.Fragment key={idx}>
            {line}
            {idx !== str.length - 1 && <br />}
        </React.Fragment>
    ));
}

function paragraphsFromArray(str: string[]): JSX.Element[] {
    return str.map((par, idx) => (<p key={idx}>{par}</p>));
}

function paragraphsFromString(str: string): JSX.Element[] {
    return paragraphsFromArray(str.split("\n"));
}

function regularExceptionList(ex: string | ExceptionList): JSX.Element {
    if (typeof ex === "string")
        return <p>{ex}</p>;

    let rows = Object.keys(ex).map((key, idx) => {
        let val = ex[key];

        return (
            <React.Fragment key={idx}>
                <Col sm={2} as="dt"><code>{key}</code></Col>
                <Col sm={10} as="dd">{
                    Array.isArray(val) ? brTagsFromArray(val) : val
                }</Col>
            </React.Fragment>
        );
    });
    return <Row as="dl">{rows}</Row>;
}

const Page = (props: PageProps) => {
    return (
        <Layout navGroup="instruction" title="Instructions">
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item><Link href="/instruction"><a>Instructions</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.id.toUpperCase()}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col {...constants.columns.toc}>
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
                    </Col>
                    <Col {...constants.columns.content}>
                        <h1><code>{props.id.toUpperCase()}</code></h1>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Opcode</th>
                                    <th>Mnemonic</th>
                                    <th>Op/En</th>
                                    <th>64-bit Mode</th>
                                    <th>Compat/Legacy Mode</th>
                                    {props.opcode[0].cpuid &&
                                        <th><Link href="/instruction/cpuid"><a>CPUID</a></Link> Feature Flag</th>}
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.opcode.map((row, idx) => (
                                    <tr key={idx}>
                                        <td><code>{row.opcode}</code></td>
                                        <td><code>{row.mnemonic}</code></td>
                                        <td><code>{row.encoding}</code></td>
                                        <td>{OpcodeValidityMap[row.long]}</td>
                                        <td>{OpcodeValidityMap[row.notLong]}</td>
                                        {row.cpuid &&
                                            <td>
                                                {Array.isArray(row.cpuid) ? brTagsFromArray(row.cpuid) : row.cpuid}
                                            </td>}
                                        <td>{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <h2 id="headingEncoding">Encoding</h2>
                        <Table striped bordered>
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
                                        <td><code>{row.encoding}</code></td>
                                        <td>{row.op1}</td>
                                        <td>{row.op2}</td>
                                        <td>{row.op3}</td>
                                        <td>{row.op4}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <h2 id="headingDescription">Description</h2>
                        {paragraphsFromString(props.description)}

                        <h2 id="headingOperation">Operation</h2>
                        <SyntaxHighlighter language="rust">
                            {props.operation}
                        </SyntaxHighlighter>

                        {props.flags &&
                            <>
                                <h2 id="headingFlags">Flags Affected</h2>
                                {paragraphsFromString(props.flags)}
                            </>}

                        {props.intrinsics &&
                            <>
                                <h2 id="headingIntrinsics">Intrinsics</h2>
                                <SyntaxHighlighter language="c-like">
                                    {props.intrinsics}
                                </SyntaxHighlighter>
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
                                <h3 id="headingExceptionsLong">64-Bit Mode</h3>
                                {regularExceptionList(props.exceptions.long)}
                            </>}
                        {props.exceptions.floating &&
                            <>
                                <h3 id="headingExceptionsFloating">SIMD Floating-Point</h3>
                                {paragraphsFromString(props.exceptions.floating)}
                            </>}
                        {props.exceptions.other &&
                            <>
                                <h3 id="headingExceptionsOther">Other</h3>
                                {paragraphsFromString(props.exceptions.other)}
                            </>}
                    </Col>
                </Row>
            </Container>
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
