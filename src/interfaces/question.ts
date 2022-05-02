export interface Question {
  question: string;
  options: Option[];
}

export interface Option {
  id: string;
  image: string;
  text: string;
  correct?: boolean;
}
