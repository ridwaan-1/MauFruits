import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import useRequest from '../../hooks/useRequest';
import Loader from '../../Components/Loader';
import ErrorMessage from '../../Components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css';
import { signIn } from '../../ReduxStore/slices/userSlice';
import { serverUrl } from '../../Constants/serverUrl';

const SignupForm = ({ error, userData, onChange }) => {
    return (
        <React.Fragment>
            <h2>Create a new account</h2>
            {error && <ErrorMessage msg={error.message} />}
            <div className='name-field flex'>
                <InputField placeholder={'First name'} name='fname' value={userData.fname} onChange={onChange} />
                <InputField placeholder={'Other name'} name='othername' value={userData.othername} onChange={onChange} />
            </div>
            <InputField placeholder={'Email'} type='email' name='email' value={userData.email} onChange={onChange} />
            <InputField placeholder={'Password'} type={'password'} name='password' value={userData.password} onChange={onChange} />
            <InputField placeholder={'Confirm password'} type={'password'} name='cPassword' value={userData.cPassword} onChange={onChange} />

            <Button className='m-top-20' type='submit' width={true}>Sign up</Button>
        </React.Fragment>
    );
}

const SigninForm = ({ error, userData, onChange }) => {
    return (
        <React.Fragment>
            <h2>Sign in to MauFruits</h2>
            {error && <ErrorMessage msg={error.message} />}
            <InputField placeholder='Email' type='email' name='email' value={userData.email} onChange={onChange} />
            <InputField placeholder='Password' type='password' name='password' value={userData.password} onChange={onChange} />
            <Button className='m-top-20' type='submit' width={true}>Login</Button>
            <p className='pwd-txt'>Forgot password?</p>
        </React.Fragment>
    );
}

const AuthPage = (props) => {
    const dispatch = useDispatch();
    const userRegistered = useSelector(state => state.user.registered);
    const { loading, setError, error, fetchData } = useRequest();
    const [userData, setUserData] = useState({});
    const params = useLocation();

    const redirectUrl = params.state ? params.state.redirectUrl : '/MauFruits';

    const authHandler = (event) => {
        event.preventDefault();
        fetchData({
            url: `${serverUrl}/user/auth/${event.target.name}`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: userData
        }, (response) => {
            if(response.accessToken) {
                dispatch(signIn(response));
            }
        });
    }

    const userDataHandler = (event) => {
        const { name, value } = event.target;
        const data = userData;
        data[name] = value;
        setUserData(data);  
    }

    const setDefaultStates = () => {
        setUserData({});
        setError(null);
    }

    const authFormProps = { error, userData, onChange:userDataHandler }
    return ( 
        <React.Fragment>
            {userRegistered && <Navigate to={redirectUrl} replace /> }
            <main className='main-auth'>
                <form name={props.signup ? 'signup' : 'signin'} onSubmit={authHandler} className='ls-container'>
                    {loading && <Loader />}
                    { props.signup ? 
                    <SignupForm { ...authFormProps } /> : 
                    <SigninForm { ...authFormProps } /> }
                    <div className='separator'>
                        <hr />
                        <p className='bold-text'>or</p>
                    </div>

                    <button className='btn-light googleBtn flex center-v center-h'><FcGoogle /> Continue with google</button>

                    { props.signup ? 
                    <p className='center-text'>Already have an account? <Link to='/MauFruits/login'><span onClick={setDefaultStates} className='pwd-txt'>SIGN IN</span></Link></p> :
                    <p className='center-text'>Need an account? <Link to='/MauFruits/signup'><span onClick={setDefaultStates} className='pwd-txt'>SIGN UP</span></Link></p> }
                </form>
            </main>
        </React.Fragment>
    );
}
 
export default AuthPage;


