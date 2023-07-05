export default function StartPage({ handleSubmit, handleChange }) {
	return (
		<div className='start content'>
			<h1>Quizzical</h1>
			<p>Are you ready to test your brain?</p>
			<form className='form-container'>
				<label htmlFor='num-questions'>Number of questions:</label>
				<input
					type='number'
					id='num-questions'
					name='num-questions'
					placeholder='Enter a number between 1 and 50'
					onChange={(event) => handleChange(event)}
				/>
				<button
					className='start-btn'
					onClick={(event) => handleSubmit(event)}>
					Start quiz
				</button>
			</form>
		</div>
	)
}
