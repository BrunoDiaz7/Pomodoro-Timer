import React, {useEffect} from "react";

export const Timer = ({timeLeft, timeFormat}) => {
    useEffect(() => {
        document.title = timeFormat(timeLeft);
    }, [timeLeft, timeFormat]);

    return (
        <div>
            <span>{timeFormat(timeLeft)}</span>
        </div>
    )
}