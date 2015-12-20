import { Map } from 'immutable';

// Look ma, i'm a immutable state !
const initialState = Map({
    router: null,
    nickname: ''
});

export let appState = initialState;

export const login = (nickname) => appState = appState.set('nickname', nickname);
export const loggedIn = () => appState.get('nickname').length > 0;