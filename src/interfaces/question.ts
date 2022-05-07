export interface Question {
  id: string;
  type: string;
  text?: string;
  answer?: string;
  question?: string;
  options?: Option[] | string[];
  parts?: FillInTheBlankParts[];
}

export interface Option {
  id: string;
  image: string;
  text: string;
  correct?: boolean;
}

interface FillInTheBlankParts {
  text: string;
  isBlank: boolean;
}

export type QuestionType =
  | "IMAGE_MULTIPLE_CHOICE"
  | "OPEN_ENDED"
  | "FILL_IN_THE_BLANK";
