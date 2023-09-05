import { useState } from 'react';

const BasicInfo = () => {
    const [firstName, setFirstName] = useState(''); // useState er bhitor ja arg deya sheta default value oi state er
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tin, setTin] = useState('');
    const [nid, setNid] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [presentAddress, setPresentAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [taxZone, setTaxZone] = useState('');
    const [taxCircle, setTaxCircle] = useState('');
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !password ||
            !confirmPassword ||
            !tin ||
            !nid ||
            !contactNumber ||
            !gender ||
            !dateOfBirth ||
            !presentAddress ||
            !permanentAddress ||
            !taxZone ||
            !taxCircle
        ) {
            setFormError('Please fill in all the fields correctly');
            return;
        }

        console.log('submitted');
    };

    return (
        <div>
            <form id="basicInfoForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName" // id is the id of the input field, also fetched by htmlFor
                    value={firstName} // value is the value of the input field
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName" // id is the id of the input field, also fetched by htmlFor
                    value={lastName} // value is the value of the input field
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <label htmlFor="tin">TIN:</label>
                <input
                    type="number"
                    id="tin"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                />
                <label htmlFor="nid">NID:</label>
                <input
                    type="number"
                    id="nid"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
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
                    onChange={(e) => setGender(e.target.value)}
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
                    onChange={(e) => setDateOfBirth(e.target.value)}
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
                    onChange={(e) => setPermanentAddress(e.target.value)}
                />
                <label htmlFor="taxZone">Tax Zone:</label>
                <input
                    type="tel"
                    id="taxZone"
                    value={taxZone}
                    onChange={(e) => setTaxZone(e.target.value)}
                />
                <label htmlFor="taxCircle">Tax Circle:</label>
                <input
                    type="tel"
                    id="taxCircle"
                    value={taxCircle}
                    onChange={(e) => setTaxCircle(e.target.value)}
                />
                <button>Submit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default BasicInfo;
