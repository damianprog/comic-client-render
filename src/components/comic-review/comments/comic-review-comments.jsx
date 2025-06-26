import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ComicIssueReviewsList from "../../user-responses/user-responses-list";
import ComicReviewCommentsForm from "./comic-review-comments-form";
import Pagination from "@mui/material/Pagination";
import "./comic-review-comments.scss";

const ComicReviewComments = ({ signedUser, review }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);

  const {
    data: { comments } = [],
    refetch,
    loading,
  } = useQuery(COMMENTS, {
    variables: {
      reviewId: review.id,
    },
  });

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);

  const currentPageReviews = () => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return comments.slice(indexOfFirstReview, indexOfLastReview);
  };

  const paginate = (_, pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="comic-review-comments">
      <h2>Comments</h2>
      {comments ? <ComicIssueReviewsList reviews={currentPageReviews()} /> : ""}
      {comments && comments.length > 0 && (
        <Pagination
          className="pagination"
          count={Math.ceil(comments.length / 10)}
          shape="rounded"
          onChange={paginate}
        />
      )}
      <ComicReviewCommentsForm review={review} />
    </div>
  );
};

const COMMENTS = gql`
  query comments($reviewId: ID) {
    comments(reviewId: $reviewId) {
      id
      text
      user {
        id
        nickname
        userDetails {
          id
          profileImage
        }
      }
      createdAt
    }
  }
`;

export default ComicReviewComments;
