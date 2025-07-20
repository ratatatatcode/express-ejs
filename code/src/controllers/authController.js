const authService = require("@/services/authService");

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await authService.signinUser(email, password);
    req.session.userId = userCredential.user.uid;
    return res.status(200).json({ message: "Login successfully" });
  } catch (e) {
    if (
      e.code === "auth/wrong-password" ||
      e.code === "auth/user-not-found" ||
      e.code === "auth/invalid-credential"
    )
      return res.status(401).json({ message: "Invalid email or password" });

    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  let user = null;

  try {
    const { name, email, password } = req.body;
    user = await authService.createUser({ name, email, password });
    return res.status(201).json({ message: "Account created successfully" });
  } catch (e) {
    if (e.code === "auth/email-already-in-use")
      return res
        .status(409)
        .json({ message: "The email address is already in use" });

    if (user) {
      try {
        await authService.deleteAuthUser(user);
      } catch (authError) {
        console.error("Failed to rollback user creation:", authError);
      }
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPasswordForEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    await authService.resetPassword(email);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    if (error.message === "not-found" || error.code === "auth/user-not-found")
      return res
        .status(404)
        .json({ message: "No user found with that email address" });

    return res
      .status(500)
      .json({ message: "Failed to send password reset email" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    return res.status(200).json({ message: "Logout successful" });
  });
};
