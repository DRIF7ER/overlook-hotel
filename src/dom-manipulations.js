import { fetchCustomer, roomsArray } from "./api-calls.js";
import { currentCustomer } from "./data-manipulation.js";

/*
***********************
*>>>>> VARIABLES <<<<<*
***********************
*/

let siteBody = document.getElementById("body-actual");

let usernameInput = document.getElementById("username");
let userPasswordInput = document.getElementById("password");
let loginBtn = document.getElementById("login-button-actual");

let loginPage = document.getElementById("login-page-id");
let customerDashboard = document.getElementById("customer-page-id");

let userPageBanner = document.querySelector(".customer-name-banner");
let customerBookingsDisplay = document.getElementById("bookings-display");
let moniesBar = document.getElementById("money-bar");
let hotelRoomsDisplay = document.getElementById('new-bookings-actual');

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
// cardDeetsBtn.addEventListener('click', displayBookDetails);

/*
***********************
*>>>>> FUNCTIONS <<<<<*
***********************
*/

async function callForLogin() {
  // console.log('callLogin func: ', usernameInput.value, userPasswordInput.value)

  let userInputName = usernameInput.value.match(/(\d+)/)[0];
  let userInputPassword = userPasswordInput.value;

  let actualCustomer = await fetchCustomer(userInputName);

  // console.log('actualCustomer in callLogin func: ', actualCustomer)

  if (actualCustomer === true && userInputPassword === 'overlook2024') {
    // console.log('log > cust success')
    loginPage.classList.add('hidden');
    customerDashboard.classList.remove('hidden');
    siteBody.classList.remove('before-customer-page')
  };
};

export async function displayContent(fromCurrentCustomer) {
  customerBookingsDisplay.innerHTML = null;

  // console.log('from display: ', await fromCurrentCustomer)

  userPageBanner.textContent = `Welcome To Overlook ${currentCustomer.name}`;

  await fromCurrentCustomer.currentBookings.forEach((booking) => {
    // console.log('HERE: ', booking.roomObjRef.costPerNight)

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
    // console.log('HERE: ', anEvent)
    if (anEvent.target.parentElement === card.parentElement) {
      console.log('in if for display')
      card.classList.remove('hidden')
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
        <img class="room-img" src="./images/hotel-pic-${imgPicked}.png" tabindex="0">
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
  // console.log('CHECK WHAT I HAVE: ', roomsArray, currentCustomer.currentBookings, customerRooms);

  customerRooms.forEach((room) => {
    // console.log('De Room: ', room.children[0].children[0])
    // console.log('De Room #: ', room.children[0].children[2].innerText.match(/(\d+)/)[0])
    currentCustomer.currentBookings.forEach((booking) => {
      // console.log('CHECK CONDITIONAL: ', booking.roomNumber == room.children[0].children[2].innerText.match(/(\d+)/)[0], booking.roomNumber, room.children[0].children[2].innerText.match(/(\d+)/)[0])
      if (booking.roomNumber == room.children[0].children[2].innerText.match(/(\d+)/)[0]) {
        // console.log('hit innerHTML')
        room.children[0].children[0].innerHTML = `<img class="room-img" src="./images/hotel-pic-${booking.roomObjRef.roomImg}.png" tabindex="0">`
      };
    });
  });
};

export function showMonies(someData) {
  // console.log('money func: ', someData, moniesBar.children[2])
  moniesBar.children[0].innerText = `Total Cost Of All Current Bookings: $${someData}`
};












/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/