/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import Footer from '../Footer'

import yellowblob0 from '../../assets/yellowblob0.svg'
import yellowblob1 from '../../assets/yellowblob1.svg'
import yellowblob2 from '../../assets/yellowblob2.svg'
import blueblob0 from '../../assets/blueblob0.svg'
import blueblob1 from '../../assets/blueblob1.svg'
import blueblob2 from '../../assets/blueblob2.svg'

export default function Page({ children }) {
  const { currentPage } = useContext(AppContext)

  const yellowBlobs = [yellowblob0, yellowblob1, yellowblob2]
  const blueBlobs = [blueblob0, blueblob1, blueblob2]

  return (
    <>
      <div className='background'>
        <img
          className='yellow-blob'
          src={yellowBlobs[currentPage]}
          alt='Yellow blob'
        />
        <img
          className='blue-blob'
          src={blueBlobs[currentPage]}
          alt='Blue blob'
        />
      </div>
      {children}
      <Footer />
    </>
  )
}
