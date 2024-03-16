import axios from 'axios';
import {AppDispatch} from '../../app/store';
import {errorMassage} from '../../app/app-reducer';

export const handleError=(e:unknown,dispatch:AppDispatch)=>{
    let errorMessage: string
    if (axios.isAxiosError<ServerError>(e)) {
        //case 1 - case 2
        errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
    } else {
        //case 3
        errorMessage = (e as Error).message
    }
    dispatch(errorMassage(errorMessage))
}

type ServerError = {
    errorMessages: [
        { field: string, message: string }
    ]
}