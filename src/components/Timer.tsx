import React, { useEffect, useState } from "react";

type Props = {
    onTimeUp: () => void;
};

const Timer: React.FC<Props> = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    return <div className="text-right text-gray-600 mb-2">Time left: {timeLeft}s</div>;
};

export default Timer;