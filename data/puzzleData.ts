
export interface PuzzleItem {
  id: string;
  name: string;
  imageUrl: string;
  matchId: string;
}

export const puzzleItems: PuzzleItem[] = [
  // Matching pairs - Animals
  { id: 'p1a', name: 'Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', matchId: 'cat' },
  { id: 'p1b', name: 'Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', matchId: 'cat' },
  
  { id: 'p2a', name: 'Dog', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', matchId: 'dog' },
  { id: 'p2b', name: 'Dog', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', matchId: 'dog' },
  
  { id: 'p3a', name: 'Lion', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400', matchId: 'lion' },
  { id: 'p3b', name: 'Lion', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400', matchId: 'lion' },
  
  { id: 'p4a', name: 'Zebra', imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400', matchId: 'zebra' },
  { id: 'p4b', name: 'Zebra', imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400', matchId: 'zebra' },
  
  { id: 'p5a', name: 'Fish', imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400', matchId: 'fish' },
  { id: 'p5b', name: 'Fish', imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400', matchId: 'fish' },
  
  { id: 'p6a', name: 'Duck', imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400', matchId: 'duck' },
  { id: 'p6b', name: 'Duck', imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400', matchId: 'duck' },
  
  // Matching pairs - Food
  { id: 'p7a', name: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', matchId: 'apple' },
  { id: 'p7b', name: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', matchId: 'apple' },
  
  { id: 'p8a', name: 'Orange', imageUrl: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400', matchId: 'orange' },
  { id: 'p8b', name: 'Orange', imageUrl: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400', matchId: 'orange' },
  
  { id: 'p9a', name: 'Grapes', imageUrl: 'https://images.unsplash.com/photo-1599819177924-f8b4c8b8b0b0?w=400', matchId: 'grapes' },
  { id: 'p9b', name: 'Grapes', imageUrl: 'https://images.unsplash.com/photo-1599819177924-f8b4c8b8b0b0?w=400', matchId: 'grapes' },
  
  { id: 'p10a', name: 'Cake', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', matchId: 'cake' },
  { id: 'p10b', name: 'Cake', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', matchId: 'cake' },
  
  // Matching pairs - Objects
  { id: 'p11a', name: 'Ball', imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', matchId: 'ball' },
  { id: 'p11b', name: 'Ball', imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', matchId: 'ball' },
  
  { id: 'p12a', name: 'Book', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', matchId: 'book' },
  { id: 'p12b', name: 'Book', imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', matchId: 'book' },
  
  { id: 'p13a', name: 'Car', imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', matchId: 'car' },
  { id: 'p13b', name: 'Car', imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', matchId: 'car' },
  
  { id: 'p14a', name: 'Flower', imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400', matchId: 'flower' },
  { id: 'p14b', name: 'Flower', imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400', matchId: 'flower' },
  
  // Matching pairs - Nature
  { id: 'p15a', name: 'Sun', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400', matchId: 'sun' },
  { id: 'p15b', name: 'Sun', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400', matchId: 'sun' },
  
  { id: 'p16a', name: 'Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', matchId: 'tree' },
  { id: 'p16b', name: 'Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', matchId: 'tree' },
  
  { id: 'p17a', name: 'Rainbow', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', matchId: 'rainbow' },
  { id: 'p17b', name: 'Rainbow', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', matchId: 'rainbow' },
  
  { id: 'p18a', name: 'Moon', imageUrl: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400', matchId: 'moon' },
  { id: 'p18b', name: 'Moon', imageUrl: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400', matchId: 'moon' },
];
