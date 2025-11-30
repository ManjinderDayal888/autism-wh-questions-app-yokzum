
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
import { articulationWords } from '@/data/articulationWords';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/IconSymbol';

export default function ArticulationScreen() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speakWord = async (letter: string, word: string) => {
    try {
      const isSpeakingNow = await Speech.isSpeakingAsync();
      if (isSpeakingNow) {
        await Speech.stop();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        // Speak letter first, then word
        Speech.speak(`${letter}. ${word}`, {
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

  const handleLetterPress = (letter: string, word: string) => {
    setSelectedLetter(letter);
    speakWord(letter, word);
  };

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
          <Text style={styles.title}>Articulation Practice</Text>
          <View style={styles.placeholder} />
        </View>

        <Text style={styles.subtitle}>Tap any letter to hear it!</Text>

        <View style={styles.lettersGrid}>
          {articulationWords.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.letterCard,
                  selectedLetter === item.letter && styles.letterCardSelected,
                ]}
                onPress={() => handleLetterPress(item.letter, item.word)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.letterImage} />
                <View style={styles.letterContent}>
                  <Text style={styles.letterText}>{item.letter}</Text>
                  <Text style={styles.wordText}>{item.word}</Text>
                </View>
                <TouchableOpacity
                  style={styles.audioIcon}
                  onPress={() => handleLetterPress(item.letter, item.word)}
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
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  letterCard: {
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
  letterCardSelected: {
    borderColor: colors.primary,
  },
  letterImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  letterContent: {
    padding: 12,
    alignItems: 'center',
  },
  letterText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
