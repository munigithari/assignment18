import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_Token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="image1"
          alt="website logo"
        />
      </Link>
      <div className="container143">
        <Link to="/">
          <h1 className="heading">Home</h1>
        </Link>
        <Link to="/jobs">
          <h1 className="heading">Jobs</h1>
        </Link>
      </div>
      <button type="button" className="button1" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
