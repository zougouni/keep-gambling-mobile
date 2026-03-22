import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatBar } from '../components/StatBar';
import { CHARACTERS } from '../data/characters';
import { useGameEngine } from '../hooks/useGameEngine';

function ActionButton({ label, onPress, disabled, variant = 'primary' }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[`button_${variant}`],
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

export function GameScreen() {
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[1]);
  const {
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
  } = useGameEngine(selectedCharacter);

  const resultPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!lastRound) return;

    Animated.sequence([
      Animated.timing(resultPulse, { toValue: 1.08, duration: 120, useNativeDriver: true }),
      Animated.timing(resultPulse, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  }, [lastRound, resultPulse]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Keep Gambling Mobile</Text>
      <Text style={styles.subtitle}>Version locale fun entre amis</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personnage</Text>
        <View style={styles.characterGrid}>
          {CHARACTERS.map((character) => {
            const active = selectedCharacter.id === character.id;
            return (
              <Pressable
                key={character.id}
                onPress={() => setSelectedCharacter(character)}
                style={[styles.characterChip, active && styles.characterChipActive]}
              >
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.characterDesc}>{character.description}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.statsColumn}>
          <StatBar label="Luck" value={computedLuck} color="#2EA043" />
          <StatBar label="Risk" value={selectedCharacter.risk} color="#F85149" />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Session</Text>
        <Text style={styles.money}>${money}</Text>
        <Text style={styles.muted}>Mise: ${bet}</Text>
        <Text style={styles.muted}>Niveau {progression.level} — XP {progression.xp}/{progression.xpToNextLevel}</Text>

        <View style={styles.row}>
          <ActionButton label="- Mise" onPress={decreaseBet} disabled={bet <= 5} variant="secondary" />
          <ActionButton label="+ Mise" onPress={increaseBet} disabled={bet >= money} variant="secondary" />
        </View>

        <View style={styles.row}>
          <ActionButton label="Boost Luck (-$15)" onPress={boostLuck} disabled={money < 15} variant="secondary" />
          <ActionButton label="Reset" onPress={resetRun} variant="danger" />
        </View>

        <ActionButton label="SPIN" onPress={playRound} disabled={!canPlay} />
      </View>

      <Animated.View style={[styles.card, { transform: [{ scale: resultPulse }] }]}>
        <Text style={styles.sectionTitle}>Dernier résultat</Text>
        {!lastRound ? (
          <Text style={styles.muted}>Lance une manche pour démarrer.</Text>
        ) : (
          <>
            <Text style={[styles.roundResult, lastRound.didWin ? styles.win : styles.lose]}>
              {lastRound.didWin ? `+${lastRound.amountDelta}$` : `-${lastRound.amountDelta}$`}
            </Text>
            <Text style={styles.muted}>Chance de gain: {lastRound.winChance.toFixed(1)}%</Text>
            <Text style={styles.muted}>XP gagnée: {lastRound.gainedXp}</Text>
          </>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 24,
  },
  subtitle: {
    color: '#8B949E',
    marginTop: -4,
  },
  card: {
    backgroundColor: '#161B22',
    borderColor: '#30363D',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  characterGrid: {
    gap: 8,
  },
  characterChip: {
    borderColor: '#30363D',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  characterChipActive: {
    borderColor: '#58A6FF',
    backgroundColor: '#1F2A37',
  },
  characterName: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  characterDesc: {
    color: '#B4BAC4',
    fontSize: 12,
  },
  statsColumn: {
    marginTop: 4,
    gap: 8,
  },
  money: {
    color: '#3FB950',
    fontSize: 38,
    fontWeight: '800',
  },
  muted: {
    color: '#8B949E',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  button_primary: {
    backgroundColor: '#2EA043',
  },
  button_secondary: {
    backgroundColor: '#1F6FEB',
  },
  button_danger: {
    backgroundColor: '#D73A49',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  roundResult: {
    fontSize: 32,
    fontWeight: '900',
  },
  win: {
    color: '#3FB950',
  },
  lose: {
    color: '#F85149',
  },
});
