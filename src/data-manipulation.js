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

import { testRooms } from '../test/test-data.js';
import { fetchCustomer, fetchBookings, fetchRooms, roomsArray, postNewBooking } from './api-calls.js';
import { displayContent, getNewBookingsDisplay, showMonies } from './dom-manipulations.js';

/*
****************************
*>>>>> DATA VARIABLES <<<<<*
****************************
*/

export const allRooms = [];
export let typeList = [];


/*
*************************************
*>>>>> CUSTOMER DATA FUNCTIONS <<<<<*
*************************************
*/

export const currentCustomer = {
  customerID: 0,
  name: '',
  currentBookings: [],
  newBookings: [],
  totalSpent: 0,
};


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
  currentCustomer.currentBookings.forEach((custoBooking) => {
    someData.forEach((room) => {
      if (custoBooking.roomNumber === room.number) {
        custoBooking.roomObjRef = room;
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
    showMonies(calulatedTotal.toFixed(2));
  }
  return calulatedTotal.toFixed(2);
};

/*
***********************************
*>>>>> NEW BOOKING FUNCTIONS <<<<<*
***********************************
*/

export function getRoomsByDate(someData = '') {
  console.log('HERE IN ROOMS BY DATE: ', someData);

  let sortedByDate = someData.reduce((acc, booking) => {
    let dateAndRoomObj = {
      date: booking.date,
      room: booking.roomNumber,
    };
    acc.push(dateAndRoomObj);
    return acc;
  }, []);

  // let sortedByDate = someData.reduce((acc, booking) => {

  //   let brakeDate = booking.date.split('/');
    
  //   let sortedObj = {
  //     year: brakeDate[0],
  //     month: brakeDate[1],
  //     day: brakeDate[2],
  //     room: booking.roomNumber,
  //   };

  //   // console.log('Date as a number: ', sortedObj)
  //   acc.push(sortedObj)
  //   return acc;
  // }, []);

  // console.log('sortedByDate: ', sortedByDate)
  return sortedByDate;
};

export function checkRoomAvailiability(listOfRoomsByDate, aRoomList, aDate) {
  // console.log('IN CHECK AVAILIABLE FUNC: ', listOfRoomsByDate);

  let result = [];
  let anotherResult = [];

  listOfRoomsByDate.forEach((booking) => {
    if (booking.date === aDate) {
      result.push(booking.room);
    };
  });

  // console.log('DIS ONE -->', result);

  aRoomList.forEach((room) => {
    if (result.includes(room.number) === false) {
      anotherResult.push(room);
    };
  });

  // console.log(anotherResult, '<-- DIS ONE 2')

  return anotherResult;
};

/*
***********************************
*>>>>> FILTER ROOMS FUNCTION <<<<<*
***********************************
*/

export function roomTypeFilter(roomTypeChoice) {
  console.log('In room type filter: ', roomsArray)

  typeList = roomsArray.filter((room) => {
    return room.roomType === roomTypeChoice;
  })

  console.log("typeList: ", typeList)
  getNewBookingsDisplay(typeList);
  return typeList
};










/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/