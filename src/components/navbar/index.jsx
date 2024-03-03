import SearchContact from "../Contacts/Search-contact";
import { useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <i className="fas fa-id-badge" />
            وب اپلیکیشن مدیریت{"  "}
            <span className="contact">مخاطبین</span>
          </div>
          {location.pathname === '/contacts' ?
            (<div className="search-contact col">
              <SearchContact />
            </div>)
            : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
