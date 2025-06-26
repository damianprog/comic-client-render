import React, { useEffect } from "react";
import ComicIssueReviewsListItem from "./user-responses-list-item";
import "./user-responses-list.scss";

const ComicIssueReviewsList = ({ reviews }) => {
  const sortedReviews = () => {
    const sortedReviews = [...reviews];

    return sortedReviews.sort(
      (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
    );
  };

  return (
    <div className="user-responses-list">
      {reviews && reviews.length > 0 ? (
        sortedReviews().map((review, index) => (
          <ComicIssueReviewsListItem
            key={`${review.id}-${index}`}
            review={review}
          />
        ))
      ) : (
        <p className="empty-info">There are no reviews of this comic yet!</p>
      )}
    </div>
  );
};

export default ComicIssueReviewsList;
