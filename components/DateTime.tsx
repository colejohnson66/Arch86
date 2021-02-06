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
 * You should have received a copy of the GNU Affero General Public License along
 *   with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import React from "react";

type DateTimeProps = {
    dateTime: string;
    text?: string;
};

export default function DateTime(props: DateTimeProps): JSX.Element {
    // TODO: verify if `props.dateTime` is valid
    // see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
    return (
        <time dateTime={props.dateTime}>
            {props.text ? props.text : props.dateTime}
            <style jsx>{`
                time {
                    white-space: nowrap;
                }
            `}</style>
        </time>
    );
}
