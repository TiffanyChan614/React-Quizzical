import { useState, createContext } from 'react'
import {
  START_PAGE,
  QUIZ_PAGE,
  ANS_PAGE,
  SCOREBOARD_PAGE,
  INITIAL_FORM_DATA,
  INITIAL_SCORE,
} from './utils/constants'
import PageLayout from './components/PageLayout'
import Content from './components/Content/index'
import useLocalStorage from './hooks/useLocalStorage'

export const AppContext = createContext()

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      return Number(localStorage.getItem('currentPage')) || START_PAGE
    } catch {
      return START_PAGE
    }
  })
  const [quizPage, setQuizPage] = useState(() => {
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
  const [formData, setFormData] = useState(() => {
    try {
      const storedFormData = JSON.parse(localStorage.getItem('formData'))
      return storedFormData
        ? {
            ['num-questions']: Number(storedFormData['num-questions']),
            ...storedFormData,
          }
        : { ...INITIAL_FORM_DATA }
    } catch {
      return {
        ...INITIAL_FORM_DATA,
      }
    }
  })

  const [score, setScore] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('score')) || { ...INITIAL_SCORE }
    } catch {
      return {
        ...INITIAL_SCORE,
      }
    }
  })

  const [theme, setTheme] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('theme')) || 'light'
    } catch {
      return 'light'
    }
  })

  const [newlyAddedScore, setNewlyAddedScore] = useState({})

  useLocalStorage('currentPage', currentPage)
  useLocalStorage('quizPage', quizPage)
  useLocalStorage('theme', theme)
  useLocalStorage('questionsData', questionsData)
  useLocalStorage('formData', formData)
  useLocalStorage('score', score)

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
          score,
          setScore,
          theme,
          setTheme,
          quizPage,
          setQuizPage,
          newlyAddedScore,
          setNewlyAddedScore,
        }}>
        <PageLayout>
          {currentPage === START_PAGE && <Content.Start />}
          {currentPage === QUIZ_PAGE && <Content.Quiz />}
          {currentPage === ANS_PAGE && <Content.Ans />}
          {currentPage === SCOREBOARD_PAGE && <Content.Scoreboard />}
        </PageLayout>
      </AppContext.Provider>
    </main>
  )
}
