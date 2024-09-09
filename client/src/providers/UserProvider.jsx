import { createContext, useContext, useState } from 'react'

const UserContext = createContext({})
export const useUserCtx = () => useContext(UserContext)


export default function UserProvider({ children }){

    const [ userData, setUserData ] = useState({ name: "Nash", role: "admin", title: "Boss"})

    return (
        <UserContext.Provider value={{ user: userData }}>
            { children }
        </UserContext.Provider>
    )
}