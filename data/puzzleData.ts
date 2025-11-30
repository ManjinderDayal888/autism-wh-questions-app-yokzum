
export interface PuzzleItem {
  id: string;
  name: string;
  imageUrl: string;
  matchId: string;
}

export const puzzleItems: PuzzleItem[] = [
  // Matching pairs
  { id: 'p1a', name: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', matchId: 'apple' },
  { id: 'p1b', name: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', matchId: 'apple' },
  
  { id: 'p2a', name: 'Ball', imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', matchId: 'ball' },
  { id: 'p2b', name: 'Ball', imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400', matchId: 'ball' },
  
  { id: 'p3a', name: 'Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', matchId: 'cat' },
  { id: 'p3b', name: 'Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', matchId: 'cat' },
  
  { id: 'p4a', name: 'Dog', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', matchId: 'dog' },
  { id: 'p4b', name: 'Dog', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', matchId: 'dog' },
  
  { id: 'p5a', name: 'Sun', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400', matchId: 'sun' },
  { id: 'p5b', name: 'Sun', imageUrl: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400', matchId: 'sun' },
  
  { id: 'p6a', name: 'Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', matchId: 'tree' },
  { id: 'p6b', name: 'Tree', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', matchId: 'tree' },
];
