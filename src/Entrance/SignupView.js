import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import { $signup } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$signup.OPERATION] || false,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class SignupView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: {
      name: null,
      email: null,
      password: null,
    },
  };

  signup() {
    const { dispatch } = this.props;
    const { name, email, password } = this.state;
    dispatch($signup({ name, email, password })).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      email, name, password, error,
    } = this.state;
    const { processing } = this.props;

    return (
      <div>
        <form style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          <TextField
            label="Name"
            name="name"
            autoComplete="current-name"
            margin="dense"
            value={name}
            error={!!error.name}
            helperText={error.name}
            onChange={(e) => this.handleInputChange(e)}
          />
          <TextField
            label="Email"
            name="email"
            autoComplete="current-email"
            margin="dense"
            value={email}
            error={!!error.email}
            helperText={error.email}
            onChange={(e) => this.handleInputChange(e)}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="dense"
            value={password}
            error={!!error.password}
            helperText={error.password}
            onChange={(e) => this.handleInputChange(e)}
          />
        </form>

        <Button style={{ marginTop: 8 }} disabled={processing} onClick={() => this.signup()}>
          Signup
        </Button>

        <div style={{ marginTop: 16 }}>
          <Button component={Link} to="/login">
            Login
          </Button>
          <Button component={Link} to="/password-reset">
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

SignupView.propTypes = propTypes;

export default Wrapper(SignupView);
