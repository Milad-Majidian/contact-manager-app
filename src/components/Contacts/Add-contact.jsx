import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { Link } from "react-router-dom";
import { Spinner } from "../";


const AddContact = () => {
  const { loading, contact, onContactChange, groups, createContact } = useContext(ContactContext)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require('../../assets/man-taking-note.png')}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={createContact}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        value={contact.fullname}
                        onChange={onContactChange}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={contact.photo}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        value={contact.number}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        value={contact.email}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        value={contact.job}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups && groups.map((group, index) => (
                          <option key={index} value={group.id}>{group.name}</option>
                        ))
                        }
                      </select>
                    </div>
                    <div className="mx-2">
                      <button
                        type="submit"
                        className="btn"
                        value="ساخت مخاطب"
                      > ساخت مخاطب</button>
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
