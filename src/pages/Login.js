import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../register.css';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState(''); // error message
    const [user, setUser] = useState(''); // user name
    const [pwd, setPwd] = useState(''); // password

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    };
    return (
        <>
        <Navbar />
      <div style={{marginTop:'15rem',width:'100%',height:'10px'}} className="about-scroll"></div>

      <div className="container about">
        <div className="row">
          <div className="col-md-6 text-center">
            <img alt="about" src={process.env.PUBLIC_URL + "/img/login.gif"} className="img-fluid" />
          </div>
          <div className="col-md-6">
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2 className="main-title about-h2">LOG IN</h2>
            <form className="form-register-login" onSubmit={handleSubmit}>
                <label className="label-register-login" htmlFor="username">Username:</label>
                <input className="input-register-login"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label className="label-register-login" htmlFor="password">Password:</label>
                <input className="input-register-login"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Login</button>
            </form>

            <p>
              <h1 className="already-registered-text" > Need an Account? </h1>
                {/* <span className="line"> */}
                    {/*put router link here*/}
                    <a href="/register"><h1 className="already-registered-text"> Register</h1></a>
                {/* </span> */}
            </p>
        </section>

          </div>
        </div>
      </div>
    </>
   

    );
  };


export default Login;