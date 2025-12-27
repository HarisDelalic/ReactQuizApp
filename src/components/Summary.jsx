import quizCompleted from "../assets/quiz-complete.png";
import QUESTIONS from "../questions"


export default function Summary({ userAnswers }) {
    const skippedCount = userAnswers.filter(answer => answer === null).length;

    const correctAnswersCount = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    ).length;

    const wrongAnswersCount =
        userAnswers.length - correctAnswersCount - skippedCount;

    return <div id="summary">
        <img src={quizCompleted} alt="Quiz is completed"/>
        <h2>Quiz is completed. Congratulations!</h2>

        <p>Correct: {Math.round((correctAnswersCount / userAnswers.length) * 100)}%</p>
        <p>Wrong: {Math.round((wrongAnswersCount / userAnswers.length) * 100)}%</p>
        <p>Skipped: {Math.round((skippedCount / userAnswers.length) * 100)}%</p>

        <ol>
        {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer';

            if (answer === null) {
                cssClass += ' skipped';
            } else if (answer === QUESTIONS[index].answers[0]) {
                cssClass += ' correct';
            } else {
                cssClass += ' wrong';
            }

            return (
                <li key={index}>
                    <h3>{index + 1}</h3>
                    <p className="question">{QUESTIONS[index].text}</p>
                    <p className={cssClass}>{answer ?? 'Skipped'}</p>
                </li>
            );
        })}
        </ol>
    </div>
}