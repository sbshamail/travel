import { uploadToCloudinary } from './cloudinary';
import { apiFetcher } from './fetcher';
import { Toastify } from '@/components/toast/Toastify';
export async function createRide(
  carPicImage: string | null,
  otherImages: string[] | null,
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
  const carPicUrl = carPicImage ? await uploadToCloudinary(carPicImage, 'ride/') : '';

  // 2. Upload otherImages (all except first)
  let otherImageUrls: null | string[] = [];
  if (otherImages) {
    for (let i = 1; i < otherImages.length; i++) {
      const url = await uploadToCloudinary(otherImages[i]);
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
      api: 'auth/register',
      body: fullData,
      setLoading: setLoading,
      showToast: true,
    });
  } else {
    return Toastify('success', 'Required Car Image');
  }
}
