import React, { Component } from 'react';
import './Initialisation.css';

import { Field, reduxForm } from 'redux-form'
import { CustomInput } from '../../components/CustomInput';
import { connect } from 'react-redux'
import { setupJeuAction } from '../../actions/action';
import { withRouter } from 'react-router'
import {Button} from 'react-materialize'

class Initialisation extends Component {


  handleSubmitForm = (data) => {
    const { dispatch, history } = this.props
    const { nombreEssais, decouvrirLeMot } = data
    dispatch(setupJeuAction(nombreEssais, decouvrirLeMot.toLowerCase()))
    history.push('/le-pendu/jeu');
}

  render() {

    const { handleSubmit, error, invalid } = this.props;

    return (
      <div className="container">
        
          <h1>Jeu du pendu</h1>
          <p>
            Le jeu conciste à trouver un mot qui vous est inconnue. <br></br>
             Dans cette première version nous vous proposons une version simplifié.
             Vous pouvez choisir le mot à découvrir ! <br></br>
             Une fois le mot selectionné, entrez le nombre de tentatives possibles...<br></br>
             <b>C'est partie !</b>
          </p>
          <form className="formulaire-initialisation" onSubmit={handleSubmit((data) => this.handleSubmitForm(data))}>
                <div className="col-gauche">
                <label htmlFor="decouvrirLeMot">Mot à deviner</label>
                <Field component={CustomInput}
                    className="formulaire"
                    type="text"
                    name="decouvrirLeMot"
                    placeholder="traducteur"
                    validate={[decouvrirLeMotLengthValidation, decouvrirLeMotSyntaxValidation]} />
                </div>
                
                <div className="col-droite">
                <label htmlFor="nombreEssais">Nombre d'essais</label>
                <Field component={CustomInput} type="number"
                    className="formulaire"
                    name="nombreEssais"
                    placeholder="5..."
                    validate={numberOfTrialsValidation}/>
                </div>
                

                <Button className="btn-submit" type="submit" disabled={error || invalid}>Commencer</Button>
            </form>
      </div>
    );
  }

}
function numberOfTrialsValidation(value) {
  return (!value || Number(value) < 1 || Number(value) >= 12) ? ("Le nombre d'essais doit être supérieur à 0 et inférieur à 13.") : undefined;
}

function decouvrirLeMotLengthValidation(value) {
  return (!value || value.length < 5) ? ("Le mot à deviner doit faire au moins 5 caractères.") : undefined;
}
// On rajoute un régex pour permettre de valider les lettres spéciales tel que "à" ou "ç"
function decouvrirLeMotSyntaxValidation(value) {
  return (!value || !/^[a-zA-Zéèàôùöëçâêîô'-]+/i.test(value)) ? ("Attention certains caractères ne sont pas accepté.") : undefined;
}

export default withRouter(reduxForm({
  form: 'beginGame'
})(connect()(Initialisation)));
