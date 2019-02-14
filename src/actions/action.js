import { Actions } from '../reducers/reducer'

export function resetAction() {
    return {
        type: Actions.RESET
    }
}

export function setupJeuAction(nombreEssais, decouvrirLeMot) {
    return {
        type: Actions.SETUP_JEU,
        payload: {
            nombreEssais,
            decouvrirLeMot
        }
    }
}

export function jouerAction(lettres) {
    return {
        type: Actions.JOUER,
        payload: {
            lettres
        }
    };
}