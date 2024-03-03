
import { Link } from "react-router-dom";
const Contact = ({ contactItem, confirmModal }) => {
  return (
    <>
      <div className="col-md-6">
        <div className="card my-2">
          <div className="card-body">
            <div className="row align-items-center d-flex justify-content-around">
              <div className="col-md-4 col-sm-4">
                <img
                  src={contactItem.photo || "https://via.placeholder.com/200"}
                  alt={contactItem.fullname}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-7 col-sm-7">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-dark">
                    نام و نام خانوداگی :{"  "}
                    <span className="fw-bold">{contactItem.fullname}</span>
                  </li>
                  <li className="list-group-item list-group-item-dark">
                    شماره موبایل :{"  "}
                    <span className="fw-bold">{contactItem.mobile}</span>
                  </li>
                  <li className="list-group-item list-group-item-dark">
                    آدرس ایمیل :{"  "}
                    <span className="fw-bold">{contactItem.email}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                <Link to={`/contacts/${contactItem.id}`} className="btn my-1">
                  <i className="fa fa-eye" />
                </Link>

                <Link to={`/contacts/edit/${contactItem.id}`} className="btn my-1">
                  <i className="fa fa-pen" />
                </Link>
                <button onClick={() => confirmModal(contactItem.id, contactItem.fullname)} className="btn my-1">
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default Contact;

