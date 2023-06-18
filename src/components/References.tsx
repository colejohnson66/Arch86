/* =============================================================================
 * File:   References.tsx
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

import Citations, { WebCitation } from "@/types/Citations";

import A from "@/components/A";
import { CoerceToArray } from "@/types/MaybeArray";
import DateTime from "@/components/DateTime";

function Web(citation: WebCitation): React.ReactElement {
    const author = citation.author &&
        CoerceToArray(citation.author).join(", ");

    // TODO: if no author, put this after the website
    const date = citation.date &&
        <>{" ("}<DateTime dt={citation.date} />)</>;

    const titleAndLink = citation.url
        ? <A href={citation.url}>{citation.title}</A>
        : `"${citation.title}"`;

    const website = citation.website &&
        <><i>{citation.website}</i>{" "}</>;

    const accessDate = <>Retrieved <DateTime dt={citation.accessDate} />{". "}</>;

    const archived = citation.archive &&
        <>{" "}<A href={citation.archive.url}>Archived</A> from the original on <DateTime dt={citation.archive.date} />.</>;

    return (
        <span>
            {author}
            {date}
            {(citation.author || citation.date) && ". "}
            {titleAndLink}{". "}
            {website}
            {accessDate}
            {archived}
        </span>
    );
}

function BuildList(citations: Citations): React.ReactElement {
    const entries = Object.entries(citations).map(citation => {
        let contents;
        if (citation[1].type === "web")
            contents = Web(citation[1]);
        else
            throw "Unsupported citation type";

        const key = citation[0];
        return (
            <li key={key} id={`ref-${key}`}>
                <code>[{key}]</code>
                {" - "}
                {contents}
            </li>
        );
    });

    // TODO: support columns
    return <ul>{entries}</ul>;
}


type ReferencesProps = {
    citations: Citations;
    noHeading?: boolean;
}

export default function References(props: ReferencesProps): React.ReactElement {
    // TODO: support columns

    if (props.noHeading)
        return BuildList(props.citations);

    return (
        <>
            <h2 id="headingReferences">References</h2>
            {BuildList(props.citations)}
        </>
    );
}
