import { Map } from 'immutable';

// Look ma, i'm a immutable state !
const initialState = Map({
    nickname: '',
    currentTakenPicture: null
});

let appState = initialState;

const updateAppState = (key, value) => appState = appState.set(key, value);
const loggedIn = () => appState.get('nickname').length > 0;

export default {
    appState,

    updateAppState,
    loggedIn
}