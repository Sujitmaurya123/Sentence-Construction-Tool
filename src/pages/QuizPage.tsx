import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import questionData from '../sample.json';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="p-4 max-w-3xl mx-auto mt-9">
                {/* <h2 className="text-2xl font-bold mb-4">Feedback</h2> */}

                <div className="flex justify-center items-center mb-6">
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                textSize: '16px',
                                pathColor: `#007500`, // green-500
                                textColor: '#007500',  // green-800
                                trailColor: '#d1d5db', // gray-300
                            })}
                        />
                    </div>
                </div>

                <p className="text-xl font-semibold text-center mb-4 text-green-700">
                    Score: {score} / {questions.length}
                </p>
                <p>
                    While you correctly formed several sentences, there are a couple of areas where improvement is needed.
                    Pay close attention to sentence structure and word placement to ensure clarity and correctness.
                    Review your responses below for more details.
                </p>

                <div className='mt-4 flex justify-center mb-4'>
                    <Link to="/">
                        <Button className='border border-blue-600 bg-white text-blue-600 hover:bg-white cursor-pointer'>
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>

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
                <Button
                    key={`blank-${i}`}
                    onClick={() => handleBlankClick(index)}
                    className="px-2 py-1 border rounded mx-1 bg-gray-100 text-gray-700"
                >
                    {value}
                </Button>
            );
        } else {
            return (
                <span key={`word-${i}`} className="mx-1">
                    {part}
                </span>
            );
        }
    });
    // const progress = ((current + 1) / questions.length) * 100;


    return (
        <div className="p-4 max-w-3xl mx-auto border border-gray-200 shadow-md rounded-xl bg-white mt-[90px]">
            <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Question {current + 1} of {questions.length}</span>
            </div>

            <div className="flex w-full gap-1 mb-4">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`flex-1 h-3 rounded-full transition-all duration-300 ${index < current
                            ? 'bg-#F2A531'          // Attempted
                                : index === current
                                    ? 'bg-blue-300'          // Current
                                    : 'bg-gray-200'          // Not yet
                            }`}
                    ></div>
                ))}
            </div>


            <div className='flex justify-between'>

            <div className="mb-2 text-left font-mono">Time Left: {timer}s</div>
            <div className="mb-2 text-right font-mono">
                <Link to='/'>
                <Button className='bg-white hover:bg-white cursor-pointer text-black border border-gray-400'>
                    Quit
                </Button>
                </Link>
            </div>
            </div>
            <p className="text-xl  mb-9 mt-9 text-center">Select the missing words in the correct order</p>
            <div className="mb-4 text-lg flex flex-wrap items-center gap-1">{sentenceParts}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 mt-8">
                {q.options.map((option, i) => (
                    <Button className='bg-white text-gray-700 hover:bg-white border border-gray-500 cursor-pointer'
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
