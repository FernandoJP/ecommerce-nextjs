import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState } from 'react';
import ACTIONS from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import valid from '../utils/valid';

const Register = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [ userData, setUserData ] = useState(initialState);
    const { name, email, password, cf_password } = userData;
    const [ state, dispatch ] = useContext(DataContext)
    console.log('Tem que ser array pq ',useContext(DataContext));
    console.log({state, dispatch});

    const handleChangeInput = e => {
      const { name, value } = e.target
      setUserData({...userData, [name]:value})
    }

    const handleSubmit = async e => {
      e.preventDefault()

      const errMsg = valid(name, email, password, cf_password)
      if(errMsg) console.log(errMsg)

      if(errMsg) return dispatch({type: 'NOTIFY', payload: { error: errMsg }})

      dispatch({type:'NOTIFY', payload: { loading: true }})

      const res = await postData('auth/register', userData)

      if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err }})

      return dispatch({type: 'NOTIFY', payload: { success: res.msg }})
    }

    return (
      <div>
        <Head>
          <title>Register Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth:500}} onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input type="text" className="form-control" id="nameInput" placeholder="Enter name" name="name" value={name} onChange={handleChangeInput} />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="Password" name="password" value={password} onChange={handleChangeInput} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordInput">Confirm password</label>
            <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm password" name="cf_password" value={cf_password} onChange={handleChangeInput} />
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>

          <p className="my-2">
            Already have an account? 
            <Link href="/signin"><a style={{color:'crimson'}}> Login Now </a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register