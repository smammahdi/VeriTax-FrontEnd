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
                                text="Morbi eget neque risus. Duis erat quam, porta quis enim id, venenatis blandit nunc. "
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card
                                title="Check Return Status"
                                img="card2.png"
                                text="Maecenas dictum efficitur felis non gravida. Vestibulum vitae ante luctus, accumsan mi vitae, pretium metus."
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <Card
                                title="See Rules"
                                img="card3.png"
                                text="Phasellus suscipit nibh at nisi finibus vestibulum sit amet vitae massa. Suspendisse non est eget elit pulvinar consectetur nec non sapien."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
