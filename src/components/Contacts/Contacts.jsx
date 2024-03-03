
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import Contact from "./Contact";
import Spinner from "../spinner";
import { Link } from "react-router-dom";

const Contacts = () => {
  const { loading, filteredContacts, deleteContact } = useContext(ContactContext)
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="d-flex flex-row-reverse bd-highlight my-4">
                <Link to="/contacts/add" className="btn mx-2 btn-success">
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((item, index) => (
                <Contact key={index} contactItem={item} confirmModal={deleteContact} />
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center card text-center py-5">
                <p className="h3 text-info"> مخاطب یافت نشد</p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="یافت نشد"
                  className="w-25"
                ></img>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
