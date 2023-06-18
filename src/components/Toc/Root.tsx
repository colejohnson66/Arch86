/* =============================================================================
 * File:   Root.tsx
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

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import FixUpChildren from "./FixUpChildren";

type TocRootProps = {
    children: React.ReactNode;
    collapsed?: boolean;
};

export default function Root(props: TocRootProps): React.ReactElement {
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
