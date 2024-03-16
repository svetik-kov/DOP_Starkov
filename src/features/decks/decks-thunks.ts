import {decksAPI, UpdateDeckParams} from './decks-api.ts'
import {addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC} from './decks-reducer.ts'
import {Dispatch} from 'redux';
import {setAppStatus} from '../../app/app-reducer';

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

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
    return decksAPI.updateDeck(params).then((res) => {
        dispatch(updateDeckAC(res.data))
    })
}
