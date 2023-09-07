import { useNavigate } from 'react-router-dom';

import Card from './Card';

const Services = () => {
    const navigate = useNavigate();

    const handleClickForm = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        navigate('/basicinfo'); // redirect to the salary page
    };

    return (
        <div className="container services">
            <h2 className="main-title text-center">SERVICES</h2>
            <div className="card-cover">
                <div className="col-md-12">
                    <div className="row">
                        <div
                            className="col-md-4 mb-2"
                            onClick={handleClickForm}
                        >
                            <Card
                                title="Fill Up Tax Form"
                                img="card1.png"
                                text="Effortlessly complete your tax forms online with our user-friendly interface. Streamlined tax filing made simple. "
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card
                                title="Check Return Status"
                                img="card2.png"
                                text="Track the progress of your tax return with real-time updates. Stay informed about your financial status."
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card
                                title="See Rules"
                                img="card3.png"
                                text="Access comprehensive tax rules and guidelines. Stay informed and make informed financial decisions with ease."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
