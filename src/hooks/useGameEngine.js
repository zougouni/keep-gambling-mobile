import { useMemo, useState } from 'react';
import { INITIAL_LEVEL } from '../data/characters';
import { applyLevelProgression, calculateXp, spinRound } from '../utils/gameLogic';

/**
 * Hook principal de gestion d'état du jeu.
 * Il centralise la logique pour garder les composants UI simples.
 */
export function useGameEngine(selectedCharacter) {
  const [money, setMoney] = useState(selectedCharacter.baseMoney);
  const [bet, setBet] = useState(10);
  const [luckBonus, setLuckBonus] = useState(0);
  const [progression, setProgression] = useState(INITIAL_LEVEL);
  const [lastRound, setLastRound] = useState(null);

  const computedLuck = useMemo(
    () => Math.min(100, selectedCharacter.luck + luckBonus + (progression.level - 1) * 2),
    [luckBonus, progression.level, selectedCharacter.luck],
  );

  const canPlay = money > 0 && bet > 0 && bet <= money;

  const playRound = () => {
    if (!canPlay) return;

    const round = spinRound({
      money,
      bet,
      luck: computedLuck,
      risk: selectedCharacter.risk,
    });

    const gainedXp = calculateXp({
      didWin: round.didWin,
      amountDelta: round.amountDelta,
      bet,
    });

    setMoney(round.moneyAfterRound);
    setProgression((current) => applyLevelProgression(current, gainedXp));
    setLastRound({ ...round, gainedXp });
  };

  const increaseBet = () => setBet((value) => Math.min(money, value + 5));
  const decreaseBet = () => setBet((value) => Math.max(5, value - 5));
  const boostLuck = () => {
    if (money < 15) return;

    // Petit achat stratégique de chance temporaire.
    setMoney((value) => value - 15);
    setLuckBonus((value) => Math.min(20, value + 5));
  };

  const resetRun = () => {
    setMoney(selectedCharacter.baseMoney);
    setBet(10);
    setLuckBonus(0);
    setProgression(INITIAL_LEVEL);
    setLastRound(null);
  };

  return {
    money,
    bet,
    progression,
    lastRound,
    computedLuck,
    canPlay,
    increaseBet,
    decreaseBet,
    boostLuck,
    playRound,
    resetRun,
  };
}
