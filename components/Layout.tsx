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

import { Button, Icon, Navbar } from "@blueprintjs/core";

import Head from "next/head";
import Link from "next/link";
import React from "react";

type NavGroup = "home" | "about" | "architecture" | "instruction";
type LayoutProps = {
    title?: string,
    description?: string,
    keywords?: string,
    navGroup?: NavGroup,
    children?: React.ReactNode,
}

const Layout = (props: LayoutProps) => {
    function navItem(group: NavGroup, href: string, text: string) {
        return (
            <Link href={href}>
                <a>
                    <Button
                        active={props.navGroup == group}
                        className="bp3-minimal"
                        text={text} />
                </a>
            </Link>
        );
    }

    return (
        <>
            <Head>
                {props.title ?
                    <title>80x86 - {props.title}</title> :
                    <title>80x86</title>
                }
                {props.description && <meta name="description" content={props.description} />}
                {props.keywords && <meta name="keywords" content={props.keywords} />}
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navbar>
                    <Navbar.Group>
                        <Link href="/">
                            <a>
                                <Button
                                    active={props.navGroup == "home"}
                                    className="bp3-minimal"
                                    text="80x86" />
                            </a>
                        </Link>
                        <Navbar.Divider />
                        {navItem("about", "/about", "About")}
                        {navItem("instruction", "/instruction", "Instructions")}
                        {navItem("architecture", "/architecture", "Microarchitecture")}
                    </Navbar.Group>
                </Navbar>
            </header>
            <main>
                {props.children}
            </main>
            <hr />
            <footer>
                <div className="bp3-text-small">
                    <p>
                        <Link href="/contact"><a>Contact</a></Link>
                    </p>
                    <p>
                        Website copyright &copy; Cole Johnson 2020-2021.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Layout;
