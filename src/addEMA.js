export default function addEMA(data, duration, valueKey, outputKey, smoothing) {
  outputKey = outputKey || 'ema' + duration;
  smoothing = smoothing || 2;
  window.data = data;
  // For n = 0 till duration - 2,
  // the EMA is not defined and we just put 0
  for (var n = 0; n <= duration - 2; n++) {
    data[n][outputKey] = 0;
  }

  // For n = duration - 1, the first instace we actually can give an ema,
  // the EMA is simply taken to be the SMA (Simple Moving Average)
  data[duration - 1][outputKey] =
    data.slice(0, duration).reduce((sum, value) => {
      value[valueKey] = value[valueKey] || 0;
      sum += value[valueKey];
      return sum;
    }, 0) / duration;

  // For n = duration to the entrire length
  // Formula for EMA is
  // EMA[t] = (Price[t] * Multiplier) + EMA[t-1]* (1 - Multiplier)
  // Where Multiplier is
  // Multiplier = smoothing / (duration + 1)

  var multiplier = smoothing / (duration + 1);

  // Caching for performance & redability
  var oneMinusMultiplier = 1 - multiplier;
  for (n = duration; n < data.length; n++) {
    data[n][outputKey] =
      data[n][valueKey] * multiplier +
      data[n - 1][outputKey] * oneMinusMultiplier;
  }
  return data;
}
