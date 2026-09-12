import { useState } from 'react'
import { saveScore } from '../content/progress'

function LessonQuiz({ lesson }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  function chooseAnswer(questionIndex, choiceIndex) {
    setAnswers((current) => ({ ...current, [questionIndex]: choiceIndex }))
    setResult(null)
    setError('')
  }

  function submitQuiz(event) {
    event.preventDefault()
    if (Object.keys(answers).length !== lesson.quiz.length) {
      setError(`Réponds aux ${lesson.quiz.length} questions avant de valider le quiz.`)
      return
    }
    const score = lesson.quiz.reduce((total, question, index) => total + (answers[index] === question.correct ? 1 : 0), 0)
    setSaved(saveScore(lesson, score))
    setResult(score)
  }

  function resetQuiz() {
    setAnswers({})
    setResult(null)
    setError('')
  }

  const ratio = result / lesson.quiz.length
  const message = ratio < .5 ? 'Reprends tranquillement le cours.' : ratio < .7 ? 'Tu progresses, encore un effort !' : ratio < .9 ? 'Notion bien comprise !' : 'Très bonne maîtrise !'

  return (
    <section className="lesson-block quiz-block" id="quiz">
      <div className="block-heading"><span className="step-icon">✓</span><div><span className="eyebrow">À toi de jouer</span><h2>Quiz de fin de leçon</h2><p>Réponds aux {lesson.quiz.length} questions, puis découvre ton résultat.</p></div></div>
      <form onSubmit={submitQuiz}>
        <div className="quiz-list">
          {lesson.quiz.map((question, questionIndex) => (
            <fieldset className="quiz-question" key={question.question}>
              <legend><span>{questionIndex + 1}</span>{question.question}</legend>
              <div className="choice-grid">
                {question.choices.map((choice, choiceIndex) => {
                  const checked = answers[questionIndex] === choiceIndex
                  const isCorrect = result !== null && choiceIndex === question.correct
                  const isWrong = result !== null && checked && choiceIndex !== question.correct
                  return (
                    <label className={`quiz-choice${checked ? ' selected' : ''}${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`} key={choice}>
                      <input type="radio" name={`question-${questionIndex}`} checked={checked} onChange={() => chooseAnswer(questionIndex, choiceIndex)} disabled={result !== null} />
                      <span>{choice}</span>
                    </label>
                  )
                })}
              </div>
              {result !== null && <p className="answer-explanation"><strong>{answers[questionIndex] === question.correct ? 'Bonne réponse. ' : `À revoir. Réponse : ${question.choices[question.correct]}. `}</strong>{question.explanation}</p>}
            </fieldset>
          ))}
        </div>
        {error && <p className="quiz-error" role="alert">{error}</p>}
        {result === null ? <button className="button primary" type="submit">Valider mes réponses</button> : (
          <div className="quiz-result" role="status"><strong>{result}/{lesson.quiz.length}</strong><div><h3>{message}</h3><p>{saved ? 'Ton résultat a été enregistré dans ce navigateur.' : 'Résultat disponible ici ; le navigateur ne permet pas sa sauvegarde.'}</p></div><button className="button secondary" type="button" onClick={resetQuiz}>Recommencer</button></div>
        )}
      </form>
    </section>
  )
}

export default LessonQuiz
