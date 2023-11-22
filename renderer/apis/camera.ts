import {
  IGetAttentionStatus,
  IStartRecord,
  IStatisticCount,
  IStatisticResult,
  IStopRecord,
} from 'types/attention';
import { defaultServer, formDataServer } from './settings';

export const getAttentionStatus = async (formData: FormData) => {
  const result = await formDataServer.post<IGetAttentionStatus>(
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
};

export const startRecord = async () => {
  const result = await defaultServer.post<IStartRecord>('api/v1/attention/in');
  return result.data.attentionId;
};

export const stopRecord = async (attentionId: number) => {
  const result = await defaultServer.post<IStopRecord>(`api/v1/attention/out/${attentionId}`);
  return result.data;
};

export const getStatisticResult = async (attentionId: number) => {
  const result = await defaultServer.get<IStatisticResult>(
    `api/v1/attention/record/${attentionId}`
  );
  return result.data;
};

export const getStatisticCount = async (attentionId: number) => {
  const result = await defaultServer.get<IStatisticCount>(
    `api/v1/attention/record/count/${attentionId}`
  );
  return result.data;
};
