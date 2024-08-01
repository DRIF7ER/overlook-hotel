import './scripts.js';
import { getCustomerData, getCustomerRecords, callForLogin, foundCustomer } from './api-calls.js';
import { customerBookings, bookingBreakdown } from './data-manipulation.js';


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

export const myBooksDisplay = document.getElementById('bookings-display');
export const showMyBooksBtn = document.getElementById('show-my-books-button-actual');

/*
*****************************
*>>>>> EVENT LISTENERS <<<<<*
*****************************
*/

loginBtn.addEventListener('click', callForLogin);
showMyBooksBtn.addEventListener('click', displayBookings);

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

export async function checkLogin(aCustomerPerson) {
  // const customerId = usernameInput.value.match(/(\d+)/)[0];
  console.log('Check This login func in dom: ', aCustomerPerson)
  if (usernameInput.value === aCustomerPerson && userPasswordInput.value === 'overlook2024') {
    // console.log('conditiional worked', usernameInput.value.match(/(\d+)/))
    loginPage.classList.add('hidden');
    customerPage.classList.remove('hidden');
    // getCustomerData(customerId)
  };
}

//vvvvvvvvvvvvvvv PAGE CONTENT vvvvvvvvvvvvvvv//

export function displayBookings() {
  console.log('display func triggered')
  showMyBooksBtn.classList.add('hidden');
  myBooksDisplay.innerHTML = null;

  customerBookings.forEach((booking) => {myBooksDisplay.innerHTML += `
    <div class="booking-card">
      <p class="date">${booking.date}</p>
      <p class="room">${booking.roomNumber}</p>
      <button type="button" class="book-card-detals" id="card-button">View Booking Details</button>
    </div>
        `})
};

// window.addEventListener('loadend', displayBookings);

// export {
//   testPrint,
//   checkLogin,
// }