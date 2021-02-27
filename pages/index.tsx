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

import A from "../components/A";
import { CSSProperties } from "react";
import { H1 } from "@blueprintjs/core";
import Layout from "../components/Layout";
import React from "react";

export default function Page(): JSX.Element {
    const IconStyle: CSSProperties = {
        filter: "drop-shadow(0 0 0.33em white)",
        float: "left",
        margin: "0.25em 0.75em 0.25em 0",
    };

    return (
        <Layout canonical="/" navGroup="home" src="/pages/index.tsx">
            <div id="content">
                <img src="/img/icon.svg" alt="80x86 Icon" width="64" height="64" style={IconStyle} />
                <H1>80x86 Website</H1>
                <p>
                    This website is designed to be a digital reference version of the x86 processor architecture.
                    This includes everything from the venerable <A href="/architecture/8086">8086</A> to the Intel Core architecture of today.
                </p>
            </div>
        </Layout>
    );
}
