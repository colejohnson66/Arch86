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

import { Breadcrumb, Container, ContentCol, Row, Table } from "../../../components/Bootstrap";
import Layout, { Title } from "../../../components/Layout";

import { GetStaticProps } from "next";
import React from "react";
import Scrollable from "../../../components/Scrollable";
import TOC from "../../../components/TOC";
import WIP from "../../../components/WIP";
import { cell } from "../../../lib/opmap";
import { getFileData } from "../../../lib/file";
import path from "path";

type RegByRM = {
    "/0"?: string[]
    "/1"?: string[]
    "/2"?: string[]
    "/3"?: string[]
    "/4"?: string[]
    "/5"?: string[]
    "/6"?: string[]
    "/7"?: string[]
}
type MemReg = {
    m?: string[]
    r?: string[] | RegByRM
}
type EscByte = {
    "/0": MemReg
    "/1": MemReg
    "/2": MemReg
    "/3": MemReg
    "/4": MemReg
    "/5": MemReg
    "/6": MemReg
    "/7": MemReg
}
type PageProps = {
    map: {
        D8: EscByte,
        D9: EscByte,
        DA: EscByte,
        DB: EscByte,
        DC: EscByte,
        DD: EscByte,
        DE: EscByte,
        DF: EscByte,
    }
}

function x87cell(memObj?: string[]): JSX.Element {
    if (memObj === undefined)
        return <td />;
    if (memObj.length === 1)
        return cell(memObj[0]);
    return cell(memObj[0], memObj.slice(1).join(","));
}

function buildMemRow(obj: EscByte): JSX.Element {
    return (
        <tr>
            {x87cell(obj["/0"].m)}
            {x87cell(obj["/1"].m)}
            {x87cell(obj["/2"].m)}
            {x87cell(obj["/3"].m)}
            {x87cell(obj["/4"].m)}
            {x87cell(obj["/5"].m)}
            {x87cell(obj["/6"].m)}
            {x87cell(obj["/7"].m)}
        </tr>
    );
}

function buildRegCells(regObj?: string[] | RegByRM): JSX.Element {
    if (!regObj) {
        return (
            <>
                <td key={0} />
                <td key={1} />
                <td key={2} />
                <td key={3} />
                <td key={4} />
                <td key={5} />
                <td key={6} />
                <td key={7} />
            </>
        );
    }

    if (Array.isArray(regObj))
        return cell(regObj[0], regObj.slice(1).join(","), 8);

    return (
        <>
            {x87cell(regObj["/0"])}
            {x87cell(regObj["/1"])}
            {x87cell(regObj["/2"])}
            {x87cell(regObj["/3"])}
            {x87cell(regObj["/4"])}
            {x87cell(regObj["/5"])}
            {x87cell(regObj["/6"])}
            {x87cell(regObj["/7"])}
        </>
    );
}

function buildMemoryTable(obj: EscByte, escapeByte: string): JSX.Element {
    return (
        <Scrollable>
            <Table bordered striped hover small captionTop>
                <caption>
                    <code>{escapeByte}</code> Opcode Map when ModR/M Byte Refers to Memory (<code>00-BF</code>)
                </caption>
                <tbody id="opcodeMap">
                    <tr>
                        <th colSpan={8} scope="colgroup"><code>reg</code> Field of ModR/M Byte</th>
                    </tr>
                    <tr>
                        <th scope="col"><code>000b</code></th>
                        <th scope="col"><code>001b</code></th>
                        <th scope="col"><code>010b</code></th>
                        <th scope="col"><code>011b</code></th>
                        <th scope="col"><code>100b</code></th>
                        <th scope="col"><code>101b</code></th>
                        <th scope="col"><code>110b</code></th>
                        <th scope="col"><code>111b</code></th>
                    </tr>
                    {buildMemRow(obj)}
                </tbody>
            </Table>
        </Scrollable>
    );
}
function buildRegisterTable(obj: EscByte, escapeByte: string): JSX.Element {
    return (
        <Scrollable>
            <Table bordered striped hover small captionTop>
                <caption>
                    <code>{escapeByte}</code> Opcode Map when ModR/M Byte Refers to Register (<code>C0-FF</code>)
                </caption>
                <tbody id="opcodeMap">
                    <tr>
                        <th />
                        <th scope="col"><code>x0</code></th>
                        <th scope="col"><code>x1</code></th>
                        <th scope="col"><code>x2</code></th>
                        <th scope="col"><code>x3</code></th>
                        <th scope="col"><code>x4</code></th>
                        <th scope="col"><code>x5</code></th>
                        <th scope="col"><code>x6</code></th>
                        <th scope="col"><code>x7</code></th>
                        <th scope="col"><code>x8</code></th>
                        <th scope="col"><code>x9</code></th>
                        <th scope="col"><code>xA</code></th>
                        <th scope="col"><code>xB</code></th>
                        <th scope="col"><code>xC</code></th>
                        <th scope="col"><code>xD</code></th>
                        <th scope="col"><code>xE</code></th>
                        <th scope="col"><code>xF</code></th>
                    </tr>
                    <tr>
                        <th scope="row"><code>Cx</code></th>
                        {buildRegCells(obj["/0"].r)}
                        {buildRegCells(obj["/1"].r)}
                    </tr>
                    <tr>
                        <th scope="row"><code>Dx</code></th>
                        {buildRegCells(obj["/2"].r)}
                        {buildRegCells(obj["/3"].r)}
                    </tr>
                    <tr>
                        <th scope="row"><code>Ex</code></th>
                        {buildRegCells(obj["/4"].r)}
                        {buildRegCells(obj["/5"].r)}
                    </tr>
                    <tr>
                        <th scope="row"><code>Fx</code></th>
                        {buildRegCells(obj["/6"].r)}
                        {buildRegCells(obj["/7"].r)}
                    </tr>
                </tbody>
            </Table>
        </Scrollable>
    );
}

function buildSection(obj: EscByte, byte: string): JSX.Element {
    return (
        <>
            <h3 id="headingTableD8">D8 Opcode Map</h3>
            {buildMemoryTable(obj, byte)}
            {buildRegisterTable(obj, byte)}
        </>
    );
}

export default function Page(props: PageProps): JSX.Element {
    return (
        <Layout canonical="/instruction/map/x87" navGroup="instruction" src="/pages/instruction/map/x87.tsx">
            <Title title="x87 FPU Opcode Map" />
            <Container fluid>
                <Breadcrumb.Root>
                    <Breadcrumb.Item href="/instruction">Instructions</Breadcrumb.Item>
                    <Breadcrumb.Item href="/instruction/map">Opcode Map</Breadcrumb.Item>
                    <Breadcrumb.Item>x87 FPU</Breadcrumb.Item>
                </Breadcrumb.Root>
                <Row>
                    <TOC.Root>
                        <TOC.Entry href="#headingTable" text="Tables">
                            <TOC.Entry href="#headingTableD8" text="D8 Opcode Map" />
                            <TOC.Entry href="#headingTableD9" text="D9 Opcode Map" />
                            <TOC.Entry href="#headingTableDA" text="DA Opcode Map" />
                            <TOC.Entry href="#headingTableDB" text="DB Opcode Map" />
                            <TOC.Entry href="#headingTableDC" text="DC Opcode Map" />
                            <TOC.Entry href="#headingTableDD" text="DD Opcode Map" />
                            <TOC.Entry href="#headingTableDE" text="DE Opcode Map" />
                            <TOC.Entry href="#headingTableDF" text="DF Opcode Map" />
                        </TOC.Entry>
                        <TOC.Entry href="#headingPatterns" text="Patterns" />
                    </TOC.Root>
                    <ContentCol>
                        <h1>Opcode Map <small className="text-muted">(x87 FPU)</small></h1>
                        <p>
                            This page details all x87 FPU opcodes.
                        </p>

                        <h2 id="headingTable">Table</h2>
                        {buildSection(props.map.D8, "D8")}
                        {buildSection(props.map.D9, "D9")}
                        {buildSection(props.map.DA, "DA")}
                        {buildSection(props.map.DB, "DB")}
                        {buildSection(props.map.DC, "DC")}
                        {buildSection(props.map.DD, "DD")}
                        {buildSection(props.map.DD, "DE")}
                        {buildSection(props.map.DF, "DF")}

                        <h2 id="headingPatterns">Patterns</h2>
                        <WIP section />
                    </ContentCol>
                </Row>
            </Container>
        </Layout>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getFileData(path.join(process.cwd(), "data", "opmap", "x87.yaml"));
    return {
        props: data as PageProps,
    };
};
