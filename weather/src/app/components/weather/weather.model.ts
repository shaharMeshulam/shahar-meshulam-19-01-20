import { CurrentCondition, ForecastApiResponse } from 'src/app/models/api.model';

export class Weather {
  constructor(public currentCondition: CurrentCondition, public forecasts: ForecastApiResponse) {}
}
