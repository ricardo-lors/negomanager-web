import React, { useRef, useState } from 'react'
import { Button, Overlay, OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';

interface MyOverlayProps {
    show: boolean;
    target: React.RefObject<HTMLElement> | (() => HTMLElement);
    placement: string;
    overlay: React.ReactElement;
    trigger?: string;
}

export const MyOverlayComponent = () => {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    const target = useRef(null);

    return (
        <div>

            <Button ref={target} id="overlay-example" onClick={handleToggle}>
                Activar Overlay
            </Button>

            <Overlay
                // trigger="click"
                placement="right"
                // overlay={renderTooltip}
                show={show}
                target={target.current}
            // target={target.current === null ? undefined : target.current}   
            >
                <Tooltip id="overlay-example" >
                    Contenido del Overlay
                </Tooltip>
            </Overlay  >
        </div>
    );
}
