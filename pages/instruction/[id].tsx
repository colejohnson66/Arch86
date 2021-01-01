/* This file is part of 80x86.
 * Copyright (c) 2020 Cole Johnson
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
import { getAllInstructions, getInstructionData } from "../../lib/instruction";

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
    UD?: string,
};
type Exceptions = {
    protected: string | Exception,
    real: string | Exception,
    virtual: string | Exception,
    compatibility: string | Exception,
    long: string | Exception,
};

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildOpcodeTableRows(rows: Opcode[]): JSX.Element[] {
    return rows.map((row, idx) => {
        return (
            <tr key={idx}>
                <td><code>{row.opcode}</code></td>
                <td><code>{row.mnemonic}</code></td>
                <td><code>{row.encoding}</code></td>
                <td>{capitalizeFirstLetter(row.long)}</td>
                <td>{capitalizeFirstLetter(row.notLong)}</td>
                <td>{row.description}</td>
            </tr>
        )
    })
}

function buildEncodingTableRows(rows: Encoding[]): JSX.Element[] {
    return rows.map((row, idx) => {
        return (
            <tr key={idx}>
                <td><code>{row.encoding}</code></td>
                <td>{row.op1}</td>
                <td>{row.op2}</td>
                <td>{row.op3}</td>
                <td>{row.op4}</td>
            </tr>
        )
    });
}

function buildParagraph(str: string): JSX.Element[] {
    let ret: JSX.Element[] = [];

    str.split("\n").forEach((line) => {
        ret.push(<p key={ret.length}>{line}</p>);
    });

    return ret;
}

function buildException(ex: string | Exception): JSX.Element {
    if (typeof ex === "string")
        return <p>Same exceptions as {ex} mode.</p>

    let rows: JSX.Element[] = [];
    if (ex.UD)
        rows.push(<tr><td><code>#UD</code></td><td>{ex.UD}</td></tr>)
    
    return (
        <Table borderless size="sm">
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}

type InstructionProps = {
    id: string,
    opcode: Opcode[],
    encoding: Encoding[],
    description: string,
    operation: string,
    flags: string,
    exceptions: Exceptions,
}

const Page = (props: InstructionProps) => {
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
                            <TOC.Entry href="#headingFlags" text="Flags" />
                            <TOC.Entry href="#headingExceptions" text="Exceptions">
                                <TOC.Entry href="#headingExceptionsProtected" text="Protected Mode" />
                                <TOC.Entry href="#headingExceptionsReal" text="Real-Address Mode" />
                                <TOC.Entry href="#headingExceptionsVirtual" text="Virtual-8086 Mode" />
                                <TOC.Entry href="#headingExceptionsCompatibility" text="Compatibility Mode" />
                                <TOC.Entry href="#headingExceptionsLong" text="64-Bit Mode" />
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
                                {buildOpcodeTableRows(props.opcode)}
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
                                {buildEncodingTableRows(props.encoding)}
                            </tbody>
                        </Table>

                        <h2 id="headingDescription">Description</h2>
                        {buildParagraph(props.description)}

                        <h2 id="headingOperation">Operation</h2>
                        <SyntaxHighlighter language="c-like">
                            {props.operation}
                        </SyntaxHighlighter>

                        <h2 id="headingFlags">Flags</h2>
                        {buildParagraph(props.flags)}

                        <h2 id="headingExceptions">Exceptions</h2>
                        <h3 id="headingExceptionsProtected">Protected Mode</h3>
                        {buildException(props.exceptions.protected)}
                        <h3 id="headingExceptionsReal">Real-Address Mode</h3>
                        {buildException(props.exceptions.real)}
                        <h3 id="headingExceptionsVirtual">Virtual-8086 Mode</h3>
                        {buildException(props.exceptions.virtual)}
                        <h3 id="headingExceptionsCompatibility">Compatibility Mode</h3>
                        {buildException(props.exceptions.compatibility)}
                        <h3 id="headingExceptionsLong">64-Bit Mode</h3>
                        {buildException(props.exceptions.protected)}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllInstructions();
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
