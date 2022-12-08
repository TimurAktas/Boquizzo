import { BaseSliceState } from '../base.types';
import { UserType } from '../user/user.types';

export type QuizType = {
    _id: number,
    participants: UserType[],
    active: boolean,
    creatorId: string,
    quizId: string,
    questions: QuizzieType[],
}  

export type QuizzieType = {
    type: String,
    question: String,
    secondsToAnswer: Number,
    selectImage: String,
    options: OptionType[]
};

export type OptionType = {
    index: number,
    value:string, 
    isRightAnswer:boolean
}

export type QuizState = BaseSliceState<QuizType | null>;