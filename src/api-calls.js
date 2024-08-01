import { customerBookings, bookingBreakdown } from './data-manipulation.js';
import { testPrint, checkLogin, loginBtn, usernameInput, userPasswordInput } from './dom-manipulation.js';


/*
***********************
*>>>>> VARIABLES <<<<<*
***********************
*/

// export let foundCustomer = null;

/*
***********************
*>>>>> API CALLS <<<<<*
***********************
*/

export function callForLogin() {
  const customerId = usernameInput.value.match(/(\d+)/)[0];
  fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => data.customers.find((customer) => {
      // console.log('check these', customer.id == aCustomerNum, customer.id, aCustomerNum)
      if (customer.id == customerId) {
        let foundCustomer = `customer${customer.id}`;
        // console.log('check from if state: ', foundCustomer)
        checkLogin(foundCustomer)
        return customer;
      }
    }))
    .then(foundCustomer => getCustomerData(foundCustomer))
    .catch(error => console.log(error));
};

export function getCustomerData(aCustomerNum) {
  fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => data.customers.find((customer) => {
      // console.log('check these', customer.id == aCustomerNum.id, customer.id, aCustomerNum)
      if (customer.id == aCustomerNum.id) {
        // foundCustomer = `customer${customer.id}`;
        return customer;
      }
    }))
    .then(foundData => getCustomerRecords(foundData))
    .catch(error => console.log(error));
};

export function getCustomerRecords(aCustomer) {
  fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings.filter((booking) => {
      // console.log(booking.userID === aCustomer.id)
      return booking.userID === aCustomer.id
    }))
    .then(bookings => bookings.forEach((booking) => {
      customerBookings.push(booking)
    }))
    // .then(console.log(customerBookings))
    .catch(error => console.log('Check Problem', error));
};

export function roomListWithPrice(aCustomersBookings) {
  fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    .then(data => console.log('room data: ', data))
    // .then(rooms => console.log('de Rooms: ', rooms))
    .catch(error => console.log('Check Problem', error))
};






/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/