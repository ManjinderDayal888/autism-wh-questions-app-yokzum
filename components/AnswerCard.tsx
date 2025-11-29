
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Answer } from '@/types/Question';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface AnswerCardProps {
  answer: Answer;
  onPress: () => void;
  isSelected: boolean;
  showResult: boolean;
  onAudioPress?: () => void;
}

export default function AnswerCard({
  answer,
  onPress,
  isSelected,
  showResult,
  onAudioPress,
}: AnswerCardProps) {
  const getCardStyle = () => {
    if (!showResult) {
      return isSelected ? styles.cardSelected : styles.card;
    }
    if (isSelected && answer.isCorrect) {
      return styles.cardCorrect;
    }
    if (isSelected && !answer.isCorrect) {
      return styles.cardIncorrect;
    }
    if (answer.isCorrect) {
      return styles.cardCorrect;
    }
    return styles.card;
  };

  return (
    <TouchableOpacity
      style={[styles.container, getCardStyle()]}
      onPress={onPress}
      disabled={showResult}
      activeOpacity={0.7}
    >
      <Image source={{ uri: answer.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2}>
          {answer.text}
        </Text>
        {onAudioPress && (
          <TouchableOpacity
            style={styles.audioButton}
            onPress={(e) => {
              e.stopPropagation();
              onAudioPress();
            }}
          >
            <IconSymbol
              ios_icon_name="speaker.wave.2"
              android_material_icon_name="volume_up"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      {showResult && answer.isCorrect && (
        <View style={styles.iconContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      )}
      {showResult && isSelected && !answer.isCorrect && (
        <View style={styles.iconContainer}>
          <Text style={styles.cross}>✗</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cardCorrect: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.success,
  },
  cardIncorrect: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.error,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 12,
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  audioButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.success,
  },
  cross: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.error,
  },
});
