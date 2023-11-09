import { formDataServer } from './settings';

export const getAttentionStatus = async (formData: FormData) => {
  try {
    const result = await formDataServer.post(
      'api/v1/eta/attention',
      { image: formData },
      {
        transformRequest: [
          function () {
            return formData;
          },
        ],
      }
    );
    return result.data.prediction;
  } catch (error) {
    console.log('[AXIOS ERROR] ', error);
  }
};
