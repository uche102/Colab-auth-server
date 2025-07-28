import userService from "../service/user.service.js";

class UserController {
  register = async (req, res) => {
    if (req.body)
      return res.status(400).json({
        msg: "please fill in some data",
      });
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
      return res
        .status(422)
        .json({ message: "Username, email, and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await userService.register(username, email, password);
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: user.user,
        tokens: user.tokens,
      },
    });
  };
  login = async (req, res) => {
    if (!req.body)
      return res.status(400).json({
        msg: "please fill in some data",
      });
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { user } = await userService.login(email, password);

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  };
}

export default Object.freeze(new UserController());
