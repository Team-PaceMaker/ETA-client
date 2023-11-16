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
    // const result = await axios.post('http://eta-server.kro.kr:8085/api/v1/attention/in');
    const result = await defaultServer.post('api/v1/attention/in');
    console.log('startTakingVideo : ', result);
    return result.data.attentionId;
  } catch (err) {
    console.log('ERROR:', err);
  }
};
