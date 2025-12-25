import {useState, useCallback} from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions"

import quizCompleted from "../assets/quiz-complete.png"

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length;

    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length

    const handleSelectedAnswer = useCallback(function (selectedAnswer) {
        setUserAnswers(prevState => {
           return [...prevState, selectedAnswer]
        })
    }, []);

    const handleSelectAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer])

    if (isQuizCompleted) {
        return <div id="summary">
            <img src={quizCompleted} alt="Quiz is completed"/>
            <h2>Quiz is completed. Congratulations!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (<div id="quiz">
        <QuestionTimer key={activeQuestionIndex} timeout={5000} onTimeout={handleSelectAnswer}></QuestionTimer>
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

            <ul id="answers">
                {shuffledAnswers.map((answer) => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>)
}