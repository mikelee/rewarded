import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './App.css';

import Nav from './components/nav/nav.component';
import ToDoContainer from './components/to-do-container/to-do-container.component';
import SignIn from './components/sign-in/sign-in.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getTodos = this.getTodos.bind(this);

    this.state = {
      todos: null
    }
  }

  getTodos(todos) {
    this.setState({
      todos: todos
    });
  }
  
  render() {
    return (
      <div>
        <Nav currentUser={this.props.currentUser} />
        <Switch>
          <Route exact path='/' render={() => this.props.currentUser ? <ToDoContainer todos={this.state.todos} currentUser={this.props.currentUser} /> : <h2>No currentUser in app.js</h2>} />
          <Route path='/sign-up' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignIn alreadySignedUp={false} />} />
          <Route path='/sign-in' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignIn alreadySignedUp={true} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
