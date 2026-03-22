// Validation légère de la logique de progression/hasard sans lancer Expo.
import { spinRound, calculateXp, applyLevelProgression } from '../src/utils/gameLogic.js';

let money = 100;
let state = { level: 1, xp: 0, xpToNextLevel: 100 };

for (let i = 0; i < 12; i += 1) {
  const round = spinRound({ money, bet: 10, luck: 50, risk: 50 });
  const gainedXp = calculateXp({ didWin: round.didWin, amountDelta: round.amountDelta, bet: 10 });
  state = applyLevelProgression(state, gainedXp);
  money = round.moneyAfterRound;
}

if (state.level < 1 || money < 0) {
  throw new Error('Validation échouée.');
}

console.log('Validation logique OK:', { money, state });
