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

import { Alert } from "./Bootstrap";
import React from "react";
import { strict as assert } from "assert";

type WipProps = {
    page?: boolean;
    section?: boolean;
    wording?: boolean;
};

export default function WIP(props: WipProps): JSX.Element {
    assert((!!props.page && !props.section) ||
        (!props.page && !!props.section));
    return (
        <Alert variant="secondary">
            <small>
                This {props.page ? "page" : "section"} is a work in progress.
                It is incomplete, and may not be completely accurate or up to date.
                {props.wording && " The wording or grammar is also in the process of being improved."}
            </small>
        </Alert>
    );
}
