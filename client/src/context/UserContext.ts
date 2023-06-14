import {createContext, SetStateAction, Dispatch} from "react";

type User = {
    _id: string,
    name: string,
    email: string,
}

export interface IUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
}

//undefined necessary to prevent typescript errors.
const defaultState = {
    user: {
        _id: '',
        name: '',
        email: '',
    },
    setUser: () => undefined,
    isLoggedIn: false,
    setIsLoggedIn: () => undefined,
}
export const UserContext = createContext<IUserContext>(defaultState);