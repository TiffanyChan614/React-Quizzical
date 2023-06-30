import { useState } from 'react'
import StartPage from './components/StartPage'
import yellowblob0 from './assets/yellowblob0.svg'
import yellowblob1 from './assets/yellowblob1.svg'
import yellowblob2 from './assets/yellowblob2.svg'
import blueblob0 from './assets/blueblob0.svg'
import blueblob1 from './assets/blueblob1.svg'
import blueblob2 from './assets/blueblob2.svg'

const START_PAGE = 0,
	QUIZ_PAGE = 1,
	ANS_PAGE = 2

function App() {
	const [currentPage, setCurrentPage] = useState(START_PAGE)

	function handleClick() {
		setCurrentPage((oldPage) => (oldPage + 1) % 3)
	}

	console.log('currentPage', currentPage)

	const yellowBlobs = [yellowblob0, yellowblob1, yellowblob2]
	const blueBlobs = [blueblob0, blueblob1, blueblob2]

	return (
		<main>
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
			{currentPage === START_PAGE && <StartPage handleClick={handleClick} />}
		</main>
	)
}

export default App
