import {createContext, useContext} from 'react'
//creating create context object
export const stateContext = createContext()
//use that context
export const useGlobalState = () => useContext(stateContext)