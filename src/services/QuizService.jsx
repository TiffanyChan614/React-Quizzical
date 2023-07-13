async function fetchQuestions(formData) {
  const apiUrl = `https://opentdb.com/api.php?amount=${formData['num-questions']}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`
  const response = await fetch(apiUrl)
  const data = await response.json()
  let questionsData = await data.results.map((question, index) => ({
    id: index,
    question: question.question,
    correctAnswer: question.correct_answer,
    incorrectAnswers: question.incorrect_answers,
  }))
  return questionsData
}

export { fetchQuestions }
