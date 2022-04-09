import { useEffect } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, fetchAsync, addAsync, deleteAsync } from "../Utils/reducer";
import Filter from "./Filter.jsx";
import ContactForm from "./ContactForm.jsx";
import ContactList from "./ContactList.jsx";

function Phonebook() {
  const dispatch = useDispatch();
  const contactsList = useSelector((state) => state.contactsReducer.contacts.items);
  console.log(contactsList);
  const filterString = useSelector((state) => state.contactsReducer.contacts.filter);

  const filteredOnes = contactsList.filter(contact => contact.name.toLowerCase().includes(filterString.toLowerCase()));

  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    contactsList === []
      ? dispatch(addAsync({name: name, number: number, id: nanoid()}))
      : contactsList.some((contact) => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : dispatch(addAsync({name: name, number: number, id: nanoid()}));
    form.reset();
  };

  const handlerFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handlerDelete = (e) => {
    dispatch(deleteAsync(e.currentTarget.id));
  };

  

  // useEffect(() => {
  //   JSON.parse(localStorage.getItem("contacts")).map((contact) =>
  //     dispatch(addItem(contact.name, contact.number, contact.id))
  //     );
  //     console.log(JSON.parse(localStorage.getItem("contacts")))
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(contactsList));
  // }, [contactsList]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={handlerSubmit} id={nanoid()} />

      <h3>Contacts</h3>
      <Filter onChange={handlerFilter} />
      <ContactList
        contacts={filterString !== "" ? filteredOnes : contactsList}
        onClick={handlerDelete}
      />
    </div>
  );
}

export default Phonebook;
