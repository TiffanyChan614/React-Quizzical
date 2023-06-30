import { useState } from 'react'
import StartPage from '../components/StartPage'

const START_PAGE = 0,
	QUIZ_PAGE = 1,
	ANS_PAGE = 2

function App() {
	const [currentPage, setCurrentPage] = useState(START_PAGE)

	console.log(`../asset/yellowblob${currentPage}.svg`)

	return (
		<main>
			<img
				className='yellow-blob'
				src={`../asset/yellowblob${currentPage}.svg`}
				alt='Yellow blob'
			/>
			<img
				className='blue-blob'
				src={`../asset/blueblob${currentPage}.svg`}
				alt='Blue blob'
			/>
			<StartPage />
		</main>
	)
}

export default App
