/* =============================================================================
 * File:   Breadcrumbs.tsx
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

import A from "@/components/A";
import { HomeIcon } from "@heroicons/react/24/outline";
import JustChildrenProps from "@/types/JustChildrenProps";

export default function Breadcrumbs(props: JustChildrenProps): React.ReactElement {
    return (
        <nav
            aria-label="breadcrumb"
            className="shadow bg-white p-4 rounded-md mx-4 sm:mx-0"
            id="breadcrumbs">
            <ul className="list-none ml-0 pl-2">
                <li>
                    <A href="/">
                        {/* a negative margin of 1/4 rem aligns better with the baseline of the text */}
                        <HomeIcon
                            aria-label="home"
                            className="inline h-6 w-6 mt-[-0.25rem]"
                            title="Home Icon Linking to the Homepage" />
                    </A>
                </li>
                {props.children}
            </ul>
        </nav>
    );
}
