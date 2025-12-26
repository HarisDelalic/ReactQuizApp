import {useState, useCallback} from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions"

import quizCompleted from "../assets/quiz-complete.png"

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([])
    const [answerState, setAnswerState] = useState('')

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length

    const handleSelectedAnswer = useCallback(function (selectedAnswer) {
        setAnswerState('answered')

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)

        }, 1000)



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
        <QuestionTimer key={activeQuestionIndex} timeout={12000} onTimeout={handleSelectAnswer}></QuestionTimer>
        <div id="question">
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

            <ul id="answers">
                {shuffledAnswers.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer
                    let cssClass = ''

                    if(answerState === 'answered' && isSelected) {
                        cssClass = 'selected'
                    }
                    if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState
                    }
                    return <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)} className={cssClass}>{answer}</button>
                    </li>
                })}
            </ul>
        </div>
    </div>)
}