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

import { Breadcrumb, Col, Container, Row } from "react-bootstrap";

import DateTime from "../components/DateTime";
import Layout from "../components/Layout";
import Link from "next/link";
import TOC from "../components/TOC";
import WIP from "../components/WIP";
import constants from "../constants";

const Page = () => {
    return (
        <Layout navGroup="architecture" title="Microarchitecture">
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item active>Microarchitecture</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col {...constants.columns.toc}>
                        <TOC.Root>
                            <TOC.Entry href="#headingHistory" text="History" />
                            <TOC.Entry href="#headingRegisters" text="Registers" />
                        </TOC.Root>
                    </Col>
                    <Col {...constants.columns.content}>
                        <h1>Microarchitecture</h1>
                        <p>
                            Over the years, there have been many versions of the x86 microarchitecture.
                            It began with the <Link href="/architecture/8086"><a>8086</a></Link> (released <DateTime dateTime="1979-06-08" />), and continues to this day with the various "Intel Core" microarchitectures.
                        </p>

                        <h2 id="headingHistory">History</h2>
                        <WIP type="section" />
                        <ul>
                            <li><Link href="/architecture/8086"><a>8086</a></Link></li>
                            <li><Link href="/architecture/80186"><a>80186</a></Link></li>
                            <li><Link href="/architecture/80286"><a>80286</a></Link></li>
                            <li><Link href="/architecture/80386"><a>80386</a></Link></li>
                            <li><Link href="/architecture/80486"><a>80486</a></Link></li>
                            <li><Link href="/architecture/p5"><a>P5</a></Link></li>
                            <li><Link href="/architecture/p5"><a>P6</a></Link></li>
                            <li>...</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Page;
