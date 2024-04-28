import {Link} from "react-router-dom";
const Header = () => {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light shadow">
        <div className="container-fluid justify-content-between">
          <a className="navbar-brand" href="#"><img src="https://cdn.iconscout.com/icon/free/png-512/swiggy-1613371-1369418.png" style={{width:"50px",height:"50px"}} alt="img"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="mynavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    )
  }
  
  export default Header