export function shuffleArray(array) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}

export function isTrueFalse(ans) {
  return (
    ans.length === 2 &&
    ((ans[0] === 'True' && ans[1] === 'False') ||
      (ans[0] === 'False' && ans[1] === 'True'))
  )
}

export function formatAnswers(incorrectAnswers, correctAnswer) {
  let answers = incorrectAnswers
    .map((ans) => ({ title: ans, correct: false }))
    .concat({ title: correctAnswer, correct: true })
  if (isTrueFalse(answers)) {
    answers = answers.sort((a, b) => (a.title === 'True' ? -1 : 1))
  } else {
    shuffleArray(answers)
  }

  console.log(answers)

  return answers.map((answer, ansId) => {
    const formattedAnswer = {
      id: ansId,
      title: answer.title,
      selected: false,
      correct: answer.correct,
    }

    return formattedAnswer
  })
}

export function formatQuestionsData(questions) {
  return questions.map((question) => ({
    id: question.id,
    title: question.question,
    answers: formatAnswers(question.incorrectAnswers, question.correctAnswer),
  }))
}
