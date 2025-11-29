
import { Question } from '@/types/Question';

export const questions: Question[] = [
  // HOME - WHO Questions
  {
    id: 'home-who-1',
    category: 'home',
    type: 'who',
    question: 'Who cooks dinner in the kitchen?',
    answers: [
      {
        id: 'a1',
        text: 'Mom/Dad',
        imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Dog',
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Car',
        imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Tree',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'home-who-2',
    category: 'home',
    type: 'who',
    question: 'Who reads bedtime stories?',
    answers: [
      {
        id: 'a1',
        text: 'Parent',
        imageUrl: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Ball',
        imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Chair',
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Lamp',
        imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
        isCorrect: false,
      },
    ],
  },
  // HOME - WHAT Questions
  {
    id: 'home-what-1',
    category: 'home',
    type: 'what',
    question: 'What do you use to brush your teeth?',
    answers: [
      {
        id: 'a1',
        text: 'Toothbrush',
        imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Spoon',
        imageUrl: 'https://images.unsplash.com/photo-1568737356219-e9d5c0f6b1e5?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Pencil',
        imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Shoe',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'home-what-2',
    category: 'home',
    type: 'what',
    question: 'What do you sleep on?',
    answers: [
      {
        id: 'a1',
        text: 'Bed',
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Refrigerator',
        imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Stove',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Window',
        imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400',
        isCorrect: false,
      },
    ],
  },
  // HOME - WHERE Questions
  {
    id: 'home-where-1',
    category: 'home',
    type: 'where',
    question: 'Where do you take a bath?',
    answers: [
      {
        id: 'a1',
        text: 'Bathroom',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Kitchen',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Garage',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Garden',
        imageUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400',
        isCorrect: false,
      },
    ],
  },
  // SCHOOL - WHO Questions
  {
    id: 'school-who-1',
    category: 'school',
    type: 'who',
    question: 'Who teaches in the classroom?',
    answers: [
      {
        id: 'a1',
        text: 'Teacher',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Bus',
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Book',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Desk',
        imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'school-who-2',
    category: 'school',
    type: 'who',
    question: 'Who plays with you at recess?',
    answers: [
      {
        id: 'a1',
        text: 'Friends',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Backpack',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Clock',
        imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Pencil',
        imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        isCorrect: false,
      },
    ],
  },
  // SCHOOL - WHAT Questions
  {
    id: 'school-what-1',
    category: 'school',
    type: 'what',
    question: 'What do you write with?',
    answers: [
      {
        id: 'a1',
        text: 'Pencil',
        imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Apple',
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Scissors',
        imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Ruler',
        imageUrl: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'school-what-2',
    category: 'school',
    type: 'what',
    question: 'What do you read?',
    answers: [
      {
        id: 'a1',
        text: 'Book',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Lunch Box',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Crayon',
        imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Eraser',
        imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400',
        isCorrect: false,
      },
    ],
  },
  // SCHOOL - WHERE Questions
  {
    id: 'school-where-1',
    category: 'school',
    type: 'where',
    question: 'Where do you eat lunch?',
    answers: [
      {
        id: 'a1',
        text: 'Cafeteria',
        imageUrl: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Library',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Gym',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Playground',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        isCorrect: false,
      },
    ],
  },
  // OTHER - WHO Questions
  {
    id: 'other-who-1',
    category: 'other',
    type: 'who',
    question: 'Who helps you when you are sick?',
    answers: [
      {
        id: 'a1',
        text: 'Doctor',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Mailbox',
        imageUrl: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Traffic Light',
        imageUrl: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Bench',
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'other-who-2',
    category: 'other',
    type: 'who',
    question: 'Who drives the bus?',
    answers: [
      {
        id: 'a1',
        text: 'Bus Driver',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Bicycle',
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Building',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Flower',
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
        isCorrect: false,
      },
    ],
  },
  // OTHER - WHAT Questions
  {
    id: 'other-what-1',
    category: 'other',
    type: 'what',
    question: 'What do you ride to go places?',
    answers: [
      {
        id: 'a1',
        text: 'Car',
        imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Cloud',
        imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Rock',
        imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Hat',
        imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'other-what-2',
    category: 'other',
    type: 'what',
    question: 'What do you use to buy things?',
    answers: [
      {
        id: 'a1',
        text: 'Money',
        imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Leaf',
        imageUrl: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Toy',
        imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Pillow',
        imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
        isCorrect: false,
      },
    ],
  },
  // OTHER - WHERE Questions
  {
    id: 'other-where-1',
    category: 'other',
    type: 'where',
    question: 'Where do you buy food?',
    answers: [
      {
        id: 'a1',
        text: 'Store',
        imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Park',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Beach',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Mountain',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'other-where-2',
    category: 'other',
    type: 'where',
    question: 'Where do you play outside?',
    answers: [
      {
        id: 'a1',
        text: 'Park',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Hospital',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Bank',
        imageUrl: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Office',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
        isCorrect: false,
      },
    ],
  },
  // WHEN Questions
  {
    id: 'home-when-1',
    category: 'home',
    type: 'when',
    question: 'When do you eat breakfast?',
    answers: [
      {
        id: 'a1',
        text: 'Morning',
        imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Night',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Afternoon',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Midnight',
        imageUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'school-when-1',
    category: 'school',
    type: 'when',
    question: 'When do you go to school?',
    answers: [
      {
        id: 'a1',
        text: 'Weekday Morning',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'Weekend',
        imageUrl: 'https://images.unsplash.com/photo-1533854775446-95c4609da544?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'Night Time',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'Vacation',
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
        isCorrect: false,
      },
    ],
  },
  // WHY Questions
  {
    id: 'home-why-1',
    category: 'home',
    type: 'why',
    question: 'Why do you wear a coat?',
    answers: [
      {
        id: 'a1',
        text: 'To stay warm',
        imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'To swim',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'To fly',
        imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'To eat',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'school-why-1',
    category: 'school',
    type: 'why',
    question: 'Why do you raise your hand in class?',
    answers: [
      {
        id: 'a1',
        text: 'To ask a question',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
        isCorrect: true,
      },
      {
        id: 'a2',
        text: 'To sleep',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
        isCorrect: false,
      },
      {
        id: 'a3',
        text: 'To run',
        imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400',
        isCorrect: false,
      },
      {
        id: 'a4',
        text: 'To dance',
        imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400',
        isCorrect: false,
      },
    ],
  },
];
