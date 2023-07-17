import { useState, useEffect, createContext } from 'react'
import {
  START_PAGE,
  QUIZ_PAGE,
  ANS_PAGE,
  SCOREBOARD_PAGE,
  INITIAL_FORM_DATA,
  INITIAL_SCORE,
} from './utils/constants'
import PageLayout from './components/common/PageLayout'
import Content from './components/Content/index'
import useLocalStorage from './hooks/useLocalStorage'
// import { onSnapshot } from 'firebase/firestore'
// import { scoreboardCollection } from './utils/firebase'

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

  const [score, setScore] = useState({
    ...INITIAL_SCORE,
  })

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  const [scoreboard, setScoreboard] = useState(null)

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(scoreboardCollection, (snapshot) => {
  //     const scoreboardData = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))
  //     setScoreboard(scoreboardData)
  //   })
  //   return unsubscribe
  // }, [])

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
          scoreboard,
          setScoreboard,
          quizPage,
          setQuizPage,
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
