import { query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { scoreCollection } from './firebase'

export async function fetchScoresByCategory(category) {
  const scoresQuery =
    category === '0'
      ? query(
          scoreCollection,
          orderBy('score.weightedScore', 'desc'),
          limit(25)
        )
      : query(
          scoreCollection,
          orderBy('score.weightedScore', 'desc'),
          where('score.category', '==', category),
          limit(25)
        )

  const querySnapshot = await getDocs(scoresQuery)

  const scores = []
  let rank = 0
  let prevScore = 0
  querySnapshot.docs.map((doc, index) => {
    const {
      name,
      score: { weightedScore },
    } = doc.data()

    if (index === 0) {
      prevScore = weightedScore
      rank++
    } else {
      if (prevScore !== weightedScore) {
        rank++
        prevScore = weightedScore
      }
    }
    scores.push({ id: doc.id, name, weightedScore, rank })
  })

  return scores
}
