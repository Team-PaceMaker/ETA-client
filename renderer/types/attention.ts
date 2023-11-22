export interface IGetAttentionStatus {
  prediction: number;
}

export interface IStartRecord {
  attentionId: number;
}

export interface IStopRecord {
  attentionId: number;
  stopAt: Date;
}

export interface IStatisticResult {
  totalTime: string;
  attentionTime: string;
  attentionTimeSlots: {
    attentionSlots: string[];
  };
}
