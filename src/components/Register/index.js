import auth from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

import Cookies from 'js-cookie'

import { Component } from "react"
import { Redirect } from 'react-router-dom'

import "./index.css";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "Female",
  };

  onSubmitRegisterForm = async (event) => {
    event.preventDefault();
    const {email, password} = this.state
    createUserWithEmailAndPassword(auth, email, password)
    .then(data => {
      Cookies.set('user_token', data._tokenResponse.refreshToken)
      console.log(data)
      const {history} = this.props
      history.replace('/')
    })
    .catch(err => console.log(err))

  };

  onChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onchangeDate = (event) => {
    this.setState({ dateOfBirth: event.target.value });
  };

  onChangeGender = (event) => {
    this.setState({ gender: event.target.value });
    console.log(event.target.value);
  };


  render() {
    const accessToken = Cookies.get('user_token')
        if (accessToken !== undefined) {
            return <Redirect to='/' />
        }
    const { gender } = this.state;
    return (
      <div className="register-screen">
        <form onSubmit={this.onSubmitRegisterForm} className="register-card">
          <h1 className="app-logo">Logo</h1>
          <h1 className="register-heading">Sign Up</h1>
          <div className="name-section">
            <input
              onChange={this.onChangeFirstName}
              type="text"
              placeholder="First Name"
              className="user-input name"
            />
            <input
              onChange={this.onChangeLastName}
              type="text"
              placeholder="Last Name"
              className="user-input name"
            />
          </div>
          <input
            onChange={this.onChangeEmail}
            type="text"
            placeholder="Email address"
            className="user-input"
          />
          <input
            onChange={this.onChangePassword}
            type="password"
            placeholder="Password"
            className="user-input"
          />
          <div className="dob-gender-section">
            <input
              onChange={this.onchangeDate}
              type="date"
              className="user-input date-of-birth"
            />
            <select
              value={gender}
              onChange={this.onChangeGender}
              className="user-input gender"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <button className="create-account-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
