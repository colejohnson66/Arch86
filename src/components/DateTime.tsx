/* =============================================================================
 * File:   DateTime.tsx
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

type DateTimeProps = {
    dt: Date | string;
    children?: React.ReactNode;
}

export default function DateTime(props: DateTimeProps): React.ReactElement {
    const dt = typeof props.dt === "string"
        ? new Date(props.dt) // will throw if not valid
        : props.dt;

    return (
        <time
            className="whitespace-nowrap"
            dateTime={dt.toISOString()}>
            {/* will be user-readable if it's a `Date`, or show as is for `string` */}
            {props.children || props.dt.toString()}
        </time>
    );
}
