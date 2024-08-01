import { getCustomerData, getCustomerRecords } from './api-calls.js';

export let customerBookings = [];

export function bookingBreakdown() {
  // console.log('check this: ', customerBookings)
  let bookListByRoomNum = [];
  customerBookings.forEach((book) => {
    if (!bookListByRoomNum.includes(book.roomNumber)) {
      bookListByRoomNum.push(book.roomNumber)
    };
  })
  console.log('from book break: ', bookListByRoomNum)
  return bookListByRoomNum;
};

let testBtn = document.querySelector('.for-test');
testBtn.addEventListener('click', bookingBreakdown)