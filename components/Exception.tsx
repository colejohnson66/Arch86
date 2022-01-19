/* =============================================================================
 * File:   Exception.tsx
 * Author: Cole Tobin
 * =============================================================================
 * Copyright (c) 2021-2022 Cole Tobin
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

type ExceptionAbbr = "DE" | "DB" | "BP" | "OF" | "BR" | "UD" | "NM" | "DF"
    | "TS" | "NP" | "SS" | "GP" | "PF" | "MF" | "AC" | "MC" | "XM" | "VE"
    | "CP" | "HV" | "VC" | "SX";
type ExceptionProps = {
    name: ExceptionAbbr;
    faultCode?: string;
};

export default function Exception(props: ExceptionProps): React.ReactElement {
    return (
        <code className="whitespace-nowrap">
            #{props.name}{props.faultCode && `(${props.faultCode})`}
        </code>
    );
}
