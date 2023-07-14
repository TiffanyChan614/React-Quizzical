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

export default function Page({ children }) {
  const { currentPage } = useContext(AppContext)

  const rightBlobs = [yellowBlob0, yellowBlob1, yellowBlob2]
  const leftBlobs = [blueBlob0, blueBlob1, blueBlob2]

  return (
    <>
      <img
        className='right-blob'
        src={rightBlobs[currentPage]}
        alt='Right blob'
      />
      <img
        className='left-blob'
        src={leftBlobs[currentPage]}
        alt='Left blob'
      />
      <Header />
      {children}
      <Footer />
    </>
  )
}
