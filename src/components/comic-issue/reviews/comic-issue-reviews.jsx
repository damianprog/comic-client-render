import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { REVIEWS } from "../../../graphql/graphql";
import { connect } from "react-redux";
import ComicIssueReviewsPrompt from "./comic-issue-reviews-prompt";
import ComicIssueReviewsList from "../../user-responses/user-responses-list";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import "./comic-issue-reviews.scss";

const ComicIssueReviews = ({ signedUser, comic }) => {
  const {
    data: { reviews } = {},
    refetch,
    loading,
  } = useQuery(REVIEWS, {
    variables: {
      comicId: comic.id,
    },
  });

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);

  const currentPageReviews = () => {
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    return reviews.slice(indexOfFirstReview, indexOfLastReview);
  };

  const paginate = (_, pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="comic-issue-reviews">
      <div className="wrapper">
        <div className="content">
          <h2>Reviews</h2>
          {loading ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (
            <Fragment>
              {signedUser && <ComicIssueReviewsPrompt reviews={reviews} />}
              <ComicIssueReviewsList reviews={currentPageReviews()} />
              {reviews && reviews.length > 0 && (
                <Pagination
                  className="pagination"
                  count={Math.ceil(reviews.length / 10)}
                  shape="rounded"
                  onChange={paginate}
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicIssueReviews);
