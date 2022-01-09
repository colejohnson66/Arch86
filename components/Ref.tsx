/* =============================================================================
 * File:   Ref.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022 Cole Tobin
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

type RefRootProps = {
    children: React.ReactNode;
};

function RefRoot(props: RefRootProps): React.ReactElement {
    // TODO: support columns
    return (
        <>
            <h2 id="headingReferences">References</h2>
            <ul>
                {props.children}
            </ul>
        </>
    );
}

type RefEntryProps = {
    name: string;
    children: React.ReactNode;
};

function RefEntry(props: RefEntryProps): React.ReactElement {
    return (
        <li id={`reference-${props.name}`}>
            {`[${props.name}] - `}
            {props.children}
        </li>
    );
}

type RefLinkProps = {
    name: string;
};

function RefLink(props: RefLinkProps): React.ReactElement {
    return (
        <sup className="whitespace-nowrap">
            <A href={`#reference-${props.name}`}>
                [{props.name}]
            </A>
        </sup>
    );
}

export default {
    Root: RefRoot,
    Entry: RefEntry,
    Link: RefLink,
};
