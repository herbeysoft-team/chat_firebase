import React from 'react'

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Herbey Chat</span>
        <span className="title">Login</span>
        <form onSubmit={{}}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        {/* <p>You don't have an account? <Link to="/register">Register</Link></p> */}
      </div>
    </div>
  )
}

export default Login