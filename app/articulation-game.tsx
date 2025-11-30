
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { articulationWords } from '@/data/articulationWords';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/IconSymbol';

type GameMode = 'menu' | 'find-letter' | 'match-word' | 'sound-it-out';

export default function ArticulationGameScreen() {
  const router = useRouter();
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speakText = async (text: string) => {
    try {
      const isSpeakingNow = await Speech.isSpeakingAsync();
      if (isSpeakingNow) {
        await Speech.stop();
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.75,
      });
    } catch (error) {
      console.log('Error with speech:', error);
    }
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setScore(0);
    setCurrentRound(0);
    setIsCorrect(null);
    setSelectedAnswer(null);
    generateQuestion(mode);
  };

  const generateQuestion = (mode: GameMode) => {
    const allWords = [...articulationWords];
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const correctAnswer = allWords[randomIndex];

    if (mode === 'find-letter') {
      // Find the word that starts with this letter
      const wrongAnswers = allWords
        .filter(w => w.letter !== correctAnswer.letter)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      setCurrentQuestion({
        type: 'find-letter',
        letter: correctAnswer.letter,
        correctAnswer: correctAnswer,
      });
      setOptions(allOptions);
      
      // Speak the question
      setTimeout(() => speakText(`Find a word that starts with the letter ${correctAnswer.letter}`), 500);
    } else if (mode === 'match-word') {
      // Match the picture to the word
      const wrongAnswers = allWords
        .filter(w => w.word !== correctAnswer.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      setCurrentQuestion({
        type: 'match-word',
        word: correctAnswer.word,
        imageUrl: correctAnswer.imageUrl,
        correctAnswer: correctAnswer,
      });
      setOptions(allOptions);
      
      // Speak the question
      setTimeout(() => speakText(`Which picture shows ${correctAnswer.word}?`), 500);
    } else if (mode === 'sound-it-out') {
      // Listen and find the word
      setCurrentQuestion({
        type: 'sound-it-out',
        correctAnswer: correctAnswer,
      });
      
      const wrongAnswers = allWords
        .filter(w => w.word !== correctAnswer.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
      
      // Speak the word
      setTimeout(() => {
        speakText(`Listen carefully. ${correctAnswer.word}. Find the picture for ${correctAnswer.word}`);
      }, 500);
    }
  };

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer.word);
    const correct = answer.word === currentQuestion.correctAnswer.word;
    setIsCorrect(correct);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      speakText('Correct! Great job!');
      setScore(score + 10);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      speakText(`Not quite. The answer is ${currentQuestion.correctAnswer.word}`);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentRound < 9) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setCurrentRound(currentRound + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          generateQuestion(gameMode);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      } else {
        // Game over
        setTimeout(() => {
          speakText(`Game over! Your final score is ${score + (correct ? 10 : 0)} out of 100`);
          setGameMode('menu');
        }, 1500);
      }
    }, 2000);
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Articulation Game</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.menuSubtitle}>Choose a game mode to practice!</Text>

      <View style={styles.gameModesContainer}>
        <TouchableOpacity
          style={[styles.gameModeCard, { backgroundColor: '#FF6B6B' }]}
          onPress={() => startGame('find-letter')}
          activeOpacity={0.8}
        >
          <View style={styles.gameModeIcon}>
            <IconSymbol
              ios_icon_name="textformat.abc"
              android_material_icon_name="text_fields"
              size={40}
              color="#FFF"
            />
          </View>
          <Text style={styles.gameModeTitle}>Find the Letter</Text>
          <Text style={styles.gameModeDescription}>
            Find words that start with a specific letter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gameModeCard, { backgroundColor: '#4ECDC4' }]}
          onPress={() => startGame('match-word')}
          activeOpacity={0.8}
        >
          <View style={styles.gameModeIcon}>
            <IconSymbol
              ios_icon_name="photo"
              android_material_icon_name="image"
              size={40}
              color="#FFF"
            />
          </View>
          <Text style={styles.gameModeTitle}>Match the Picture</Text>
          <Text style={styles.gameModeDescription}>
            Match pictures to their correct words
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.gameModeCard, { backgroundColor: '#95E1D3' }]}
          onPress={() => startGame('sound-it-out')}
          activeOpacity={0.8}
        >
          <View style={styles.gameModeIcon}>
            <IconSymbol
              ios_icon_name="speaker.wave.2"
              android_material_icon_name="volume_up"
              size={40}
              color="#FFF"
            />
          </View>
          <Text style={styles.gameModeTitle}>Sound It Out</Text>
          <Text style={styles.gameModeDescription}>
            Listen to the word and find the picture
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructionsCard}>
        <IconSymbol
          ios_icon_name="info.circle.fill"
          android_material_icon_name="info"
          size={24}
          color={colors.primary}
        />
        <Text style={styles.instructionsText}>
          Each game has 10 rounds. Earn 10 points for each correct answer!
        </Text>
      </View>
    </View>
  );

  const renderGame = () => {
    if (!currentQuestion) return null;

    return (
      <Animated.View style={[styles.gameContainer, { opacity: fadeAnim }]}>
        <View style={styles.gameHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Speech.stop();
              setGameMode('menu');
            }}
          >
            <IconSymbol
              ios_icon_name="chevron.left"
              android_material_icon_name="arrow_back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {score}</Text>
            <Text style={styles.roundText}>Round {currentRound + 1}/10</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.questionContainer}>
          {gameMode === 'find-letter' && (
            <View style={styles.questionContent}>
              <Text style={styles.questionText}>Find a word that starts with:</Text>
              <View style={styles.letterDisplay}>
                <Text style={styles.letterText}>{currentQuestion.letter}</Text>
              </View>
              <TouchableOpacity
                style={styles.repeatButton}
                onPress={() => speakText(`Find a word that starts with the letter ${currentQuestion.letter}`)}
              >
                <IconSymbol
                  ios_icon_name="speaker.wave.2.fill"
                  android_material_icon_name="volume_up"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.repeatButtonText}>Repeat Question</Text>
              </TouchableOpacity>
            </View>
          )}

          {gameMode === 'match-word' && (
            <View style={styles.questionContent}>
              <Text style={styles.questionText}>Which picture shows:</Text>
              <Text style={styles.targetWord}>{currentQuestion.word}</Text>
              <TouchableOpacity
                style={styles.repeatButton}
                onPress={() => speakText(`Which picture shows ${currentQuestion.word}?`)}
              >
                <IconSymbol
                  ios_icon_name="speaker.wave.2.fill"
                  android_material_icon_name="volume_up"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.repeatButtonText}>Repeat Question</Text>
              </TouchableOpacity>
            </View>
          )}

          {gameMode === 'sound-it-out' && (
            <View style={styles.questionContent}>
              <Text style={styles.questionText}>Listen and find the picture:</Text>
              <TouchableOpacity
                style={styles.listenButton}
                onPress={() => speakText(`${currentQuestion.correctAnswer.word}`)}
              >
                <IconSymbol
                  ios_icon_name="speaker.wave.3.fill"
                  android_material_icon_name="volume_up"
                  size={48}
                  color="#FFF"
                />
                <Text style={styles.listenButtonText}>Tap to Listen</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView
          style={styles.optionsScroll}
          contentContainerStyle={styles.optionsContainer}
          showsVerticalScrollIndicator={false}
        >
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option.word;
            const isCorrectAnswer = option.word === currentQuestion.correctAnswer.word;
            const showResult = selectedAnswer !== null;

            let cardStyle = styles.optionCard;
            if (showResult) {
              if (isSelected && isCorrect) {
                cardStyle = [styles.optionCard, styles.optionCardCorrect];
              } else if (isSelected && !isCorrect) {
                cardStyle = [styles.optionCard, styles.optionCardWrong];
              } else if (isCorrectAnswer) {
                cardStyle = [styles.optionCard, styles.optionCardCorrect];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={cardStyle}
                onPress={() => !selectedAnswer && handleAnswer(option)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <Image source={{ uri: option.imageUrl }} style={styles.optionImage} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionLetter}>{option.letter}</Text>
                  <Text style={styles.optionWord}>{option.word}</Text>
                </View>
                {showResult && isCorrectAnswer && (
                  <View style={styles.correctBadge}>
                    <IconSymbol
                      ios_icon_name="checkmark.circle.fill"
                      android_material_icon_name="check_circle"
                      size={32}
                      color="#4CAF50"
                    />
                  </View>
                )}
                {showResult && isSelected && !isCorrect && (
                  <View style={styles.wrongBadge}>
                    <IconSymbol
                      ios_icon_name="xmark.circle.fill"
                      android_material_icon_name="cancel"
                      size={32}
                      color="#F44336"
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {gameMode === 'menu' ? renderMenu() : renderGame()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  menuContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
  },
  menuHeader: {
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
  menuTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  menuSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  gameModesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  gameModeCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  gameModeIcon: {
    marginBottom: 12,
  },
  gameModeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  gameModeDescription: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  instructionsCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
    marginBottom: 100,
  },
  instructionsText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  gameContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  roundText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  questionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  questionContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  letterDisplay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  letterText: {
    fontSize: 56,
    fontWeight: '800',
    color: '#FFF',
  },
  targetWord: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 16,
  },
  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  repeatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  listenButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    elevation: 5,
  },
  listenButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  optionsScroll: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 12,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionCardCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionCardWrong: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  optionContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  optionLetter: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  optionWord: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  correctBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  wrongBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
