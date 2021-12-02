/* =============================================================================
 * File:   Breadcrumbs.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021 Cole Tobin
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
import { HomeIcon } from "@heroicons/react/outline";

type BreadcrumbRootProps = {
    children: React.ReactNode;
}

function BreadcrumbRoot(props: BreadcrumbRootProps): React.ReactElement {
    return (
        <nav aria-label="breadcrumb" id="breadcrumbs" className="shadow bg-white p-4 rounded-md mx-4 sm:mx-0">
            <ul className="flex list-none ml-0 pl-2">
                <li className="align-middle">
                    {/* the slash character is inserted through CSS in `global.css` */}
                    <A href="/">
                        <HomeIcon className="block h-6 w-6" />
                    </A>
                </li>
                {props.children}
            </ul>
        </nav>
    );
}

type BreadcrumbItemProps = {
    href?: string;
    children: string | React.ReactNode;
}

function BreadcrumbItem(props: BreadcrumbItemProps): React.ReactElement {
    if (props.href) {
        return (
            <li>
                <A href={props.href}>
                    {props.children}
                </A>
            </li>
        );
    }

    return <li aria-current="true">{props.children}</li>;
}

export default {
    Root: BreadcrumbRoot,
    Item: BreadcrumbItem,
};
