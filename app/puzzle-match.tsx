
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { puzzleItems, PuzzleItem } from '@/data/puzzleData';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { IconSymbol } from '@/components/IconSymbol';

export default function PuzzleMatchScreen() {
  const router = useRouter();
  const [shuffledItems, setShuffledItems] = useState<PuzzleItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [matchedItems, setMatchedItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    shuffleItems();
    return () => {
      Speech.stop();
    };
  }, []);

  const shuffleItems = () => {
    const shuffled = [...puzzleItems].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
    setSelectedItems([]);
    setMatchedItems([]);
    setScore(0);
  };

  const handleItemPress = (item: PuzzleItem) => {
    if (matchedItems.includes(item.id) || selectedItems.includes(item.id)) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Speech.speak(item.name, { rate: 0.85 });

    const newSelected = [...selectedItems, item.id];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      const firstItem = shuffledItems.find((i) => i.id === newSelected[0]);
      const secondItem = shuffledItems.find((i) => i.id === newSelected[1]);

      if (firstItem && secondItem && firstItem.matchId === secondItem.matchId) {
        // Match found!
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Speech.speak('Great match!', { rate: 0.85 });
        
        setTimeout(() => {
          setMatchedItems([...matchedItems, ...newSelected]);
          setSelectedItems([]);
          setScore(score + 1);
        }, 500);
      } else {
        // No match
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Speech.speak('Try again!', { rate: 0.85 });
        
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  const isGameComplete = matchedItems.length === puzzleItems.length;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol
              ios_icon_name="chevron.left"
              android_material_icon_name="arrow_back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Puzzle Match</Text>
          <TouchableOpacity style={styles.resetButton} onPress={shuffleItems}>
            <IconSymbol
              ios_icon_name="arrow.clockwise"
              android_material_icon_name="refresh"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Matches: {score} / {puzzleItems.length / 2}</Text>
        </View>

        {isGameComplete ? (
          <View style={styles.completeContainer}>
            <Text style={styles.completeTitle}>🎉 Congratulations! 🎉</Text>
            <Text style={styles.completeText}>You matched all the pairs!</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={shuffleItems}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.subtitle}>Find matching pairs!</Text>

            <View style={styles.grid}>
              {shuffledItems.map((item, index) => {
                const isMatched = matchedItems.includes(item.id);
                const isSelected = selectedItems.includes(item.id);

                return (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.card,
                        isSelected && styles.cardSelected,
                        isMatched && styles.cardMatched,
                      ]}
                      onPress={() => handleItemPress(item)}
                      disabled={isMatched}
                      activeOpacity={0.7}
                    >
                      {isMatched ? (
                        <View style={styles.matchedOverlay}>
                          <Text style={styles.checkmark}>✓</Text>
                        </View>
                      ) : (
                        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                      )}
                    </TouchableOpacity>
                  </React.Fragment>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  resetButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  scoreContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  cardMatched: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  matchedOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.card,
  },
  completeContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.success,
    marginBottom: 16,
    textAlign: 'center',
  },
  completeText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  playAgainText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
});
