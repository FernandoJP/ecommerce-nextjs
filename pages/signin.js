import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import valid from '../utils/valid';


const Signin = () => {

  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [ userData, setUserData ] = useState(initialState);
  const { email, password } = userData;
  const { state, dispatch } = useContext(DataContext)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const errMsg = valid(name, email, password, cf_password)

    if(errMsg) return dispatch({type: 'NOTIFY', payload: { error: errMsg }})

    dispatch({type:'NOTIFY', payload: { loading: true }})

    const res = await postData('auth/register', userData)

    if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err }})

    return dispatch({type: 'NOTIFY', payload: { success: res.msg }})
  }

    return (
      <div>
        <Head>
          <title>Sign in Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth:500}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
            name="email" value={email} onChange={handleChangeInput}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
            name="password" value={password} onChange={handleChangeInput}/>
          </div>

          <button type="submit" className="btn btn-dark w-100">Submit</button>

          <p className="my-2">
            You don't have an account? 
            <Link href="/register"><a style={{color:'crimson'}}> Register Now </a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Signin