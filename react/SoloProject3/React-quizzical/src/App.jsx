import { useState } from 'react'

const START_PAGE = 0,
	QUIZ_PAGE = 1,
	ANS_PAGE = 2

function App() {
	const [currentPage, setCurrentPage] = useState(ANS_PAGE)

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
		</main>
	)
}

export default App
