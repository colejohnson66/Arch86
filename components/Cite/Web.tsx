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

import DateTime from "../DateTime";
import Link from "../Link";

type CiteWebProps = {
    author: string | string[],
    date?: string,
    url?: string,
    title: string,
    website?: string,
    accessDate: string,
}

// Web citation roughly following Wikipedia's style (Citation Style 1)
const CiteWeb = (props: CiteWebProps) => {
    let author: string;
    if (typeof props.author === "string")
        author = props.author;
    else
        author = props.author.join(", ");

    // TODO: if no author, put this after the website
    let date: JSX.Element | null = null;
    if (props.date)
        date = <>{" ("}<DateTime dateTime={props.date} />)</>;
    
    let titleAndLink: JSX.Element;
    if (props.url)
        titleAndLink = <Link href={props.url}>{props.title}</Link>;
    else
        titleAndLink = <>"{props.title}"</>;
    
    let website: JSX.Element | null = null;
    if (props.website)
        website = <><i>{props.website}.</i>{" "}</>
    
    let accessDate = <>Retrieved <DateTime dateTime={props.accessDate} />{". "}</>;

    return (
        <span className="citation-web">
            {author}
            {date}
            {(props.author || props.date) && ". "}
            {titleAndLink}{". "}
            {website}
            {accessDate}
        </span>
    );
}

export default CiteWeb;
