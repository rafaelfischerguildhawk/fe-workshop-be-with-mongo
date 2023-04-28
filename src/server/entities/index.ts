export interface INomination {
  id?: string;
  nominatorId: string;
  nomineeId: string;
  value: IValue;
  description: string;
  createdAt: Date;
}

export type IValue = "collaborative" | "dynamic" | "trusted";
