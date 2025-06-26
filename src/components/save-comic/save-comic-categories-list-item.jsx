import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Checkbox, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CREATE_USER_COMIC, DELETE_USER_COMIC } from "../../graphql/graphql";
import { addUserComicToCache } from "../../graphql/utils";
import "./save-comic-categories-list.scss";

const SaveComicCategoriesListItem = ({ comic, category, userComics = [] }) => {
  const [isRequestPending, setIsRequestPending] = useState(false);

  const [deleteUserComic] = useMutation(DELETE_USER_COMIC, {
    update(cache, { data: { deleteUserComic } }) {
      cache.modify({
        fields: {
          userComics(cachedUserComicsRefs = [], { readField }) {
            const updatedUserComicsRefs = cachedUserComicsRefs.filter(
              (userComicRef) =>
                deleteUserComic.id !== readField("id", userComicRef)
            );

            return updatedUserComicsRefs;
          },
        },
      });
      setIsRequestPending(false);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [createUserComic] = useMutation(CREATE_USER_COMIC, {
    update(cache, { data: { createUserComic } }) {
      addUserComicToCache(cache, createUserComic);
      setIsRequestPending(false);
    },
    onError(err) {
      // console.log(err);
      console.log(err.graphQLErrors[0]);
    },
  });

  const toggleComicCategory = (category) => {
    if (!isRequestPending) {
      setIsRequestPending(true);
      const userComic = userComics.find(
        (userComic) => userComic.category === category
      );

      if (userComic) {
        deleteUserComic({ variables: { id: userComic.id } });
      } else {
        createUserComic({
          variables: {
            ...comic,
            category,
          },
        });
      }
    }
  };

  const isCategoryInUserComics = (category) => {
    const userComicWithCategory = userComics.find(
      (userComic) => userComic.category === category
    );

    return userComicWithCategory ? true : false;
  };

  return (
    <ListItem
      onClick={() => toggleComicCategory(category)}
      key={category}
      className="list-item"
    >
      <ListItemIcon>
        <Checkbox
          checked={isCategoryInUserComics(category)}
          disableRipple
          color="secondary"
        ></Checkbox>
      </ListItemIcon>
      <ListItemText primary={category}></ListItemText>
    </ListItem>
  );
};

export default SaveComicCategoriesListItem;
