/**
 * Need to figure out what my customer object is going to look like.
 * 
 * first one might be this:
 * 
 * const currentCustomer = {
 *  currentBookings: [
 *    {book1}, 
 *    {book2}, 
 *    {book3},
 *    {
 *      id": "5fwrgu4i7k55hl6sz",
 *      "userID": 9,
 *      "date": "2022/04/22",
 *      "roomNumber": 1
 *      roomObjRef: {
 *        "number": 1,
 *        "roomType": "residential suite",
 *        "bidet": true,
 *        "bedSize": "queen",
 *        "numBeds": 1,
 *        "costPerNight": 358.4
 *        }
 *    }
 *  ],
 *  newBookings: [
 *    {newBook1}
 *  ],
 *  totalSpent: 0,
 * };
 */

import { fetchCustomer, fetchBookings, fetchRooms } from './api-calls.js';
import { displayContent, showMonies } from './dom-manipulations.js';

export const currentCustomer = {
  customerID: 0,
  name: '',
  currentBookings: [],
  newBookings: [],
  totalSpent: 0,
};

export const allRooms = []

export function getCustomer(someData = '') {
  // console.log('someData in customer: ', someData)
  currentCustomer.customerID = someData.id;
  currentCustomer.name = someData.name;
  fetchBookings(someData);
  return currentCustomer;
};

export function getBookings(someData = '') {
  // console.log('someData in Bookings: ', someData)
  currentCustomer.currentBookings = []
  someData.forEach((booking) => {
    currentCustomer.currentBookings.push(booking);
  });
  fetchRooms();
  return currentCustomer;
};

export function getRoomReference(someData = '') {
  // console.log('someData in roomRef: ', someData)
  currentCustomer.currentBookings.forEach((booking) => {
    someData.forEach((room) => {
      if (booking.roomNumber === room.number) {
        booking.roomObjRef = room;
      };
    })
  });
  // console.log('HERE: ', someData !== 'testRooms.rooms')
  if (someData !== 'testRooms.rooms') {
    getTotalMoneySpent(currentCustomer);
  };
  return currentCustomer;
};

export function getTotalMoneySpent(someData) {
  // console.log('someData in getMoneySpent: ', someData)
  let calulatedTotal = 0;
  someData.currentBookings.forEach((booking) => {
    calulatedTotal += booking.roomObjRef.costPerNight; 
  });
  // console.log(currentCustomer.currentBookings.length > 5)
  if (currentCustomer.currentBookings.length > 5) {
    displayContent(currentCustomer)
  }
  showMonies(calulatedTotal.toFixed(2));
  return calulatedTotal.toFixed(2);
};