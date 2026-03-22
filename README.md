# Keep Gambling Mobile (Expo)

Mini-jeu mobile local inspiré de **Keep Gambling**, pensé pour jouer entre amis.

## Fonctionnalités

- Système de hasard gain/perte à chaque manche.
- Argent virtuel (money) et gestion de mise.
- 3 personnages avec des stats différentes (`luck`, `risk`, argent de départ).
- Système de chance évolutif (boost + progression par niveau).
- Interface mobile simple (boutons + animation du résultat).
- Progression joueur avec niveaux et XP.

## Stack

- React Native
- Expo

## Lancer le projet

```bash
npm install
npm run start
```

Ensuite, scanner le QR code avec **Expo Go** sur téléphone.

## Structure

- `src/data`: données statiques (personnages)
- `src/utils`: logique de jeu
- `src/hooks`: moteur d'état gameplay
- `src/components`: UI réutilisable
- `src/screens`: écran principal
