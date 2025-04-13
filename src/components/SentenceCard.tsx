import React, { useEffect, useState } from "react";
import { Question } from "../utils/types";

interface Props {
    question: Question;
    userAnswer: string[];
    onAnswerChange: (filled: string[]) => void;
}

const SentenceCard: React.FC<Props> = ({ question, userAnswer, onAnswerChange }) => {
    const blanks = question.correctAnswer.length;
    const [filled, setFilled] = useState<string[]>(userAnswer || []);
    const [usedOptions, setUsedOptions] = useState<boolean[]>(new Array(question.options.length).fill(false));

    useEffect(() => {
        onAnswerChange(filled);
    }, [filled, onAnswerChange]);

    const handleOptionClick = (word: string, idx: number) => {
        if (filled.length < blanks && !usedOptions[idx]) {
            const newFilled = [...filled, word];
            setFilled(newFilled);
            const newUsed = [...usedOptions];
            newUsed[idx] = true;
            setUsedOptions(newUsed);
        }
    };

    const handleBlankClick = (index: number) => {
        const word = filled[index];
        const newFilled = [...filled];
        newFilled.splice(index, 1); // Remove the word from filled
        const newUsed = [...usedOptions];
        const optIdx = question.options.indexOf(word);
        if (optIdx !== -1) newUsed[optIdx] = false;
        setUsedOptions(newUsed);
        setFilled(newFilled);
    };

    return (
        <div className="border p-4 rounded shadow">
            <div className="mb-4">
                {question.question.split(" ").map((word, idx) => {
                    if (word === "___") {
                        // Show filled word or placeholder (_____)
                        return (
                            <span
                                key={idx}
                                onClick={() => filled[idx] && handleBlankClick(idx)} // Use idx here to maintain correct clicks
                                className="inline-block mx-1 px-2 py-1 bg-gray-100 border rounded cursor-pointer"
                            >
                                {filled[idx] || "_____"}
                            </span>
                        );
                    }
                    return <span key={idx} className="mx-1">{word}</span>;
                })}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {question.options.map((word, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(word, idx)}
                        disabled={usedOptions[idx]}
                        className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SentenceCard;
