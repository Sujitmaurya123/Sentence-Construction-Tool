import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
interface SentenceConstructionProps {
    timePerQuestion?: number;
    totalQuestions?: number;
    coins?: number;
    onStart?: () => void;
    onBack?: () => void;
}

const SentenceConstruction: React.FC<SentenceConstructionProps> = ({
    timePerQuestion = 30,
    totalQuestions = 10,
    coins = 0,
    onStart,
    onBack,
}) => {
    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full max-w-md"
            >
                <Card
                    className={cn(
                        "bg-white/5  ",
                      
                        "p-6 space-y-6"
                    )}
                >
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className={cn(
                            "text-3xl sm:text-4xl font-bold",
                            " text-gray-800 bg-clip-text",
                            ""
                        )}>
                            Sentence Construction
                        </CardTitle>
                        <CardDescription className={cn(
                            "text-gray-600 text-sm sm:text-base",
                            "text-center"
                        )}>
                            Select the correct words to complete the sentence by arranging
                            the provided options in the right order.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                        <div className={cn(
                            "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4",
                            "text-center text-gray-600 text-sm sm:text-base"
                        )}>
                            <div>
                                <div className="font-semibold">Time Per Question</div>
                                <div>{timePerQuestion} sec</div>
                            </div>
                            <div>
                                <div className="font-semibold">Total Questions</div>
                                <div>{totalQuestions}</div>
                            </div>
                            <div>
                                <div className="font-semibold">Coins</div>
                                <div className="flex items-center justify-center gap-1">
                                <FaCoins className="text-yellow-500 text-2xl" />
                                    <span>{coins}</span>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row  justify-between">
                            <Link to="/" >
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className={cn(
                                    "flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-100 border-gray-700",
                                    "shadow-md hover:shadow-lg",
                                    "transition-all duration-300",
                                    "py-3 sm:py-4 text-sm sm:text-base"
                                )}
                            >
                                Back
                            </Button>
                            </Link>
                            <Link to="/quizpage" >
                            <Button
                                onClick={onStart}
                                className={cn(
                                    "flex-1 bg-blue-600 text-white",
                                    
                                    "shadow-lg hover:shadow-xl",
                                    "transition-all duration-300",
                                    "py-3 sm:py-4 text-sm sm:text-base font-semibold"
                                )}
                            >
                                Start
                            </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default SentenceConstruction;
