export interface Seat {
  id: string;
  row: number;
  column: string;
  type: "business" | "economy";
  available: boolean;
  position: "window" | "middle" | "aisle";
}

export interface AircraftConfig {
  id: string;
  name: string;
  businessRows: number;
  economyRows: number;
  seatsPerRowBusiness: number;
  seatsPerRowEconomy: number;
}

export const aircraftConfigs: AircraftConfig[] = [
  {
    id: 'B737-800',
    name: 'Boeing 737-800',
    businessRows: 3,
    economyRows: 27,
    seatsPerRowBusiness: 4,
    seatsPerRowEconomy: 6,
  },
  {
    id: 'A320',
    name: 'Airbus A320',
    businessRows: 2,
    economyRows: 25,
    seatsPerRowBusiness: 4,
    seatsPerRowEconomy: 6,
  }
];

// Simple seeded random function
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generateSeats(aircraftId: string): Seat[] {
  const config = getAircraftConfig(aircraftId);
  if (!config) return [];

  const seats: Seat[] = [];
  let currentRow = 1;

  // Business Class
  const businessColumns = ['A', 'B', 'E', 'F'];
  for (let r = 0; r < config.businessRows; r++) {
    for (let c = 0; c < businessColumns.length; c++) {
      const column = businessColumns[c];
      const id = `${currentRow}${column}`;
      const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      let position: "window" | "middle" | "aisle" = "aisle";
      if (column === 'A' || column === 'F') position = "window";

      seats.push({
        id,
        row: currentRow,
        column,
        type: "business",
        available: seededRandom(seed) > 0.15,
        position
      });
    }
    currentRow++;
  }

  // Economy Class
  const economyColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let r = 0; r < config.economyRows; r++) {
    for (let c = 0; c < economyColumns.length; c++) {
      const column = economyColumns[c];
      const id = `${currentRow}${column}`;
      const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      let position: "window" | "middle" | "aisle" = "middle";
      if (column === 'A' || column === 'F') position = "window";
      if (column === 'C' || column === 'D') position = "aisle";

      seats.push({
        id,
        row: currentRow,
        column,
        type: "economy",
        available: seededRandom(seed) > 0.15,
        position
      });
    }
    currentRow++;
  }

  return seats;
}

export function getAircraftConfig(id: string): AircraftConfig | undefined {
  return aircraftConfigs.find(c => c.id === id);
}
