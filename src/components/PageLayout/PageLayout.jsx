/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import Header from '../Header'
import Footer from '../Footer'
import blueBlob0 from '../../assets/blueblob0.svg'
import blueBlob1 from '../../assets/blueblob1.svg'
import blueBlob2 from '../../assets/blueblob2.svg'
import yellowBlob0 from '../../assets/yellowblob0.svg'
import yellowBlob1 from '../../assets/yellowblob1.svg'
import yellowBlob2 from '../../assets/yellowblob2.svg'

export default function PageLayout({ children }) {
  const { currentPage, theme } = useContext(AppContext)

  const rightBlobs = [yellowBlob0, yellowBlob1, yellowBlob2]
  const leftBlobs = [blueBlob0, blueBlob1, blueBlob2]

  return (
    <>
      {theme === 'light' ? (
        <>
          <div className='background-image right-blob'>
            <img
              src={rightBlobs[currentPage]}
              alt='Right blob'
            />
          </div>
          <div className='background-image left-blob'>
            <img
              src={leftBlobs[currentPage]}
              alt='Left blob'
            />
          </div>
        </>
      ) : null}
      <Header />
      {children}
      <Footer />
    </>
  )
}
