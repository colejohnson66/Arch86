/* =============================================================================
 * File:   Navbar.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2023 Cole Tobin
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
"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import A from "./A";
import { Disclosure } from "@headlessui/react";

type NavbarProps = {
    group?: "home" | "history" | "architecture" | "register" | "mode" | "extension" | "instruction" | "about";
};

/* eslint-disable object-property-newline */
// the navigation bar links in order of appearance
const Navigation = [
    { name: "Arch86", href: "/", group: "home" },
    { name: "History", href: "/history", group: "history" },
    { name: "Microarchitecture", href: "/architecture", group: "architecture" },
    { name: "Registers", href: "/register", group: "register" },
    { name: "Operating Modes", href: "/mode", group: "mode" },
    { name: "ISA Extensions", href: "/extension", group: "extension" },
    { name: "Instructions", href: "/instruction", group: "instruction" },
    { name: "About", href: "/about", group: "about" },
];
/* eslint-enable object-property-newline */

export default function Navbar(props: NavbarProps): React.ReactElement {
    return (
        <Disclosure as="nav" className="flex-initial bg-gray-800">
            {args => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                {/* logo */}
                                <div className="flex-shrink-0">
                                    <A href="/">
                                        <img
                                            className="h-10 w-10 rounded-lg bg-white p-0.5"
                                            src="/img/icon.svg"
                                            alt="Arch86 Icon Linking to the Homepage"
                                        />
                                    </A>
                                </div>
                                {/* buttons */}
                                <div className="hidden lg:block">
                                    <div className="ml-6 flex items-baseline space-x-4">
                                        {Navigation.map(navItem => (
                                            <A
                                                key={navItem.group}
                                                aria-current={navItem.group === props.group && "page"}
                                                className={navItem.group === props.group
                                                    ? "nav-item-active"
                                                    : "nav-item"
                                                }
                                                href={navItem.href}>
                                                {navItem.name}
                                            </A>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex lg:hidden">
                                {/* nav items when collapsed */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {args.open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* dropdown */}
                    <Disclosure.Panel className="lg:hidden">
                        {Navigation.map(navItem => (
                            <div
                                key={navItem.group}
                                className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                <A
                                    aria-current={navItem.group === props.group && "page"}
                                    className={navItem.group === props.group
                                        ? "nav-item-active"
                                        : "nav-item"
                                    }
                                    href={navItem.href}>
                                    {navItem.name}
                                </A>
                            </div>
                        ))}
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    );
}
