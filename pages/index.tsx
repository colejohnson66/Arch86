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
import { Col, Container, Row } from "react-bootstrap";

import Layout from "../components/Layout";
import constants from "../constants";

const Index = () => {
    return (
        <Layout navGroup="home">
            <Container fluid>
                <Row>
                    <Col {...constants.columns.toc}>
                        {/* No TOC...yet */}
                    </Col>
                    <Col {...constants.columns.content}>
                        <h1>80x86 Website</h1>
                        <p>
                            Welcome to the 80x86 website.
                            This website is designed to be a digital reference version of the x86 (and x86-64) processor architecture.
                        </p>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default Index;
