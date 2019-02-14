import React, { Component } from 'react';
import './Rejouer.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { resetAction } from '../../actions/action';
import {Button} from 'react-materialize'

class Rejouer extends Component {

  handleNewGame = () => {
    const { dispatch, history } = this.props
    dispatch(resetAction());
    history.push('/')
  }

  componentWillMount() { 
    const { motCache, history } = this.props
    motCache.length <= 0 && history.push('/');
  }

  render() {
    const { userWinParty, decouvrirLeMot } = this.props

    let template = "";

    if (userWinParty) {
      template = (
        <div>
          <h1>Bravo !</h1>
          <p>Vous avez réussi à découvrir le mot "<strong>{decouvrirLeMot.join('')}</strong>".</p>
        </div>
      );
    } else {
      template = (
        <div>
          <h1>Pendu</h1>
          <h2>Oulala tu n'as pas trouvé !</h2>
          <p>Vous n'avez pas réussi à découvrir le mot.</p>
        </div>
      );
    }

    return (
        <div className="container">
          {template}
          <Button onClick={() => this.handleNewGame()}>Jouer à nouveau</Button>
        </div>
    );
  }

}

function mapStateToProps(reduxStore) {
  const { decouvrirLeMot, userWinParty, motCache } = reduxStore.game
  return {
    userWinParty,
    decouvrirLeMot,
    motCache
  };
}

export default withRouter(
  connect(mapStateToProps)(Rejouer)
);
