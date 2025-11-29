
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { getProgress } from '@/utils/progressStorage';
import { ProgressData } from '@/types/Question';

export default function ProfileScreen() {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await getProgress();
    setProgress(data);
  };

  const overallPercentage =
    progress && progress.totalQuestions > 0
      ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
      : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol
              android_material_icon_name="person"
              ios_icon_name="person"
              size={48}
              color={colors.card}
            />
          </View>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Keep learning and growing!</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Learning Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{progress?.totalQuestions || 0}</Text>
              <Text style={styles.statLabel}>Questions Answered</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {progress?.correctAnswers || 0}
              </Text>
              <Text style={styles.statLabel}>Correct Answers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {overallPercentage}%
              </Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.achievementsCard}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementIcon,
                  progress && progress.totalQuestions >= 1
                    ? { backgroundColor: colors.accent }
                    : { backgroundColor: colors.highlight },
                ]}
              >
                <IconSymbol
                  android_material_icon_name="star"
                  ios_icon_name="star"
                  size={24}
                  color={
                    progress && progress.totalQuestions >= 1
                      ? colors.card
                      : colors.textSecondary
                  }
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>First Steps</Text>
                <Text style={styles.achievementDescription}>
                  Answer your first question
                </Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementIcon,
                  progress && progress.totalQuestions >= 10
                    ? { backgroundColor: colors.accent }
                    : { backgroundColor: colors.highlight },
                ]}
              >
                <IconSymbol
                  android_material_icon_name="star"
                  ios_icon_name="star"
                  size={24}
                  color={
                    progress && progress.totalQuestions >= 10
                      ? colors.card
                      : colors.textSecondary
                  }
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Getting Started</Text>
                <Text style={styles.achievementDescription}>
                  Answer 10 questions
                </Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View
                style={[
                  styles.achievementIcon,
                  progress && progress.correctAnswers >= 20
                    ? { backgroundColor: colors.accent }
                    : { backgroundColor: colors.highlight },
                ]}
              >
                <IconSymbol
                  android_material_icon_name="star"
                  ios_icon_name="star"
                  size={24}
                  color={
                    progress && progress.correctAnswers >= 20
                      ? colors.card
                      : colors.textSecondary
                  }
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Super Learner</Text>
                <Text style={styles.achievementDescription}>
                  Get 20 correct answers
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>About This App</Text>
          <Text style={styles.infoText}>
            This app helps children learn to understand and answer WH questions (Who, What, When,
            Where, and Why) through interactive visual learning. Practice with questions from
            different environments like home, school, and community settings.
          </Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  achievementsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  achievementsList: {
    gap: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
