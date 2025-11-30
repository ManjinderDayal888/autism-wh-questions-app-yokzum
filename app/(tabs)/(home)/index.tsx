
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
      route: '/question?category=home',
    },
    {
      id: 'school',
      title: 'School',
      description: 'Questions about school and learning',
      icon: 'school',
      color: colors.accent,
      route: '/question?category=school',
    },
    {
      id: 'other',
      title: 'Other Places',
      description: 'Questions about community and other places',
      icon: 'location_on',
      color: colors.secondary,
      route: '/question?category=other',
    },
  ];

  const learningTools = [
    {
      id: 'articulation',
      title: 'Articulation (A-Z)',
      description: 'Practice letter sounds and words',
      icon: 'text_fields',
      color: '#FF6B6B',
      route: '/articulation',
    },
    {
      id: 'daily-words',
      title: 'Daily Words',
      description: 'Learn common words for home and school',
      icon: 'calendar_today',
      color: '#4ECDC4',
      route: '/daily-words',
    },
  ];

  const games = [
    {
      id: 'logo-builder',
      title: 'Logo Builder',
      description: 'Create your own logo designs',
      icon: 'palette',
      color: '#95E1D3',
      route: '/logo-builder',
    },
    {
      id: 'puzzle-match',
      title: 'Puzzle Match',
      description: 'Match pairs to train your brain',
      icon: 'extension',
      color: '#F38181',
      route: '/puzzle-match',
    },
  ];

  const handlePress = (route: string) => {
    router.push(route as any);
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
          <Text style={styles.title}>Learning Center</Text>
          <Text style={styles.subtitle}>Choose an activity to start learning!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WH Questions</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.categoryCard, { borderLeftColor: category.color }]}
                  onPress={() => handlePress(category.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                    <IconSymbol
                      android_material_icon_name={category.icon}
                      ios_icon_name={category.icon}
                      size={28}
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Tools</Text>
          <View style={styles.categoriesContainer}>
            {learningTools.map((tool, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.categoryCard, { borderLeftColor: tool.color }]}
                  onPress={() => handlePress(tool.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
                    <IconSymbol
                      android_material_icon_name={tool.icon}
                      ios_icon_name={tool.icon}
                      size={28}
                      color={colors.card}
                    />
                  </View>
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryTitle}>{tool.title}</Text>
                    <Text style={styles.categoryDescription}>{tool.description}</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fun Games</Text>
          <View style={styles.categoriesContainer}>
            {games.map((game, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.categoryCard, { borderLeftColor: game.color }]}
                  onPress={() => handlePress(game.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: game.color }]}>
                    <IconSymbol
                      android_material_icon_name={game.icon}
                      ios_icon_name={game.icon}
                      size={28}
                      color={colors.card}
                    />
                  </View>
                  <View style={styles.categoryContent}>
                    <Text style={styles.categoryTitle}>{game.title}</Text>
                    <Text style={styles.categoryDescription}>{game.description}</Text>
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
          <Text style={styles.infoTitle}>How to Use:</Text>
          <Text style={styles.infoText}>
            - WH Questions: Practice answering who, what, when, where, and why questions{'\n'}
            - Articulation: Learn letter sounds from A to Z{'\n'}
            - Daily Words: Build vocabulary for home and school{'\n'}
            - Logo Builder: Create colorful designs{'\n'}
            - Puzzle Match: Find matching pairs to train your brain
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderLeftWidth: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
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
