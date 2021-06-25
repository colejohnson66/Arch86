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
import { Col, Container, Row } from "../components/Bootstrap";
import React, { CSSProperties } from "react";

import A from "../components/A";
import Layout from "../components/Layout";

export default function Page(): JSX.Element {
    const IconStyle: CSSProperties = {
        filter: "drop-shadow(0 0 0.33em gray)",
        float: "left",
        margin: "0.25em 0.75em 0.25em 0",
    };

    return (
        <Layout canonical="/" navGroup="home" homePage src="/pages/index.tsx">
            <Container fluid>
                <Row>
                    <Col id="content">
                        <img src="/img/icon.svg" alt="" width="64" height="64" style={IconStyle} />
                        <h1>80x86 Website</h1>
                        <p>
                            This website is designed to be a digital reference version of the x86 processor architecture.
                            This includes everything from the venerable <A href="/architecture/8086">8086</A> to the Intel Core architecture of today.
                        </p>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
