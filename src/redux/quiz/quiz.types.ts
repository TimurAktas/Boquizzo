import { BaseSliceState } from '../base.types';

export type QuizType = {
    question: string;
    answers: string;
    //TODO:Type noch überlegen
};

export type QuizState = BaseSliceState<QuizType | null>;
