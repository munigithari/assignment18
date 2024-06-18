import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMessage: false}

  onClickUsername = event => {
    this.setState({username: event.target.value})
  }

  onClickPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_Token', jwtToken, {expiry: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMessage: true})
  }

  onSubmitButton = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = `https://apis.ccbp.in/login`

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_Token)
    } else {
      this.onSubmitFailure(data.jwt_Token)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMessage} = this.state
    const token = Cookies.get('jwt_Token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="image1"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitButton}>
            <div className="container11">
              <label htmlFor="username" className="text">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                aria-label="Save"
                value={username}
                onChange={this.onClickUsername}
                className="texts"
                placeholder="USERNAME"
              />
            </div>
            <div className="container11">
              <label htmlFor="password" className="text">
                PASSWORD
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={this.onClickPassword}
                className="texts"
                placeholder="PASSWORD"
              />
            </div>
            <button type="submit" className="button1">
              Login
            </button>
            {showErrorMessage && <p className="paragraph">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
