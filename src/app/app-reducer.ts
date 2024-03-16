export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state,status:action.status}
    case 'APP/ERROR-MASSAGE':
      return {...state,error: action.error}
    default:
      return state
  }
}


export const setAppStatus=(status:RequestStatusType)=>{
  return { type:'APP/SET-STATUS',status} as const
}
export const errorMassage=(error:null |string)=>{
  return {type:'APP/ERROR-MASSAGE',error} as const
}
type ErrorMassage=ReturnType<typeof errorMassage>
type SetAppStatusType=ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatusType|ErrorMassage
