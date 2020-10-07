const Regex = {
  email: /^[\w]([-_.]?[\w])*@[\w]([-_.]?[\w])*\.[a-zA-Z]{2,3}/i,
  password: /^[a-zA-Z0-9]{6,15}/,
  nick: /[a-zA-Z가-힣]{3,30}/,
};

exports.isEmail = (maybeEmail) => {
  return Regex.email.test(maybeEmail);
};

exports.isPassword = (maybePw) => {
  return Regex.password.test(maybePw);
};

exports.isNick = (maybeNick) => {
  return Regex.nick.test(maybeNick);
};
