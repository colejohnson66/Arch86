/* =============================================================================
 * File:   Toc.tsx
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

import A from "@components/A";
import React from "react";

type TocRootProps = {
    children: React.ReactNode,
};

function TocRoot(props: TocRootProps): React.ReactElement {
    // Set `tocIndex`, but only on valid TOC entries (filter out nulls)
    let count = 0;
    const newChildren = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            count++;
            return React.cloneElement(child, { tocIndex: count.toString() });
        }
        return child;
    });

    return (
        <div className="shadow bg-white pl-4 pt-2 pr-4 pb-4 rounded-md mb-2 sm:float-left sm:mr-4" id="toc">
            <div className="font-semibold pb-2">Contents</div>
            <ul className="list-none ml-0">
                {newChildren}
            </ul>
        </div>
    );
}

type TocEntryProps = {
    href: string,
    text: string,
    tocIndex?: string,
    children?: React.ReactNode,
};

function TocEntry(props: TocEntryProps): React.ReactElement {
    // Set `tocIndex`, but only on valid TOC entries (filter out nulls)
    let count = 0;
    const newChildren = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            count++;
            return React.cloneElement(child, { tocIndex: count.toString() });
        }
        return child;
    });

    return (
        <li>
            {props.tocIndex}. <A href={props.href}>{props.text}</A>
            {newChildren?.length !== 0 && <ul className="list-none ml-0 pl-4">{newChildren}</ul>}
        </li>
    );
}

export default {
    Root: TocRoot,
    Entry: TocEntry,
};
