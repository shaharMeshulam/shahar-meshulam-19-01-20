import { Forecast } from '../models/api.model';

function cToF(celsius: number): number {
  const cTemp = celsius;
  const cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr;
}

function fToC(fahrenheit: number): number {
  const fTemp = fahrenheit;
  const fToCel = (fTemp - 32) * 5 / 9;
  return fToCel;
}

export function translateForecast(to: string, forecasts: Forecast[]): Forecast[] {
  switch (to) {
    case 'C':
      return forecasts.map(forecast => {
        forecast.Temperature.Maximum.Unit = 'C';
        forecast.Temperature.Minimum.Unit = 'C';
        forecast.Temperature.Maximum.Value = fToC(forecast.Temperature.Maximum.Value);
        forecast.Temperature.Minimum.Value = fToC(forecast.Temperature.Minimum.Value);
        return forecast;
      });
    case 'F':
      return forecasts.map(forecast => {
        forecast.Temperature.Maximum.Unit = 'F';
        forecast.Temperature.Minimum.Unit = 'F';
        forecast.Temperature.Maximum.Value = cToF(forecast.Temperature.Maximum.Value);
        forecast.Temperature.Minimum.Value = cToF(forecast.Temperature.Minimum.Value);
        return forecast;
      });
  }
}
