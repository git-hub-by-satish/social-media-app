import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsPersonCircle} from 'react-icons/bs'

import { useHistory } from "react-router"

import './index.css'
const Header = props => {
    const history = useHistory()
    
    const onSignOut = () => {
        Cookies.remove('user_token')
        history.replace('/login')
    }

    return (
        <div className="header">
            <h1 className="header-logo">Logo</h1>
            <div className='profile-container'><button onClick={onSignOut} className="sign-out-btn" type="button">Sign Out</button>
                <Link to='profile'><BsPersonCircle size={50}/></Link>
            </div>
        </div>
    )
}

export default Header