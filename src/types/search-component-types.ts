import { IParams } from "./main-component-types"


export interface ISearchComponent {
    setParams: (params:IParams)=>void,
    prevValue: IParams
}