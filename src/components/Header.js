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
        <button class="button-59" role="button" style={{ cursor: "pointer" }}>
          Log in 
        </button>

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
