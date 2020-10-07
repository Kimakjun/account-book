module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true, // es6 문법 허용설정
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
};
