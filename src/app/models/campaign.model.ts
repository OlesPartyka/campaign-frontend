export interface Campaign {
  _id?: string;
  name: string;
  keywords: string[];
  bidAmount: number;
  fund: number;
  status: boolean;
  town: string;
  radius: number;
}
