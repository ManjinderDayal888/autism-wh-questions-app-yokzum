
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { IconSymbol } from '@/components/IconSymbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PUZZLE_SIZE = SCREEN_WIDTH - 80;
const PIECE_SIZE = PUZZLE_SIZE / 3;

interface PuzzlePiece {
  id: number;
  correctPosition: { row: number; col: number };
  currentPosition: { row: number; col: number };
  imagePosition: { x: number; y: number };
}

const puzzleImages = [
  { id: 1, name: 'Rainbow', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600' },
  { id: 2, name: 'Sunset', url: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=600' },
  { id: 3, name: 'Flower', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600' },
  { id: 4, name: 'Ocean', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600' },
  { id: 5, name: 'Butterfly', url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600' },
];

export default function LogoBuilderScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(puzzleImages[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    initializePuzzle();
  }, [selectedImage]);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    const positions = [];
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        positions.push({ row, col });
      }
    }
    
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      newPieces.push({
        id: i,
        correctPosition: { row, col },
        currentPosition: shuffledPositions[i],
        imagePosition: { x: col * PIECE_SIZE, y: row * PIECE_SIZE },
      });
    }
    
    setPieces(newPieces);
    setIsComplete(false);
    setShowPreview(true);
    
    setTimeout(() => setShowPreview(false), 3000);
  };

  const swapPieces = (piece1Id: number, piece2Id: number) => {
    setPieces((prevPieces) => {
      const newPieces = [...prevPieces];
      const piece1Index = newPieces.findIndex((p) => p.id === piece1Id);
      const piece2Index = newPieces.findIndex((p) => p.id === piece2Id);
      
      const temp = newPieces[piece1Index].currentPosition;
      newPieces[piece1Index].currentPosition = newPieces[piece2Index].currentPosition;
      newPieces[piece2Index].currentPosition = temp;
      
      return newPieces;
    });
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    checkCompletion();
  };

  const checkCompletion = () => {
    setTimeout(() => {
      const allCorrect = pieces.every(
        (piece) =>
          piece.currentPosition.row === piece.correctPosition.row &&
          piece.currentPosition.col === piece.correctPosition.col
      );
      
      if (allCorrect && pieces.length > 0) {
        setIsComplete(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Speech.speak('Amazing! You completed the puzzle!', { rate: 0.85 });
      }
    }, 100);
  };

  const handlePiecePress = (pieceId: number) => {
    if (draggedPiece === null) {
      setDraggedPiece(pieceId);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      swapPieces(draggedPiece, pieceId);
      setDraggedPiece(null);
    }
  };

  const selectNewImage = (image: typeof puzzleImages[0]) => {
    setSelectedImage(image);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Speech.speak(`Let's build a ${image.name}!`, { rate: 0.85 });
  };

  const renderPuzzlePiece = (piece: PuzzlePiece) => {
    const isSelected = draggedPiece === piece.id;
    const isCorrect =
      piece.currentPosition.row === piece.correctPosition.row &&
      piece.currentPosition.col === piece.correctPosition.col;

    return (
      <TouchableOpacity
        key={piece.id}
        style={[
          styles.puzzlePiece,
          {
            left: piece.currentPosition.col * PIECE_SIZE,
            top: piece.currentPosition.row * PIECE_SIZE,
            width: PIECE_SIZE,
            height: PIECE_SIZE,
          },
          isSelected && styles.selectedPiece,
          isComplete && isCorrect && styles.correctPiece,
        ]}
        onPress={() => handlePiecePress(piece.id)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: selectedImage.url }}
          style={[
            styles.pieceImage,
            {
              width: PUZZLE_SIZE,
              height: PUZZLE_SIZE,
              left: -piece.imagePosition.x,
              top: -piece.imagePosition.y,
            },
          ]}
        />
        {!isComplete && (
          <View style={styles.pieceBorder} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol
              ios_icon_name="chevron.left"
              android_material_icon_name="arrow_back"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Picture Puzzle</Text>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => {
              setShowPreview(!showPreview);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <IconSymbol
              ios_icon_name={showPreview ? 'eye.slash.fill' : 'eye.fill'}
              android_material_icon_name={showPreview ? 'visibility_off' : 'visibility'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          {isComplete ? '🎉 Puzzle Complete!' : 'Tap pieces to swap and build the picture!'}
        </Text>

        {showPreview && !isComplete && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedImage.url }} style={styles.previewImage} />
            <Text style={styles.previewText}>Preview</Text>
          </View>
        )}

        <View style={styles.puzzleContainer}>
          <View style={[styles.puzzleBoard, { width: PUZZLE_SIZE, height: PUZZLE_SIZE }]}>
            {pieces.map((piece) => renderPuzzlePiece(piece))}
          </View>
        </View>

        {isComplete && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>🌟 Great Job! 🌟</Text>
            <TouchableOpacity style={styles.nextButton} onPress={initializePuzzle}>
              <IconSymbol
                ios_icon_name="arrow.clockwise"
                android_material_icon_name="refresh"
                size={24}
                color={colors.card}
              />
              <Text style={styles.nextButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.imageSelector}>
          <Text style={styles.sectionTitle}>Choose a Picture:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.imageRow}>
              {puzzleImages.map((image, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[
                      styles.imageOption,
                      selectedImage.id === image.id && styles.imageOptionSelected,
                    ]}
                    onPress={() => selectNewImage(image)}
                  >
                    <Image source={{ uri: image.url }} style={styles.optionImage} />
                    <Text style={styles.optionText}>{image.name}</Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.infoBox}>
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>
            Tap one piece, then tap another to swap them. Build the complete picture!
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  previewButton: {
    padding: 8,
    backgroundColor: colors.card,
    borderRadius: 8,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  puzzleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  puzzleBoard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    position: 'relative',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
    overflow: 'hidden',
  },
  puzzlePiece: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  selectedPiece: {
    borderWidth: 3,
    borderColor: colors.primary,
    zIndex: 10,
  },
  correctPiece: {
    borderWidth: 0,
  },
  pieceImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  pieceBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  successContainer: {
    backgroundColor: colors.success,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  successText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.card,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.success,
  },
  imageSelector: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  imageOption: {
    width: 120,
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  imageOptionSelected: {
    borderColor: colors.primary,
  },
  optionImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    padding: 8,
  },
  infoBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
