import { MouseEventHandler, ReactNode } from 'react';
import { PlacesType, Tooltip } from 'react-tooltip';

interface MyButtonTooltipProps {
    id: string;
    className?: string;
    content: string;
    place: PlacesType | undefined
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    children: ReactNode
}

export const MyButtonTooltip = ({ id, className, content, place = 'top', onClick, children }: MyButtonTooltipProps) => {
    return (
        <>
            <button
                data-tooltip-id={id}
                className={`btn btn-primary ${className}`}
                data-tooltip-content={content}
                data-tooltip-place={place}
                onClick={onClick} >
                {children}
            </button>
            <Tooltip id={id} />
        </>
    )
}
