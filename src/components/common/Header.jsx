import { WiMoonAltFirstQuarter, WiMoonAltThirdQuarter } from 'react-icons/wi'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { SCOREBOARD_PAGE } from '../../utils/constants'

export default function Header() {
  const { setCurrentPage, quizPage, theme, setTheme } = useContext(AppContext)

  function toggleTheme() {
    setTimeout(
      () => setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light')),
      100
    )
  }

  function goToQuiz() {
    setCurrentPage(quizPage)
  }

  function goToScoreboard() {
    setCurrentPage(SCOREBOARD_PAGE)
  }
  return (
    <header className='header'>
      <div className={`theme-setting ${theme}`}>
        <div
          className='theme-switcher'
          onClick={toggleTheme}>
          {theme === 'light' ? (
            <WiMoonAltThirdQuarter />
          ) : (
            <WiMoonAltFirstQuarter />
          )}{' '}
        </div>
        <div className='theme-desc'>{theme === 'light' ? 'Light' : 'Dark'}</div>
      </div>
      <div className='page-nav'>
        <button
          className={`page-nav--btn ${theme}`}
          onClick={goToQuiz}>
          Quiz
        </button>
        <button
          className={`page-nav--btn ${theme}`}
          onClick={goToScoreboard}>
          Scoreboard
        </button>
      </div>
    </header>
  )
}
