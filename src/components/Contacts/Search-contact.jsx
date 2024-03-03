
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const SearchContact = () => {
  const { contactQuery, contactSearch } = useContext(ContactContext)

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span className="input-group-text" id="basic-addon1">
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        onChange={contactSearch}
        value={contactQuery.text}
        className="form-control"
        placeholder="حستحوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
