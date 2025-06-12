import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, Modal, Pressable } from 'react-native';
import { V, T } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';
import { ClassNameType } from '@/utils/interfaces/commonTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/@core/theme/themeContext';
interface SingleImagePickerProps {
  imageUri: string | null;
  setImageUri: (uris: string | null) => void;
  previewImageClass?: ClassNameType;
  title?: string;
}
export const SingleImagePicker = ({
  imageUri,
  setImageUri,
  previewImageClass,
  title,
}: SingleImagePickerProps) => {
  const { ct } = useTheme();
  const [previewVisible, setPreviewVisible] = useState(false);

  const pickSingleImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => setImageUri(null);

  return (
    <>
      {imageUri && (
        <V
          className={`h-[100px] w-[100px] ${previewImageClass}`}
          style={{ position: 'relative', marginBottom: 12 }}>
          <Pressable onPress={() => setPreviewVisible(true)}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
            />
          </Pressable>
          <T
            onPress={removeImage}
            className="absolute right-[-10] top-[-10] z-10 h-6 w-6 rounded-full bg-red-600 text-center text-white">
            ✕
          </T>
        </V>
      )}

      {/* <Button onPress={pickSingleImage}>Pick Image</Button> */}
      {!imageUri && (
        <V
          className={`h-[100px] w-[100px] ${previewImageClass} flex items-center justify-center rounded border border-muted-foreground`}>
          <Pressable onPress={pickSingleImage}>
            <Icon name="camera" size={24} color={ct['muted-foreground']} />
          </Pressable>
          {title && (
            <T className="mt-2 text-xs text-muted-foreground">{title}</T>
          )}
        </V>
      )}

      <Modal visible={previewVisible} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: 'black' }}
          onPress={() => setPreviewVisible(false)}>
          <Image
            source={{ uri: imageUri || '' }}
            style={{ flex: 1, resizeMode: 'contain' }}
          />
        </Pressable>
      </Modal>
    </>
  );
};
