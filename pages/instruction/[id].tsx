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

import Layout from "../../components/Layout";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import TOC from "../../components/TOC";
import constants from "../../constants";

type Opcode = {
    opcode: string,
    mnemonic: string,
    encoding: string,
    long: string,
    notLong: string,
    description: string,
};
type Encoding = {
    encoding: string,
    op1: string,
    op2: string,
    op3: string,
    op4: string,
};
type Exception = {
    [id: string]: string | string[],
};
type Exceptions = {
    protected?: string | Exception,
    real?: string | Exception,
    virtual?: string | Exception,
    compatibility?: string | Exception,
    long?: string | Exception,
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

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function paragraphFromString(str: string): JSX.Element[] {
    return str.split("\n").map((line, idx) => {
        return (
            <p key={idx}>{line}</p>
        );
    });
}

function regularExceptionTable(ex: string | Exception): JSX.Element {
    if (typeof ex === "string")
        return <p>{ex}</p>;

    let rows: JSX.Element[] = [];
    Object.keys(ex).forEach((key, idx) => {
        let val = ex[key];

        if (typeof val === "string") {
            rows.push(
                <tr key={idx}>
                    <td><code>{key}</code></td>
                    <td>{val}</td>
                </tr>
            );
            return;
        }

        rows.push(
            <tr key={idx}>
                <td><code>{key}</code></td>
                <td>{paragraphFromString(val.join("\n"))}</td>
            </tr>
        );
    });

    return (
        <Table borderless size="sm">
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

const Page = (props: PageProps) => {
    return (
        <Layout navGroup="instruction" title="Instructions">
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item><Link href="/instruction"><a>Instruction</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{props.id.toUpperCase()}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col {...constants.columns.toc}>
                        <TOC.Root>
                            <TOC.Entry href="#headingEncoding" text="Encoding" />
                            <TOC.Entry href="#headingDescription" text="Description" />
                            <TOC.Entry href="#headingOperation" text="Operation" />
                            {props.flags ?
                                <TOC.Entry href="#headingFlags" text="Flags Affected" /> : null}
                            {props.intrinsics ?
                                <TOC.Entry href="#headingIntrinsics" text="Intrinsics" /> : null}
                            <TOC.Entry href="#headingExceptions" text="Exceptions">
                                {props.exceptions.protected ?
                                    <TOC.Entry href="#headingExceptionsProtected" text="Protected Mode" /> : null}
                                {props.exceptions.real ?
                                    <TOC.Entry href="#headingExceptionsReal" text="Real-Address Mode" /> : null}
                                {props.exceptions.virtual ?
                                    <TOC.Entry href="#headingExceptionsVirtual" text="Virtual-8086 Mode" /> : null}
                                {props.exceptions.compatibility ?
                                    <TOC.Entry href="#headingExceptionsCompatibility" text="Compatibility Mode" /> : null}
                                {props.exceptions.long ?
                                    <TOC.Entry href="#headingExceptionsLong" text="64-Bit Mode" /> : null}
                                {props.exceptions.floating ?
                                    <TOC.Entry href="#headingExceptionsFloating" text="SIMD Floating-Point" /> : null}
                                {props.exceptions.other ?
                                    <TOC.Entry href="#headingExceptionsOther" text="Other" /> : null}
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
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.opcode.map((row, idx) => (
                                    <tr key={idx}>
                                        <td><code>{row.opcode}</code></td>
                                        <td><code>{row.mnemonic}</code></td>
                                        <td><code>{row.encoding}</code></td>
                                        <td>{capitalizeFirstLetter(row.long)}</td>
                                        <td>{capitalizeFirstLetter(row.notLong)}</td>
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
                        {paragraphFromString(props.description)}

                        <h2 id="headingOperation">Operation</h2>
                        <SyntaxHighlighter language="rust">
                            {props.operation}
                        </SyntaxHighlighter>

                        {props.flags ?
                            <>
                                <h2 id="headingFlags">Flags Affected</h2>
                                {paragraphFromString(props.flags)}
                            </>
                            : null}

                        {props.intrinsics ?
                            <>
                                <h2 id="headingIntrinsics">Intrinsics</h2>
                                <SyntaxHighlighter language="c-like">
                                    {props.intrinsics}
                                </SyntaxHighlighter>
                            </>
                            : null}


                        <h2 id="headingExceptions">Exceptions</h2>
                        {props.exceptions.protected ?
                            <>
                                <h3 id="headingExceptionsProtected">Protected Mode</h3>
                                {regularExceptionTable(props.exceptions.protected)}
                            </>
                            : null}
                        {props.exceptions.real ?
                            <>
                                <h3 id="headingExceptionsReal">Real-Address Mode</h3>
                                {regularExceptionTable(props.exceptions.real)}
                            </>
                            : null}
                        {props.exceptions.virtual ?
                            <>
                                <h3 id="headingExceptionsVirtual">Virtual-8086 Mode</h3>
                                {regularExceptionTable(props.exceptions.virtual)}
                            </>
                            : null}
                        {props.exceptions.compatibility ?
                            <>
                                <h3 id="headingExceptionsCompatibility">Compatibility Mode</h3>
                                {regularExceptionTable(props.exceptions.compatibility)}
                            </>
                            : null}
                        {props.exceptions.long ?
                            <>
                                <h3 id="headingExceptionsLong">64-Bit Mode</h3>
                                {regularExceptionTable(props.exceptions.long)}
                            </>
                            : null}
                        {props.exceptions.floating ?
                            <>
                                <h3 id="headingExceptionsFloating">SIMD Floating-Point</h3>
                                {paragraphFromString(props.exceptions.floating)}
                            </>
                            : null}
                        {props.exceptions.other ?
                            <>
                                <h3 id="headingExceptionsOther">Other</h3>
                                {paragraphFromString(props.exceptions.other)}
                            </>
                            : null}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllInstructionsAsParams();
    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getInstructionData(context.params["id"] as string);
    return {
        props: data
    };
}
