/* =============================================================================
 * File:   A.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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

import Link from "next/link";
import PageList from "@data/PageList";
import React from "react";

// TODO: next uses 'url.UrlObject | string' for 'href'; is that needed here?
type AProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
};

export default function A(props: AProps): JSX.Element {
    let classes = props.className ?? "";

    // is this an internal link? (internal links without slash are invalid)
    if (props.href[0] === "/") {
        if (!PageList.includes(props.href))
            classes += " text-red-500";
        return (
            <Link href={props.href}>
                <a className={classes}>{props.children}</a>
            </Link>
        );
    }
    // TODO: An unknown issue is causing Next to write out links with only a hash as
    //   `{url}#{hash}`. Normally, this wouldn't be an issue, but on "slug" pages, this
    //   causes `#headingEncoding` to turn into `/instruction/[slug]#headingEncoding`,
    //   which doesn't work.
    if (props.href[0] === "#")
        return <a href={props.href} className={classes}>{props.children}</a>;

    // it's external
    return <a href={props.href} className={classes} rel="external">{props.children}</a>;
}
