export interface Weight {
  imperial: string;
  metric: string;
}

export interface Height {
  imperial: string;
  metric: string;
}

export interface Breed {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
}

export interface DogImage {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface VoteImage {
  id: string;
  url: string;
}

export interface VoteHistory {
  id: number;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  value: number;
  country_code: string;
  image: VoteImage;
}