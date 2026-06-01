function validatePost (req, res, next) {

  const { task, completed } = req.body;

  if (task !== undefined && typeof task !== "string") {
    return res.status(400).json({
      message: "Task must be a string"
    });
  }

  const validStatus = [true, false];

  if (status !== undefined && !validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
}


function validateUpdate (req, res, next) {

  const { task, status } = req.body;

  if (task !== undefined && typeof task !== "string") {
    return res.status(400).json({
      message: "Task must be a string"
    });
  }

  const validStatus = [true, false];

  if (status !== undefined && !validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
}


module.exports = {validatePost, validateUpdate}