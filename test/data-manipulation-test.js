import chai from "chai";
const expect = chai.expect;

import { currentCustomer, getBookings, getCustomer, getRoomReference, getTotalMoneySpent } from "../src/data-manipulation.js";
import { testRooms, testBookings, testCustomers } from "./test-data.js";

describe("build a customer block", function() {
  it("should be a function", function() {
    expect(getCustomer).to.be.a('function')
  });

  it("should produce an ID and a name.", function() {
    const testNameAndID = getCustomer(testCustomers.customers[2]);

    expect(testNameAndID.customerID).to.equal(3);
    expect(testNameAndID.name).to.equal("Kelvin Schiller");
  });

  it("should have the correct bookings with the room cost", function() {
    const testNameAndID = getCustomer(testCustomers.customers[3]);
    const testCustomerBookings = []
    
    testBookings.bookings.forEach((booking) => {
      if (booking.userID === currentCustomer.customerID) {
        testCustomerBookings.push(booking);
      };
      return testCustomerBookings;
    });

    const testCustomerObjBookings = getBookings(testCustomerBookings);


    expect(testNameAndID.customerID).to.equal(4);
    expect(testNameAndID.name).to.equal("Kennedi Emard");
    expect(testCustomerObjBookings.currentBookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 4,
        "date": "2022/01/15",
        "roomNumber": 7
      },
      {
        "id": "5fwrgu4i7k55hl6tc",
        "userID": 4,
        "date": "2022/02/25",
        "roomNumber": 7
      },
      {
        "id": "5fwrgu4i7k55hl6th",
        "userID": 4,
        "date": "2022/03/20",
        "roomNumber": 7
      },
      {
        "id": "5fwrgu4i7k55hl6tm",
        "userID": 4,
        "date": "2022/04/17",
        "roomNumber": 7
      },
      {
        "id": "5fwrgu4i7k55hl6tr",
        "userID": 4,
        "date": "2022/05/05",
        "roomNumber": 7
      }
    ]);
  });

  it("should place a room obj for reference in each booking", function() {
    const testNameAndID = getCustomer(testCustomers.customers[1]);
    const testCustomerBookings = []
    
    testBookings.bookings.forEach((booking) => {
      if (booking.userID === currentCustomer.customerID) {
        testCustomerBookings.push(booking);
      };
      return testCustomerBookings;
    });

    const testCustomerObjBookings = getBookings(testCustomerBookings);
    const testRoomReference = getRoomReference(testRooms.rooms)


    expect(testNameAndID.customerID).to.equal(2);
    expect(testNameAndID.name).to.equal("Rocio Schuster");
    expect(testCustomerObjBookings.currentBookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 2,
        "date": "2022/01/15",
        "roomNumber": 3,
        "roomObjRef": {
          "number": 3,
          "roomType": 'single room',
          "bidet": false,
          "bedSize": 'king',
          "numBeds": 1,
          "costPerNight": 491.14
        }
      },
      {
        "id": "5fwrgu4i7k55hl6ta",
        "userID": 2,
        "date": "2022/02/25",
        "roomNumber": 3,
        "roomObjRef": {
          "number": 3,
          "roomType": 'single room',
          "bidet": false,
          "bedSize": 'king',
          "numBeds": 1,
          "costPerNight": 491.14
        }
      },
      {
        "id": "5fwrgu4i7k55hl6tf",
        "userID": 2,
        "date": "2022/03/20",
        "roomNumber": 3,
        "roomObjRef": {
          "number": 3,
          "roomType": 'single room',
          "bidet": false,
          "bedSize": 'king',
          "numBeds": 1,
          "costPerNight": 491.14
        }
      },
      {
        "id": "5fwrgu4i7k55hl6tk",
        "userID": 2,
        "date": "2022/04/17",
        "roomNumber": 3,
        "roomObjRef": {
          "number": 3,
          "roomType": 'single room',
          "bidet": false,
          "bedSize": 'king',
          "numBeds": 1,
          "costPerNight": 491.14
        }
      },
      {
        "id": "5fwrgu4i7k55hl6tp",
        "userID": 2,
        "date": "2022/05/05",
        "roomNumber": 3,
        "roomObjRef": {
          "number": 3,
          "roomType": 'single room',
          "bidet": false,
          "bedSize": 'king',
          "numBeds": 1,
          "costPerNight": 491.14
        }
      }
    ]);
  });

  it("should calculate the total money spent", function() {
    const testNameAndID = getCustomer(testCustomers.customers[4]);
    const testCustomerBookings = []
    
    testBookings.bookings.forEach((booking) => {
      if (booking.userID === currentCustomer.customerID) {
        testCustomerBookings.push(booking);
      };
      return testCustomerBookings;
    });

    const testCustomerObjBookings = getBookings(testCustomerBookings);
    const testRoomReference = getRoomReference(testRooms.rooms);
    const testMoneySpent = getTotalMoneySpent(currentCustomer);


    expect(testNameAndID.customerID).to.equal(5);
    expect(testNameAndID.name).to.equal("Rhiannon Little");
    expect(testCustomerObjBookings.currentBookings).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 5,
        "date": "2022/01/15",
        "roomNumber": 9,
        "roomObjRef": {
          "number": 9,
          "roomType": 'single room',
          "bidet": true,
          "bedSize": 'queen',
          "numBeds": 1,
          "costPerNight": 200.39
        }
      },
      {
        "id": "5fwrgu4i7k55hl6td",
        "userID": 5,
        "date": "2022/02/25",
        "roomNumber": 9,
        "roomObjRef": {
          "number": 9,
          "roomType": 'single room',
          "bidet": true,
          "bedSize": 'queen',
          "numBeds": 1,
          "costPerNight": 200.39
        }
      },
      {
        "id": "5fwrgu4i7k55hl6ti",
        "userID": 5,
        "date": "2022/03/20",
        "roomNumber": 9,
        "roomObjRef": {
          "number": 9,
          "roomType": 'single room',
          "bidet": true,
          "bedSize": 'queen',
          "numBeds": 1,
          "costPerNight": 200.39
        }
      },
      {
        "id": "5fwrgu4i7k55hl6tn",
        "userID": 5,
        "date": "2022/04/17",
        "roomNumber": 9,
        "roomObjRef": {
          "number": 9,
          "roomType": 'single room',
          "bidet": true,
          "bedSize": 'queen',
          "numBeds": 1,
          "costPerNight": 200.39
        }
      },
      {
        "id": "5fwrgu4i7k55hl6tr",
        "userID": 5,
        "date": "2022/05/05",
        "roomNumber": 9,
        "roomObjRef": {
          "number": 9,
          "roomType": 'single room',
          "bidet": true,
          "bedSize": 'queen',
          "numBeds": 1,
          "costPerNight": 200.39
        }
      }
    ]);
    expect(testMoneySpent).to.equal('1001.95');
  });
});