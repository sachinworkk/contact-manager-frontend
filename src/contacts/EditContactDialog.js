import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function EditContactDialog(props) {
  const [contactInfo, setContactInfo] = useState({
    phone: [{ contactNumber: "", numberType: "" }],
    name: "",
    photograph: null,
    address: "",
    email: "",
  });

  const handleContactInformationChange = (e) => {
    const { name, value } = e.target;

    setContactInfo({ ...contactInfo, [name]: value });
  };

  // handle input change
  const handleContactListChange = (e, index) => {
    const { name, value } = e.target;
    const list = {
      ...contactInfo,
      phone: [...contactInfo.phone],
    };
    list.phone[index][name] = value;

    setContactInfo(list);
  };

  const fileSelectHandler = (event) => {
    const file = event.target.files[0];

    setContactInfo({ ...contactInfo, photograph: file });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = { ...contactInfo, phone: [...contactInfo.phone] };
    list.phone.splice(index, 1);

    setContactInfo(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setContactInfo({
      ...contactInfo,
      phone: [...contactInfo.phone, { contactNumber: "", numberType: "" }],
    });
  };

  const handleCreate = () => {
    props.handleSubmit(contactInfo);

    resetData();
  };

  const onDialogClose = () => {
    props.handleClose();

    resetData();
  };

  const resetData = () => {
    setContactInfo({
      phone: [{ contactNumber: "", numberType: "" }],
      name: "",
      photograph: "",
      address: "",
      email: "",
    });
  };

  return (
    <div>
      <Dialog open={props.isOpened} onClose={onDialogClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="none"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleContactInformationChange}
          />

          <TextField
            margin="none"
            id="name"
            label="Address"
            name="address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleContactInformationChange}
          />

          <TextField
            margin="none"
            id="name"
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleContactInformationChange}
          />

          {contactInfo.phone.map((x, i) => {
            return (
              <div className="box">
                <TextField
                  margin="none"
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleContactListChange(e, i)}
                />

                <TextField
                  id="filled-select-currency-native"
                  select
                  fullWidth
                  defaultValue="PHONE"
                  name="numberType"
                  onChange={(e) => handleContactListChange(e, i)}
                  label="Contact type"
                  helperText="Please select the contact type"
                  variant="filled"
                >
                  {props.contactNumbersType.map((contactNumberType) => (
                    <MenuItem key={contactNumberType} value={contactNumberType}>
                      {contactNumberType}
                    </MenuItem>
                  ))}
                </TextField>

                <div className="btn-box">
                  {contactInfo.phone.length !== 1 && (
                    <Button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </Button>
                  )}
                  {contactInfo.phone.length - 1 === i && (
                    <Button onClick={handleAddClick}>Add</Button>
                  )}
                </div>
              </div>
            );
          })}
        </DialogContent>

        <input type="file" onChange={fileSelectHandler} />
        <DialogActions>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button onClick={handleCreate}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
