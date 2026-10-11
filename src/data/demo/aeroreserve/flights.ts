export interface Flight {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  aircraft: string;
  price: { economy: number; business: number };
  seatsAvailable: { economy: number; business: number };
  status: "on-time" | "delayed" | "cancelled";
  gate: string;
}

export const flights: Flight[] = [
  // JNB to CPT
  { id: 'f1', flightNumber: 'AR-201', from: 'JNB', to: 'CPT', departureTime: '06:00', arrivalTime: '08:15', duration: '2h 15m', date: '2025-03-15', aircraft: 'B737-800', price: { economy: 1500, business: 4500 }, seatsAvailable: { economy: 45, business: 4 }, status: 'on-time', gate: 'B12' },
  { id: 'f2', flightNumber: 'AR-203', from: 'JNB', to: 'CPT', departureTime: '08:30', arrivalTime: '10:45', duration: '2h 15m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1800, business: 5200 }, seatsAvailable: { economy: 12, business: 2 }, status: 'on-time', gate: 'C4' },
  { id: 'f3', flightNumber: 'AR-205', from: 'JNB', to: 'CPT', departureTime: '12:00', arrivalTime: '14:15', duration: '2h 15m', date: '2025-03-15', aircraft: 'B737-800', price: { economy: 1350, business: 4200 }, seatsAvailable: { economy: 80, business: 8 }, status: 'delayed', gate: 'B14' },
  { id: 'f4', flightNumber: 'AR-207', from: 'JNB', to: 'CPT', departureTime: '16:45', arrivalTime: '19:00', duration: '2h 15m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1950, business: 5800 }, seatsAvailable: { economy: 5, business: 0 }, status: 'on-time', gate: 'C6' },
  
  // CPT to JNB
  { id: 'f5', flightNumber: 'AR-202', from: 'CPT', to: 'JNB', departureTime: '07:00', arrivalTime: '09:05', duration: '2h 05m', date: '2025-03-15', aircraft: 'B737-800', price: { economy: 1550, business: 4600 }, seatsAvailable: { economy: 30, business: 3 }, status: 'on-time', gate: 'A2' },
  { id: 'f6', flightNumber: 'AR-204', from: 'CPT', to: 'JNB', departureTime: '10:00', arrivalTime: '12:05', duration: '2h 05m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1750, business: 5000 }, seatsAvailable: { economy: 20, business: 5 }, status: 'on-time', gate: 'A4' },
  
  // JNB to DUR
  { id: 'f7', flightNumber: 'AR-301', from: 'JNB', to: 'DUR', departureTime: '09:15', arrivalTime: '10:25', duration: '1h 10m', date: '2025-03-15', aircraft: 'A320', price: { economy: 850, business: 2800 }, seatsAvailable: { economy: 55, business: 6 }, status: 'on-time', gate: 'D1' },
  { id: 'f8', flightNumber: 'AR-303', from: 'JNB', to: 'DUR', departureTime: '14:30', arrivalTime: '15:40', duration: '1h 10m', date: '2025-03-15', aircraft: 'B737-800', price: { economy: 950, business: 3100 }, seatsAvailable: { economy: 110, business: 10 }, status: 'on-time', gate: 'D3' },
  { id: 'f9', flightNumber: 'AR-305', from: 'JNB', to: 'DUR', departureTime: '18:00', arrivalTime: '19:10', duration: '1h 10m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1100, business: 3500 }, seatsAvailable: { economy: 15, business: 1 }, status: 'cancelled', gate: 'D2' },

  // DUR to JNB
  { id: 'f10', flightNumber: 'AR-302', from: 'DUR', to: 'JNB', departureTime: '07:30', arrivalTime: '08:45', duration: '1h 15m', date: '2025-03-15', aircraft: 'A320', price: { economy: 900, business: 2900 }, seatsAvailable: { economy: 40, business: 4 }, status: 'on-time', gate: 'G1' },

  // JNB to PLZ
  { id: 'f11', flightNumber: 'AR-401', from: 'JNB', to: 'PLZ', departureTime: '10:45', arrivalTime: '12:25', duration: '1h 40m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1250, business: 3800 }, seatsAvailable: { economy: 65, business: 5 }, status: 'on-time', gate: 'E1' },
  
  // CPT to DUR
  { id: 'f12', flightNumber: 'AR-501', from: 'CPT', to: 'DUR', departureTime: '11:30', arrivalTime: '13:35', duration: '2h 05m', date: '2025-03-15', aircraft: 'B737-800', price: { economy: 1650, business: 4800 }, seatsAvailable: { economy: 35, business: 2 }, status: 'on-time', gate: 'A3' },
  
  // JNB to WDH
  { id: 'f13', flightNumber: 'AR-601', from: 'JNB', to: 'WDH', departureTime: '08:00', arrivalTime: '10:00', duration: '2h 00m', date: '2025-03-16', aircraft: 'B737-800', price: { economy: 2500, business: 6500 }, seatsAvailable: { economy: 90, business: 8 }, status: 'on-time', gate: 'A15' },
  
  // WDH to JNB
  { id: 'f14', flightNumber: 'AR-602', from: 'WDH', to: 'JNB', departureTime: '11:00', arrivalTime: '12:55', duration: '1h 55m', date: '2025-03-16', aircraft: 'B737-800', price: { economy: 2400, business: 6300 }, seatsAvailable: { economy: 85, business: 7 }, status: 'delayed', gate: '1' },
  
  // JNB to LVI
  { id: 'f15', flightNumber: 'AR-701', from: 'JNB', to: 'LVI', departureTime: '10:15', arrivalTime: '12:00', duration: '1h 45m', date: '2025-03-16', aircraft: 'A320', price: { economy: 3200, business: 7500 }, seatsAvailable: { economy: 40, business: 4 }, status: 'on-time', gate: 'A12' },
  
  // LVI to JNB
  { id: 'f16', flightNumber: 'AR-702', from: 'LVI', to: 'JNB', departureTime: '13:00', arrivalTime: '14:45', duration: '1h 45m', date: '2025-03-16', aircraft: 'A320', price: { economy: 3100, business: 7400 }, seatsAvailable: { economy: 45, business: 5 }, status: 'on-time', gate: '2' },
  
  // JNB to MQP
  { id: 'f17', flightNumber: 'AR-801', from: 'JNB', to: 'MQP', departureTime: '11:15', arrivalTime: '12:05', duration: '0h 50m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1100, business: 3200 }, seatsAvailable: { economy: 70, business: 6 }, status: 'on-time', gate: 'C2' },
  
  // MQP to JNB
  { id: 'f18', flightNumber: 'AR-802', from: 'MQP', to: 'JNB', departureTime: '13:00', arrivalTime: '13:55', duration: '0h 55m', date: '2025-03-15', aircraft: 'A320', price: { economy: 1050, business: 3100 }, seatsAvailable: { economy: 65, business: 5 }, status: 'on-time', gate: '1' },
];

export function searchFlights(from: string, to: string, date?: string): Flight[] {
  return flights.filter(f => f.from === from && f.to === to && (!date || f.date === date));
}

export function getFlightById(id: string): Flight | undefined {
  return flights.find(f => f.id === id);
}

export function getUniqueRoutes(): { from: string; to: string }[] {
  const routes = new Set<string>();
  flights.forEach(f => routes.add(`${f.from}-${f.to}`));
  
  return Array.from(routes).map(r => {
    const [from, to] = r.split('-');
    return { from, to };
  });
}
