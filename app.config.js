import 'dotenv/config';

export default {
  expo: {
    extra: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      API_URL: process.env.API_URL,
    },
  },
};
