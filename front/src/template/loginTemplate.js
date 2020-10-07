export const loginTemplate = () => {
  return `
        <div class="form loginForm">
            <input type="email" name="email" id="email" placeholder="email"/>
            <input type="password" name="password" id="password" placeholder="password"/>
            <input type="button" class="loginFormButton" id="localLoginButton" value="login">
            <input type="button" class="loginFormButton" id="kakaoLoginButton" value="kakao login">
            <input type="button" class="loginFormButton" id="goToRegister" value="to to register">
        </div>
`;
};
