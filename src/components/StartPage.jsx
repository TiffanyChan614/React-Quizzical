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
				<label htmlFor='difficulty'>Difficulty:</label>
				<select
					id='difficulty'
					name='difficulty'
					onChange={handleChange}>
					<option value=''>Any difficulty</option>
					<option value='easy'>Easy</option>
					<option value='medium'>Medium</option>
					<option value='hard'>Hard</option>
				</select>
				<label htmlFor='type'>Question type:</label>
				<select
					id='type'
					name='type'
					onChange={handleChange}>
					<option value=''>Any type</option>
					<option value='multiple'>Multiple choice</option>
					<option value='boolean'>True / False</option>
				</select>
				<button
					className='start-btn'
					onClick={(event) => handleSubmit(event)}>
					Start quiz
				</button>
			</form>
		</div>
	)
}
