import React, { Fragment, useEffect, useState } from 'react';

const ProfileUpdate = () => {
    const [fullName, setFullName] = useState(''); // useState er bhitor ja arg deya sheta default value oi state er
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [year, setYear] = useState('');
    const [tin, setTin] = useState('');
    const [nid, setNid] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [presentAddress, setPresentAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [taxZone, setTaxZone] = useState('');
    const [taxCircle, setTaxCircle] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        if (
            !email ||
            !password ||
            !confirmPassword ||
            !contactNumber ||
            !presentAddress ||
            !maritalStatus
        ) {
            setFormError('Please fill in all the appropriate fields correctly');
            return;
        }

        console.log('submitted');
    };

    return (
        <div>
            <form id="profileUpdateForm" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName" // id is the id of the input field, also fetched by htmlFor
                    value={fullName} // value is the value of the input field
                    readOnly
                    // onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    readOnly
                    // onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="year">Year:</label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <label htmlFor="tin">TIN:</label>
                <input
                    type="number"
                    id="tin"
                    value={tin}
                    readonly
                    // onChange={(e) => setTin(e.target.value)}
                />
                <label htmlFor="nid">NID:</label>
                <input
                    type="number"
                    id="nid"
                    value={nid}
                    readonly
                    // onChange={(e) => setNid(e.target.value)}
                />
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                    type="tel"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <label htmlFor="gender">Gender:</label>
                <br />
                <select
                    id="gender"
                    name="genderOptions"
                    value={gender}
                    readonly
                    disabled
                    // onChange={(e) => setGender(e.target.value)}
                    form="profileUpdateForm"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                </select>
                <br />
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    readonly
                    // onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label htmlFor="presentAddress">Present Address:</label>
                <input
                    type="text"
                    id="presentAddress"
                    value={presentAddress}
                    onChange={(e) => setPresentAddress(e.target.value)}
                />
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <input
                    type="text"
                    id="permanentAddress"
                    value={permanentAddress}
                    readonly
                    // onChange={(e) => setPermanentAddress(e.target.value)}
                />
                <label htmlFor="taxZone">Tax Zone:</label>
                <input
                    type="tel"
                    id="taxZone"
                    value={taxZone}
                    readonly
                    // onChange={(e) => setTaxZone(e.target.value)}
                />
                <label htmlFor="taxCircle">Tax Circle:</label>
                <input
                    type="tel"
                    id="taxCircle"
                    value={taxCircle}
                    readonly
                    // onChange={(e) => setTaxCircle(e.target.value)}
                />
                <label htmlFor="maritalStatus">Marital Status:</label>
                <br />
                <select
                    id="maritalStatus"
                    name="maritalStatusOptions"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    form="profileUpdateForm"
                >
                    <option value="married">Married</option>
                    <option value="unmarried">Unmarried</option>
                    <option value="widowed">Widowed</option>
                    <option value="other">Prefer not to say</option>
                </select>
                <br />
                <button>Submit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default ProfileUpdate;
