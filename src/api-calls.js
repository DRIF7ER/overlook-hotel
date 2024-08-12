import { currentCustomer, getBookings, getBookingsAfterPost, getCustomer, getRoomReference, getRoomsByDate } from "./data-manipulation.js";
import { dateInput } from "./dom-manipulations.js";
// TO RUN TESTS; DISABLE THE DOM MANIPULATIONS IMPORT.^^^^^^^


export let roomsArray = [];

export async function fetchCustomer(num) {

  const fetchCustomers = await fetch("http://localhost:3001/api/v1/customers");
  const gotCustomers = await fetchCustomers.json();
  
  let verifiedCustomer = null;

  let customerCheck = gotCustomers.customers.find((customer) => {
    return customer.id == num;
  });
  
  if (customerCheck === undefined) {
    console.log('Customer doesn\'t exist!!');
    return verifiedCustomer = false;
  } else if (customerCheck !== undefined) {
    getCustomer(customerCheck);
    verifiedCustomer = true;
  };

  return verifiedCustomer;
};

export async function fetchBookings() {
  let parsedCustomerBookings = []

  const fetchBooks = await fetch("http://localhost:3001/api/v1/bookings");
  const booksFetched = await fetchBooks.json();

  booksFetched.bookings.forEach((booking) => {
    if (booking.userID === currentCustomer.customerID) {
      parsedCustomerBookings.push(booking);
    };
  });

  getBookings(parsedCustomerBookings);
};

export async function fetchBookingsForDateSearch() {
  const fetchBooks = await fetch("http://localhost:3001/api/v1/bookings");
  const booksFetched = await fetchBooks.json();

  getRoomsByDate(booksFetched.bookings)
};

export async function fetchRooms() {
  const fetchRooms = await fetch("http://localhost:3001/api/v1/rooms");
  const roomsFetched = await fetchRooms.json();

  roomsFetched.rooms.forEach((room) => {
    roomsArray.push(room);
  });

  getRoomReference(roomsFetched.rooms);
};

export async function postNewBooking(anID, aDateString, aRoomNum) {
  
  anID = currentCustomer.customerID;
  aDateString = dateInput.value;
  aRoomNum = +event.target.parentElement.children[1].innerText.match(/(\d+)/)[0];

  if (anID === '') {
    alert("You need a valid ID!");
    console.log('Need ID');

  } else if (aDateString === '') {
    alert("A booking date is needed!");
    console.log('Need a Date');

  } else if (aRoomNum === '') {
    alert("Something went wrong! Please try again later!");
    console.log('Need a Room Number');

  } else {

    const fetchToPost = await fetch("http://localhost:3001/api/v1/bookings",{
      method: 'POST',
      body: JSON.stringify(
        { "userID": anID, "date": aDateString, "roomNumber": aRoomNum }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const postToFetch = await fetchToPost.json();

    fetchNewCustomerData();
  };
};

async function fetchNewCustomerData() {

  let newParsedCustomerBookings = []

  const fetchBooks = await fetch("http://localhost:3001/api/v1/bookings");
  const booksFetched = await fetchBooks.json();

  booksFetched.bookings.forEach((booking) => {
    if (booking.userID === currentCustomer.customerID) {
      newParsedCustomerBookings.push(booking);
    };
  });

  getBookingsAfterPost(newParsedCustomerBookings);
};

/*
***************************
*>>>>> ERROR HANDLER <<<<<*
***************************
*/

async function errorHandlerForPOST() {
  fetchCustomer
};