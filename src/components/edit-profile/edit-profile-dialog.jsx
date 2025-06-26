import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import "./edit-profile-dialog.scss";
import { DialogContent } from "@mui/material";
import EditProfile from "./edit-profile";
import ToggleHtmlScroll from "../../utils/toggle-html-scroll";

const EditProfileDialog = ({ profileUser, open, closeDialog }) => {
  useEffect(() => {
    ToggleHtmlScroll(open);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="edit-profile-dialog"
      disableScrollLock
      disableBackdropClick
    >
      <DialogContent className="dialog-content">
        <EditProfile profileUser={profileUser} showClose close={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
