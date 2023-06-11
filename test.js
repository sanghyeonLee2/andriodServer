const productAddress = 0;
const productName = 1;
const eventContent = 2;
const event1 = 3;
const event2 = 4;
const personCount = 5;
const productCount = 6;
const productPrice = 7;
let num = 0;

const obj = [];
obj.push({
  [num]: {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productCount,
    productPrice,
  },
});
obj.push({
  [2]: {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productCount,
    productPrice,
  },
});
console.log(obj);
