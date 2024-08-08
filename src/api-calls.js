import { currentCustomer, getBookings, getCustomer, getRoomReference, getRoomsByDate } from "./data-manipulation.js";
import { dateInput } from "./dom-manipulations.js";

export let roomsArray = [];

export async function fetchCustomer(num) {
  const fetchCustomers = await fetch("http://localhost:3001/api/v1/customers");
  const gotCustomers = await fetchCustomers.json();

  // console.log('customers from API', gotCustomers.customers)

  let verifiedCustomer = null;

  let customerCheck = gotCustomers.customers.find((customer) => {
    return customer.id == num;
  });
  // console.log('customer in fetchCustomer: ', customerCheck !== undefined)
  
  if (customerCheck === undefined) {
    console.log('Customer doesn\'t exist!!');
  } else if (customerCheck !== undefined) {
    // console.log('hit not undefined')
    getCustomer(customerCheck);
    verifiedCustomer = true;
  };
  // console.log(verifiedCustomer)
  return verifiedCustomer;
};

export async function fetchBookings(someData) {
  let parsedCustomerBookings = []

  const fetchBooks = await fetch("http://localhost:3001/api/v1/bookings");
  const booksFetched = await fetchBooks.json();

  // console.log('Books from API: ', booksFetched)

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

  // console.log(roomsFetched.rooms);

  roomsFetched.rooms.forEach((room) => {
    roomsArray.push(room);
  });

  getRoomReference(roomsFetched.rooms);
};

export async function postNewBooking(anID, aDateString, aRoomNum) {
  console.log('triggered POST: ')
  anID = currentCustomer.customerID;
  aDateString = dateInput.value;
  aRoomNum = +event.target.parentElement.children[1].innerText.match(/(\d+)/)[0];

  console.log(typeof +event.target.parentElement.children[1].innerText.match(/(\d+)/)[0])

  if (anID === '') {
    console.log('Need ID')
  } else if (aDateString === '') {
    console.log('Need a Date')
  } else if (aRoomNum === '') {
    console.log('Need a Room Number')
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
    const postToFetch = await fetchToPost.json()
  };

  // console.log(postToFetch)
};

// postNewBooking();