import {
  DIFFICULTIES,
  TYPES,
  MAX_DIFFICULTY_SCORE,
  MAX_TYPE_SCORE,
} from './constants'

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
    ((ans[0].title === 'True' && ans[1].title === 'False') ||
      (ans[0].title === 'False' && ans[1].title === 'True'))
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
  const questionWeight = 0.7
  const difficultyWeight = 0.25
  const typeWeight = 0.05

  const difficulty = DIFFICULTIES.find(
    (difficulty) => difficulty.value === score.difficulty
  )
  const type = TYPES.find((type) => type.value === score.type)

  const quizScore = score['num-correct'] * questionWeight
  const difficultyScore =
    difficultyWeight * (difficulty.score / MAX_DIFFICULTY_SCORE) * 10
  const typeScore = typeWeight * (type.score / MAX_TYPE_SCORE) * 10

  const weightedScore = (difficultyScore + typeScore) * quizScore * 100

  return weightedScore.toFixed(0)
}
