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

import AlertImport from "./Alert";
import BreadcrumbItem from "./Breadcrumb/Item";
import BreadcrumbRoot from "./Breadcrumb/Root";
import ColImport from "./Col";
import ContainerImport from "./Container";
import ContentColImport from "./ContentCol";
import NavItem from "./Nav/Item";
import NavRoot from "./Nav/Root";
import NavbarBrandImport from "./NavbarBrand";
import NavbarImport from "./Navbar";
import RowImport from "./Row";
import TableImport from "./Table";

export const Alert = AlertImport;

export const Breadcrumb = {
    Item: BreadcrumbItem,
    Root: BreadcrumbRoot,
};

export const Col = ColImport;

export const Container = ContainerImport;

export const ContentCol = ContentColImport;

export const Nav = {
    Item: NavItem,
    Root: NavRoot,
};

export const Navbar = NavbarImport;

export const NavbarBrand = NavbarBrandImport;

export const Row = RowImport;

export const Table = TableImport;

export type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
