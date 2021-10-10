/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Tobin
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

import { Breadcrumb, Col, Container, Row } from "../components/Bootstrap";
import Layout, { Title } from "../components/Layout";

import React from "react";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/contact" src="/pages/contact.tsx">
            <Title title="Contact" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item>Contact</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <Col id="content">
                        <h1>Contact</h1>
                        <p>
                            To contact me, please use the following method:
                        </p>
                        <ul>
                            <li>Email: <i>coleharrisjohnson at gmail dot com</i></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
