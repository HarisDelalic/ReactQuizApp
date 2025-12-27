import { useState, useEffect } from "react";

export default function QuestionTimer({ onTimeout, timeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearTimeout(interval);
        };
    }, []);

    return <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>;
}

