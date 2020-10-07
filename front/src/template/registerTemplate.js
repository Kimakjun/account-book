export const registerTemplate = () => {
  return `
        <div class="form registerForm">
            <input type="email" name="email" id="email" placeholder="email" />
            <input type="password" name="pw" id="pw" placeholder="password"/>
            <input type="text" name="nick" id="nick" placeholder="nick"/>
            <input type="button" class="registerFormButton" id="registerButton" value="register">
            <input type="button" class="registerFormButton" id="goToLogin" value="go to login">
        </div>
    `;
};
