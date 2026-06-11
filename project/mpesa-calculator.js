const feeTable = [
  { min: 1, max: 49, sendFee: 0, withdrawFee: null },
  { min: 50, max: 100, sendFee: 0, withdrawFee: 11 },
  { min: 101, max: 500, sendFee: 7, withdrawFee: 29 },
  { min: 501, max: 1000, sendFee: 13, withdrawFee: 29 },
  { min: 1001, max: 1500, sendFee: 23, withdrawFee: 29 },
  { min: 1501, max: 2500, sendFee: 33, withdrawFee: 29 },
  { min: 2501, max: 3500, sendFee: 53, withdrawFee: 52 },
  { min: 3501, max: 5000, sendFee: 57, withdrawFee: 69 },
  { min: 5001, max: 7500, sendFee: 78, withdrawFee: 87 },
  { min: 7501, max: 10000, sendFee: 90, withdrawFee: 115 },
  { min: 10001, max: 15000, sendFee: 100, withdrawFee: 167 },
  { min: 15001, max: 20000, sendFee: 105, withdrawFee: 185 },
  { min: 20001, max: 35000, sendFee: 108, withdrawFee: 197 },
  { min: 35001, max: 50000, sendFee: 108, withdrawFee: 278 },
  { min: 50001, max: 250000, sendFee: 108, withdrawFee: 309 },
];

const atmFeeTable = [
  { min: 200, max: 2500, fee: 35 },
  { min: 2501, max: 5000, fee: 69 },
  { min: 5001, max: 10000, fee: 115 },
  { min: 10001, max: 35000, fee: 203 },
];

function calculateFee(amount, transactionType) {
  if (transactionType === "atm") {
    if (amount < 200 || amount > 35000) {
      return "Invalid amount for ATM withdrawal";
    }
  } else {
    if (amount < 1 || amount > 250000) {
      return "Invalid amount";
    }
  }

  if (transactionType === "atm") {
    const atmRow = atmFeeTable.find(
      (row) => amount >= row.min && amount <= row.max,
    );
    if (!atmRow) return "Amount not supported for ATM";
    return atmRow.fee;
  }

  const row = feeTable.find((row) => amount >= row.min && amount <= row.max);
  if (!row) return "Amount not supported";

  if (transactionType === "send") {
    return row.sendFee;
  } else {
    return row.withdrawFee;
  }
}

// console.log(calculateFee(2000, "send"));
// console.log(calculateFee(2000, "withdraw"));
// console.log(calculateFee(5000, "atm"));

console.log(calculateFee(0, "send"));
console.log(calculateFee(300000, "send"));
console.log(calculateFee(100, "atm"));
console.log(calculateFee(2000, "atm"));