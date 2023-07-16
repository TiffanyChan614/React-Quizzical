import { useState, useEffect, createContext } from 'react'
import { START_PAGE, QUIZ_PAGE, ANS_PAGE } from './utils/helper'
import PageLayout from './components/PageLayout'
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

  const [scoreboard, setScoreboard] = useState([])

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
  useLocalStorage('theme', theme)
  useLocalStorage('questionsData', questionsData)
  useLocalStorage('formData', formData)

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
        }}>
        <PageLayout>
          {currentPage === START_PAGE && <Content.Start />}
          {currentPage === QUIZ_PAGE && <Content.Quiz />}
          {currentPage === ANS_PAGE && <Content.Ans />}
        </PageLayout>
      </AppContext.Provider>
    </main>
  )
}
