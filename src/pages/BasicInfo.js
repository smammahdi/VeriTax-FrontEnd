import React, { Fragment, useEffect, useState } from 'react';

const BasicInfo = () => {
    const [fullName, setFullName] = useState(''); // useState er bhitor ja arg deya sheta default value oi state er
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const getBasicInfos = async () => {
        try {
            const response = await fetch(''); // fetch is by default a GET request
            const jsonData = await response.json();

            // setBasicInfos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getBasicInfos();
    }, []); // 2nd arg empty array deyar karone ekbari req pathay

    const handleSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        // if (
        //     !fullName ||
        //     !username ||
        //     !email ||
        //     !password ||
        //     !tin ||
        //     !nid ||
        //     !contactNumber ||
        //     !gender ||
        //     !dateOfBirth ||
        //     !presentAddress ||
        //     !permanentAddress ||
        //     !taxZone ||
        //     !taxCircle ||
        //     !maritalStatus
        // ) {
        //     setFormError('Please fill in all the fields correctly');
        //     return;
        // }

        // console.log('submitted');
    };

    return (
        <div>
            <form id="basicInfoForm" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName" // id is the id of the input field, also fetched by htmlFor
                    value={fullName} // value is the value of the input field
                    // onChange={(e) => setFullName(e.target.value)}
                    readonly
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    // onChange={(e) => setUsername(e.target.value)}
                    readonly
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    readonly
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    readonly
                />
                <label htmlFor="year">Year:</label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    // onChange={(e) => setYear(e.target.value)}
                    readonly
                />
                <label htmlFor="tin">TIN:</label>
                <input
                    type="number"
                    id="tin"
                    value={tin}
                    // onChange={(e) => setTin(e.target.value)}
                    readonly
                />
                <label htmlFor="nid">NID:</label>
                <input
                    type="number"
                    id="nid"
                    value={nid}
                    // onChange={(e) => setNid(e.target.value)}
                    readonly
                />
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                    type="tel"
                    id="contactNumber"
                    value={contactNumber}
                    // onChange={(e) => setContactNumber(e.target.value)}
                    readonly
                />
                <label htmlFor="gender">Gender:</label>
                <br />
                <select
                    id="gender"
                    name="genderOptions"
                    value={gender}
                    // onChange={(e) => setGender(e.target.value)}
                    readonly
                    disabled
                    form="basicInfoForm"
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
                    // onChange={(e) => setDateOfBirth(e.target.value)}
                    readonly
                    disabled
                />
                <label htmlFor="presentAddress">Present Address:</label>
                <input
                    type="text"
                    id="presentAddress"
                    value={presentAddress}
                    // onChange={(e) => setPresentAddress(e.target.value)}
                    readonly
                />
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <input
                    type="text"
                    id="permanentAddress"
                    value={permanentAddress}
                    // onChange={(e) => setPermanentAddress(e.target.value)}
                    readonly
                />
                <label htmlFor="taxZone">Tax Zone:</label>
                <input
                    type="tel"
                    id="taxZone"
                    value={taxZone}
                    // onChange={(e) => setTaxZone(e.target.value)}
                    readonly
                />
                <label htmlFor="taxCircle">Tax Circle:</label>
                <input
                    type="tel"
                    id="taxCircle"
                    value={taxCircle}
                    // onChange={(e) => setTaxCircle(e.target.value)}
                    readonly
                />
                <label htmlFor="maritalStatus">Marital Status:</label>
                <br />
                <select
                    id="maritalStatus"
                    name="maritalStatusOptions"
                    value={maritalStatus}
                    // onChange={(e) => setMaritalStatus(e.target.value)}
                    readonly
                    disabled
                    form="basicInfoForm"
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

export default BasicInfo;
