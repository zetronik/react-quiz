import axios from '../../axios/axios-quiz'
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {type: RESET_QUIZ_CREATION}
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        try {
            await axios.post('/quizes.json', getState().create.quiz)
            dispatch(resetQuizCreation())
        } catch (e) {
            console.log(e)
        }
    }
}