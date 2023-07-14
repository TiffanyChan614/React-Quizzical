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
  const [currentPage, setCurrentPage] = useState(
    () => JSON.parse(localStorage.getItem('currentPage')) || START_PAGE
  )
  const [questionsData, setQuestionsData] = useState(
    () => JSON.parse(localStorage.getItem('questionsData')) || []
  )
  const [displayedAnsData, setDisplayedAnsData] = useState(
    () => JSON.parse(localStorage.getItem('displayedAnsData')) || []
  )
  const [score, setScore] = useState(0)
  const [formData, setFormData] = useState({
    'num-questions': 0,
    category: '',
    difficulty: '',
    type: '',
  })
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (questionsData.length > 0 && displayedAnsData.length === 0) {
      const updatedAnsData = questionsData.map((question) => {
        const allAns = question.incorrectAnswers.concat(question.correctAnswer)

        if (isTrueFalse(allAns)) {
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

      setDisplayedAnsData(updatedAnsData)
    }
  }, [displayedAnsData.length, questionsData])

  useEffect(() => {
    localStorage.setItem('displayedAnsData', JSON.stringify(displayedAnsData))
  }, [displayedAnsData])

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  return (
    <main className={`main ${theme}`}>
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
          theme,
          setTheme,
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
