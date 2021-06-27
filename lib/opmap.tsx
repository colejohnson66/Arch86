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

// function abbr(short: string, title: string): JSX.Element {
//     return (
//         <abbr className="initialism" title={title}>
//             {short}
//         </abbr>
//     );
// }
//
// const abbreviations = {
//     Ap: abbr("Ap", "A direct address encoded in the bytes following the instruction."),
//     // B
//     Cy: abbr("Cy", "A control register encoded in ModR/M.reg."),
//     Dy: abbr("Dy", "A debug register encoded in ModR/M.reg."),
// };

export function cell(name: string, args?: string, colspan = 0): JSX.Element {
    if (!args) {
        if (colspan)
            return <td colSpan={colspan}><code>{name}</code></td>;
        return <td><code>{name}</code></td>;
    } else {
        const splitArgs = args.split(",");
        const formatted: JSX.Element[] = [];
        splitArgs.forEach((arg, idx) => {
            formatted.push(
                <React.Fragment key={idx}>
                    <code>{arg}</code>
                    {idx !== splitArgs.length - 1 && ", "}
                </React.Fragment>
            );
        });

        if (colspan) {
            return (
                <td colSpan={colspan}>
                    <code>{name}</code>
                    <br />
                    {formatted}
                </td>
            );
        }

        return (
            <td>
                <code>{name}</code>
                <br />
                {formatted}
            </td>
        );
    }
}
