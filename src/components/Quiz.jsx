import {useState, useCallback, useRef} from "react";

import QUESTIONS from "../questions"

import quizCompleted from "../assets/quiz-complete.png"
import Question from "./Question.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const [answerState, setAnswerState] = useState('')

    const activeQuestionIndex = userAnswers.length

    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
            selectedAnswer
        ) {
            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
            });
        },
        []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (isQuizCompleted) {
        return <div id="summary">
            <img src={quizCompleted} alt="Quiz is completed"/>
            <h2>Quiz is completed. Congratulations!</h2>
        </div>
    }

    return (<div id="quiz">
        <Question
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
        />
    </div>)
}