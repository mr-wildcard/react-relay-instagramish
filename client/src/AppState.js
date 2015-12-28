import { Map } from 'immutable';

// Look ma, i'm a immutable state !
const initialState = Map({
    nickname: '',
    currentTakenPicture: null
});

let appState = initialState;

export const getAppState = (key) => appState.get(key);
export const updateAppState = (key, value) => appState = appState.set(key, value);
export const loggedIn = () => appState.get('nickname').length > 0;