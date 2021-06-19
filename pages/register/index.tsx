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
import { Breadcrumb, Container } from "../../components/Bootstrap";
import { Col, Row } from "react-bootstrap";
import Layout, { Title } from "../../components/Layout";

import A from "../../components/A";
import LayoutConstants from "../../constants/Layout";
import React from "react";
import TOC from "../../components/TOC";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/register" navGroup="register" src="/pages/register/index.tsx">
            <Title title="Registers" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item>Registers</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingFiles" text="Register Files" />
                    </TOC.Root>
                    <Col {...LayoutConstants.content}>
                        <h1>Registers</h1>
                        <p>
                            x86 is home to <em>many</em> different registers.
                            They are generally organized into a few different &quot;register files&quot;.
                        </p>

                        <h2 id="headingFiles">Register Files</h2>
                        <p>
                            This is a list of the various register files for x86.
                            Any configuration registers are listed with the register file that accompany them.
                            For example, <code>MXCSR</code> is used with vector instructions, and would be listed with the other vector registers.
                        </p>
                        <ul>
                            <li><A href="/register/gpr">General purpose registers</A> (<code>EAX</code>, <code>EBX</code>, etc.)</li>
                            <li><A href="/register/flags">Flags register</A> (<code>(ER)FLAGS</code>)</li>
                            <li><A href="/register/segment">Segment registers</A> (<code>CS</code>, <code>DS</code>, etc.)</li>
                            <li><A href="/register/control">Control registers</A> (<code>CR0</code>, <code>CR2</code>, etc.)</li>
                            <li><A href="/register/debug">Debug registers</A> (<code>DR0</code>, <code>DR1</code>, etc.)</li>
                            <li><A href="/register/fpu">Floating point registers</A> (<code>ST(0)</code>, <code>ST(1)</code>, etc.)</li>
                            <li><A href="/register/table">Table registers</A> (<code>GDTR</code>, <code>IDTR</code>, etc.)</li>
                            <li><A href="/register/mmx">Multimedia Extension registers</A> (<code>MM0</code>, <code>MM1</code>, etc.)</li>
                            <li><A href="/register/vector">Vector registers</A> (<code>XMM0</code>, <code>YMM0</code>, etc.)</li>
                            <li><A href="/register/mask">Vector mask registers</A> (<code>K0</code>, <code>K1</code>, etc.)</li>
                            <li><A href="/register/bound">Bound registers</A> (<code>BND0</code>, <code>BND1</code>, etc.)</li>
                            <li><A href="/register/tile">Tile registers</A> (<code>TMM0</code>, <code>TMM1</code>, etc.)</li>
                            <li><A href="/register/msr">Model specific registers</A></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
