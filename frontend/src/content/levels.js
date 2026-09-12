import { fourthChapters } from './lessons/quatrieme'
import { sixthChapters } from './lessons/sixieme'

export const levels = [
  {
    id: '6e', shortLabel: '6e', title: 'Les bases en confiance',
    description: 'Consolide les nombres, les fractions, les mesures et la géométrie.',
    chapters: sixthChapters,
  },
  {
    id: '5e', shortLabel: '5e', title: 'J’approfondis mes méthodes',
    description: 'Découvre les nombres relatifs, le calcul littéral et les probabilités.',
    chapters: [
      { title: 'Nombres et opérations', lessons: [] },
      {
        title: 'Nombres relatifs',
        lessons: [{ slug: 'addition-soustraction-nombres-relatifs', title: 'Additionner et soustraire des nombres relatifs' }],
      },
      ...['Fractions et puissances', 'Calcul littéral', 'Géométrie', 'Statistiques et probabilités', 'Proportionnalité et fonctions', 'Pensée informatique'].map((title) => ({ title, lessons: [] })),
    ],
  },
  {
    id: '4e', shortLabel: '4e', title: 'Je raisonne pas à pas',
    description: 'Progresse en calcul, équations, proportionnalité et démonstration.',
    chapters: fourthChapters,
  },
  {
    id: '3e', shortLabel: '3e', title: 'Objectif brevet',
    description: 'Maîtrise les fonctions, la géométrie et les méthodes attendues au brevet.',
    chapters: ['Nombres et calculs', 'Calcul littéral et équations', 'Fonctions', 'Statistiques et probabilités', 'Pythagore, Thalès et trigonométrie', 'Transformations et espace', 'Algorithmique', 'Révisions du brevet'].map((title) => ({ title, lessons: [] })),
  },
]

export function getLevel(levelId) {
  return levels.find((level) => level.id === levelId)
}
