import React from 'react'
import { Link } from 'react-router-dom'
import { PlacesType, Tooltip } from 'react-tooltip';

interface MyLinkIconTootip {
    id: string;
    to: string;
    content: string;
    place: PlacesType | undefined;
    icon: string;
    state?: any;
}

export const MyLinkTooltip = ({ id, to, content, icon, place, state }: MyLinkIconTootip) => {
    return (
        <>
            <Link
                to={to}
                data-tooltip-id={id}
                data-tooltip-content={content}
                data-tooltip-place={place}
                className='p-1'
                state={state}
            // { state: { ...almac } }
            >
                <h1><i className={icon}></i></h1>
            </Link>
            <Tooltip id={id} />
        </>
    )
}
