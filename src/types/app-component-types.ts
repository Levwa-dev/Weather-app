import { IPrepearedData } from "./weather-service-types"
import { IResponse } from "./main-component-types"

export const enum ActionTypes {
  THEME = 'change-theme',
  LOADING = 'change-loading',
  ERROR = 'error-was-occurred',
  DATA = 'data-was-loaded'
}

export interface GlobalState {
    error: string,
    isLoading: boolean,
    data: IPrepearedData,
    theme: string
  }
  
export type Action = {
    type: string,
    data?: string | IResponse | boolean
  }
  
export type Context = {
    state: GlobalState;
    dispatch: React.Dispatch<any>;
  }