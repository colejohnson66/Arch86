/* =============================================================================
 * File:   Citations.ts
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

import MaybeArray from "./MaybeArray";

export type WebCitation = {
    type: "web";
    key: string;

    accessDate: Date | string;
    archive?: {
        date: Date | string;
        url: string;
    };
    author?: MaybeArray<string>;
    date?: Date | string;
    dead?: boolean;
    title: string;
    url?: string;
    website?: string;
}

// a union of the various citation types
export type Citation = WebCitation;

type Citations = Record<string, Citation>;

export default Citations;
