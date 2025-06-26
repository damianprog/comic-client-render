import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import GetUserProfileImage from "../../utils/get-user-profile-image";
import GetFormattedDate from "../../utils/get-formatted-date";
import { useNavigate } from "react-router-dom";
import "./comic-review-header.scss";
import { connect, useDispatch } from "react-redux";
import Dropdown from "../dropdown/dropdown";
import { MoreVert } from "@mui/icons-material";
import { setSnackbar } from "../redux/snackbar/snackbar-actions";

const ComicReviewHeader = ({ review, signedUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update(_, { data: { deleteReview } }) {
      navigate(`/comic/${deleteReview.comic.id}`);
      dispatch(setSnackbar(true, "success", "Review has been deleted"));
    },
    onError(err) {
      console.log(err);
    },
  });

  const { user, createdAt } = review;

  const publishedDate = () => {
    let formattedDate = "";
    if (createdAt) {
      const dateOptions = { month: "long", day: "numeric", year: "numeric" };
      formattedDate = GetFormattedDate(createdAt, dateOptions);
    }

    return formattedDate;
  };

  const redirectToUpdatePage = () => {
    navigate(`/reviews/${review.id}/update`);
  };

  return (
    <header className="comic-review-header">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={GetUserProfileImage(user)}
        />
      </Link>
      <div className="review-details">
        <div className="info">
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>
          <p>{publishedDate()}</p>
        </div>
        <div className="controls">
          {signedUser && signedUser.id === user.id && (
            <Dropdown activator={<MoreVert />}>
              <Card className="dropdown-card">
                <CardContent className="dropdown-card-content">
                  <List>
                    <ListItem onClick={redirectToUpdatePage} button>
                      <ListItemText primary="Update review" />
                    </ListItem>
                    <ListItem
                      onClick={() =>
                        deleteReview({ variables: { id: review.id } })
                      }
                      button
                    >
                      <ListItemText primary="Delete review" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID) {
    deleteReview(id: $id) {
      id
      comic {
        id
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicReviewHeader);
