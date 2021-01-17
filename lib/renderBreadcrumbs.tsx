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

import { Breadcrumb, IBreadcrumbProps } from "@blueprintjs/core";

import Link from "next/link";

export default function renderBreadcrumbs({ text, href, ...restProps }: IBreadcrumbProps): JSX.Element {
    return (
        <Breadcrumb {...restProps}>
            {href
                ? <Link href={href}><a>{text}</a></Link>
                : <>{text}</>}
        </Breadcrumb>
    );
}
