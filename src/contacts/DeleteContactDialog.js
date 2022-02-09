import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteContactDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpened}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the contact?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={props.onDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
