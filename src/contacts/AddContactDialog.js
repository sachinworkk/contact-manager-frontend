import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function AddContactDialog(props) {
  const [contactInfo, setContactInfo] = useState({
    phone: [{ contactNumber: "", numberType: "" }],
    name: "",
    photograph: null,
    address: "",
    email: "",
  });

  const [contactInfoErrors, setErrors] = useState({
    phone: [{ contactNumber: "", numberType: "" }],
    name: "",
    photograph: "",
    address: "",
    email: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const isInitialMount = useRef(true);

  const isStringEmpty = (value) => {
    return !value || value.length === 0;
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleContactInformationChange = (e) => {
    const { name, value } = e.target;

    setContactInfo({ ...contactInfo, [name]: value });

    handleValidation(name, value);
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

  const handleValidation = (fieldName, value) => {
    const isValueEmpty = isStringEmpty(value);

    let errorMessage = "";

    if (isValueEmpty) {
      switch (fieldName) {
        case "name":
          errorMessage = "Name is empty";
          break;
        case "photograph":
          errorMessage = "Contact Image is empty";
          break;
        case "address":
          errorMessage = "Address is empty";
          break;
        default:
          errorMessage = "Email is empty";
      }
    }

    if (fieldName === "email" && !isValueEmpty) {
      const isEmailValid = validateEmail(value);

      if (!isEmailValid) {
        errorMessage = "Not a valid email address";
      }
    }

    setErrors((prevError) => ({ ...prevError, [fieldName]: errorMessage }));
  };

  const handleContactListValidation = () => {
    const { phone } = contactInfo;

    const contactListValidation = phone.map((phone) =>
      isStringEmpty(phone.contactNumber)
        ? { ...phone, contactNumber: "Contact Number is empty" }
        : { ...phone, contactNumber: "" }
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: contactListValidation,
    }));
  };

  const checkIsFormValid = () => {
    const isValid = Object.entries(contactInfoErrors)
      .filter(([key, value]) => key !== "phone")
      .every(([key, value]) => isStringEmpty(value));

    const isContactListValid = contactInfoErrors.phone.every((phone) =>
      isStringEmpty(phone.contactNumber)
    );

    setIsFormValid(isValid && isContactListValid);
  };

  const fileSelectHandler = (event) => {
    const file = event?.target?.files[0];

    setContactInfo({ ...contactInfo, photograph: file });

    handleValidation("photograph", file?.name || null);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = { ...contactInfo, phone: [...contactInfo.phone] };
    list.phone.splice(index, 1);

    setContactInfo(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    const list = [...contactInfo.phone, { contactNumber: "", numberType: "" }];

    setContactInfo({
      ...contactInfo,
      phone: list,
    });
  };

  const validateAllFields = () => {
    Object.entries(contactInfo).forEach(([key, value]) => {
      if (key === "phone") {
        handleContactListValidation();
      } else if (key === "photograph") {
        handleValidation(key, value?.name || value);
      } else {
        handleValidation(key, value);
      }
    });
  };

  const handleCreate = () => {
    validateAllFields();

    if (isFormValid) {
      props.handleSubmit(contactInfo);
    }
  };

  const onDialogClose = () => {
    props.handleClose();

    resetData();
  };

  const resetData = () => {
    window.location.reload();
  };

  useEffect(handleContactListValidation, [contactInfo]);

  useEffect(
    () =>
      isInitialMount.current
        ? (isInitialMount.current = false)
        : checkIsFormValid(),
    [contactInfo, contactInfoErrors]
  );

  return (
    <div>
      <Dialog open={props.isOpened} onClose={onDialogClose}>
        <DialogTitle>Create Contact</DialogTitle>
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
            error={!isStringEmpty(contactInfoErrors?.name)}
            helperText={
              !isStringEmpty(contactInfoErrors?.name)
                ? contactInfoErrors?.name
                : ""
            }
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
            error={!isStringEmpty(contactInfoErrors?.address)}
            helperText={
              !isStringEmpty(contactInfoErrors?.address)
                ? contactInfoErrors?.address
                : ""
            }
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
            error={!isStringEmpty(contactInfoErrors?.email)}
            helperText={
              !isStringEmpty(contactInfoErrors?.email)
                ? contactInfoErrors?.email
                : ""
            }
          />

          {contactInfo.phone.map((x, i) => {
            return (
              <Box
                sx={{
                  border: 1,
                  padding: 2,
                  borderRadius: 1,
                  borderColor: "grey.500",
                  marginBottom: "10px",
                  marginTop: "14px",
                }}
                key={i + "box"}
              >
                <TextField
                  margin="none"
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  type="text"
                  fullWidth
                  variant="standard"
                  sx={{ marginBottom: "10px" }}
                  onChange={(e) => handleContactListChange(e, i)}
                  key={i + "contactNumber"}
                  error={
                    !isStringEmpty(contactInfoErrors.phone?.[i]?.contactNumber)
                  }
                  helperText={
                    !isStringEmpty(contactInfoErrors.phone?.[i]?.contactNumber)
                      ? contactInfoErrors.phone?.[i]?.contactNumber
                      : ""
                  }
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
                  key={i + "phone"}
                >
                  {props.contactNumbersType.map((contactNumberType) => (
                    <MenuItem key={contactNumberType} value={contactNumberType}>
                      {contactNumberType}
                    </MenuItem>
                  ))}
                </TextField>

                {contactInfo.phone.length !== 1 && (
                  <Button
                    key={i + "removeButton"}
                    className="mr10"
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove
                  </Button>
                )}
                {contactInfo.phone.length - 1 === i && (
                  <Button key={i + "addButton"} onClick={handleAddClick}>
                    Add
                  </Button>
                )}
              </Box>
            );
          })}

          <InputLabel
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            Please select a contact image
          </InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "80px",
            }}
          >
            <input type="file" onChange={fileSelectHandler} />
            {!isStringEmpty(contactInfoErrors.photograph) ? (
              <InputLabel
                sx={{
                  color: "#d32f2f",
                  fontfamily: "Roboto Helvetica Arial sans-serif",
                  fontWeight: "400",
                  fontSize: "0.75rem",
                  lineHeight: "1.66",
                }}
              >
                {contactInfoErrors.photograph}
              </InputLabel>
            ) : null}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
