import { FRONTEND_BASE } from "./config.js";
console.log("inside sign up");

const signUpBtn = document.querySelector(".cta-signUp");
const loginBtn = document.querySelector(".cta-login");

signUpBtn.addEventListener("click", () => {
  console.log("inside sign up");
  window.location.href = `http://localhost:5500/pages/sign-up.html`;
});
loginBtn.addEventListener("click", () => {
  window.location.href = `${FRONTEND_BASE}pages/login.html`;
});
