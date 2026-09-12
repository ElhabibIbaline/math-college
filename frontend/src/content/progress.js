export function readProgress() {
  try {
    const data = JSON.parse(localStorage.getItem('mathsimple-progress') || '{}')
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {}
  } catch { return {} }
}

export function saveScore(lesson, score) {
  try {
    const saved = readProgress()
    const previous = saved[lesson.slug]
    const best = Number.isFinite(previous?.score) && (!previous.total || previous.total === lesson.quiz.length) ? previous.score : 0
    localStorage.setItem('mathsimple-progress', JSON.stringify({ ...saved, [lesson.slug]: {
      score: Math.max(best, score), lastScore: score, total: lesson.quiz.length,
      completedAt: new Date().toISOString(),
    } }))
    return true
  } catch { return false }
}

export function parseAnswer(value) {
  const clean = value.trim().replace(/\s/g, '').replace(/−/g, '-').replace(/,/g, '.')
  const decimal = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/
  const parts = clean.split('/')
  if (parts.length > 2 || parts.some(p => !decimal.test(p))) return null
  const result = parts.length === 2 ? Number(parts[0]) / Number(parts[1]) : Number(parts[0])
  return Number.isFinite(result) ? result : null
}
