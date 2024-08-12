import { fetchBookingsForDateSearch, fetchCustomer, postNewBooking, roomsArray } from "./api-calls.js";
import { currentCustomer, roomTypeFilter, typeList } from "./data-manipulation.js";

/*
***********************
*>>>>> VARIABLES <<<<<*
***********************
*/

// if (typeof document !== "undefined") {}

let siteBody = document.getElementById("body-actual");

let usernameInput = document.getElementById("username");
let userPasswordInput = document.getElementById("password");
let loginBtn = document.getElementById("login-button-actual");

let loginPage = document.getElementById("login-page-wrap-id");
let customerDashboard = document.getElementById("customer-page-id");

let userPageBanner = document.querySelector(".customer-name-banner");
let customerBookingsDisplay = document.getElementById("bookings-display");
let moniesBar = document.getElementById("money-bar");
let hotelRoomsDisplay = document.getElementById("new-bookings-actual");

export let roomTypeChoice = document.getElementById('room-types');
export let dateInput = document.getElementById('date-input');

let newBookingsDisplay = document.getElementById("room-choice-results");
let roomTypeBtn = document.getElementById("room-type-button-actual");

/*
*****************************
*>>>>> EVENT LISTENERS <<<<<*
*****************************
*/

loginBtn.addEventListener('click', callForLogin);
loginBtn.addEventListener('click', () => {
  setTimeout(() => {
    addListenerForDetails();
  }, 250);
});
roomTypeBtn.addEventListener('click', event => {
  fetchBookingsForDateSearch();
});

/*
***********************
*>>>>> FUNCTIONS <<<<<*
***********************
*/

async function callForLogin() {

  let userInputName = usernameInput.value.match(/(\d+)/)[0];
  let userInputPassword = userPasswordInput.value;

  let actualCustomer = await fetchCustomer(userInputName);

  if (actualCustomer === true && userInputPassword === 'overlook2024') {
    loginPage.classList.add('hidden');
    customerDashboard.classList.remove('hidden');
    siteBody.classList.remove('before-customer-page')
  } else if (actualCustomer === false && userInputPassword === 'overlook2024') {
    alert('Please enter a valid username and password!');
  } else if (actualCustomer === true && userInputPassword !== 'overlook2024') {
    alert('Please enter a valid username and password!');
  } else if (actualCustomer === false && userInputPassword !== 'overlook2024') {
    alert('Your credentials are incorrect!');
  };
};

export async function displayContent(fromCurrentCustomer) {
  customerBookingsDisplay.innerHTML = null;

  userPageBanner.textContent = `Welcome To Overlook ${currentCustomer.name}`;

  await fromCurrentCustomer.currentBookings.forEach((booking) => {

    customerBookingsDisplay.innerHTML += `
      <div class="booking-card">
        <div class="date-and-room-wrap">
          <div class="room-img-cont"></div>
          <p class="date">Booked for: ${booking.date}</p>
          <p class="room">Room Number: ${booking.roomNumber}</p>
        </div>
        <div class="card-details hidden">
          <p class="cost-of-room">Price: $${booking.roomObjRef.costPerNight} per night</p>
        </div>
        <button type="button" class="book-card-detals" id="card-button-actual">View Booking Details</button>
      </div>`;
  });

  displayRooms();
};

export function addListenerForDetails() {
  console.log('in add listener func')
  let cardDeetsBtns = document.querySelectorAll('#card-button-actual');

  cardDeetsBtns.forEach((btn) => {
    btn.addEventListener('click', displayCardDeets)
  });
};

export function displayCardDeets(anEvent) {
  let cardDeets = document.querySelectorAll('.card-details');
  cardDeets.forEach((card) => {
    if (anEvent.target.parentElement === card.parentElement && card.classList.contains('hidden')) {
      card.classList.remove('hidden');
    } else if (anEvent.target.parentElement === card.parentElement && !card.classList.contains('hidden')) {
      card.classList.add('hidden');
    };
  })
};

function displayRooms() {

  const randomPic = (max) => {
    return Math.floor(Math.random() * max)
  }

  roomsArray.forEach((room) => {
    let imgPicked = randomPic(25);
    hotelRoomsDisplay.innerHTML += `
      <div class="new-room-card" id="new-room-card-actual" tabindex="0">
        <img class="room-img" src="./images/hotel-pic-${imgPicked}.png" alt="Room image for room number ${room.number}" tabindex="0">
        <p class="room-number hidden">Room Number: ${room.number}</p>
        <p class="room-type">Room Type: ${room.roomType}</p>
        <p class="bed-size">Bed Size: ${room.bedSize}</p>
        <p class="num-of-beds">Beds: ${room.numBeds}</p>
        <p class="cost">Per Night: $${room.costPerNight}</p>
      </div>`;
    room.roomImg = imgPicked;
  });

  bookedRoomsImgs();
};

export function bookedRoomsImgs() {
  let customerRooms = document.querySelectorAll(".booking-card");

  customerRooms.forEach((room) => {
    currentCustomer.currentBookings.forEach((booking) => {
      if (booking.roomNumber == room.children[0].children[2].innerText.match(/(\d+)/)[0]) {
        room.children[0].children[0].innerHTML = `<img class="room-img" src="./images/hotel-pic-${booking.roomObjRef.roomImg}.png" alt="Room image for room number ${booking.roomObjRef.number}" tabindex="0">`
      };
    });
  });
};

export function showMonies(someData) {
  moniesBar.children[0].innerText = `Total Cost Of All Current Bookings: $${someData}`
};

export function getNewBookingsDisplay(aList) {

  newBookingsDisplay.innerHTML = '';

  aList.forEach((room) => {
    let roomObj = {
      sizeOfBed: room.bedSize,
      hasBidet: room.bidet,
      pricePerNight: room.costPerNight,
      bedNum: room.numBeds,
      rmNum: room.number,
      imgForRoom: room.roomImg,
      typeOfRoom: room.roomType,
    };

    newBookingsDisplay.innerHTML += `
    <div class="book-this-room-card" id="book-this-room-actual" tabindex="0">
        <img class="room-img" src="./images/hotel-pic-${roomObj.imgForRoom}.png" alt="Room image for room number ${roomObj.rmNum}" tabindex="0">
        <p class="room-number hidden">Room Number: ${roomObj.rmNum}</p>
        <p class="room-type">Room Type: ${roomObj.typeOfRoom}</p>
        <p class="bed-size">Bed Size: ${roomObj.sizeOfBed}</p>
        <p class="num-of-beds">Beds: ${roomObj.bedNum}</p>
        <p class="cost">Per Night: $${roomObj.pricePerNight}</p>
        <button class="book-this-room-button" id="book-this-button">Book This Room</button>
    </div>`;
  });

  assignBookListeners();
};

function assignBookListeners() {
  let bookBtns = document.querySelectorAll('#book-this-button');

  bookBtns.forEach((button) => {
    button.addEventListener('click', postNewBooking)
  });
};

export async function addNewBookingToDOM(fromCurrentCustomer) {
  customerBookingsDisplay.innerHTML = null;

  userPageBanner.textContent = `Welcome To Overlook ${currentCustomer.name}`;

  await fromCurrentCustomer.currentBookings.forEach((booking) => {

    customerBookingsDisplay.innerHTML += `
      <div class="booking-card">
        <div class="date-and-room-wrap">
          <div class="room-img-cont">
            <img class="room-img" src="./images/hotel-pic-${booking.roomObjRef.roomImg}.png" alt="Room image for room number ${booking.roomNumber}" tabindex="0">
          </div>
          <p class="date">Booked for: ${booking.date}</p>
          <p class="room">Room Number: ${booking.roomNumber}</p>
        </div>
        <div class="card-details hidden">
          <p class="cost-of-room">Price: $${booking.roomObjRef.costPerNight} per night</p>
        </div>
        <button type="button" class="book-card-detals" id="card-button-actual">View Booking Details</button>
      </div>`;
  });
};