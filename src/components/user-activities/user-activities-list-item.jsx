import { Card } from "@mui/material";
import React, { useEffect } from "react";
import { Fragment } from "react";
import ComicTeaser from "../comic-teaser/comic-teaser";
import MoreLess from "../more-less/more-less";
import UserActivitiesListItemHeader from "./user-activities-list-item-header";

import "./user-activities-list-item.scss";
const UserActivitiesListItem = ({ userActivity }) => {
  const { comic, text } = userActivity;

  return (
    <Card className="user-activities-list-item">
      <UserActivitiesListItemHeader userActivity={userActivity} />
      {userActivity.__typename === "UserComic" ? (
        <ComicTeaser comic={comic} showDescription={true} />
      ) : userActivity.__typename === "Review" ? (
        <Fragment>
          <MoreLess text={text} length={235} />
          <div className="review-teaser">
            <ComicTeaser comic={comic} showDescription={true} />
          </div>
        </Fragment>
      ) : userActivity.__typename === "Comment" ? (
        <MoreLess text={text} length={235} />
      ) : null}
    </Card>
  );
};

export default UserActivitiesListItem;
