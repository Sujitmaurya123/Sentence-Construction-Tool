import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import questionData from '../sample.json';

interface Question {
    questionId: string;
    question: string;
    options: string[];
    correctAnswer: string[];
}

interface Feedback {
    question: string;
    selected: string[];
    correct: string[];
    isCorrect: boolean;
}

const App = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [selectedWords, setSelectedWords] = useState<(string | null)[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [timer, setTimer] = useState(30);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const loadedQuestions = questionData.data.questions;
        setQuestions(loadedQuestions);
        setSelectedWords(new Array(loadedQuestions[0].correctAnswer.length).fill(null));
    }, []);

    useEffect(() => {
        if (timer === 0) {
            handleNext();
            return;
        }

        const countdown = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    const handleWordClick = (word: string) => {
        if (selectedWords.includes(word)) return;

        const index = selectedWords.findIndex((w) => w === null);
        if (index !== -1) {
            const updated = [...selectedWords];
            updated[index] = word;
            setSelectedWords(updated);
        }
    };

    const handleBlankClick = (index: number) => {
        const updated = [...selectedWords];
        updated[index] = null;
        setSelectedWords(updated);
    };

    const handleNext = () => {
        const question = questions[current];
        const isCorrect =
            JSON.stringify(selectedWords) === JSON.stringify(question.correctAnswer);

        setFeedback([
            ...feedback,
            {
                question: question.question,
                selected: selectedWords as string[],
                correct: question.correctAnswer,
                isCorrect,
            },
        ]);

        const nextIndex = current + 1;
        if (nextIndex >= questions.length) {
            setIsFinished(true);
        } else {
            const nextBlanks = questions[nextIndex].correctAnswer.length;
            setCurrent(nextIndex);
            setSelectedWords(new Array(nextBlanks).fill(null));
            setTimer(30);
        }
    };

    if (questions.length === 0) return <div className="p-4">Loading...</div>;

    if (isFinished) {
        const score = feedback.filter((f) => f.isCorrect).length;
        return (
            <div className="p-4 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Feedback</h2>
                {feedback.map((f, i) => (
                    <Card key={i} className="mb-4">
                        <CardContent className="p-4">
                            <p className="font-medium">Q{i + 1}: {f.question}</p>
                            <p className="text-sm">Your answer: {f.selected.join(', ')}</p>
                            {!f.isCorrect && (
                                <p className="text-sm text-red-500">
                                    Correct: {f.correct.join(', ')}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
                <p className="text-xl font-semibold">Score: {score} / {questions.length}</p>
            </div>
        );
    }

    const q = questions[current];

    let blankIndex = 0;
    const sentenceParts = q.question.split(' ').map((part, i) => {
        if (part.includes('_____________')) {
            const index = blankIndex;
            const value = selectedWords[index] || '_____';
            blankIndex++;
            return (
                <button
                    key={`blank-${i}`}
                    onClick={() => handleBlankClick(index)}
                    className="px-2 py-1 border rounded mx-1 bg-gray-100"
                >
                    {value}
                </button>
            );
        } else {
            return (
                <span key={`word-${i}`} className="mx-1">
                    {part}
                </span>
            );
        }
    });

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sentence Construction</h1>
            <div className="mb-2 text-right font-mono">Time Left: {timer}s</div>
            <div className="mb-4 text-lg flex flex-wrap items-center gap-1">{sentenceParts}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {q.options.map((option, i) => (
                    <Button
                        key={i}
                        onClick={() => handleWordClick(option)}
                        disabled={selectedWords.includes(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>

            <Button
                onClick={handleNext}
                disabled={selectedWords.includes(null)}
            >
                Next
            </Button>
        </div>
    );
};

export default App;
