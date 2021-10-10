/* This file is part of 80x86.
 * Copyright (c) 2021 Cole Tobin
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

import React from "react";

type NavbarProps = {
    // expandAt: "sm" | "md" | "lg" | "xl"
    children: React.ReactNode;
};

export default function Navbar(props: NavbarProps): JSX.Element {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            {props.children}
        </nav>
    );
}
