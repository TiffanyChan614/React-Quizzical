import { DIFFICULTIES, TYPES } from './constants'

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

export function calculateWeightedScore(score) {
  const questionWeight = 0.6
  const difficultyWeight = 0.3
  const typeWeight = 0.1

  const difficulty = DIFFICULTIES.find(
    (difficulty) => difficulty.value === score.difficulty
  )
  const type = TYPES.find((type) => type.value === score.type)

  const quizScore = score['num-correct'] * questionWeight
  const difficultyScore = difficultyWeight * (difficulty.score / 2)
  const typeScore = typeWeight * (type.score / 2)

  const weightedScore = (difficultyScore + typeScore) * quizScore

  return (weightedScore * 1000).toFixed(0)
}
