interface UniteTypeAndValue {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface GeoPositionApiResponse {
  Version: number;
  Key: number;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: UniteTypeAndValue;
      Imperial: UniteTypeAndValue;
    }
  };
  IsAlias: boolean;
  ParentCity: {
    Key: string;
    LocalizedName: string;
    EnglishName: string;
  };
  SupplementalAdminAreas: [];
  DataSets: string[];
}

export interface CurrentCondition {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  IsDayTime: boolean;
  Temperature: {
    Metric: UniteTypeAndValue;
    Imperial: UniteTypeAndValue;
  };
  MobileLink: string;
  Link: string;
}


export interface Forecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: UniteTypeAndValue;
    Maximum: UniteTypeAndValue;
  };
  Day: {
    Icon: 18;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string
  };
  Night: {
    Icon: 12;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string
  };
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface ForecastApiResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: Forecast[];
}

export interface AutoCompleteItem {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}
