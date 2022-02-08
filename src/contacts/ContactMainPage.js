import { useState, useEffect, useRef } from "react";

import Contact from "./Contact";
import AddContactDialog from "./AddContactDialog";
import EditContactDialog from "./EditContactDialog";

import Navbar from "../commons/Navbar";
import FloatingActionButton from "../commons/FloatingActionButton";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import config from "../config";

import {
  editContact,
  fetchAllContacts,
  fetchAllContactsType,
  postContact,
} from "../services/contacts";

export default function ContactMainPage() {
  const [contacts, setContacts] = useState([]);

  const editDialogId = useRef("");

  const [contactNumbersType, setContactNumbersType] = useState([]);
  const [isContactsLoading, setLoading] = useState(false);
  const [isAddDialogBoxOpened, toggleAddContactDialogBox] = useState(false);
  const [isEditDialogBoxOpened, toggleEditContactDialogBox] = useState(false);

  useEffect(() => {
    fetchAndSetContacts();
    fetchAndSetContactNumbersType();
  }, []);

  const fetchAndSetContacts = async () => {
    setLoading(true);

    try {
      const contacts = await fetchAllContacts();

      setContacts(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndSetContactNumbersType = async () => {
    setLoading(true);

    try {
      const { contactNumbersType } = await fetchAllContactsType();

      setContactNumbersType(contactNumbersType);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onCreateContact = async (contactInfo) => {
    const fd = new FormData();

    fd.append("photograph", contactInfo.photograph);
    fd.append("phone", JSON.stringify(contactInfo.phone));
    fd.append("name", contactInfo.name);
    fd.append("address", contactInfo.address);
    fd.append("email", contactInfo.email);

    try {
      await postContact(fd);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);

      fetchAndSetContacts();
      fetchAndSetContactNumbersType();
      toggleAddContactDialogBox(false);
    }
  };

  const onEditContact = async (contactInfo, id) => {
    const fd = new FormData();

    fd.append("photograph", contactInfo.photograph);
    fd.append(
      "phone",
      JSON.stringify(
        contactInfo.phone.map((phone) => ({
          contactNumber: phone.contactNumber,
          contactNumberType: phone.contactNumberType,
        }))
      )
    );
    fd.append("name", contactInfo.name);
    fd.append("address", contactInfo.address);
    fd.append("email", contactInfo.email);

    try {
      await editContact(fd, id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);

      fetchAndSetContacts();
      fetchAndSetContactNumbersType();
      toggleEditContactDialogBox(false);
    }
  };

  const openAddContactDialog = () => {
    toggleAddContactDialogBox(true);
  };

  const openEditContactDialog = (id) => {
    editDialogId.current = id;

    toggleEditContactDialogBox(true);
  };

  const onCloseContactDialog = () => {
    toggleAddContactDialogBox(false);
  };

  const onCloseEditContactDialog = () => {
    toggleEditContactDialogBox(false);
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
                image={config.apiBaseUrl + contact?.photograph || ""}
                userName={contact?.name || ""}
                displayedContactNumber={contact?.phone[0]?.contactNumber || ""}
                onEdit={() => openEditContactDialog(contact._id)}
              ></Contact>
            ))}
          </Grid>
        </Container>
      )}

      {isAddDialogBoxOpened ? (
        <AddContactDialog
          handleClose={onCloseContactDialog}
          contactNumbersType={contactNumbersType}
          handleSubmit={onCreateContact}
          isOpened={isAddDialogBoxOpened}
        />
      ) : null}

      {isEditDialogBoxOpened ? (
        <EditContactDialog
          handleClose={onCloseEditContactDialog}
          contactId={editDialogId}
          contactNumbersType={contactNumbersType}
          handleEdit={onEditContact}
          isOpened={isEditDialogBoxOpened}
        />
      ) : null}

      <FloatingActionButton onFloatingButtonClick={openAddContactDialog} />
    </div>
  );
}
