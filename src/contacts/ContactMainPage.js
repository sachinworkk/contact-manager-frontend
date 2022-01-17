import { useState, useEffect } from "react";

import Contact from "./Contact";
import AddContactDialog from "./AddContactDialog";

import Navbar from "../commons/Navbar";
import FloatingActionButton from "../commons/FloatingActionButton";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function ContactMainPage() {
  const [contacts, setContacts] = useState([]);
  const [contactNumbersType, setContactNumbersType] = useState([]);
  const [isContactsLoading, setLoading] = useState(true);
  const [isAddDialogBoxOpened, toggleAddContactDialogBox] = useState(false);

  useEffect(() => {
    fetchAndSetContacts();
    fetchAndSetContactNumbersType();
  }, []);

  const fetchAndSetContacts = () => {
    fetch("http://localhost:8081/contacts/")
      .then((res) => res.json())
      .then(
        (contacts) => {
          setLoading(false);
          setContacts(contacts);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const fetchAndSetContactNumbersType = () => {
    fetch("http://localhost:8081/contacts/numbers/type")
      .then((res) => res.json())
      .then(
        (contactNumbersType) => {
          setLoading(false);
          setContactNumbersType(contactNumbersType.contactNumbersType);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const onFloatingButton = () => {
    toggleAddContactDialogBox(true);
  };

  const onCloseContactDialog = () => {
    toggleAddContactDialogBox(false);
  };

  const onCreateContact = (contactInfo) => {
    fetch("http://localhost:8081/contacts", {
      method: "POST",
      body: JSON.stringify(contactInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    toggleAddContactDialogBox(false);
  };

  return (
    <div>
      <Navbar />

      <Container sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          {contacts.map((contact) => (
            <Contact
              key={contact._id}
              image={contact?.photograph || ""}
              userName={contact?.name || ""}
              displayedContactNumber={contact?.phone[0]?.contactNumber || ""}
            ></Contact>
          ))}
        </Grid>
      </Container>

      <AddContactDialog
        handleClose={onCloseContactDialog}
        contactNumbersType={contactNumbersType}
        handleSubmit={onCreateContact}
        isOpened={isAddDialogBoxOpened}
      />

      <FloatingActionButton onFloatingButtonClick={onFloatingButton} />
    </div>
  );
}
