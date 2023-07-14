import {
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineTwitter,
} from 'react-icons/ai'

import { useContext } from 'react'
import { AppContext } from '../App'

export default function Footer() {
  const { theme } = useContext(AppContext)

  return (
    <footer className='footer'>
      <div className='footer--copy'>Developed by Tiffany Chan</div>
      <div className={`footer--socials ${theme}`}>
        <a
          href='https://www.linkedin.com/in/pui-yi-tiffany-chan-2a35271a5/'
          target='_blank'
          rel='noopener noreferrer'>
          <AiOutlineLinkedin />
        </a>
        <a
          href='https://github.com/TiffanyChan614'
          target='_blank'
          rel='noopener noreferrer'>
          <AiOutlineGithub />
        </a>
        <a
          href='mailto:tiffanychan1999614@gmail.com'
          target='_blank'
          rel='noopener noreferrer'>
          <AiOutlineMail />
        </a>
        <a
          href='https://twitter.com/TiffanyChan614'
          target='_blank'
          rel='noopener noreferrer'>
          <AiOutlineTwitter />
        </a>
      </div>
    </footer>
  )
}
