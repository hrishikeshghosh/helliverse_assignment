import checkPassword from "../config/passwordChecker.js";
import USERMODEL from "../Model/USERMODEL.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please check all the fields!", success: false });
    } else if (password !== confirmPassword || !checkPassword(password)) {
      return res.status(400).json({
        message:
          "Please confirm password correctly/ Password criteria does not match",
        success: false,
      });
    }

    let user = await USERMODEL.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "account already exists!", success: false });
    }

    user = await USERMODEL.create({ name, email, password });
    await user.save();

    const token = user.generateToken();

    // const cookieOptions = {
    //   httpOnly: true,
    //   expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // };

    return (
      res
        .status(200)
        // .cookie("token", token, cookieOptions)
        .json({
          message: "user created successfully",
          success: true,
          user,
          token,
        })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `something went wrong. \n error: ${error.message}`,
      success: false,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USERMODEL.findOne({ email })
      .select("password")
      .populate("");
    if (!user) {
      return res
        .status(400)
        .json({ message: "account does not exist!", success: false });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "incorrect password", success: false });
    }

    const token = user.generateToken();
    // const cookieOptions = {
    //   httpOnly: true,
    //   expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // };
    return (
      res
        .status(200)
        // .cookie("token", token, cookieOptions)
        .json({
          message: "Logged In successfully!",
          success: true,
          user,
          token,
        })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `something went wrong. \n error: ${error.message}`,
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await USERMODEL.findById(id);
    return res
      .status(200)
      .json({ message: "Profile fetched successfully!", success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: error.message, success: false });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await USERMODEL.findOne({ _id: id });
    if (!user)
      return res
        .status(400)
        .json({ message: "account does not exist", success: false });
    await USERMODEL.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Account Deleted Successfully", success: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
