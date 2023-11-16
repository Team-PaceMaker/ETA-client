import axios from 'axios';
import { defaultServer, formDataServer } from './settings';

export const getAttentionStatus = async (formData: FormData) => {
  try {
    const result = await formDataServer.post(
      'api/v1/attention',
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

export const startTakingVideo = async () => {
  try {
    const result = await defaultServer.post('api/v1/attention/in');
    return result.data.attentionId;
  } catch (err) {
    console.log('ERROR:', err);
  }
};

export const stopTakingVideo = async (attentionId: number) => {
  try {
    const result = await defaultServer.post(`api/v1/attention/out/${attentionId}`);
    return result.data;
  } catch (err) {
    console.log('ERROR:', err);
  }
};

export const getStatisticResult = async (attentionId: number) => {
  try {
    console.log('getStatisticResult : ', attentionId);
    const result = await defaultServer.get(`api/v1/attention/record/${attentionId}`);
    console.log('getStatisticResult : ', result);
    return result.data;
  } catch (err) {
    console.log('ERROR:', err);
  }
};
