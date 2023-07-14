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
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      return Number(localStorage.getItem('currentPage')) || START_PAGE
    } catch {
      return START_PAGE
    }
  })
  const [questionsData, setQuestionsData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('questionsData')) || []
    } catch {
      return []
    }
  })
  const [displayedAnsData, setDisplayedAnsData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('displayedAnsData')) || []
    } catch {
      return []
    }
  })
  const [formData, setFormData] = useState(() => {
    try {
      const storedFormData = JSON.parse(localStorage.getItem('formData'))
      return storedFormData
        ? {
            ['num-questions']: Number(storedFormData['num-questions']),
            ...storedFormData,
          }
        : {
            'num-questions': 0,
            category: '',
            difficulty: '',
            type: '',
          }
    } catch {
      return {
        'num-questions': 0,
        category: '',
        difficulty: '',
        type: '',
      }
    }
  })

  const [score, setScore] = useState(0)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    localStorage.setItem('displayedAnsData', JSON.stringify(displayedAnsData))
  }, [displayedAnsData])

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('questionsData', JSON.stringify(questionsData))
  }, [questionsData])

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (questionsData?.length > 0 && displayedAnsData?.length === 0) {
      const updatedAnsData = questionsData.map((question) => {
        let allAns = question.incorrectAnswers.concat(question.correctAnswer)

        if (isTrueFalse(allAns)) {
          allAns = allAns.sort((a) => (a === 'True' ? -1 : 1))
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
  }, [displayedAnsData, questionsData])

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
