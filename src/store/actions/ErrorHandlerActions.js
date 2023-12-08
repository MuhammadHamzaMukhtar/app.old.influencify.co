import {
  HTTP_404_ERROR,
  HTTP_500_ERROR,
  HTTP_OTHER_ERROR,
} from "../constants/action-types";

const execute404Handler = () => {
  return {
    type: HTTP_404_ERROR,
  };
};
const execute500Handler = () => {
  return {
    type: HTTP_500_ERROR,
  };
};
const executeOtherErrorHandler = error => {
  return {
    type: HTTP_OTHER_ERROR,
    error: error,
  };
};

export const handleHTTPError = error => {
  if (error.response.status === 404) {
    return execute404Handler();
  } else if (error.response.status === 500) {
    return execute500Handler();
  } else {
    return executeOtherErrorHandler(error);
  }
};
