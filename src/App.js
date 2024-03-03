import { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Contacts, AddContact, EditContact, ViewContact } from "./components";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { getAllGroups, getAllContacts, createContact, deleteContact } from './services/contact'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { YELLOW } from "./helpers/colors";
import { ContactContext } from "./context/contactContext";


function App() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({})
  const [contactQuery, setContactQuery] = useState({ text: "" })
  const [groups, setGroups] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [reRender, setReRender] = useState(false)
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading((preLoading) => !preLoading)
      const { data: contactData } = await getAllContacts()
      const { data: groupsData } = await getAllGroups()
      setContacts(contactData)
      setFilteredContacts(contactData)
      setGroups(groupsData)
      setLoading((preLoading) => !preLoading)
    } catch (error) {
      console.log('error', error.message)
      setLoading((preLoading) => !preLoading)
    }
  }

  function onContactChange(event) {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  }
  async function createContactForm(event) {
    event.preventDefault()
    try {
      setLoading((preLoading) => !preLoading)
      const { status, data } = await createContact(contact)
      /*
      * NOTE
      *  setContacts(data)
      */

      if (status === 201) {
        const allContacts = [...contacts, data]
        setContacts(allContacts)
        setFilteredContacts(allContacts)
        setContact({})
        setLoading((preLoading) => !preLoading)
        navigate("/contacts")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  function confirmDeleteHandler(contactId, contactFullname) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir="rtl" className="confirm-modal p-4">
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: "lightgray" }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button onClick={() => {
              deleteContactHandler(contactId);
              onClose()
            }}
              className="btn mx-2"> مطمئن هستم</button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: "gray" }}
            >
              انصراف
            </button>

          </div >
        )
      }
    })

  }

  const deleteContactHandler = async (contactId) => {
    try {
      setLoading((preLoading) => !preLoading)
      const response = await deleteContact(contactId)
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setReRender(!reRender)
        setLoading((preLoading) => !preLoading)
      }
    } catch (error) {
      setLoading((preLoading) => !preLoading)
    }
  }

  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value })
    const allContacts = contacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredContacts(allContacts)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <ContactContext.Provider value={{
        loading,
        setLoading,
        contact,
        setContact,
        contactQuery,
        contacts,
        setContacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: confirmDeleteHandler,
        createContact: createContactForm,
        contactSearch,
      }}>
        <div className="App">
          <Navbar />
          <Routes>
            {/* <Contacts contacts={contacts} loading={loading} /> */}
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/add" element={<AddContact />}
            />
            <Route path="/contacts/:contactId" element={<ViewContact />} />
            <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          </Routes>
        </div>
      </ContactContext.Provider>
    </>
  );
}

export default App;
