import './scripts.js';

/*
***************************
*>>>>> HTML ELEMENTS <<<<<*
***************************
*/
//vvvvvvvvvvvvvvv MOCK PAGES vvvvvvvvvvvvvvv//

export const loginPage = document.querySelector('.login-page');
export const customerPage = document.querySelector('.customer-page');

//vvvvvvvvvvvvvvv ELEMENTS BY PAGE vvvvvvvvvvvvvvv//

export const usernameInput = document.getElementById('username');
export const userPasswordInput = document.getElementById('password');

export const loginBtn = document.getElementById('login-button-actual');

/*
*****************************
*>>>>> EVENT LISTENERS <<<<<*
*****************************
*/

loginBtn.addEventListener('click', checkLogin);

/*
***********************
*>>>>> FUNCTIONS <<<<<*
***********************
*/
//vvvvvvvvvvvvvvv PAGE CHANGES vvvvvvvvvvvvvvv//


// export function testPrint() {
//   console.log('Worked.', event);
//   if (event.keyCode === 13 && event.type === 'keyup') {
//     console.log('Enter Worked.', event);
//   }
// }

export function checkLogin() {
  if (usernameInput.value === 'customer50' && userPasswordInput.value === 'overlook2024') {
    console.log('conditiional worked')
    loginPage.classList.add('hidden');
    customerPage.classList.remove('hidden');
  };
}

// export {
//   testPrint,
//   checkLogin,
// }