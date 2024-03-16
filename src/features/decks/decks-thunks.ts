import {decksAPI, UpdateDeckParams} from './decks-api.ts'
import {addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC} from './decks-reducer.ts'
import {Dispatch} from 'redux';
import {setAppStatus} from '../../app/app-reducer';
import axios from 'axios';

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await decksAPI.fetchDecks()
        dispatch(setDecksAC(res.data.items))
    } catch (e) {

    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
    return decksAPI.addDeck(name).then((res) => {
        dispatch(addDeckAC(res.data))
    })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
    return decksAPI.deleteDeck(id).then((res) => {
        dispatch(deleteDeckAC(res.data.id))
    })
}
//case 1: ошибка бэкенда (на стороне бэкенда). Ошибку создает axios в response.data помещает ответ сервера
// case 2: network error- axios создает объект ошибки , сообщение взять из поля e.message
//case 3: синхронные ошибки- создается "нативная" js- ошибка, имеет поле message
export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
    try {
        const res = await decksAPI.updateDeck(params)
        dispatch(updateDeckAC(res.data))
    } catch (e) {
        let errorMessage: string
        if (axios.isAxiosError<ServerError>(e)) {
            //case 1 - case 2
            errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
            console.log(e)
        } else {
            //case 3
            errorMessage = (e as Error).message
        }
        console.log(errorMessage)
    }

}

type ServerError = {
    errorMessages: [
        { field: string, message: string }
    ]
}