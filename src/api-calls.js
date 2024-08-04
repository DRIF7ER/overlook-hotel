import { testPrint, checkPassword, loginBtn, usernameInput, userPasswordInput } from './dom-manipulation.js';

/*
***********************
*>>>>> VARIABLES <<<<<*
***********************
*/

let newRoomSection = document.getElementById('new-bookings-actual');
export let roomsArray = [];
export let bookingsArray = null;

/*
***********************
*>>>>> LISTENERS <<<<<*
***********************
*/

window.addEventListener('DOMContentLoaded', getAllRooms)

/*
****************************
*>>>>> CALL FUNCTIONS <<<<<*
****************************
*/

async function getAllRooms() {
  let fetchRooms = await fetch('http://localhost:3001/api/v1/rooms');
  let begottenRooms = await fetchRooms.json();
  console.log('hit rooms func on load: ', await begottenRooms.rooms[4])
  const randomPic = (max) => {
    return Math.floor(Math.random() * max)
  }
  await begottenRooms.rooms.forEach((room) => {
    roomsArray.push(room);
    newRoomSection.innerHTML += `
    <div class="new-room-card" id="new-room-card-actual" tabindex="0">
      <img class="room-img" src="./images/hotel-pic-${randomPic(25)}.png" tabindex="0">
      <p class="room-number hidden">Room Number: ${room.number}</p>
      <p class="room-type">Room Type: ${room.roomType}</p>
      <p class="bed-size">Bed Size: ${room.bedSize}</p>
      <p class="num-of-beds">Beds: ${room.numBeds}</p>
      <p class="cost">Per Night: $${room.costPerNight}</p>
    </div> 
    `
  });
  // console.log('room OBJ: ', roomsArray[0])
  return roomsArray;
};

export let checkForCustomer = async () => {
  let customerFetch = await fetch('http://localhost:3001/api/v1/customers');
  let customerPromise = await customerFetch.json();
  let customerResult = await customerPromise.customers;
  const customerIdNum = usernameInput.value.match(/(\d+)/)[0];
  // console.log('check 1: ', customerResult)
  let checkId = await customerResult.find((person) => {
    // console.log('find: ', person.id == customerIdNum)
    return person.id == customerIdNum;
  }).id;
  // console.log('check 2: ', checkId)
  let aCustomerPerson = `customer${checkId}`;
  // console.log('check 3: ', aCustomerPerson)

  
  if (usernameInput.value === aCustomerPerson) {
    console.log('check 4: ', checkId, aCustomerPerson)
    return checkPassword(aCustomerPerson);
  };
};

export let specificCustomer = async (person) => {
  let passedId = person.match(/(\d+)/)[0];
  let idFetch = await fetch(`http://localhost:3001/api/v1/customers/${passedId}`);
  let fetchedId = await idFetch.json();
  // console.log('check 1 in specific func: ', passedId)
  return await fetchedId;
};

export let bookings = async () => {
  let custId = usernameInput.value.match(/(\d+)/)[0];
  let fetchBooks = await fetch('http://localhost:3001/api/v1/bookings');
  let booksFetched = await fetchBooks.json();
  let booksArray = await booksFetched.bookings;
  // console.log('check in books func 1: ', booksArray)
  bookingsArray = booksArray.filter((book) => {
    let result = book.userID == custId;
    return result;
  });
  // console.log('check in books func 2: ', bookingsArray)
  return bookingsArray;
};






/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/