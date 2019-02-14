import Immutable from 'seamless-immutable'

// Constants
const DEFAULT_NUMBER_TRIALS = 5;
const HIDDEN_LETTER = '_'

// Actions
export const Actions = {
    SETUP_JEU: 'setup_jeu',
    JOUER: 'jouer',
    RESET: 'reset_jeu'
}

// Initial state
const initialState = Immutable({
    decouvrirLeMot: [],
    motCache: [],
    lettres: [],
    userWinParty: false,
    isPartyEnded: false,
    nombreEssais: DEFAULT_NUMBER_TRIALS
});

// Reducer : action handler
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case Actions.SETUP_JEU:
            const { decouvrirLeMot, nombreEssais } = action.payload;
            
            // Pré-remplir les champs avec une apostrophe ou un tirer
            let motCache = decouvrirLeMot.split('').map(letter => {
                if(/^[a-zA-Zéèàôùöëçâêîô]+/i.test(letter)) {
                    return HIDDEN_LETTER;
                } else {
                    state = state.set('lettres', [letter, ...state.lettres]);
                    return letter;
                }
            });
            
            state = state.merge({
                decouvrirLeMot: decouvrirLeMot.split(''),
                motCache: motCache,
                nombreEssais: +nombreEssais
            });
            break;

        case Actions.RESET:
            state = state.merge({
                decouvrirLeMot: [],
                motCache: [],
                nombreEssais: DEFAULT_NUMBER_TRIALS,
                lettres: [],
                isPartyEnded: false,
                userWinParty: false
            });
            break;

        case Actions.JOUER:
            const { lettres } = action.payload

            // Si jamais l'utilisateur à trouvé le mot directement
            if (lettres.length > 1) {
                alert("choississez uniquement une lettre")
            }

            // Cas n°2 : L'utilisateur propose une lettre
            else {
                if (!state.lettres.includes(lettres)) {
                    // Ajouter lettre à toutes les autres lettres proposés
                    state = state.set('lettres', [lettres, ...state.lettres]);

                    if (state.decouvrirLeMot.includes(lettres)) {
                        let newUserWordFind = state.decouvrirLeMot.map(letterToDiscover => state.lettres.includes(letterToDiscover) ? letterToDiscover : HIDDEN_LETTER);
                        state = state.set('motCache', newUserWordFind);
                    }
                    else {
                        state = state.set('nombreEssais', state.nombreEssais - 1)
                    }
                }  
                else {
                //  Si La lettre a déjà été proposée
                    if (!state.decouvrirLeMot.includes(lettres)) {
                        state = state.set('nombreEssais', state.nombreEssais - 1)
                    }
                }

                if (state.nombreEssais <= 0) {
                    state = state.set('isPartyEnded', true);
                }
                // partie gagné ?
                if (state.decouvrirLeMot.join('') === state.motCache.join('')) {
                    state = state.set('userWinParty', true);
                }
            }
            break;

        default:
            break;
    }

    return state;
}
