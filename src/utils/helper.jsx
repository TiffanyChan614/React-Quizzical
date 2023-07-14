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

export const START_PAGE = 0,
  QUIZ_PAGE = 1,
  ANS_PAGE = 2
