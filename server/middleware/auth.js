const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증을 처리하는 곳(관리자 / 사용자 / 로그인안한 사람 / 로그인 한사람.. 등등 권한을 가진 사람 체크)
  let token = req.cookies.x_auth;

  // 클라이언트 쿠키에서 토큰을 가져온다.

  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    console.log(token);
    console.log(user);
    next();
  });
  // 유저가 있으면 인증 ok

  // 유저가 없으면 인증 no
};

module.exports = { auth };
