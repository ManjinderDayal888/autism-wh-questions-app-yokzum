
import React, { useState } from 'react';
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
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { IconSymbol } from '@/components/IconSymbol';

interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond';
  color: string;
  x: number;
  y: number;
  size: number;
}

const availableColors = [
  colors.primary,
  colors.secondary,
  colors.accent,
  colors.success,
  '#FF6B6B',
  '#4ECDC4',
  '#95E1D3',
  '#F38181',
  '#FFD93D',
  '#6BCF7F',
];

const shapeTypes: Array<'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond'> = [
  'circle',
  'square',
  'triangle',
  'star',
  'heart',
  'diamond',
];

export default function LogoBuilderScreen() {
  const router = useRouter();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [selectedShape, setSelectedShape] = useState<'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'diamond'>('circle');
  const [draggedShape, setDraggedShape] = useState<string | null>(null);

  const addShape = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Speech.speak(`Added ${selectedShape}`, { rate: 0.85 });
    
    const newShape: Shape = {
      id: Date.now().toString(),
      type: selectedShape,
      color: selectedColor,
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      size: 50 + Math.random() * 30,
    };
    
    setShapes([...shapes, newShape]);
  };

  const removeShape = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShapes(shapes.filter((s) => s.id !== id));
  };

  const clearCanvas = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Speech.speak('Canvas cleared', { rate: 0.85 });
    setShapes([]);
  };

  const createPicture = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Speech.speak('Great picture!', { rate: 0.85 });
  };

  const renderShape = (shape: Shape) => {
    const shapeStyle = {
      position: 'absolute' as const,
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      backgroundColor: shape.color,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[shapeStyle, { borderRadius: shape.size / 2 }]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          />
        );
      case 'square':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[shapeStyle, { borderRadius: 4 }]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          />
        );
      case 'triangle':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[
              shapeStyle,
              {
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: shape.color,
              },
            ]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          />
        );
      case 'star':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[shapeStyle, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          >
            <Text style={{ fontSize: shape.size, color: shape.color }}>★</Text>
          </TouchableOpacity>
        );
      case 'heart':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[shapeStyle, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          >
            <Text style={{ fontSize: shape.size, color: shape.color }}>♥</Text>
          </TouchableOpacity>
        );
      case 'diamond':
        return (
          <TouchableOpacity
            key={shape.id}
            style={[shapeStyle, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }]}
            onPress={() => removeShape(shape.id)}
            onLongPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              removeShape(shape.id);
            }}
          >
            <Text style={{ fontSize: shape.size, color: shape.color }}>◆</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
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
          <Text style={styles.title}>Picture Builder</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
            <IconSymbol
              ios_icon_name="trash.fill"
              android_material_icon_name="delete"
              size={24}
              color={colors.error}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Create your own picture! Tap shapes to remove them.</Text>

        <View style={styles.canvas}>
          {shapes.map((shape) => renderShape(shape))}
          {shapes.length === 0 && (
            <Text style={styles.canvasPlaceholder}>Tap shapes and colors below to start creating!</Text>
          )}
        </View>

        <View style={styles.controls}>
          <Text style={styles.sectionTitle}>Choose Shape:</Text>
          <View style={styles.shapesRow}>
            {shapeTypes.map((type, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.shapeButton,
                    selectedShape === type && styles.shapeButtonSelected,
                  ]}
                  onPress={() => {
                    setSelectedShape(type);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Speech.speak(type, { rate: 0.85 });
                  }}
                >
                  {type === 'circle' && <View style={styles.shapePreviewCircle} />}
                  {type === 'square' && <View style={styles.shapePreviewSquare} />}
                  {type === 'triangle' && <View style={styles.shapePreviewTriangle} />}
                  {type === 'star' && <Text style={styles.shapePreviewIcon}>★</Text>}
                  {type === 'heart' && <Text style={styles.shapePreviewIcon}>♥</Text>}
                  {type === 'diamond' && <Text style={styles.shapePreviewIcon}>◆</Text>}
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Choose Color:</Text>
          <View style={styles.colorsRow}>
            {availableColors.map((color, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorButtonSelected,
                  ]}
                  onPress={() => {
                    setSelectedColor(color);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                />
              </React.Fragment>
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addButton} onPress={addShape}>
              <IconSymbol
                ios_icon_name="plus.circle.fill"
                android_material_icon_name="add_circle"
                size={24}
                color={colors.card}
              />
              <Text style={styles.addButtonText}>Add Shape</Text>
            </TouchableOpacity>

            {shapes.length > 0 && (
              <TouchableOpacity style={styles.saveButton} onPress={createPicture}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check_circle"
                  size={24}
                  color={colors.card}
                />
                <Text style={styles.saveButtonText}>Done!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.infoBox}>
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.infoText}>Tip: Tap any shape on the canvas to remove it!</Text>
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
  clearButton: {
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
  },
  canvas: {
    width: '100%',
    height: 350,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 24,
    position: 'relative',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  canvasPlaceholder: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  controls: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  shapesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  shapeButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.background,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  shapeButtonSelected: {
    borderColor: colors.primary,
  },
  shapePreviewCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.textSecondary,
  },
  shapePreviewSquare: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
  },
  shapePreviewTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.textSecondary,
  },
  shapePreviewIcon: {
    fontSize: 30,
    color: colors.textSecondary,
  },
  colorsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.success,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
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
