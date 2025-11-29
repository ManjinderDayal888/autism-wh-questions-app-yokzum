
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressData, Category, QuestionType } from '@/types/Question';

const PROGRESS_KEY = '@wh_questions_progress';

const initialProgress: ProgressData = {
  totalQuestions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  categoryProgress: {
    home: { total: 0, correct: 0, incorrect: 0 },
    school: { total: 0, correct: 0, incorrect: 0 },
    other: { total: 0, correct: 0, incorrect: 0 },
  },
  typeProgress: {
    who: { total: 0, correct: 0, incorrect: 0 },
    what: { total: 0, correct: 0, incorrect: 0 },
    when: { total: 0, correct: 0, incorrect: 0 },
    where: { total: 0, correct: 0, incorrect: 0 },
    why: { total: 0, correct: 0, incorrect: 0 },
  },
};

export const getProgress = async (): Promise<ProgressData> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return initialProgress;
  } catch (error) {
    console.log('Error loading progress:', error);
    return initialProgress;
  }
};

export const saveProgress = async (progress: ProgressData): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.log('Error saving progress:', error);
  }
};

export const updateProgress = async (
  isCorrect: boolean,
  category: Category,
  type: QuestionType
): Promise<ProgressData> => {
  try {
    const currentProgress = await getProgress();
    
    const updatedProgress: ProgressData = {
      totalQuestions: currentProgress.totalQuestions + 1,
      correctAnswers: currentProgress.correctAnswers + (isCorrect ? 1 : 0),
      incorrectAnswers: currentProgress.incorrectAnswers + (isCorrect ? 0 : 1),
      categoryProgress: {
        ...currentProgress.categoryProgress,
        [category]: {
          total: currentProgress.categoryProgress[category].total + 1,
          correct: currentProgress.categoryProgress[category].correct + (isCorrect ? 1 : 0),
          incorrect: currentProgress.categoryProgress[category].incorrect + (isCorrect ? 0 : 1),
        },
      },
      typeProgress: {
        ...currentProgress.typeProgress,
        [type]: {
          total: currentProgress.typeProgress[type].total + 1,
          correct: currentProgress.typeProgress[type].correct + (isCorrect ? 1 : 0),
          incorrect: currentProgress.typeProgress[type].incorrect + (isCorrect ? 0 : 1),
        },
      },
    };

    await saveProgress(updatedProgress);
    return updatedProgress;
  } catch (error) {
    console.log('Error updating progress:', error);
    return initialProgress;
  }
};

export const resetProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.log('Error resetting progress:', error);
  }
};
