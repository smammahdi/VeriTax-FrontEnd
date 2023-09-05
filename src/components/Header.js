import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";

function Header() {
  return (

    <header>
      <video src={process.env.PUBLIC_URL +
        "/video2.mp4"} loop autoPlay muted></video>
      <h2>AUTOMATED ASSESSMENT OF <br/>
       YOUR INCOME TAX RETURN</h2>
      <div className="row">

        <button class="button-59" role="button" style={{ cursor: "pointer" }}>
          Register 
        </button>
        /&nbsp;
        &nbsp;
        &nbsp;
        <Link to="/login">
        <button class="button-59" role="button" style={{ cursor: "pointer" }}>
        
          Log in 
   
        </button>
        </Link>

        {/* <Routes>
          <Route path="/login" element={<Login />} />
        </Routes> */}

        {/* <button className="btn" style={{ cursor: "pointer" }}>
          Register
        </button> */}

        {/* <button className="btn" style={{ cursor: "pointer" }}>
          Log in
        </button> */}
      
      </div>

      <div className="headerbg"></div>
    </header>

  );
}
export default Header;
