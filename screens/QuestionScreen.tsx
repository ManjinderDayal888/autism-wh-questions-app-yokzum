
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Question, Category } from '@/types/Question';
import { questions } from '@/data/questions';
import AnswerCard from '@/components/AnswerCard';
import { colors } from '@/styles/commonStyles';
import { updateProgress } from '@/utils/progressStorage';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { IconSymbol } from '@/components/IconSymbol';

export default function QuestionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const category = params.category as Category;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [categoryQuestions, setCategoryQuestions] = useState<Question[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const filtered = questions.filter((q) => q.category === category);
    setCategoryQuestions(filtered);
    console.log(`Loaded ${filtered.length} questions for category: ${category}`);
  }, [category]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const currentQuestion = categoryQuestions[currentQuestionIndex];

  const speakText = async (text: string) => {
    try {
      const isSpeakingNow = await Speech.isSpeakingAsync();
      if (isSpeakingNow) {
        await Speech.stop();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        Speech.speak(text, {
          language: 'en-US',
          pitch: 1.0,
          rate: 0.85,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      }
    } catch (error) {
      console.log('Error with speech:', error);
      setIsSpeaking(false);
    }
  };

  const handleAnswerPress = (answerId: string) => {
    if (showResult) return;

    setSelectedAnswerId(answerId);
    setShowResult(true);

    const selectedAnswer = currentQuestion.answers.find((a) => a.id === answerId);
    
    if (selectedAnswer) {
      if (selectedAnswer.isCorrect) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        speakText(`Correct! ${selectedAnswer.text}`);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        const correctAnswer = currentQuestion.answers.find((a) => a.isCorrect);
        if (correctAnswer) {
          speakText(`The correct answer is ${correctAnswer.text}`);
        }
      }

      updateProgress(selectedAnswer.isCorrect, currentQuestion.category, currentQuestion.type);
    }
  };

  const handleNext = async () => {
    await Speech.stop();
    setIsSpeaking(false);
    
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setShowResult(false);
    } else {
      router.back();
    }
  };

  const handleBack = async () => {
    await Speech.stop();
    setIsSpeaking(false);
    router.back();
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {categoryQuestions.length}
            </Text>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
            </View>
            <TouchableOpacity
              style={[styles.audioButton, isSpeaking && styles.audioButtonActive]}
              onPress={() => speakText(currentQuestion.question)}
            >
              <IconSymbol
                ios_icon_name={isSpeaking ? 'speaker.wave.3.fill' : 'speaker.wave.2.fill'}
                android_material_icon_name={isSpeaking ? 'volume_up' : 'volume_up'}
                size={24}
                color={isSpeaking ? colors.primary : colors.text}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <React.Fragment key={index}>
              <AnswerCard
                answer={answer}
                onPress={() => handleAnswerPress(answer.id)}
                isSelected={selectedAnswerId === answer.id}
                showResult={showResult}
                onAudioPress={() => speakText(answer.text)}
              />
            </React.Fragment>
          ))}
        </View>

        {showResult && (
          <View style={styles.resultContainer}>
            <Text style={[
              styles.resultText,
              currentQuestion.answers.find((a) => a.id === selectedAnswerId)?.isCorrect
                ? styles.correctText
                : styles.incorrectText,
            ]}>
              {currentQuestion.answers.find((a) => a.id === selectedAnswerId)?.isCorrect
                ? '✓ Great job!'
                : '✗ Try again next time!'}
            </Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < categoryQuestions.length - 1 ? 'Next Question' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 12,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  questionContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  audioButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  audioButtonActive: {
    backgroundColor: colors.accent,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 32,
  },
  answersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  correctText: {
    color: colors.success,
  },
  incorrectText: {
    color: colors.error,
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  loadingText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
