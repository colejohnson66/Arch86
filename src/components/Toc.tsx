/* =============================================================================
 * File:   Toc.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2020-2023 Cole Tobin
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

import A from "@/components/A";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import React from "react";

function FixUpChildren(children: React.ReactNode): React.ReactElement[] | undefined {
    if (!children)
        return undefined;

    // Set `tocIndex`, but only on valid TOC entries (filter out nulls)
    let count = 0;
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child))
            return child; // map nothing to nothing; renderer will remove it
        count++;
        return React.cloneElement(child as React.ReactElement<TocEntryProps>, { tocIndex: count.toString() });
    }) as React.ReactElement[];
}

type TocRootProps = {
    children: React.ReactNode;
    collapsed?: boolean;
};

function TocRoot(props: TocRootProps): React.ReactElement {
    "use client";

    const children = FixUpChildren(props.children);

    return (
        <div className="shadow bg-white p-4 rounded-md mb-2 sm:float-left sm:mr-4" id="toc">
            <Disclosure defaultOpen={!(props.collapsed ?? false)}>
                {({ open }) => (
                    <>
                        <div className={`font-semibold text-lg ${open ? "pb-2" : ""}`}>
                            <Disclosure.Button>
                                {/* TODO: animate this; possible Headless UI <Transition>? */}
                                <ChevronUpIcon
                                    className={`float-left mr-1 ${open ? "transform rotate-180 translate-y-2" : ""} h-5 w-5 text-slate-600`} />
                                Contents
                            </Disclosure.Button>
                        </div>
                        {open && <ul className="list-none ml-0">{children}</ul>}
                    </>
                )}
            </Disclosure>
        </div>
    );
}

type TocEntryProps = {
    href: string;
    text: string;
    tocIndex?: string;
    children?: React.ReactNode;
};

function TocEntry(props: TocEntryProps): React.ReactElement {
    const children = FixUpChildren(props.children);

    return (
        <li>
            {props.tocIndex}. <A href={props.href}>{props.text}</A>
            {children?.length !== 0 &&
                <ul className="list-none ml-0 pl-4">{children}</ul>}
        </li>
    );
}

export default {
    Root: TocRoot,
    Entry: TocEntry,
};
