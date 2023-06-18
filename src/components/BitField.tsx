/* =============================================================================
 * File:   BitField.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2022-2023 Cole Tobin
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

import Scrollable from "@/components/Scrollable";

type BitFieldRootProps = {
    bits: number;
    // bitsPerRow: number;
    children: React.ReactNode;
}

function BitFieldRoot(props: BitFieldRootProps): React.ReactElement {
    return (
        <Scrollable>
            <table>
                <thead>
                    <tr>
                        {[...Array(props.bits)].map((_, i) => (
                            <th key={i} className="p-1.5 text-center">
                                {props.bits - i - 1}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.children}
                    </tr>
                </tbody>
            </table>
        </Scrollable>
    );
}

type BitFieldEntryProps = {
    bits: number;
    children: React.ReactNode;
}

function BitFieldEntry(props: BitFieldEntryProps): React.ReactElement {
    return (
        <td colSpan={props.bits} className="text-center">{props.children}</td>
    );
}

type BitFieldReservedProps = {
    bits: number;
}

function BitFieldReserved(props: BitFieldReservedProps): React.ReactElement {
    return (
        <td colSpan={props.bits} className="bg-slate-300 text-center">Reserved</td>
    );
}

export default {
    Entry: BitFieldEntry,
    Reserved: BitFieldReserved,
    Root: BitFieldRoot,
};
