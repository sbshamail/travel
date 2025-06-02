import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Modal, Pressable } from 'react-native';
import { V, T } from '@/@core/tag';
import { Button } from '@/@core/tag/Button';

interface MultiImagePickerProps {
  imageUris: string[];
  setImageUris: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MultiImagePicker = ({ imageUris, setImageUris }: MultiImagePickerProps) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const pickMultipleImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uris = result.assets.map((a) => a.uri);
      setImageUris((prev: string[]) => [...prev, ...uris]);
    }
  };

  const removeImage = (index: number) => {
    setImageUris((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <V style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {imageUris &&
          imageUris.map((uri, idx) => (
            <V key={idx} style={{ position: 'relative' }}>
              <Pressable onPress={() => setPreviewUri(uri)}>
                <Image source={{ uri }} style={{ width: 80, height: 80, borderRadius: 8 }} />
              </Pressable>
              <T
                onPress={() => removeImage(idx)}
                className="absolute right-[-8] top-[-8] z-10 h-5 w-5 rounded-full bg-red-600 text-center text-xs text-white">
                ✕
              </T>
            </V>
          ))}
      </V>

      <Button variant="accent" onPress={pickMultipleImages}>
        Pick Multiple Images
      </Button>

      <Modal visible={!!previewUri} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: 'black' }}
          onPress={() => setPreviewUri(null)}>
          {previewUri && (
            <Image source={{ uri: previewUri }} style={{ flex: 1, resizeMode: 'contain' }} />
          )}
        </Pressable>
      </Modal>
    </>
  );
};
