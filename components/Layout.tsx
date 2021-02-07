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

import { Breadcrumb, Breadcrumbs, Button, Card, Divider, IBreadcrumbProps, Navbar } from "@blueprintjs/core";

import Head from "next/head";
import Link from "../components/Link";
import React from "react";
import Scrollable from "./Scrollable";
import { strict as assert } from "assert";

type NavGroup = "home" | "about" | "instruction" | "architecture" | "register" | "mode";
type LayoutProps = {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    navGroup?: NavGroup;
    breadcrumbs?: IBreadcrumbProps[];
    children?: React.ReactNode;
};

function renderBreadcrumbs({ text, href, ...restProps }: IBreadcrumbProps): JSX.Element {
    return (
        <Breadcrumb {...restProps}>
            {href
                ? <Link href={href}>{text}</Link>
                : text}
        </Breadcrumb>
    );
}

export default function Layout(props: LayoutProps): JSX.Element {
    function navItem(group: NavGroup, href: string, text: string) {
        return (
            <Link href={href}>
                <Button
                    active={props.navGroup === group}
                    className="bp3-minimal"
                    text={text} />
            </Link>
        );
    }

    if (props.canonical)
        assert(props.canonical[0] === "/");

    return (
        <>
            <Head>
                {props.title ?
                    <title>80x86 - {props.title}</title> :
                    <title>80x86</title>}
                {props.description && <meta name="description" content={props.description} />}
                {props.keywords && <meta name="keywords" content={props.keywords} />}
                {props.canonical && <link rel="canonical" href={`https://80x86.dev${props.canonical}`} />}
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <Card id="all" className="bp3-dark">
                <header>
                    <Navbar>
                        <Scrollable>
                            <Navbar.Group>
                                <Link href="/">
                                    <Button
                                        active={props.navGroup === "home"}
                                        className="bp3-minimal"
                                        text="80x86" />
                                </Link>
                                <Navbar.Divider />
                                {navItem("about", "/about", "About")}
                                {navItem("instruction", "/instruction", "Instructions")}
                                {navItem("architecture", "/architecture", "Microarchitecture")}
                                {navItem("register", "/register", "Registers")}
                                {navItem("mode", "/mode", "Modes")}
                            </Navbar.Group>
                        </Scrollable>
                    </Navbar>
                </header>
                <main>
                    {props.breadcrumbs &&
                        <Card className="breadcrumbs" interactive={true}>
                            <Breadcrumbs breadcrumbRenderer={renderBreadcrumbs} items={props.breadcrumbs} />
                        </Card>}
                    <div id="main">
                        {props.children}
                    </div>
                </main>
                <Divider />
                <footer>
                    <div className="bp3-text-small">
                        <p>
                            <Link href="/contact">Contact</Link>
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
