/* =============================================================================
 * File:   FixUpChildren.ts
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

import React from "react";

export type EntryPropsSimplified = {
    tocIndex?: number;
};

export default function FixUpChildren(children: React.ReactNode): React.ReactElement[] | undefined {
    if (!children)
        return undefined;

    // Set `tocIndex`, but only on valid TOC entries (filter out nulls)
    let count = 0;
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child))
            return child; // map nothing to nothing; renderer will remove it
        count++;
        return React.cloneElement(child as React.ReactElement<EntryPropsSimplified>, { tocIndex: count });
    }) as React.ReactElement[];
}
