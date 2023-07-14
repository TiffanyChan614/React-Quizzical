import { useState, useEffect, createContext } from 'react'
import {
  shuffleArray,
  isTrueFalse,
  START_PAGE,
  QUIZ_PAGE,
  ANS_PAGE,
} from './utils/helper'
import Page from './components/Page'

export const AppContext = createContext()

export default function App() {
  const [currentPage, setCurrentPage] = useState(START_PAGE)
  const [questionsData, setQuestionsData] = useState([])
  const [displayedAnsData, setDisplayedAnsData] = useState([])
  const [score, setScore] = useState(0)
  const [formData, setFormData] = useState({
    'num-questions': 0,
    category: '',
    difficulty: '',
    type: '',
  })

  useEffect(() => {
    if (questionsData) {
      setDisplayedAnsData(
        questionsData.map((question) => {
          const allAns = question.incorrectAnswers.concat(
            question.correctAnswer
          )

          if (isTrueFalse) {
            allAns.sort((a) => (a === 'True' ? -1 : 1))
          } else {
            shuffleArray(allAns)
          }

          return allAns.map((ans, ansId) => ({
            id: ansId,
            answer: ans,
            correct: ans === question.correctAnswer,
            selected: false,
          }))
        })
      )
    }
  }, [questionsData])

  return (
    <main>
      <AppContext.Provider
        value={{
          currentPage,
          setCurrentPage,
          formData,
          setFormData,
          questionsData,
          setQuestionsData,
          displayedAnsData,
          setDisplayedAnsData,
          score,
          setScore,
        }}>
        <Page>
          {currentPage === START_PAGE && <Page.Start />}
          {currentPage === QUIZ_PAGE && <Page.Quiz />}
          {currentPage === ANS_PAGE && <Page.Ans />}
        </Page>
      </AppContext.Provider>
    </main>
  )
}
