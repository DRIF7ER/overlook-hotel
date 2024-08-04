import './scripts.js';
import { getCustomerData, getCustomerRecords, checkForCustomer, foundCustomer, roomList, hotelRooms, specificCustomer, roomsArray, bookingsArray, bookings } from './api-calls.js';


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

loginBtn.addEventListener('click', logInHandler);

showMyBooksBtn.addEventListener('click', displayBookings);

myBooksDisplay.addEventListener('click', event => {
  let allDeetsBtn = document.querySelectorAll('#card-button-actual');
  let deetsBtn = allDeetsBtn.values().find((button) => {
    return button === event.target;
  })
  if (event.target === deetsBtn) {
    displayBookDetails();
  }
});

/*
**********************
*>>>>> HANDLERS <<<<<*
**********************
*/

function logInHandler() {
  checkForCustomer();
  bookings();
  setTimeout(() => {
    displayBookings();
  }, 500);
  setTimeout(() => {
    bookingsImages();
  }, 750);
}

/*
***********************
*>>>>> FUNCTIONS <<<<<*
***********************
*/
//vvvvvvvvvvvvvvv PAGE CHANGES vvvvvvvvvvvvvvv//

export async function checkPassword(aCustomerPerson) {
  if (usernameInput.value === aCustomerPerson && userPasswordInput.value === 'overlook2024') {
    loginPage.classList.add('hidden');
    customerPage.classList.remove('hidden');
  };

  let customerObj = await specificCustomer(aCustomerPerson) 

  let customerNameBanner = document.querySelector('.customer-name-banner')

  customerNameBanner.textContent = `Welcome To Overlook ${customerObj.name}`;
}

//vvvvvvvvvvvvvvv PAGE CONTENT vvvvvvvvvvvvvvv//

export function displayBookings() {
  let customerId = usernameInput.value.match(/(\d+)/)[0];

  showMyBooksBtn.classList.add('hidden');
  let customerBookings = bookingsArray;
  myBooksDisplay.innerHTML = null;
  
  customerBookings.forEach((booking) => {
    let roomPrice = {};
    roomsArray.find((room) => {
      if (room.number === booking.roomNumber) {
        return roomPrice = room;
      };
    });
  
  myBooksDisplay.innerHTML += `
  <div class="booking-card">
    <div class="date-and-room-wrap">
      <div class="room-img-cont"></div>
      <p class="date">Booked for: ${booking.date}</p>
      <p class="room">Room Number: ${booking.roomNumber}</p>
    </div>
    <div class="card-details hidden">
      <p class="cost-of-room">Price: $${roomPrice.costPerNight} per night</p>
    </div>
    <button type="button" class="book-card-detals" id="card-button-actual">View Booking Details</button>
  </div>
  `});
};

function bookingsImages() {
  let bookingsImgElements = document.querySelectorAll('.booking-card');
  let roomImgElements = document.querySelectorAll('.new-room-card');

  let bookingImgObjs = [];
  let roomImgObjs = [];

  bookingsImgElements.forEach((book) => {
    console.log('in book img obj forEach');
    let bookObj = {
      roomNum: [book][0].children[0].children[2].innerText,
      actualImg: [book][0].children[0].children[0],
    };
    bookingImgObjs.push(bookObj);
  });

  roomImgElements.forEach((room) => {
    console.log('in room img obj forEach');
    let roomObj = {
      roomNum: [room][0].children[1].innerText,
      actualImg: [room][0].children[0],
    };
    roomImgObjs.push(roomObj);
  });

  console.log(bookingImgObjs, roomImgObjs)

  bookingImgObjs.forEach((bookObj) => {
    roomImgObjs.forEach((roomObj) => {
      if (bookObj.roomNum === roomObj.roomNum) {
        bookObj.actualImg.innerHTML = `<img class="room-img" src="${roomObj.actualImg.src}" tabindex="0">`;
      };
    });
  });
};

export function displayBookDetails() {
  let cardDeets = document.querySelectorAll('.card-details');
  cardDeets.forEach((card) => {
    if (event.target.parentElement === card.parentElement) {
      console.log('in if state disp books')
      card.classList.remove('hidden');
    };
  });
};