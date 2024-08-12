// import { testRooms, testCustomers, testBookings, testBookings2,  } from '../test/test-data.js';
import { fetchCustomer, fetchBookings, fetchRooms, roomsArray, postNewBooking, fetchBookingsForDateSearch } from './api-calls.js';
import { displayContent, getNewBookingsDisplay, showMonies, roomTypeChoice, dateInput, addNewBookingToDOM } from './dom-manipulations.js';
// *** TO RUN TESTS; DISABLE THE DOM MANIPULATIONS IMPORT.^^^^^^^^^^^^^ ***

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

  // console.log(someData, "<-- CHECK THIS!")

  if (someData === '') {
    // console.log('in sad path conditional')
    return "This user has not used Overlook services before!"
  };

  currentCustomer.customerID = someData.id;
  currentCustomer.name = someData.name;

  fetchBookings(someData);

  return currentCustomer;
};

export function getBookings(someData = '') {

  if (someData === '') {
    return "This user has no bookings!"
  };

  currentCustomer.currentBookings = []

  someData.forEach((booking) => {
    currentCustomer.currentBookings.push(booking);
  });

  fetchRooms();

  return currentCustomer;
};

export function getRoomReference(someData = '') {

  currentCustomer.currentBookings.forEach((custoBooking) => {
    
    someData.forEach((room) => {

      if (custoBooking.roomNumber === room.number) {
        custoBooking.roomObjRef = room;
      };
    });
  });

  if (someData !== 'testRooms.rooms') {
    getTotalMoneySpent(currentCustomer);
  };

  return currentCustomer;
};

export function getTotalMoneySpent(someData) {

  let calulatedTotal = 0;

  someData.currentBookings.forEach((booking) => {
    calulatedTotal += booking.roomObjRef.costPerNight; 
  });

  if (currentCustomer.currentBookings.length > 6) {
    displayContent(currentCustomer)
    showMonies(calulatedTotal.toFixed(2));
  };

  return calulatedTotal.toFixed(2);
};

/*
***********************************
*>>>>> NEW BOOKING FUNCTIONS <<<<<*
***********************************
*/

export function getRoomsByDate(someData = '') {

  let sortedByDate = someData.reduce((acc, booking) => {

    let dateAndRoomObj = {
      date: booking.date,
      room: booking.roomNumber,
    };

    acc.push(dateAndRoomObj);

    return acc;
  }, []);
  
  if (typeof document !== 'undefined') {
    checkRoomAvailiability(sortedByDate, roomsArray, dateInput.value);
  };

  return sortedByDate;
};

export function checkRoomAvailiability(listOfRoomsByDate, aRoomList, aDate) {

  let result = [];
  let anotherResult = [];

  listOfRoomsByDate.forEach((booking) => {
    if (booking.date === aDate) {
      result.push(booking.room);
    };
  });

  aRoomList.forEach((room) => {
    if (result.includes(room.number) === false) {
      anotherResult.push(room);
    };
  });
  
  if (typeof document !== 'undefined') {
    // dateInput.value = '';
    // getNewBookingsDisplay(anotherResult);
    roomTypeFilter(anotherResult, roomTypeChoice.value)
  };

  return anotherResult;
};

/*
***********************************
*>>>>> FILTER ROOMS FUNCTION <<<<<*
***********************************
*/

export function roomTypeFilter(aRoomsList = '', aTypeString = '') {

  // *** This code is for the test file but is the heart of the function in
  // both instances within roomTypeFilter. ***
  typeList = aRoomsList.filter((room) => {
    return room.roomType === aTypeString;
  });

  // *** vvThis if block is for using the API and DOM data. ***
  if (typeof document !== 'undefined') {

    // console.log(dateInput.value !== '', 
    //   aTypeString  === 'Please Select A Room Type',
    //   '<-- HERE FOR 1ST CONDITIONAL'
    // )

    if (dateInput.value !== '' && aTypeString === 'Please Select A Room Type') {
      console.log('IN 1ST IF STATE') 
      getNewBookingsDisplay(aRoomsList);
    } else if (dateInput.value !== '' && aTypeString !== 'Please Select A Room Type') {

      // console.log(dateInput.value !== '', 
      //   aTypeString !== 'Please Select A Room Type',
      //   '<-- HERE FOR 2ND CONDITIONAL')

      typeList = aRoomsList.filter((room) => {
        return room.roomType === aTypeString;
      });

      // console.log(typeList, '<--HERE FOR 1ST TYPE LIST')

      getNewBookingsDisplay(typeList);
    } else if (dateInput.value === '' && aTypeString !== 'Please Select A Room Type...') {

      // console.log(dateInput.value === '', 
      //   aTypeString !== 'Please Select A Room Type...',
      //   '<-- HERE FOR 3RD CONDITIONAL')

      typeList = aRoomsList.filter((room) => {
        return room.roomType === aTypeString;
      });

      // console.log(typeList, '<--HERE FOR 2ND TYPE LIST')

      getNewBookingsDisplay(typeList);
    };
    // getNewBookingsDisplay(typeList);
  };

  return typeList; // *** This return is for the test file. ***
};

// export function roomTypeFilter(aRoomsList = '', aTypeString = '') {

//   // *** This code is for the test file but is the heart of the function in
//   // both instances within roomTypeFilter. ***
//   typeList = aRoomsList.filter((room) => {
//     return room.roomType === aTypeString;
//   });

//   // *** vvThis if block is for using the API and DOM data. ***
//   if (typeof document !== 'undefined') {
//     if (dateInput.value !== '') {
//       fetchBookingsForDateSearch();
//     };

//     typeList = roomsArray.filter((room) => {
//       return room.roomType === roomTypeChoice.value
//     })

//     getNewBookingsDisplay(typeList);
//   };

//   return typeList; // *** This return is for the test file. ***
// };

/*
*******************************************
*>>>>> FUNCTIONS FOR AFTER A POSTING <<<<<*
*******************************************
*/

export function getBookingsAfterPost(newData) {

  currentCustomer.currentBookings = []

  newData.forEach((booking) => {
    currentCustomer.currentBookings.push(booking);
  });

  getRoomRefAfterPost(currentCustomer);
  return currentCustomer;
};

function getRoomRefAfterPost(fromCurrentCustomer) {
  fromCurrentCustomer.currentBookings.forEach((custoBooking) => {
    
    roomsArray.forEach((room) => {
      if (custoBooking.roomNumber === room.number) {
        custoBooking.roomObjRef = room;
      };
    });
  });

  if (typeof document !== "undefined") {
    updateCostAfterPost(currentCustomer);
    addNewBookingToDOM(currentCustomer);
  };

  return currentCustomer;
};

function updateCostAfterPost(fromCurrentCustomer) {
  let calulatedTotal = 0;

  fromCurrentCustomer.currentBookings.forEach((booking) => {
    calulatedTotal += booking.roomObjRef.costPerNight; 
  });

  if (typeof document !== "undefined") {
    showMonies(calulatedTotal.toFixed(2));
  }; 
  return calulatedTotal.toFixed(2);
};










/*
*********************
*>>>>> NAME ME <<<<<*
*********************
*/