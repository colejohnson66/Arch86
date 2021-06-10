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

import { Breadcrumb, BreadcrumbProps, Breadcrumbs, Button, Card, Divider, Navbar } from "@blueprintjs/core";

import A from "./A";
import Head from "next/head";
import React from "react";
import Scrollable from "./Scrollable";
import { strict as assert } from "assert";

type NavGroup = "home" | "history" | "architecture" | "register" | "mode" | "extension" | "instruction" | "about";
type LayoutProps = {
    canonical?: string;
    navGroup?: NavGroup;
    title?: string;
    description?: string;
    src?: string;
    dataSrc?: string;
    breadcrumbs?: BreadcrumbProps[];
    children?: React.ReactNode;
};

function renderBreadcrumbs({ text, href, ...restProps }: BreadcrumbProps): JSX.Element {
    return (
        <Breadcrumb {...restProps}>
            {href
                ? <A href={href}>{text}</A>
                : text}
        </Breadcrumb>
    );
}

export default function Layout(props: LayoutProps): JSX.Element {
    function navItem(group: NavGroup, href: string, text: string) {
        return (
            <A href={href}>
                <Button
                    active={props.navGroup === group}
                    className="bp3-minimal"
                    text={text} />
            </A>
        );
    }

    // Sanity checks
    // Existence of `props.src` and `props.dataSrc` can't be done as webpack
    //   can't resolve the `fs` module (client can't see the filesystem).
    //   Otherwise, `fs.existsSync(...)` could be used.
    if (props.canonical)
        assert(props.canonical[0] === "/");
    if (props.src)
        assert(props.src[0] === "/");
    if (props.dataSrc)
        assert(props.dataSrc[0] === "/");

    return (
        <>
            <Head>
                {props.title ?
                    <title>80x86 - {props.title}</title> :
                    <title>80x86</title>}
                {props.description && <meta name="description" content={props.description} />}
                {props.canonical && <link rel="canonical" href={`https://80x86.dev${props.canonical}`} />}
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <Card id="all" className="bp3-dark">
                <header>
                    <Navbar>
                        <Scrollable>
                            <Navbar.Group>
                                {navItem("home", "/", "80x86")}
                                <Navbar.Divider />
                                {navItem("history", "/history", "History")}
                                {navItem("architecture", "/architecture", "Microarchitecture")}
                                {navItem("register", "/register", "Registers")}
                                {navItem("mode", "/mode", "Modes")}
                                {navItem("extension", "/extension", "Extensions")}
                                {navItem("instruction", "/instruction", "Instructions")}
                                {navItem("about", "/about", "About")}
                            </Navbar.Group>
                        </Scrollable>
                    </Navbar>
                </header>
                <main>
                    {props.breadcrumbs &&
                        <Card className="breadcrumbs" interactive>
                            <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={props.breadcrumbs} />
                        </Card>}
                    <div id="main">
                        {props.children}
                    </div>
                </main>
                <Divider />
                <footer>
                    <div className="bp3-text-small">
                        {props.src &&
                            <p>
                                <A href={`https://github.com/colejohnson66/80x86/blob/main${props.src}`}>
                                    View this page&apos;s source code
                                </A>
                                {props.dataSrc ? ", and " : "."}
                                {props.dataSrc &&
                                    <A href={`https://github.com/colejohnson66/80x86/blob/main${props.dataSrc}`}>
                                        the data used to generate it
                                    </A>}
                                {props.dataSrc && "."}
                            </p>}
                        <p>
                            <A href="/contact">Contact</A>.
                        </p>
                        <p>
                            Website copyright &copy; Cole Johnson 2020-2021.
                        </p>
                    </div>
                </footer>
            </Card>
        </>
    );
}
