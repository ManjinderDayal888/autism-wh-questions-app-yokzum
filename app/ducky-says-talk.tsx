
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/IconSymbol';

const speechPrompts = [
  { text: 'quack', display: 'Say: quack' },
  { text: 'up', display: 'Say: up' },
  { text: 'more', display: 'Say: more' },
  { text: 'go duck', display: 'Say: go duck' },
  { text: 'hello', display: 'Say: hello' },
  { text: 'yes', display: 'Say: yes' },
  { text: 'no', display: 'Say: no' },
  { text: 'please', display: 'Say: please' },
  { text: 'thank you', display: 'Say: thank you' },
  { text: 'water', display: 'Say: water' },
  { text: 'food', display: 'Say: food' },
  { text: 'help', display: 'Say: help' },
];

export default function DuckySaysTalkScreen() {
  const router = useRouter();
  const [currentPrompt, setCurrentPrompt] = useState(speechPrompts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  // Animation values
  const duckBounce = useRef(new Animated.Value(0)).current;
  const duckRotate = useRef(new Animated.Value(0)).current;
  const duckScale = useRef(new Animated.Value(1)).current;
  const rewardScale = useRef(new Animated.Value(0)).current;
  const rewardOpacity = useRef(new Animated.Value(0)).current;
  const starAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Start idle duck animation
    startIdleAnimation();
    
    // Speak the first prompt after a short delay
    setTimeout(() => {
      speakPrompt(currentPrompt);
    }, 1000);

    return () => {
      Speech.stop();
    };
  }, []);

  const startIdleAnimation = () => {
    // Gentle bouncing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(duckBounce, {
          toValue: -15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(duckBounce, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Gentle rotation
    Animated.loop(
      Animated.sequence([
        Animated.timing(duckRotate, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(duckRotate, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const speakPrompt = async (prompt: typeof speechPrompts[0]) => {
    try {
      const isSpeakingNow = await Speech.isSpeakingAsync();
      if (isSpeakingNow) {
        await Speech.stop();
      }
      
      setIsPlaying(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      Speech.speak(prompt.display, {
        language: 'en-US',
        pitch: 1.2,
        rate: 0.7,
        onDone: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    } catch (error) {
      console.log('Error with speech:', error);
      setIsPlaying(false);
    }
  };

  const startDanceAnimation = () => {
    // Duck dance animation
    Animated.parallel([
      Animated.sequence([
        Animated.timing(duckScale, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(duckScale, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(duckScale, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(duckScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(duckRotate, {
          toValue: 2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(duckRotate, {
          toValue: -2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(duckRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(duckRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const startRewardAnimation = () => {
    setShowReward(true);
    
    // Scale and fade in reward
    Animated.parallel([
      Animated.spring(rewardScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rewardOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate stars
    starAnimations.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Hide reward after delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(rewardScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rewardOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowReward(false);
        rewardScale.setValue(0);
        rewardOpacity.setValue(0);
        starAnimations.forEach(anim => anim.setValue(0));
      });
    }, 2500);
  };

  const handleISaidIt = async () => {
    // Play quack sound using speech
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    try {
      await Speech.stop();
      Speech.speak('Quack quack! Great job!', {
        language: 'en-US',
        pitch: 1.3,
        rate: 0.8,
      });
    } catch (error) {
      console.log('Error with speech:', error);
    }

    // Start animations
    startDanceAnimation();
    startRewardAnimation();

    // Move to next prompt after delay
    setTimeout(() => {
      const currentIndex = speechPrompts.indexOf(currentPrompt);
      const nextIndex = (currentIndex + 1) % speechPrompts.length;
      const nextPrompt = speechPrompts[nextIndex];
      setCurrentPrompt(nextPrompt);
      
      setTimeout(() => {
        speakPrompt(nextPrompt);
      }, 500);
    }, 3000);
  };

  const handleRepeat = () => {
    speakPrompt(currentPrompt);
  };

  const duckRotation = duckRotate.interpolate({
    inputRange: [-2, 0, 1, 2],
    outputRange: ['-10deg', '0deg', '5deg', '10deg'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          Speech.stop();
          router.back();
        }}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ducky Says Talk!</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Duck Character */}
        <View style={styles.duckContainer}>
          <Animated.View
            style={[
              styles.duckWrapper,
              {
                transform: [
                  { translateY: duckBounce },
                  { rotate: duckRotation },
                  { scale: duckScale },
                ],
              },
            ]}
          >
            <View style={styles.duck}>
              {/* Duck Body */}
              <View style={styles.duckBody}>
                <View style={styles.duckHead}>
                  {/* Eyes */}
                  <View style={styles.eyesContainer}>
                    <View style={styles.eye}>
                      <View style={styles.pupil} />
                    </View>
                    <View style={styles.eye}>
                      <View style={styles.pupil} />
                    </View>
                  </View>
                  {/* Beak */}
                  <View style={styles.beak} />
                </View>
                {/* Wings */}
                <View style={styles.wing} />
                <View style={[styles.wing, styles.wingRight]} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Speech Prompt */}
        <View style={styles.promptContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.promptText}>{currentPrompt.display}</Text>
            <View style={styles.speechBubbleTail} />
          </View>
          
          <TouchableOpacity
            style={styles.repeatButton}
            onPress={handleRepeat}
            disabled={isPlaying}
          >
            <IconSymbol
              ios_icon_name="speaker.wave.2.fill"
              android_material_icon_name="volume_up"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.repeatButtonText}>Repeat</Text>
          </TouchableOpacity>
        </View>

        {/* I Said It Button */}
        <TouchableOpacity
          style={styles.saidItButton}
          onPress={handleISaidIt}
          activeOpacity={0.8}
        >
          <IconSymbol
            ios_icon_name="checkmark.circle.fill"
            android_material_icon_name="check_circle"
            size={32}
            color="#FFF"
          />
          <Text style={styles.saidItButtonText}>I said it!</Text>
        </TouchableOpacity>

        {/* Reward Animation */}
        {showReward && (
          <Animated.View
            style={[
              styles.rewardContainer,
              {
                transform: [{ scale: rewardScale }],
                opacity: rewardOpacity,
              },
            ]}
          >
            <View style={styles.rewardContent}>
              <Text style={styles.rewardEmoji}>🎉</Text>
              <Text style={styles.rewardText}>Amazing!</Text>
              <Text style={styles.rewardSubtext}>You&apos;re doing great!</Text>
              
              {/* Stars */}
              <View style={styles.starsContainer}>
                {starAnimations.map((anim, index) => (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.star,
                      {
                        transform: [
                          { scale: anim },
                          {
                            translateY: anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -20],
                            }),
                          },
                        ],
                        opacity: anim,
                      },
                    ]}
                  >
                    ⭐
                  </Animated.Text>
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <IconSymbol
          ios_icon_name="info.circle.fill"
          android_material_icon_name="info"
          size={20}
          color={colors.primary}
        />
        <Text style={styles.infoText}>
          Listen to Ducky and practice saying the words out loud!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  duckContainer: {
    marginBottom: 40,
  },
  duckWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duck: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  duckBody: {
    width: 180,
    height: 200,
    backgroundColor: '#FFD54F',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
    position: 'relative',
  },
  duckHead: {
    width: 120,
    height: 120,
    backgroundColor: '#FFD54F',
    borderRadius: 60,
    position: 'absolute',
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 6,
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: -10,
  },
  eye: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  pupil: {
    width: 10,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  beak: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF9800',
    marginTop: 10,
  },
  wing: {
    width: 60,
    height: 80,
    backgroundColor: '#FFC107',
    borderRadius: 30,
    position: 'absolute',
    left: -20,
    top: 60,
    transform: [{ rotate: '-20deg' }],
  },
  wingRight: {
    left: 'auto',
    right: -20,
    transform: [{ rotate: '20deg' }],
  },
  promptContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  speechBubble: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    minWidth: 280,
    maxWidth: '90%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    position: 'relative',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -10,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFF',
  },
  promptText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  },
  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  repeatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  saidItButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
    elevation: 8,
    marginBottom: 20,
  },
  saidItButtonText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
  },
  rewardContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  rewardContent: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: 10,
    minWidth: 280,
  },
  rewardEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  rewardText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  rewardSubtext: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  star: {
    fontSize: 32,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 100,
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
