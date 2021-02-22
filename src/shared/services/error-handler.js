import axios from "axios";
import _ from "lodash";

export const handler = err => {
  const details = {
    message: "",
    details: null,
    level: "warning",
    error: err,
  };

  if (err.response) {
    if (_.isPlainObject(err.response.data)) {
      details.message = _.get(
        err.response.data,
        "message",
        err.response.statusText,
      );
      details.details = err.response.data;
    } else {
      details.message = err.response.statusText;
      details.details = err.response.data;
    }
    details.level =
      err.response.status >= 400 && err.response.status < 500
        ? "warning"
        : "error";
  } else if (err.request) {
    details.message = err.message;
    details.level = "error";
    details.details = err.toJSON();
  } else if (axios.isCancel(err)) {
    details.message = "Dibatalkan!";
    details.level = "warning";
  } else {
    details.message = _.get(err, "message", "Unknown error");
    details.level = "error";
    details.details = err;
  }
  return details;
};

export default handler;
