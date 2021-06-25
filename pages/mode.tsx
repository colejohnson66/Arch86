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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Breadcrumb, Container, ContentCol, Row } from "../components/Bootstrap";
import Layout, { Title } from "../components/Layout";

import A from "../components/A";
import React from "react";
import TOC from "../components/TOC";
import Unit from "../components/Unit";

export default function Page(): JSX.Element {
    return (
        <Layout canonical="/mode" navGroup="mode" src="/pages/mode.tsx">
            <Title title="Processor Modes" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item>Processor Modes</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingList" text="List of Modes" />
                    </TOC.Root>
                    <ContentCol>
                        <h1>Processor Modes</h1>
                        <p>
                            x86 has a variety of operating modes.
                            On startup, the processor begins execution in Real Mode as if it were a simple 16 bit processor from 30 plus years ago.
                            It is up to the user (generally the operating system developer) to determine if the processor supports certain modes, and then force the processor into one of them.
                        </p>

                        <h2 id="headingList">List of Modes</h2>
                        <p>
                            There exist three main modes of processor operation:
                        </p>
                        <ul>
                            <li><A href="/mode/real">Real Mode</A> (16 bit)</li>
                            <li><A href="/mode/protected">Protected Mode</A> (32 bit) with option for <A href="/mode/virtual">Virtual-8086 Mode</A> (16 bit) on individual threads</li>
                            <li><A href="/mode/long">Long Mode</A> (64 bit) with option for <A href="/mode/compatibility">Compatibility Mode</A> (32 bit) on individual threads</li>
                        </ul>
                        <p>
                            In addition to those three, there exist two other modes that are generally unused by user facing software:
                        </p>
                        <ul>
                            <li><A href="/mode/unreal">Unreal Mode</A> - a variant of Real Mode, but with access to a <Unit value={4} unit="GiB" /> address space</li>
                            <li><A href="/mode/smm">System Management Mode</A> - intended for BIOSes and other very low level system initialization routines</li>
                        </ul>
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}
