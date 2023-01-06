import { BaseSliceState } from '../base.types';
import { UserType } from '../user/user.types';

export type QuizType = {
    _id: number,
    title: string,
    startedQuiz: boolean,
    endedQuiz: boolean,
    currentPageIndex: number,
    participants: UserType[],
    active: boolean,
    creatorId: string,
    quizId: string,
    questions: QuizzieType[],
    leaderboard: LeaderBoardType[],
    isOver: boolean
}  

export type QuizzieType = {
    type: String,
    question: String,
    secondsToAnswer: number,
    selectImage: String,
    options: OptionType[]
};

export type OptionType = {
    index: number,
    value:string, 
    isRightAnswer:boolean
}

export type LeaderBoardType = {
    userId: string,
    points: number,
}


export type QuizState = BaseSliceState<QuizType | null>;