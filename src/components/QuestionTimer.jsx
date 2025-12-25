import { useState, useEffect } from "react";

export default function QuestionTimer({ onTimeout, timeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("setting timeout");
        setTimeout(onTimeout, timeout);
    }, [onTimeout, timeout]);

    useEffect(() => {
        console.log("setting interval");
        setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);
    }, []);

    return <progress id="question-time" max={timeout} value={remainingTime} />;
}

