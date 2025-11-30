
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
import { dailyWords } from '@/data/dailyWords';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/IconSymbol';

export default function DailyWordsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'single' | 'home' | 'school'>('single');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speakWord = async (word: string) => {
    try {
      const isSpeakingNow = await Speech.isSpeakingAsync();
      if (isSpeakingNow) {
        await Speech.stop();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        Speech.speak(word, {
          language: 'en-US',
          pitch: 1.0,
          rate: 0.75,
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

  const handleWordPress = (wordId: string, word: string) => {
    setSelectedWord(wordId);
    speakWord(word);
  };

  const filteredWords = dailyWords.filter((w) => w.category === selectedCategory);

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
          <Text style={styles.title}>Daily Words</Text>
          <View style={styles.placeholder} />
        </View>

        <Text style={styles.subtitle}>Learn common words for daily routines</Text>

        <View style={styles.categorySelector}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'single' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('single')}
          >
            <IconSymbol
              ios_icon_name="hand.point.up.fill"
              android_material_icon_name="touch_app"
              size={20}
              color={selectedCategory === 'single' ? colors.card : colors.text}
            />
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === 'single' && styles.categoryButtonTextActive,
              ]}
            >
              Single
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'home' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('home')}
          >
            <IconSymbol
              ios_icon_name="house.fill"
              android_material_icon_name="home"
              size={20}
              color={selectedCategory === 'home' ? colors.card : colors.text}
            />
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === 'home' && styles.categoryButtonTextActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'school' && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory('school')}
          >
            <IconSymbol
              ios_icon_name="book.fill"
              android_material_icon_name="school"
              size={20}
              color={selectedCategory === 'school' ? colors.card : colors.text}
            />
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === 'school' && styles.categoryButtonTextActive,
              ]}
            >
              School
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wordsGrid}>
          {filteredWords.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.wordCard,
                  selectedWord === item.id && styles.wordCardSelected,
                ]}
                onPress={() => handleWordPress(item.id, item.word)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.wordImage} />
                <View style={styles.wordContent}>
                  <Text style={styles.wordText}>{item.word}</Text>
                </View>
                <TouchableOpacity
                  style={styles.audioIcon}
                  onPress={() => handleWordPress(item.id, item.word)}
                >
                  <IconSymbol
                    ios_icon_name="speaker.wave.2.fill"
                    android_material_icon_name="volume_up"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: colors.card,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  wordCardSelected: {
    borderColor: colors.primary,
  },
  wordImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  wordContent: {
    padding: 12,
    alignItems: 'center',
    minHeight: 50,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  audioIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    elevation: 2,
  },
});
