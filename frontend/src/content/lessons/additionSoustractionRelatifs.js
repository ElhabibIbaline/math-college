const additionSoustractionRelatifs = {
  slug: 'addition-soustraction-nombres-relatifs',
  level: '5e',
  chapter: 'Nombres relatifs',
  title: 'Additionner et soustraire des nombres relatifs',
  duration: '20 minutes',
  objectives: [
    'Additionner deux nombres relatifs de même signe.',
    'Additionner deux nombres relatifs de signes différents.',
    'Transformer une soustraction en addition.',
  ],
  exercises: [
    '(+7) + (+5)',
    '(-4) + (-9)',
    '(+13) + (-8)',
    '(-15) + (+6)',
    '(+9) - (-4)',
    '(-12) - (+7)',
  ],
  quiz: [
    { question: 'Combien vaut (+3) − (−8) ?', choices: ['−11', '−5', '+5', '+11'], correct: 3, explanation: 'Soustraire −8 revient à ajouter +8 : 3 + 8 = 11.' },
    { question: 'Combien vaut (−6) − (+5) ?', choices: ['−11', '−1', '+1', '+11'], correct: 0, explanation: 'On ajoute l’opposé de +5 : −6 + (−5) = −11.' },
    { question: 'Combien vaut (−12) − (−7) ?', choices: ['−19', '−5', '+5', '+19'], correct: 1, explanation: 'On transforme en −12 + 7. Les signes sont différents : 12 − 7 = 5, avec le signe négatif.' },
    { question: 'Combien vaut (−4) + (−9) ?', choices: ['−13', '−5', '+5', '+13'], correct: 0, explanation: 'Même signe : on additionne 4 et 9 et on garde le signe négatif.' },
    { question: 'Combien vaut (+11) + (−6) ?', choices: ['−17', '−5', '+5', '+17'], correct: 2, explanation: 'Signes différents : 11 − 6 = 5. Le nombre le plus éloigné de zéro est +11.' },
    { question: 'Combien vaut (−7) + (+7) ?', choices: ['−14', '0', '+7', '+14'], correct: 1, explanation: 'Deux nombres opposés ont une somme égale à zéro.' },
    { question: 'Combien vaut (−15) + (+8) ?', choices: ['−23', '−7', '+7', '+23'], correct: 1, explanation: 'Signes différents : 15 − 8 = 7. −15 est le plus éloigné de zéro.' },
    { question: 'Combien vaut (+5) − (+12) ?', choices: ['−17', '−7', '+7', '+17'], correct: 1, explanation: 'On calcule 5 + (−12). Le résultat est −7.' },
    { question: 'Soustraire un nombre relatif revient à…', choices: ['changer les deux signes', 'ajouter son opposé', 'additionner les distances à zéro', 'supprimer les parenthèses'], correct: 1, explanation: 'La règle générale est a − b = a + (−b).' },
    { question: 'Combien vaut (−2) − (−9) ?', choices: ['−11', '−7', '+7', '+11'], correct: 2, explanation: 'On transforme en −2 + 9, donc le résultat est +7.' },
  ],
}

export default additionSoustractionRelatifs
