function redirectIfAuthenticated(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/todos");
  }
  next();
}

function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/");
  }
  next();
}

module.exports = {
  redirectIfAuthenticated,
  isAuthenticated,
};
