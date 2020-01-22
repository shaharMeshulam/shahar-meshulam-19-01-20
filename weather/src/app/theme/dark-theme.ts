import { Theme } from './theme.model';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background': '#1F2125',
    '--on-background': '#fff',
    '--header-background': '#ff8c00',
    '--text-color': '#ffffff',
    '--card-background': '#ff8c0050',
    '--card-shadow': '0px 13px 32px 0px rgba(255, 255, 255, 0.75)',
    '--card-border': '#ff8c00',
    '--card-close-background': 'linear-gradient(45deg, rgba(255, 255, 255,1) 0%, rgba(255,0,0,0) 100%)'
  }
};
