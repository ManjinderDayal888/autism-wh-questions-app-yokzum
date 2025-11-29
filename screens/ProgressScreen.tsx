
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressData } from '@/types/Question';
import { getProgress, resetProgress } from '@/utils/progressStorage';
import DoughnutChart from '@/components/DoughnutChart';
import { colors } from '@/styles/commonStyles';

export default function ProgressScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await getProgress();
    setProgress(data);
    console.log('Progress loaded:', data);
  };

  const handleReset = async () => {
    await resetProgress();
    await loadProgress();
  };

  const handleBack = () => {
    router.back();
  };

  if (!progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading progress...</Text>
      </View>
    );
  }

  const overallPercentage =
    progress.totalQuestions > 0
      ? (progress.correctAnswers / progress.totalQuestions) * 100
      : 0;

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
          <Text style={styles.title}>Progress Report</Text>
        </View>

        <View style={styles.overallSection}>
          <DoughnutChart percentage={overallPercentage} size={160} strokeWidth={16} />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{progress.totalQuestions}</Text>
              <Text style={styles.statLabel}>Total Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {progress.correctAnswers}
              </Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.error }]}>
                {progress.incorrectAnswers}
              </Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>By Category</Text>
          {Object.entries(progress.categoryProgress).map(([category, data], index) => {
            const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            return (
              <React.Fragment key={index}>
                <View style={styles.categoryCard}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{category.toUpperCase()}</Text>
                    <Text style={styles.categoryPercentage}>{Math.round(percentage)}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${percentage}%` },
                      ]}
                    />
                  </View>
                  <View style={styles.categoryStats}>
                    <Text style={styles.categoryStatText}>
                      {data.correct} / {data.total} correct
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>By Question Type</Text>
          {Object.entries(progress.typeProgress).map(([type, data], index) => {
            const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            return (
              <React.Fragment key={index}>
                <View style={styles.typeCard}>
                  <View style={styles.typeHeader}>
                    <Text style={styles.typeName}>{type.toUpperCase()}</Text>
                    <Text style={styles.typePercentage}>{Math.round(percentage)}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${percentage}%` },
                      ]}
                    />
                  </View>
                  <View style={styles.typeStats}>
                    <Text style={styles.typeStatText}>
                      {data.correct} / {data.total} correct
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  overallSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  categoryStats: {
    alignItems: 'flex-end',
  },
  categoryStatText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  typeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  typeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  typePercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  typeStats: {
    alignItems: 'flex-end',
  },
  typeStatText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  resetButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  loadingText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
