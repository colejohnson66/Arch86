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
 * You should have received a copy of the GNU Affero General Public License
 *   along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import A from "../../A";
import React from "react";

type NavItemProps = {
    href: string;
    active?: boolean;
    children: React.ReactNode;
};

export default function NavItem(props: NavItemProps): JSX.Element {
    if (props.active) {
        return (
            <li className="nav-item">
                {/* aria-current="page" */}
                <A href={props.href} className="nav-link active">
                    {props.children}
                </A>
            </li>
        );
    }

    return (
        <li className="nav-item">
            <A href={props.href} className="nav-link">
                {props.children}
            </A>
        </li>
    );
}
