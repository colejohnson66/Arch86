/* This file is part of 80x86.
 * Copyright (c) 2020-2021 Cole Tobin
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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import A from "../A";
import React from "react";

type TOCEntryProps = {
    href: string,
    text: string,
    tocIndex?: string,
    children?: React.ReactNode,
};

export default function Entry(props: TOCEntryProps): JSX.Element {
    // Set `tocIndex`, but only on valid TOC entries (filter out nulls)
    let count = 0;
    const newChildren = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            count++;
            return React.cloneElement(child, { tocIndex: `${props.tocIndex}.${count}` });
        }
        return child;
    });
    return (
        <li>
            {props.tocIndex}. <A href={props.href}>{props.text}</A>
            {(newChildren && newChildren.length !== 0) && <ul>{newChildren}</ul>}
        </li>
    );
}
