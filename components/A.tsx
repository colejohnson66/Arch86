/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Johnson
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
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import Link from "next/link";
import React from "react";

// TODO: next uses 'url.UrlObject | string' for 'href'; is that needed here?
type AProps = {
    href: string;
    children: React.ReactNode;
};

export default function A(props: AProps): JSX.Element {
    // is this an internal link?
    // NOTE: this may not work for all internal links (ones that don't start with "/" or "#")
    // TODO: will there be any that won't work?
    if (props.href[0] === "/") {
        return (
            <Link href={props.href}>
                <a>{props.children}</a>
            </Link>
        );
    }
    // TODO: An unknown issue is causing Next to write out links with only a hash as
    //   `{url}#{hash}`. Normally, this wouldn't be an issue, but on "slug" pages, this
    //   causes `#headingEncoding` to turn into `/instruction/[slug]#headingEncoding`,
    //   which doesn't work.
    if (props.href[0] === "#")
        return <a href={props.href}>{props.children}</a>;

    // it's external
    return <a href={props.href} rel="external">{props.children}</a>;
}
