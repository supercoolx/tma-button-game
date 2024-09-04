import { useEffect, useState } from "react";
import Audio from '@/modules/Audio';
import { useRef } from "react";

const PushButton = ({ text, disable, callback }) => {
    const [pushed, setPushed] = useState(false);
    const [locked, setLocked] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        return;
    }
    const handleMouseDown = (e) => {
        if (disable || locked) return;
        if(e.button == 0 && !disable && !pushed && !locked) {
            setPushed(true);
            setLocked(true);
            setTimeout(() => {
                setPushed(false);
                setTimeout(() => {
                    setLocked(false);
                    Audio.click.play();
                    callback();
                }, 200);
            }, 200);
        }
    }
    const handleMouseUp = (e) => {
        e.preventDefault();
    }
    const handleMouseLeave = (e) => {
        e.preventDefault();
    }
    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    return (
        <div
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            // onTouchStart={handleTouchStart}
            // onTouchEnd={handleTouchEnd}
            // onTouchCancel={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
            className={`w-60 h-60 relative bg-[rgb(194,194,194)] rounded-full`}>
            <div className={`w-48 h-48 absolute top-6 left-6 bg-[rgb(26,106,255)] rounded-full`}></div>
            <div className={`w-48 h-48 select-none absolute top-2 left-6 bg-[rgb(149,185,255)] rounded-full cursor-pointer transition-all duration-200 flex justify-center items-center text-5xl ${pushed ? 'translate-y-3' : ''}`}>{text}</div>
        </div>
    )
}

export default PushButton;