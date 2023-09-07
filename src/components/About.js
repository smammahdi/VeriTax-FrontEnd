function About() {
  return (
    <>
      <div style={{marginTop:'15rem',width:'100%',height:'10px'}} className="about-scroll"></div>

      <div className="container about">
        <div className="row">
          <div className="col-md-6 text-center">
            <img alt="about" src={process.env.PUBLIC_URL + "/img/about.gif"} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="main-title about-h2">ABOUT</h2>
            <p className="main-p">
            VeriTax is your trusted partner in simplifying the complex world of income tax returns. Our mission is to make tax assessment hassle-free and efficient, putting the power of automation at your fingertips. 
            <br/><br/>Experience the future of income tax assessment with VeriTax. Our automated solutions are tailored to meet your specific needs. Say goodbye to tax-related stress and hello to a seamless, efficient, and accurate tax assessment process.
            <br/><br/> Join VeriTax today and take control of your financial future.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
