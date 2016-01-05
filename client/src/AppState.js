// Look ma, i'm a immutable state !
const initialState = {
    nickname: ''
};

let appState = initialState;

export const getAppState = (key) => appState[key];
export const updateAppState = (key, value) => appState = { ...appState, [key]: value };
export const loggedIn = () => appState['nickname'].length > 0;
