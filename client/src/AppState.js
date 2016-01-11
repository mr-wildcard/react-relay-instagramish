// Look ma, i'm a immutable state !
const initialState = {
    nickname: '',
    likedSelfiesId: localStorage.getItem('idLiked') || JSON.stringify([])
};

let appState = initialState;

export const getAppState = (key) => appState[key];
export const updateAppState = (key, value) => appState = { ...appState, [key]: value };
export const loggedIn = () => appState['nickname'].length > 0;
