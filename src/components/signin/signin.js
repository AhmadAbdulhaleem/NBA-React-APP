import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FormField from '../widgets/FormFields/formFields';
import './signin.css';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = element => {
    const newFormData = { ...this.state.formData };

    const newElement = {
      ...newFormData[element.id],
    };
    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;

    newFormData[element.id] = newElement;

    this.setState({ formData: newFormData });
  };

  validate = element => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? 'Must be a valid email' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'this field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  showError = () => {
    return this.state.registerError !== '' ? (
      <div className="error">{this.state.registerError}</div>
    ) : (
      ''
    );
  };

  submitForm = (e, type) => {
    e.preventDefault();

    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }

      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({ loading: true, registerError: '' });

        if (type === true) {
          // Login
          firebase
            .auth()
            .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
            .then(() => {
              this.props.history.push('/');
            })
            .catch(err => {
              this.setState({ loading: false, registerError: err.message });
            });
        } else {
          // Register
          firebase
            .auth()
            .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
            .then(() => {
              this.props.history.push('/');
            })
            .catch(err => {
              this.setState({ loading: false, registerError: err.message });
            });
        }
      }
    }
  };

  submitButton = () => {
    return this.state.loading ? (
      'loading...'
    ) : (
      <div>
        <button onClick={e => this.submitForm(e, false)}>Register now</button>
        <button onClick={e => this.submitForm(e, true)}>Log in</button>
      </div>
    );
  };

  render() {
    return (
      <div className="logContainer">
        <form onSubmit={e => this.submitForm(e, null)}>
          <h2>Register / Login</h2>
          {this.showError()}
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={element => {
              this.updateForm(element);
            }}
          />

          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={element => {
              this.updateForm(element);
            }}
          />

          {this.submitButton()}
        </form>
      </div>
    );
  }
}

export default SignIn;
