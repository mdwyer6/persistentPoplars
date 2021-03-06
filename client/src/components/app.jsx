import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import $ from 'jquery';

import ProposalList from './ProposalList.jsx';
import Navbar from './NavBar.jsx';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NewProposal from './NewProposal.jsx';
import Dashboard from './Dashboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Binding 'this' here is necessary to have 'this' in requireAuth method bound
    // to the react class instance with ES6.
    this.requireAuth = this.requireAuth.bind(this);
    this.loginAjax = this.loginAjax.bind(this);
    this.getProposalsAjax = this.getProposalsAjax.bind(this);
    this.state = {
      email: null,
      authenticated: false,
    };
  }


  requireAuth(nextState, replace) {
    if (!this.state.authenticated) {
      replace({pathname: '/login'});
    }
  }

  loginAjax(email, password) {
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({email: email, password: password}),
      success: (data) => { console.log(data); }
    });
  }

  getProposalsAjax(cb) {
    $.ajax({
      url:'/proposals',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {cb(data);}
    });
  }


  render() {
    return (

        <Router history={browserHistory}>
          <Route path='/' loginAjax={this.loginAjax} component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' loginAjax={this.loginAjax} component={Login} />
          <Route path='/home' getProposalsAjax={this.getProposalsAjax} component={Dashboard}>
            <Route path='/newproposal' component={NewProposal} />
          </Route>
          <Route path="*" component={NotFound} />
        </Router>
    );
  }
};






module.exports = App;