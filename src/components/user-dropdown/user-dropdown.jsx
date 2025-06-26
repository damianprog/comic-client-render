import React from "react";
import { connect } from "react-redux";
import { setSignedUser } from "../redux/user/user-actions";
import { Link } from "react-router-dom";

import "./user-dropdown.scss";
import Dropdown from "../dropdown/dropdown";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ signedUser, history }) => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/signout");
  };

  return (
    <div className="user-dropdown">
      <Dropdown activator={<span>{signedUser.nickname}</span>}>
        <ul>
          <Link to={`/profile/${signedUser.nickname}`}>
            <li>My Profile</li>
          </Link>
          <li onClick={logout}>Log Out</li>
        </ul>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
