
export interface DailyWord {
  id: string;
  word: string;
  category: 'home' | 'school' | 'single';
  imageUrl: string;
}

export const dailyWords: DailyWord[] = [
  // Single Common Words (One-word commands/expressions)
  { id: 'sw1', word: 'Yes', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 'sw2', word: 'No', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 'sw3', word: 'Please', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400' },
  { id: 'sw4', word: 'Thanks', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=400' },
  { id: 'sw5', word: 'Help', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400' },
  { id: 'sw6', word: 'More', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400' },
  { id: 'sw7', word: 'Stop', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1615486511262-2f8f8e7f1f1f?w=400' },
  { id: 'sw8', word: 'Go', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?w=400' },
  { id: 'sw9', word: 'Wait', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400' },
  { id: 'sw10', word: 'Come', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400' },
  { id: 'sw11', word: 'Look', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400' },
  { id: 'sw12', word: 'Listen', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 'sw13', word: 'Sit', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400' },
  { id: 'sw14', word: 'Stand', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
  { id: 'sw15', word: 'Walk', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?w=400' },
  { id: 'sw16', word: 'Run', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400' },
  { id: 'sw17', word: 'Jump', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
  { id: 'sw18', word: 'Open', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: 'sw19', word: 'Close', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: 'sw20', word: 'Give', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400' },
  { id: 'sw21', word: 'Take', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400' },
  { id: 'sw22', word: 'Eat', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400' },
  { id: 'sw23', word: 'Drink', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { id: 'sw24', word: 'Sleep', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400' },
  { id: 'sw25', word: 'Wake', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400' },
  { id: 'sw26', word: 'Hot', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400' },
  { id: 'sw27', word: 'Cold', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=400' },
  { id: 'sw28', word: 'Happy', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
  { id: 'sw29', word: 'Sad', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 'sw30', word: 'Hungry', category: 'single', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400' },
  
  // Home Words
  { id: 'h1', word: 'Breakfast', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400' },
  { id: 'h2', word: 'Lunch', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400' },
  { id: 'h3', word: 'Dinner', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
  { id: 'h4', word: 'Bathroom', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400' },
  { id: 'h5', word: 'Bedroom', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
  { id: 'h6', word: 'Kitchen', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400' },
  { id: 'h7', word: 'Brush Teeth', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400' },
  { id: 'h8', word: 'Get Dressed', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400' },
  { id: 'h9', word: 'Take a Bath', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: 'h10', word: 'Go to Bed', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400' },
  { id: 'h11', word: 'Wake Up', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400' },
  { id: 'h12', word: 'Wash Hands', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: 'h13', word: 'Drink Water', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { id: 'h14', word: 'Watch TV', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { id: 'h15', word: 'Play', category: 'home', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
  
  // School Words
  { id: 's1', word: 'Teacher', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400' },
  { id: 's2', word: 'Book', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { id: 's3', word: 'Pencil', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400' },
  { id: 's4', word: 'Backpack', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
  { id: 's5', word: 'Classroom', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400' },
  { id: 's6', word: 'Desk', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400' },
  { id: 's7', word: 'Lunch Box', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  { id: 's8', word: 'Recess', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
  { id: 's9', word: 'Library', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400' },
  { id: 's10', word: 'Homework', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400' },
  { id: 's11', word: 'Friends', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
  { id: 's12', word: 'Cafeteria', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400' },
  { id: 's13', word: 'Gym', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
  { id: 's14', word: 'Raise Hand', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400' },
  { id: 's15', word: 'Listen', category: 'school', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
];
