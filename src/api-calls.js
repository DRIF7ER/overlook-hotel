import { currentCustomer, getBookings, getCustomer, getRoomReference } from "./data-manipulation.js";

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

  
  // let customerExists = gotCustomers.customers.find((customer) => {
  //   console.log('conditional in fetchCustomer: ', customer.id == num, num, customer.id)
  //   customer.id === num;
  //   if (customer.id === num) {
  //     getCustomer(customer);
  //     return true;
  //   } else if (!customer.id === num) {
  //     return console.log('That user doesn\'t exist!');
  //   };
  // });

  // function checkCustomers(custNum) {
  //   console.log(custNum.id == num, custNum.id, num)
  //   return custNum.id == num;
  // };

  // let customerExists = gotCustomers.customers.find(checkCustomers);

  // let customerExists = gotCustomers.customers.reduce((acc, customer) => {
  //   // console.log('HERE: ', customer.id == num, customer.id, num)
  //   if (customer.id == num) {
  //     getCustomer(customer);
  //     acc = customer;
  //   };
  //   return acc;
  // }, {});

  // console.log('find in fetch customer func: ', customerExists.id === undefined)

  // let checkedCustomer = () => {
  //   if (customerExists.id === undefined) {
  //     console.log('Customer doesn\'t exist!!!')
  //   } else if (!customerExists.id === undefined) {
  //     return true;
  //   }
  // };
}

// fetchCustomer(27);

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

export async function fetchRooms() {
  const fetchRooms = await fetch("http://localhost:3001/api/v1/rooms");
  const roomsFetched = await fetchRooms.json();

  // console.log(roomsFetched.rooms);

  roomsFetched.rooms.forEach((room) => {
    roomsArray.push(room);
  });

  getRoomReference(roomsFetched.rooms);
};