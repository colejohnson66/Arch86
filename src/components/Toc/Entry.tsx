/* =============================================================================
 * File:   Entry.tsx
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
// TODO: without "use client", the first level of TOC has `tocIndex` undefined

import A from "@/components/A";
import FixUpChildren from "./FixUpChildren";

export type EntryProps = {
    href: string;
    text: string;
    tocIndex?: number;
    children?: React.ReactNode;
};

export default function Entry(props: EntryProps): React.ReactElement {
    const children = FixUpChildren(props.children);

    return (
        <li>
            {props.tocIndex}. <A href={props.href}>{props.text}</A>
            {children?.length !== 0 &&
                <ul className="list-none ml-0 pl-4">{children}</ul>}
        </li>
    );
}
