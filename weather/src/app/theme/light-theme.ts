import { Theme } from './symbols';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': '#319ad4',
    '--on-background': '#000',
    '--header-background': '#f8f9fa',
    '--text-color': '#000000',
    '--card-background': '#ffffff50',
    '--card-shadow': '0px 13px 32px 0px rgba(0,0,0,0.75)',
    '--card-border': 'green',
    '--card-close-background': 'linear-gradient(45deg, rgba(240,0,17,1) 0%, rgba(255,0,0,0) 100%)'
  }
};
