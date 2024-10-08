import { useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { CREATE_REVIEW, UPDATE_REVIEW } from '../../graphql/graphql';
import { setSnackbar } from '../redux/snackbar/snackbar-actions';
import './comic-review-creation-form.scss';

const ComicReviewCreationForm = ({ comic, history, update, review }) => {
  const [errors, setErrors] = useState({});
  const [reviewText, setReviewText] = useState(review ? review.text : '');
  const dispatch = useDispatch();

  const onReviewInputChange = (event) => {
    setErrors({});
    setReviewText(event.target.value);
  };

  const [createReview, { createLoading }] = useMutation(CREATE_REVIEW, {
    update() {
      dispatch(setSnackbar(true, 'success', 'Review has been created'));
      history.push(`/comic/${comic.id}`);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: {
      ...comic,
      text: reviewText,
    },
  });

  const [updateReview, { updateLoading }] = useMutation(UPDATE_REVIEW, {
    update() {
      dispatch(setSnackbar(true, 'success', 'Review has been updated'));
      history.push(`/comic/${comic.id}`);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: {
      comicId: comic.id,
      text: reviewText,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    update ? updateReview() : createReview();
  };

  const isLoading = () => createLoading || updateLoading;

  return (
    <form className="comic-review-creation-form" onSubmit={onSubmit}>
      <label>
        What did you think?
        {errors.text && <p className="error-info">{errors.text}</p>}
        <textarea
          value={reviewText}
          onInput={onReviewInputChange}
          maxLength="5000"
          className={`${errors.text ? 'error' : ''}`}
          required
        ></textarea>
      </label>
      <Button type="submit" color="primary" disabled={isLoading()}>
        {isLoading() ? (
          <CircularProgress color="inherit" size={25} />
        ) : (
          <span>Post</span>
        )}
      </Button>
    </form>
  );
};

export default withRouter(ComicReviewCreationForm);
