
export type QuestionType = 'who' | 'what' | 'when' | 'where' | 'why';

export type Category = 'home' | 'school' | 'other';

export interface Answer {
  id: string;
  text: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  category: Category;
  type: QuestionType;
  question: string;
  answers: Answer[];
}

export interface ProgressData {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  categoryProgress: {
    [key in Category]: {
      total: number;
      correct: number;
      incorrect: number;
    };
  };
  typeProgress: {
    [key in QuestionType]: {
      total: number;
      correct: number;
      incorrect: number;
    };
  };
}
