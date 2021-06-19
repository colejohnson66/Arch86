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
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Breadcrumb, Container } from "../../../components/Bootstrap";
import { Col, Row } from "react-bootstrap";
import Layout, { Title } from "../../../components/Layout";

import A from "../../../components/A";
import Instruction from "../../../components/Instruction";
import LayoutConstants from "../../../constants/Layout";
import React from "react";
import TOC from "../../../components/TOC";
import WIP from "../../../components/WIP";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/register/control" navGroup="register" src="/pages/register/control/index.tsx">
            <Title title="Control Registers" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/register">Registers</Breadcrumb.Item>
                    <Breadcrumb.Item>Control Registers</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingList" text="List of Control Registers">
                            <TOC.Entry href="#headingCR2" text="CR2" />
                            <TOC.Entry href="#headingCR8" text="CR8" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingUndefinedRegisters" text="Undefined Registers" />
                        <TOC.Entry href="#headingAccess" text="Accessing the Registers" />
                    </TOC.Root>
                    <Col {...LayoutConstants.content}>
                        <h1>Control Registers</h1>
                        <p>
                            The five control registers determine various characteristics of the currently executing program.
                            These registers are: <code>CR0</code>, <code>CR2</code>, <code>CR3</code>, <code>CR4</code>, and <code>CR8</code>.
                        </p>

                        <h2 id="headingList">List of Control Registers</h2>
                        <p>
                            The five registers are:
                        </p>
                        <ul>
                            <li>
                                <code><A href="/register/control/cr0">CR0</A></code>:
                                Flags controlling the <A href="/mode">operating mode</A> and status of the processor.
                            </li>
                            <li>
                                <code><A href="#headingCR2">CR2</A></code>:
                                The page fault linear address (the address that last caused a page fault).
                            </li>
                            <li>
                                <code><A href="/register/control/cr3">CR3</A></code>:
                                The physical address of the base of the paging structure.
                            </li>
                            <li>
                                <code><A href="/register/control/cr4">CR4</A></code>:
                                Flags to enable <A href="/extension">various processor extensions</A>.
                            </li>
                            <li>
                                <code><A href="#headingCR8">CR8</A></code>:
                                Access to the &quot;Task Priority Register&quot; (<code>TPR</code>).
                            </li>
                        </ul>

                        <h3 id="headingCR2">CR2</h3>
                        <WIP section />

                        <h3 id="headingCR8">CR8</h3>
                        <WIP section />

                        <h2 id="headingUndefinedRegisters">Undefined Registers</h2>
                        <p>
                            Currently, only five registers are defined: <code>CR0</code>, <code>CR2</code>, <code>CR3</code>, <code>CR4</code>, and <code>CR8</code>.
                            Despite this, the <A href="#headingAccess">instruction encodings</A> allow the possibility of registers all the way through <code>CR15</code>;
                            Accessing any of the undefined registers will result in a <code>#UD</code> exception being thrown.
                        </p>

                        <h2 id="headingAccess">Accessing the Registers</h2>
                        <p>
                            Control registers are accessed using two special forms of the <Instruction name="MOV" noLink /> instruction.
                            These instructions are detailed on their specific page: <Instruction name="MOV (CR)" as="MOV_control" />.
                        </p>
                        <p>
                            Access to the control registers is only allowed through <A href="/register/gpr">general purpose registers</A>;
                            Memory forms of the <A href="/instruction/help/modRM">ModR/M</A> byte (i.e. where <code>mod</code> is not <code>0b11</code>) are not allowed.
                        </p>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
