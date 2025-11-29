
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Answer } from '@/types/Question';
import { colors } from '@/styles/commonStyles';

interface AnswerCardProps {
  answer: Answer;
  onPress: () => void;
  isSelected: boolean;
  showResult: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function AnswerCard({ answer, onPress, isSelected, showResult }: AnswerCardProps) {
  const getCardStyle = () => {
    if (!showResult) {
      return isSelected ? styles.cardSelected : styles.card;
    }
    
    if (isSelected) {
      return answer.isCorrect ? styles.cardCorrect : styles.cardIncorrect;
    }
    
    return styles.card;
  };

  return (
    <TouchableOpacity
      style={getCardStyle()}
      onPress={onPress}
      disabled={showResult}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: answer.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2}>
          {answer.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  cardSelected: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  cardCorrect: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    borderWidth: 3,
    borderColor: colors.success,
  },
  cardIncorrect: {
    width: cardWidth,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    elevation: 5,
    borderWidth: 3,
    borderColor: colors.error,
  },
  image: {
    width: '100%',
    height: cardWidth * 0.8,
    backgroundColor: colors.highlight,
  },
  textContainer: {
    padding: 12,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
