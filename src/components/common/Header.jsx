import { WiMoonAltFirstQuarter, WiMoonAltThirdQuarter } from 'react-icons/wi'
import { useContext } from 'react'
import { AppContext } from '../../App'

export default function Header() {
  const { theme, setTheme } = useContext(AppContext)

  function toggleTheme() {
    setTimeout(
      () => setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light')),
      100
    )
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
    </header>
  )
}
