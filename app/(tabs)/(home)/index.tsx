
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();

  const categories = [
    {
      id: 'home',
      title: 'Home',
      description: 'Questions about daily activities at home',
      icon: 'home',
      color: colors.primary,
    },
    {
      id: 'school',
      title: 'School',
      description: 'Questions about school and learning',
      icon: 'school',
      color: colors.accent,
    },
    {
      id: 'other',
      title: 'Other Places',
      description: 'Questions about community and other places',
      icon: 'location_on',
      color: colors.secondary,
    },
  ];

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/question?category=${categoryId}`);
  };

  const handleProgressPress = () => {
    router.push('/progress');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>WH Questions</Text>
          <Text style={styles.subtitle}>Learn Who, What, When, Where, and Why!</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[styles.categoryCard, { borderLeftColor: category.color }]}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                  <IconSymbol
                    android_material_icon_name={category.icon}
                    ios_icon_name={category.icon}
                    size={32}
                    color={colors.card}
                  />
                </View>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
                <IconSymbol
                  android_material_icon_name="chevron_right"
                  ios_icon_name="chevron.right"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          style={styles.progressButton}
          onPress={handleProgressPress}
          activeOpacity={0.7}
        >
          <IconSymbol
            android_material_icon_name="bar_chart"
            ios_icon_name="chart.bar"
            size={24}
            color={colors.card}
          />
          <Text style={styles.progressButtonText}>View Progress</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How to Play:</Text>
          <Text style={styles.infoText}>
            - Choose a category to start{'\n'}
            - Read the question carefully{'\n'}
            - Look at all four pictures{'\n'}
            - Tap the picture that answers the question{'\n'}
            - Get instant feedback on your answer!
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
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderLeftWidth: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  progressButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  progressButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
