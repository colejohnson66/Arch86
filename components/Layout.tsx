/* This file is part of 80x86.
 * Copyright (c) 2020 Cole Johnson
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

import { Container, Nav, Navbar } from "react-bootstrap";

import Head from "next/head";
import Link from "next/link";
import React from "react";

type LayoutProps = {
    title?: string,
    description?: string,
    keywords?: string,
    navGroup?: string,
    children?: React.ReactNode,
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            <Head>
                {props.title ?
                    <title>80x86 - {props.title}</title> :
                    <title>80x86</title>
                }
                {props.description ?
                    <meta name="description" content={props.description} /> :
                    null
                }
                {props.keywords ?
                    <meta name="keywords" content={props.keywords} /> :
                    null
                }
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navbar bg="light" expand="md">
                    <Link href="/">
                        <a className="navbar-brand">
                            <img src="/img/logo@32.png" width="32" height="32" alt="" />
                            80x86
                        </a>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item className={props.navGroup == "home" ? "active" : ""}>
                                <Link href="/">
                                    <a className="nav-link">
                                        Home
                                        {props.navGroup == "home" ?
                                            <span className="sr-only">(current)</span> :
                                            false
                                        }
                                    </a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item className={props.navGroup == "about" ? "active" : ""}>
                                <Link href="/about">
                                    <a className="nav-link">
                                        About
                                        {props.navGroup == "about" ?
                                            <span className="sr-only">(current)</span> :
                                            false
                                        }
                                    </a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item className={props.navGroup == "instruction" ? "active" : ""}>
                                <Link href="/instruction">
                                    <a className="nav-link">
                                        Instructions
                                        {props.navGroup == "instruction" ?
                                            <span className="sr-only">(current)</span> :
                                            false
                                        }
                                    </a>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main>
                {props.children}
            </main>
            <hr />
            <footer>
                <Container className="small-print">
                    <p>
                        <Link href="/contact"><a>Contact</a></Link>
                    </p>
                    <p>
                        Website copyright &copy; Cole Johnson 2020.
                    </p>
                </Container>
            </footer>
        </>
    );
};

export default Layout;
