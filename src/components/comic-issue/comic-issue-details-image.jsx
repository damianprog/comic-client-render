import React from "react";
import { connect } from "react-redux";
import "./comic-issue-details-image.scss";

import { Button } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";

const ComicIssueDetailsImage = ({ image, onClickSaveComic, signedUser }) => {
  return (
    <div className="comic-issue-details-image">
      <img alt="cover" src={image} />
      {signedUser && (
        <Button
          className="save-dialog-btn"
          disableRipple
          onClick={onClickSaveComic}
        >
          <LibraryAdd />
          Save Comic
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicIssueDetailsImage);
