import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Runners } from './../api/runners';
import AccountsUIWrapper from './AccountsUIWrapper';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null
    };
  }


  addRunner() {
    
    const me = this;
    Meteor.call('runners.add', name, function (err,player) {
      if(err) {alert(err); return; }
      me.setState({player})
    });
  }

  run() {

    Meteor.call('runners.run');

  }

  render() {
    return (
      <div>
        <h2>Meteor races</h2>
        <AccountsUIWrapper/>
        {Meteor.user() ?
          this.state.player ?
            <button onClick={this.run.bind(this)}>Run Forest!</button>:
            <button onClick={this.addRunner.bind(this)}
            >Enter race!</button> :
          <div> Please log in to play </div>
        }
        <h2>Runners</h2>
        <ul>
          {this.props.runners.map( (r,i) => 
            <li
             key={i}
             style={{
              position: 'relative',
              left: `${r.pos}%`
             }}
             >{r.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  runners: PropTypes.array.isRequired,
  user: PropTypes.object
};

export default withTracker(() => {
  Meteor.subscribe('runners');

  return {
    runners: Runners.find({}).fetch(),
    user: Meteor.user()
  };
})(App);