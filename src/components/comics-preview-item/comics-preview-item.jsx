import { MoreVert } from "@mui/icons-material";
import React from "react";
import Dropdown from "../dropdown/dropdown";
import { useNavigate } from "react-router-dom";

import "./comics-preview-item.scss";

const ComicsPreviewItem = ({
  comic,
  history,
  showControls,
  controlDropdownContent,
  disableAnimation,
}) => {
  const navigate = useNavigate();

  const redirectToComicPage = () => {
    navigate(`/comic/${comic.id}`);
    window.scrollTo(0, 0);
  };

  const { title, coverImage } = comic;

  return (
    <div className="comics-preview-item">
      <div className={`animated-preview ${disableAnimation ? "" : "move"}`}>
        <div onClick={redirectToComicPage} className="img-container">
          <img alt="comic" src={coverImage} />
        </div>
        <div className="info-actions">
          <h5 onClick={redirectToComicPage}>{title}</h5>
          {showControls ? (
            <div className="controls">
              <Dropdown activator={<MoreVert />}>
                {controlDropdownContent}
              </Dropdown>
            </div>
          ) : null}
        </div>
      </div>
      <a href={comic.linkingUrl}>See at Marvel store</a>
    </div>
  );
};

export default ComicsPreviewItem;
