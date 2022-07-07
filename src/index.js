import './styles.css';
import Papa from 'papaparse';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import _ from 'lodash';
import addEMA from './addEMA';

document.getElementById('app').innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

// Fields Date, Close Price
Papa.parse('./src/TCS.NS.csv', {
  header: true,
  download: true,
  complete: makeTable,
  dynamicTyping: true
});

function makeTable(results) {
  window.results = results;
  window._ = _;
  var data = results.data;
  window.data = data;

  //console.log(results.data);

  // MACD formula
  // MACD = EMA(Price, 12) - EMA (Price, 26)
  // Signal = EMA(MACD, 9)
  // MACD Histogram = MACD - Signal

  data = addEMA(data, 12, 'Close');
  data = addEMA(data, 26, 'Close');
  data = data.map((d) => ({ ...d, MACD: d['ema12'] - d['ema26'] }));
  data = addEMA(data, 9, 'MACD', 'MACD Signal');
  data = data.map((d) => ({
    ...d,
    'MACD Histogram': d['MACD'] - d['MACD Signal']
  }));
  console.log(data);

  const container = document.getElementById('table');
  const hot = new Handsontable(container, {
    data: data,
    rowHeaders: true,
    //colHeaders: true
    colHeaders: ['Date', 'Close', 'MACD', 'MACD Signal', 'MACD Histogram'],
    columns: [
      { data: 'Date' },
      { data: 'Close' },
      { data: 'MACD' },
      { data: 'MACD Signal' },
      { data: 'MACD Histogram' }
    ]
  });
}
