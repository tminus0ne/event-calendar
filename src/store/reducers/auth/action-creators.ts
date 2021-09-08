import axios from 'axios';

import { IUser } from '../../../models/IUser';
import { AuthActionsEnum, 
        SetAuthAction, 
        SetErrorAction, 
        SetIsLoadingAction, 
        SetUserAction } from './types';
import { AppDispatch } from '../../index';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ 
        type: AuthActionsEnum.SET_USER, payload: user,
    }),

    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionsEnum.SET_AUTH, payload: auth,
    }),

    setIsLoading: (payload: boolean): SetIsLoadingAction => ({
        type: AuthActionsEnum.SET_IS_LOADING, payload,
    }),

    setError: (payload: string): SetErrorAction => ({
        type: AuthActionsEnum.SET_ERROR, payload,
    }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./users.json');
                const mockUser = response.data.find(user =>
                    user.username === username && user.password === password);

                if(mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true));
                } else {
                    dispatch(AuthActionCreators.setError('Incorrect login or password'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000);
        } catch (error) {
            dispatch(AuthActionCreators.setError('An error occurred on login'));
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        try {
            
        } catch (error) {
            
        }
    }
}