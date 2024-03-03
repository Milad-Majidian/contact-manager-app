import React, { useState, useEffect, useContext } from "react";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import Spinner from "../spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../../services/contact";
import { ContactContext } from "../../context/contactContext";


const EditContact = () => {
  const { contactId } = useParams();
  const { contacts, setContacts, setFilteredContacts, loading, setLoading, groups } = useContext(ContactContext)
  const navigator = useNavigate()
  // const [state, setState] = useState({
  //   loading: false, contact: {}, group: []
  // })
  const [contact, setContact] = useState({})

  const submitForm = async (event) => {
    setLoading((preLoading) => !preLoading)
    try {
      const { data, status } = await updateContact(contact, contactId)
      if (status === 200) {
        setLoading(false)
        const allContacts = [...contacts];
        let contactIndex = allContacts.findIndex((allContact) => allContact.id === contactId)
        allContacts[contactIndex] = { ...contact }
        setContacts(allContacts)
        setFilteredContacts(allContacts)
        navigator('/contacts')
      }
    } catch (error) {
      setLoading((preLoading) => !preLoading)
    }

  }
  const setContactInfo = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  }

  const fetchData = async () => {
    try {
      setLoading((preLoading) => !preLoading)
      const { data: contactData } = await getContact(contactId);
      setContact(contactData)
    } catch (error) {
      setLoading((preLoading) => !preLoading)

    }
  }

  useEffect(() => {
    fetchData()
    console.log('hello')
  }, [])


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        value={contact.fullname}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={contact.photo}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        className="form-control"
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.email}
                        onChange={setContactInfo}
                        type="email"
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
                        className="form-control"
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={setContactInfo}
                        required={true}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <button
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      >ویرایش مخاطب</button>
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
