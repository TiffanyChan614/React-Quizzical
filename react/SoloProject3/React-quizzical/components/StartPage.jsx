export default function StartPage({ handleClick }) {
	return (
		<div className='start content'>
			<h1>Quizzical</h1>
			<p>Are you ready to test your brain?</p>
			<button
				className='start-btn'
				onClick={handleClick}>
				Start quiz
			</button>
		</div>
	)
}
