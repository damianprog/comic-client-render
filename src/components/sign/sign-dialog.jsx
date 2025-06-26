import React from "react";
import Dialog from "@mui/material/Dialog";
import "./sign.scss";
import { DialogContent } from "@mui/material";
import Signin from "./signin";
import Signup from "./signup";
import ToggleHtmlScroll from "../../utils/toggle-html-scroll";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";

const SignDialog = ({ open, closeDialog, form = "signin", switchForm }) => {
  useEffect(() => {
    ToggleHtmlScroll(open);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="sign"
      scroll="body"
      disableScrollLock
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeDialog} />
      </div>
      <DialogContent className="content">
        {form === "signin" ? (
          <Signin switchForm={switchForm} onSign={closeDialog} />
        ) : (
          <Signup switchForm={switchForm} onSign={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignDialog;
