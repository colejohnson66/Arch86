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
import React from "react";
import { Variant } from ".";

type TableProps = {
    variant?: Variant;
    bordered?: boolean;
    hover?: boolean;
    striped?: boolean;
    small?: boolean;
    captionTop?: boolean;
    children: React.ReactNode;
};

export default function Table(props: TableProps): JSX.Element {
    const classes: string[] = [
        "table",
    ];

    if (props.variant)
        classes.push(`table-${props.variant}`);
    if (props.bordered)
        classes.push("table-bordered");
    if (props.hover)
        classes.push("table-hover");
    if (props.striped)
        classes.push("table-striped");
    if (props.small)
        classes.push("table-sm");
    if (props.captionTop)
        classes.push("caption-top");

    return (
        <table className={classes.join(" ")}>
            {props.children}
        </table>
    );
}
