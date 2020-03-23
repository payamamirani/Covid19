import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onLike }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={classes}
      onClick={onLike}
      aria-hidden="true"
    ></i>
  );
};

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired
};

export default Like;
