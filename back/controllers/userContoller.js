import passport from "passport";
import User from "../models/User";

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    return res.status(500).json({ message: "비밀번호가 서로 다릅니다." });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      return res.status(201).json({
        message: "회원가입에 성공했습니다.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        joinSuccess: false,
        message: "아이디가 중복됩니다.",
      });
    }
  }
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password",
});
