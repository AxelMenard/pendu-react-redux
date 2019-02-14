import React, { Component } from 'react';
import './Jeu.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { jouerAction } from '../../actions/action';
import { reset } from 'redux-form';
import { Field, reduxForm } from 'redux-form'
import { CustomInput } from '../../components/CustomInput';
import {Button} from 'react-materialize'

class Jeu extends Component {

  handleSubmitForm = (data) => {
    const { dispatch } = this.props
    dispatch(jouerAction(data.lettres.toLowerCase()));
    dispatch(reset('playForm'));
}

  componentDidUpdate() {
    const { userWinParty, isPartyEnded, history } = this.props
    if (userWinParty || isPartyEnded) {
      history.push('/le-pendu/fin');
    }
  }

  componentWillMount() { 
    const { motCache, history } = this.props
    motCache.length <= 0 && history.push('/');
  }

  render() {
    const { nombreEssais,motCache, handleSubmit, error, invalid, lettres  } = this.props
    return (
      <div className="container">
        <h1>Devinez le mot...</h1>
        <p>HEY, n'oubliez pas le bourreau n'est jamais loin, <strong>{nombreEssais} essai{nombreEssais > 1 && 's'} </strong>
          avant d'être pendu !</p>

          <div className="motCache">
                {motCache.map((letter, i) => <div key={i} className="letterCase">{letter}</div>)}
            </div>
  
            <div className="jeu">
                <h2>Jouer :</h2>
                <p >Entrez la lettre à dévoiler.</p>
                <form className="playForm" onSubmit={handleSubmit((data) => this.handleSubmitForm(data))}>
                    <Field component={CustomInput}
                        type="text"
                        name="lettres"
                        placeholder="une lettre"
                        validate={[lettresLengthValidation, lettresSyntaxValidation]} />
                    <Button type="submit" disabled={error || invalid}>Valider</Button>
                </form>
            </div>

            <div className="jeu">
                <h2>Historique de jeu :</h2>
                <p>Ci-dessous l'ensemble des lettres que vous avez proposé.</p>
                <div className="lettresContainer">
                    {lettres.map((letter, i) => /^[a-zA-Zéèàôùöëçâêîô]+/i.test(letter) && <div key={i} className="letterCase">{letter}</div>)}
                </div>
            </div>

      </div>
    );
  }

}

function lettresLengthValidation(value) {
  return (!value || value.length < 1) ? ("Veuillez saisir une lettre.") : undefined;
}

function lettresSyntaxValidation(value) {
  return (!value || !/^[a-zA-Zéèàôùöëçâêîô]+/i.test(value)) ? ("Le caractère est invalide.") : undefined;
}


function mapStateToProps(reduxStore) {
  const { nombreEssais, isPartyEnded, userWinParty, motCache, lettres } = reduxStore.game
  return {
    nombreEssais,
    isPartyEnded,
    userWinParty,
    motCache,
    lettres
  };
}

export default withRouter(reduxForm({
  form: 'playForm'
})(connect(mapStateToProps)(Jeu)));
