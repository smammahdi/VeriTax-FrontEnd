import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const ProfileUpdate = () => {
    const [fullname, setFullName] = useState(''); // useState er bhitor ja arg deya sheta default value oi state er
    const [tin, setTin] = useState('');
    const [nid, setNid] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [presentAddress, setPresentAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [taxZone, setTaxZone] = useState('');
    const [taxCircle, setTaxCircle] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();
    const {auth} = useAuth();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState(''); // error message

    let fetched = false;

    const getProfile = async () => {
        if (!fetched) {
            console.log('fetching...');
            try {
                let res = await axios.post('/getProfile',
                    JSON.stringify({}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                setErrMsg('');
                fetched = true;
                console.log(res.data);
                setNid(res.data.NID);
                setTin(res.data.TIN);
                setUsername(res.data.username);
                setPassword(res.data.password);
                setFullName(res.data.name);
                setDateOfBirth(res.data.dateOfBirth);
                setTaxZone(res.data.taxZone);
                setPresentAddress(res.data.presentAddress);
                setPermanentAddress(res.data.permanentAddress);
                setTaxCircle(res.data.taxCircle);
                setGender(res.data.gender);
                setMaritalStatus(res.data.maritalStatus);
                setContactNumber(res.data.contactNumber);
            } catch (err) {
                console.log(err);
                if (err.response?.status === 401) {
                    navigate('/login');
                    return;
                } else {
                    setErrMsg('Failed to fetch basic info')
                }
                errRef.current.focus();
            }
        }
    };

    useEffect(() => {
        getProfile();
    }, []); // 2nd arg empty array deyar karone ekbari req pathay

    const handleSubmit = async (e) => {
        console.log("attempting to submit");
        e.preventDefault(); // default action is reloading the page, so preventing it

        if (
            !fullname ||
            !tin ||
            !nid ||
            !username ||
            !password ||
            !contactNumber ||
            !gender ||
            !dateOfBirth ||
            !presentAddress ||
            !permanentAddress ||
            !taxZone ||
            !taxCircle ||
            !maritalStatus
        ) {
            setFormError('Please fill in all the fields correctly');
            return;
        }

        try {
            await axios.post('/profile',
                JSON.stringify({ 
                    fullname, tin, nid, username, password, contactNumber, gender, dateOfBirth, presentAddress, permanentAddress, taxZone, taxCircle, maritalStatus}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                navigate('/login');
                return;
            } else {
                setErrMsg('Update failed')
            }
            errRef.current.focus();
        }

        console.log('submitted');
    };

    return (
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form id="profileForm" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName" // id is the id of the input field, also fetched by htmlFor
                    value={fullname} // value is the value of the input field
                    onChange={(e) => setFullName(e.target.value)}
                    readonly
                />
                <label htmlFor="tin">TIN:</label>
                <input
                    type="number"
                    id="tin"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    readonly
                />
                <label htmlFor="nid">NID:</label>
                <input
                    type="number"
                    id="nid"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    readonly
                /> 
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    readOnly
                    // onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                    type="tel"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    readonly
                />
                <label htmlFor="gender">Gender:</label>
                <br />
                <select
                    id="gender"
                    name="genderOptions"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    readonly
                    form="profileForm"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Prefer not to say</option>
                </select>
                <br />
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    readonly
                />
                <label htmlFor="presentAddress">Present Address:</label>
                <input
                    type="text"
                    id="presentAddress"
                    value={presentAddress}
                    onChange={(e) => setPresentAddress(e.target.value)}
                    readonly
                />
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <input
                    type="text"
                    id="permanentAddress"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    readonly
                />
                <label htmlFor="taxZone">Tax Zone:</label>
                <input
                    type="tel"
                    id="taxZone"
                    value={taxZone}
                    onChange={(e) => setTaxZone(e.target.value)}
                    readonly
                />
                <label htmlFor="taxCircle">Tax Circle:</label>
                <input
                    type="tel"
                    id="taxCircle"
                    value={taxCircle}
                    onChange={(e) => setTaxCircle(e.target.value)}
                    readonly
                />
                <label htmlFor="maritalStatus">Marital Status:</label>
                <br />
                <select
                    id="maritalStatus"
                    name="maritalStatusOptions"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    readonly
                    form="profileForm"
                >
                    <option value="married">Married</option>
                    <option value="unmarried">Unmarried</option>
                    <option value="widowed">Widowed</option>
                    <option value="other">Prefer not to say</option>
                </select>
                <br />
                <button>Edit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default ProfileUpdate;
