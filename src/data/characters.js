/**
 * Liste de personnages jouables.
 * Chaque personnage influence la partie via ses stats de base.
 */
export const CHARACTERS = [
  {
    id: 'risk-runner',
    name: 'Risk Runner',
    description: 'Très agressif, gros gains possibles mais volatilité élevée.',
    baseMoney: 120,
    luck: 30,
    risk: 85,
  },
  {
    id: 'balanced-brain',
    name: 'Balanced Brain',
    description: 'Profil polyvalent, idéal pour débuter.',
    baseMoney: 100,
    luck: 50,
    risk: 50,
  },
  {
    id: 'safe-keeper',
    name: 'Safe Keeper',
    description: 'Conservateur, pertes limitées mais progression plus lente.',
    baseMoney: 90,
    luck: 70,
    risk: 25,
  },
];

export const INITIAL_LEVEL = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
};
