import auth from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
    state={email:'', password:''}

    onSubmitForm = event => {
        event.preventDefault()
        const {email, password} = this.state
        signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
            Cookies.set('user_token', data._tokenResponse.refreshToken)
            console.log(data)
            const {history} = this.props
            history.replace('/')
        })
        .catch(err => alert("Wrong credentials"))

    }

    onChangeEmail = event => {
        this.setState({email: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    render() {
        const accessToken = Cookies.get('user_token')
        if (accessToken !== undefined) {
            return <Redirect to='/' />
        }
        return (
            <div className='login-screen'>
                <form onSubmit={this.onSubmitForm} className='login-card'>
                    <h1 className='app-logo'>Logo</h1>
                    <label className='input-label' htmlFor='emailInput'>Email</label>
                    <input onChange={this.onChangeEmail} className='user-inputs' type='text' id='emailInput' placeholder='Enter email'/>
                    <label className='input-label' htmlFor='passwordInput'>Password</label>
                    <input onChange={this.onChangePassword} className='user-inputs' type='password' id='passwordInput' placeholder='Enter password'/>
                    <button type='submit' className='login-button'>Login</button>
                    <div className='register-part'>
                        <p className='register-prompt'>Don't have an account?</p>
                        <Link to='/register'><button type='submit' className='register-button'>Register</button></Link>
                    </div>
                </form>

            </div>
        )
    }
    
}

export default Login