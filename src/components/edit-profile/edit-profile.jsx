import React, { useState } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import "./edit-profile.scss";
import { Close } from "@mui/icons-material";
import ProfileAvatarBackground from "../profile/profile-avatar-background";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import EditProfileForm from "./edit-profile-form";
import { setSignedUser } from "../redux/user/user-actions";
import { connect, useDispatch } from "react-redux";
import { setSnackbar } from "../redux/snackbar/snackbar-actions";
import { useNavigate } from "react-router-dom";

const EditProfile = ({
  profileUser: { nickname, birthDate, userDetails },
  showClose,
  close,
  setSignedUser,
}) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    nickname,
    birthDate,
    interests: userDetails.interests,
    about: userDetails.about,
  });
  const dispatch = useDispatch();

  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
    const key = Object.keys(keyValue)[0];
    setErrors({ ...errors, [key]: null });
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, result) {
      setSignedUser(result.data.updateUser);
      if (showClose) close();
      dispatch(setSnackbar(true, "success", "Profile changes have been saved"));
      navigate(`/profile/${result.data.updateUser.nickname}`);
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.exception);
      }
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      nickname: values.nickname,
      birthDate: values.birthDate,
      about: values.about,
      interests: values.interests,
      profileImageBase64: values.profileImage,
      backgroundImageBase64: values.backgroundImage,
    },
  });

  return (
    <div className="edit-profile">
      <div className="header">
        <div className="close-label">
          {showClose ? (
            <IconButton color="inherit" onClick={close}>
              <Close />
            </IconButton>
          ) : null}
          <h2>Edit Profile</h2>
        </div>
        <Button
          onClick={updateUser}
          disabled={loading}
          disableElevation
          variant="contained"
          className="save"
        >
          {loading ? (
            <CircularProgress color="inherit" size={23} />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
      <div className="content">
        <ProfileAvatarBackground
          onChange={onChange}
          profileImage={userDetails.profileImage}
          backgroundImage={userDetails.backgroundImage}
          showControlIcons
        />
        <EditProfileForm onChange={onChange} values={values} errors={errors} />
      </div>
    </div>
  );
};

const UPDATE_USER = gql`
  mutation updateUser(
    $nickname: String
    $birthDate: String
    $about: String
    $interests: String
    $profileImageBase64: String
    $backgroundImageBase64: String
  ) {
    updateUser(
      updateUserInput: {
        nickname: $nickname
        birthDate: $birthDate
        about: $about
        interests: $interests
        profileImageBase64: $profileImageBase64
        backgroundImageBase64: $backgroundImageBase64
      }
    ) {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(EditProfile);
