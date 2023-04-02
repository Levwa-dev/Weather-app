import React, {useReducer, createContext, useMemo} from 'react';
import { GlobalState, Action, ActionTypes, Context } from './types/app-component-types'
import MainComponent from './components/main-component/Main-component';
import './styles/App.scss'

const initialState = {
  error: '',
  isLoading: false,
  data: {city:'', dailyData:[]},
  theme: sessionStorage.getItem('theme') || 'light'
}

export const State = createContext<Context>({
  state: initialState,
  dispatch: ()=>{}
})


function App() {
  function reducer(state: GlobalState, action: Action): any {
    switch(action.type){
      case ActionTypes.ERROR:
        return {...state, error:action.data, isLoading:false}
      case ActionTypes.LOADING:
        return {...state, isLoading:true}
      case ActionTypes.THEME:
        return {...state, theme: action.data}
      case ActionTypes.DATA:
        return {
          ...state,
          data: action.data,
          isLoading: false
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(
    () => ({ state, dispatch }), 
    [state]
  );

  return (
    <State.Provider value={value}>
      <div className={['App', state.theme].join(' ')}>
        <MainComponent/>
      </div>
    </State.Provider>
  );
}

export default App;
