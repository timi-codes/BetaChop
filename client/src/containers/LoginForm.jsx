import React from 'react';
import PropTypes from 'prop-types';
import { loginRequest } from '../actions/auth';
import { connect } from 'react-redux';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
    this.username = React.createRef();
    this.password = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.username.current.value;
    const password = this.password.current.value;

    if (!email.trim() || !password.trim()) {
      this.setState({ error: 'username and password are required*' });
      return;
    }

    this.props.dispatch(loginRequest(username, password));
  }

  render() {
    const { error } = this.state;
    return (
      <div className="inner">
        <div className="right-content">
          <h1>Welcome back,</h1>
          <p>Please details to sign in to your account</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={this.handleSubmit}>
            <input ref={this.username} type="text" id="fname" name="fname" placeholder="Username" />
            <input
              ref={this.password}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <div className="buttons">
              <a href="dashboard.html">
                <button type="submit" className="button">
                  Log in to my account
                </button>
              </a>
            </div>
          </form>
          <p className="account">
            Don't have an account? <a href="signup.html">Create an account</a>
          </p>
        </div>
      </div>
    );
  }
}

LoginForm.prototype = {
  dispatch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default connect()(LoginForm);
