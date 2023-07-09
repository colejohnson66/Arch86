/* =============================================================================
 * File:   A.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2023 Cole Tobin
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

import MaybeArray, { CoerceToArray } from "@/types/MaybeArray";

import Link from "next/link";
import PageList from "@/data/PageList";
import React from "react";

type AProps = {
    href: string;
    className?: MaybeArray<string>;
    children: React.ReactNode;
    prefetch?: boolean;
};

export default function A(props: AProps): React.ReactElement {
    const classes = CoerceToArray(props.className ?? []);

    // local link?
    if (props.href[0] === "#") {
        return (
            <Link href={props.href} className={classes.join(" ")} prefetch={props.prefetch}>
                {props.children}
            </Link>
        );
    }

    // internal link? (internal links without slash are invalid)
    if (props.href[0] === "/") {
        if (!PageList.includes(props.href.split("#")[0]))
            classes.push("text-red-500");
        return (
            <Link href={props.href} className={classes.join(" ")} prefetch={props.prefetch}>
                {props.children}
            </Link>
        );
    }

    // it's external
    return (
        <a href={props.href} className={classes.join(" ")} rel="external">
            {props.children}
        </a>
    );
}
