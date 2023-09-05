import { useState } from 'react';

const SalaryForm = () => {
    const [basicPay, setBasicPay] = useState(''); // useState er bhitor ja arg deya sheta default value oi state er
    const [specialPay, setSpecialPay] = useState('');
    const [conveyanceAllowance, setConveyanceAllowance] = useState('');
    const [houseRentAllowance, setHouseRentAllowance] = useState('');
    const [medicalAllowance, setMedicalAllowance] = useState('');
    const [overtimeAllowance, setOvertimeAllowance] = useState('');

    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        if (!basicPay) {
            setFormError('Please fill in all the fields correctly');
            return;
        }

        console.log('submitted');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="basicPay">Basic Pay:</label>
                <input
                    type="text"
                    id="basicPay"
                    value={basicPay}
                    onChange={(e) => setBasicPay(e.target.value)}
                />

                <label htmlFor="specialPay">Special Pay:</label>
                <input
                    type="text"
                    id="specialPay"
                    value={specialPay}
                    onChange={(e) => setSpecialPay(e.target.value)}
                />

                <label htmlFor="conveyanceAllowance">
                    Conveyance Allowance:
                </label>
                <input
                    type="text"
                    id="conveyanceAllowance"
                    value={conveyanceAllowance}
                    onChange={(e) => setConveyanceAllowance(e.target.value)}
                />

                <label htmlFor="houseRentAllowance">
                    House Rent Allowance:
                </label>
                <input
                    type="text"
                    id="houseRentAllowance"
                    value={houseRentAllowance}
                    onChange={(e) => setHouseRentAllowance(e.target.value)}
                />

                <label htmlFor="medicalAllowance">Medical Allowance:</label>
                <input
                    type="text"
                    id="medicalAllowance"
                    value={medicalAllowance}
                    onChange={(e) => setMedicalAllowance(e.target.value)}
                />

                <label htmlFor="overtimeAllowance">Overtime Allowance:</label>
                <input
                    type="text"
                    id="overtimeAllowance"
                    value={overtimeAllowance}
                    onChange={(e) => setOvertimeAllowance(e.target.value)}
                />

                <button>Submit</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default SalaryForm;
