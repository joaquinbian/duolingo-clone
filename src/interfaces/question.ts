export interface Question {
  id: string;
  type: string;
  text?: string;
  answer?: string;
  question?: string;
  options?: Option[];
}

export interface Option {
  id: string;
  image: string;
  text: string;
  correct?: boolean;
}

type QuestionType = "IMAGE_MULTIPLE_CHOICE" | "OPEN_ENDED_QUESTION";
