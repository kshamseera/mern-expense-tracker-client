import {createContext, useContext}  from 'react'

// the context object
export const StateContext = createContext()

// hook to wrap useContext
export const useGlobalState = () => useContext(StateContext)
