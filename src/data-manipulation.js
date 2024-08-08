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
import { fetchCustomer, fetchBookings, fetchRooms, roomsArray, postNewBooking, fetchBookingsForDateSearch } from './api-calls.js';
import { displayContent, getNewBookingsDisplay, showMonies, roomTypeChoice, dateInput } from './dom-manipulations.js';

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
  // console.log('HERE IN ROOMS BY DATE: ', someData);

  let sortedByDate = someData.reduce((acc, booking) => {
    let dateAndRoomObj = {
      date: booking.date,
      room: booking.roomNumber,
    };
    acc.push(dateAndRoomObj);
    return acc;
  }, []);

  // console.log('AFTER REDUCE IN ROOMS BY DATE: ', someData[0].date);
  
  if (someData[0].date !== "2022/01/15") {
    checkRoomAvailiability(sortedByDate, roomsArray, dateInput.value = '');
  };
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
  // console.log(result !== [ 1, 3, 5, 7, 9 ], '<-- DIS ONE 2')

  
  if (listOfRoomsByDate[0].date !== '2022/01/15') {
    dateInput.value = '';
    getNewBookingsDisplay(anotherResult);
  };
  return anotherResult;
};

/*
***********************************
*>>>>> FILTER ROOMS FUNCTION <<<<<*
***********************************
*/

export function roomTypeFilter(aRoomsList = '', aTypeString = '') {
  console.log('In room type filter: ', aRoomsList, aTypeString)

  if (aRoomsList.length !== 10) {
    if (dateInput.value !== '') {
      console.log('should be true: ', dateInput.value !== '')
      fetchBookingsForDateSearch();
    };
  };

  if (aRoomsList.length === 10) {
    console.log('test hit');
    typeList = aRoomsList.filter((room) => {
      console.log('In Filter for filter: ', aTypeString)
      return room.roomType === aTypeString;
    });
    return typeList;
  };

  typeList = roomsArray.filter((room) => {
    console.log('In Filter for filter: ', roomTypeChoice.value)
    return room.roomType === roomTypeChoice.value;
  })

  console.log("typeList: ", typeList)
  if (aRoomsList.length !== 10) {
    getNewBookingsDisplay(typeList);
  };
  return typeList
};










/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/