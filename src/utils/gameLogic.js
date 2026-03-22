/**
 * Retourne un nombre entier entre min et max inclus.
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Simule une manche de hasard.
 * Le paramètre luck améliore légèrement la probabilité de gain.
 */
export function spinRound({ money, bet, luck, risk }) {
  const normalizedLuck = Math.max(0, Math.min(100, luck));
  const normalizedRisk = Math.max(0, Math.min(100, risk));

  // Probabilité de base 45%, augmentée par la chance et ajustée par le risque.
  const winChance = 45 + normalizedLuck * 0.25 - normalizedRisk * 0.1;
  const roll = Math.random() * 100;

  const didWin = roll <= winChance;

  // Multiplicateurs dynamiques pour donner un côté "casino arcade".
  const baseMultiplier = didWin
    ? 1 + randomInt(10, 25) / 10 + normalizedRisk / 100
    : 0.4 + randomInt(0, 8) / 10;

  const amountDelta = Math.max(1, Math.floor(bet * baseMultiplier));
  const moneyAfterRound = didWin ? money + amountDelta : money - amountDelta;

  return {
    didWin,
    amountDelta,
    moneyAfterRound: Math.max(0, moneyAfterRound),
    winChance,
  };
}

/**
 * Donne l'XP gagnée selon le résultat de la manche.
 */
export function calculateXp({ didWin, amountDelta, bet }) {
  const baseXp = didWin ? 18 : 9;
  return baseXp + Math.floor(amountDelta / 5) + Math.floor(bet / 4);
}

/**
 * Applique la progression de niveau.
 */
export function applyLevelProgression(levelState, gainedXp) {
  let { level, xp, xpToNextLevel } = levelState;
  xp += gainedXp;

  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel;
    level += 1;
    // Courbe simple de progression.
    xpToNextLevel = Math.floor(xpToNextLevel * 1.2);
  }

  return { level, xp, xpToNextLevel };
}
