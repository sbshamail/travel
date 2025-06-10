import { uploadToCloudinary } from './cloudinary';
import { apiFetcher } from './fetcher';
import { Toastify } from '@/components/toast/Toastify';

export async function createRide(
  carPicImage: string | null,
  otherImages: string[],
  data: {
    arrivalTime: Date;
    carNumber: string;
    seatsAvailable: string;
    pricePerSeat?: string;
    totalPrice?: number;
    negotiable?: boolean;
    notes?: string;
    carType: string;
    carName: string;
    carModel?: string;
  },
  setLoading?: (b: boolean) => void
) {
  const carPicUrl = carPicImage ? await uploadToCloudinary(carPicImage, 'rides') : '';

  // 2. Upload otherImages (all except first)
  let otherImageUrls: null | string[] = [];
  if (otherImages && otherImages?.length > 0) {
    for (let i = 1; i < otherImages.length; i++) {
      const url = await uploadToCloudinary(otherImages[i], 'rides');
      otherImageUrls.push(url);
    }
  } else {
    otherImageUrls = null;
  }
  if (carPicUrl) {
    // 3. Now call backend API with full data
    const fullData = {
      ...data,
      carPic: carPicUrl,
      otherImages: otherImageUrls,
    };

    return apiFetcher({
      api: 'ride/create',
      body: fullData,
      setLoading: setLoading,
      showToast: true,
    });
  } else {
    return Toastify('success', 'Required Car Image');
  }
}

export async function listRide(setLoading?: (b: boolean) => void) {
  return await apiFetcher({
    method: 'GET',
    api: 'ride/list',
    setLoading: setLoading,
  });
}
