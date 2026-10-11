export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  { code: 'DUR', name: 'King Shaka International', city: 'Durban', country: 'South Africa' },
  { code: 'PLZ', name: 'Chief Dawid Stuurman International', city: 'Gqeberha', country: 'South Africa' },
  { code: 'GRJ', name: 'George Airport', city: 'George', country: 'South Africa' },
  { code: 'BFN', name: 'Bram Fischer International', city: 'Bloemfontein', country: 'South Africa' },
  { code: 'ELS', name: 'King Phalo Airport', city: 'East London', country: 'South Africa' },
  { code: 'MQP', name: 'Kruger Mpumalanga International', city: 'Mbombela', country: 'South Africa' },
  { code: 'WDH', name: 'Hosea Kutako International', city: 'Windhoek', country: 'Namibia' },
  { code: 'LVI', name: 'Harry Mwanga Nkumbula International', city: 'Livingstone', country: 'Zambia' },
];

export function getAirportByCode(code: string): Airport | undefined {
  return airports.find(a => a.code === code);
}
