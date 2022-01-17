import { useState, useEffect } from "react";
import axios from "axios";

import Contact from "./Contact";
import AddContactDialog from "./AddContactDialog";

import Navbar from "../commons/Navbar";
import FloatingActionButton from "../commons/FloatingActionButton";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

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
    const fd = new FormData();

    fd.append("photograph", contactInfo.photograph);
    fd.append("phone", JSON.stringify(contactInfo.phone));
    fd.append("name", contactInfo.name);
    fd.append("address", contactInfo.address);
    fd.append("email", contactInfo.email);

    axios
      .post("http://localhost:8081/contacts", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });

    toggleAddContactDialogBox(false);

    fetchAndSetContacts();
    fetchAndSetContactNumbersType();
  };

  return (
    <div>
      <Navbar />
      {isContactsLoading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
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
      )}
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
