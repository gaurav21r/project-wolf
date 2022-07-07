import addEMA from '../src/addEMA';

var data = [
  {
    open: 20,
    close: 100
  },
  {
    open: 30,
    close: 110
  },
  {
    open: 25,
    close: 120
  }
];

var dataIs = addEMA(data, 2, 'close', 'ema2');
var dataShouldBe = [
  { open: 20, close: 100, ema2: 0 },
  { open: 30, close: 110, ema2: 105 },
  { open: 25, close: 120, ema2: 115 }
];

if (JSON.stringify(dataShouldBe) === JSON.stringify(dataIs)) {
  console.log('Success');
}
