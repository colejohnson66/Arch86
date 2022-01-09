/* =============================================================================
 * File:   Layout.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2020-2021 Cole Tobin
 *
 * This file is part of Arch86.
 *
 * Arch86 is free software: you can redistribute it and/or modify it under the
 *   terms of the GNU Affero General Public License as published by the Free
 *   Software Foundation, either version 3 of the License, or (at your option)
 *   any later version.
 *
 * Arch86 is distributed in the hope that it will be useful, but WITHOUT ANY
 *   WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 *   more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 *   along with Arch86. If not, see <http://www.gnu.org/licenses/>.
 * =============================================================================
 */

import { MenuIcon, XIcon } from "@heroicons/react/outline";

import A from "@components/A";
import { Disclosure } from "@headlessui/react";
import Head from "next/head";

type NavGroup = "home" | "history" | "architecture" | "register" | "mode" | "extension" | "instruction" | "instruction" | "about";

type LayoutRootProps = {
    navGroup?: NavGroup;
    pageTitle: string | React.ReactNode;
    canonical?: string;
    children?: React.ReactNode;
};

/* eslint-disable object-property-newline */
const Navigation = [
    { name: "Arch86", href: "/", navGroup: "home" },
    { name: "History", href: "/history", navGroup: "history" },
    { name: "Microarchitecture", href: "/architecture", navGroup: "architecture" },
    { name: "Registers", href: "/register", navGroup: "register" },
    { name: "Operating Modes", href: "/mode", navGroup: "mode" },
    { name: "ISA Extensions", href: "/extension", navGroup: "extension" },
    { name: "Instructions", href: "/instruction", navGroup: "instruction" },
    { name: "About", href: "/about", navGroup: "about" },
];
/* eslint-enable object-property-newline */

function LayoutRoot(props: LayoutRootProps): React.ReactElement {
    return (
        <>
            <Head>
                {props.navGroup === "home" && <title>Arch86</title>}
                {props.canonical && <link rel="canonical" href={`https://arch86.com${props.canonical}`} />}
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-full flex flex-col">
                {/* the actual navbar */}
                <Disclosure as="nav" className="bg-gray-800 flex-initial">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        {/* logo */}
                                        <div className="flex-shrink-0">
                                            <A href="/">
                                                <img className="bg-white rounded-lg p-0.5 h-10 w-10" src="/img/icon.svg" alt="Arch86 Icon Linking to the Homepage" />
                                            </A>
                                        </div>
                                        {/* nav items */}
                                        <div className="hidden lg:block">
                                            <div className="ml-6 flex items-baseline space-x-4">
                                                {Navigation.map((navItem) => (
                                                    <A key={navItem.navGroup} href={navItem.href} aria-current={navItem.navGroup === props.navGroup && "page"} className={
                                                        navItem.navGroup === props.navGroup
                                                            ? "activeNavItem"
                                                            : "inactiveNavItem"}>
                                                        {navItem.name}
                                                    </A>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex lg:hidden">
                                        {/* nav items when collapsed */}
                                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open
                                                ? <XIcon className="block h-6 w-6" aria-hidden="true" />
                                                : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="lg:hidden">
                                {Navigation.map((navItem) => (
                                    <div key={navItem.navGroup} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        <A href={navItem.href} aria-current={navItem.navGroup === props.navGroup && "page"} className=
                                            {navItem.navGroup === props.navGroup
                                                ? "activeNavItem"
                                                : "inactiveNavItem"}>
                                            {navItem.name}
                                        </A>
                                    </div>
                                ))}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                {/* page title */}
                <header className="bg-white shadow flex-initial">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="font-bold text-gray-800">{props.pageTitle}</h1>
                    </div>
                </header>

                {/* content */}
                <main className="flex-1">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {props.children}
                    </div>
                </main>

                {/* footer */}
                <footer className="bg-white shadow flex-initial">
                    <div className="text-sm max-w-7xl mx-auto pt-6 pb-10 px-4 sm:px-6 lg:px-8">
                        <p>
                            Website copyright &copy; Cole Tobin 2020-2022.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

type LayoutTitleProps = {
    title: string;
}

function LayoutTitle(props: LayoutTitleProps): React.ReactElement {
    return (
        <Head>
            <title>{props.title} | Arch86</title>
        </Head>
    );
}

type LayoutContentProps = {
    children: React.ReactNode;
}

function LayoutContent(props: LayoutContentProps): React.ReactElement {
    return (
        <div className="px-4 py-6 sm:px-0">
            {props.children}
        </div>
    );
}

export default {
    Root: LayoutRoot,
    Title: LayoutTitle,
    Content: LayoutContent,
};
