export interface UserData {
  id: number;
  firstName: string;
  lastname: string;
  wallet: number;
  herd: CatCardProps[];
}

export interface CatData {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatCardProps {
  nickname: string;
  imageID: string;
  imageURI: string;
  breed?: string;
  breedId?: string;
  width?: number;
  height?: number;
}
