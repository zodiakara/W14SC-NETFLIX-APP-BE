export const badRequestHandler = (error, req, res, next) => {
  if (error.status === 400) {
    res.status(400).send({
      message: error.message,
    });
  } else {
    next(error);
  }
};
export const unauthorizedHandler = (error, req, res, next) => {
  if (error.status === 401) {
    res.status(401).send({ message: error.message });
  } else {
    next(error);
  }
};
export const notFoundHandler = (error, req, res, next) => {
  if (error.status === 404) {
    res.status(404).send({ message: error.message });
  } else {
    next(error);
  }
};

export const genericErrorHandler = (error, req, res) => {
  console.log(error);
  res
    .status(500)
    .send({ message: "an error occured, we're gonna fix it asap" });
};
