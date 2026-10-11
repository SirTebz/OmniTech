import React, { useMemo } from 'react';
import { Plane, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Flight } from "@/data/demo/aeroreserve/flights";
import { Airport } from "@/data/demo/aeroreserve/airports";

export interface TicketCardProps {
  bookingRef: string;
  flight: Flight;
  seats: string[];
  passengerName: string;
  travelClass: string;
  fromAirport: Airport;
  toAirport: Airport;
}

export function TicketCard({
  bookingRef,
  flight,
  seats,
  passengerName,
  travelClass,
  fromAirport,
  toAirport
}: TicketCardProps) {
  // Generate a deterministic pattern for the QR code based on bookingRef
  const qrPattern = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < bookingRef.length; i++) {
      hash = bookingRef.charCodeAt(i) + ((hash << 5) - hash);
    }
    const pattern = [];
    for (let i = 0; i < 64; i++) {
      pattern.push((Math.abs(hash * (i + 1)) % 100) > 40);
    }
    return pattern;
  }, [bookingRef]);

  return (
    <div className="relative flex flex-col md:flex-row w-full max-w-4xl mx-auto rounded-xl border border-border shadow-lg overflow-hidden bg-card transition-all hover:shadow-xl">
      {/* Left main section */}
      <div className="flex-1 relative p-6 md:p-8 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2 text-sky-500">
            <Plane className="w-6 h-6 rotate-45" />
            <span className="font-bold text-xl tracking-tight">AeroReserve</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase block">Boarding Pass</span>
            <span className="font-mono text-xl font-bold">{flight.flightNumber}</span>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">{fromAirport.code}</span>
            <span className="text-sm text-muted-foreground">{fromAirport.city}</span>
            <span className="font-mono mt-1 text-lg">{flight.departureTime}</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
            <div className="w-full h-px border-t-2 border-dashed border-border my-2 relative">
              <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-sky-500 bg-card px-1" />
            </div>
            <span className="text-xs text-muted-foreground mt-2">{flight.duration}</span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-4xl font-bold">{toAirport.code}</span>
            <span className="text-sm text-muted-foreground">{toAirport.city}</span>
            <span className="font-mono mt-1 text-lg">{flight.arrivalTime}</span>
          </div>
        </div>

        {/* Passenger & Flight Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-auto pt-6 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Passenger</span>
            <span className="font-semibold">{passengerName || 'GUEST'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</span>
            <span className="font-mono font-medium">{flight.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gate</span>
            <span className="font-mono font-bold text-lg">{flight.gate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Seat</span>
            <div className="flex gap-1 flex-wrap">
              {seats.map(seat => (
                <span key={seat} className="font-mono font-bold bg-secondary px-2 py-0.5 rounded text-sm">
                  {seat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Class Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            travelClass.toLowerCase() === 'business' 
              ? 'bg-sky-500 text-white' 
              : 'bg-secondary text-secondary-foreground'
          }`}>
            {travelClass} Class
          </span>
        </div>
      </div>

      {/* Perforation effect - desktop */}
      <div className="hidden md:block w-0 border-l-2 border-dashed border-border relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-background border border-border shadow-inner z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-background border border-border shadow-inner z-10"></div>
      </div>
      
      {/* Perforation effect - mobile */}
      <div className="block md:hidden h-0 border-t-2 border-dashed border-border relative">
        <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-background border border-border shadow-inner z-10"></div>
        <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-background border border-border shadow-inner z-10"></div>
      </div>

      {/* Right tear-off section */}
      <div className="w-full md:w-64 p-6 md:p-8 flex flex-col items-center justify-center bg-card/50 relative">
        <div className="text-center w-full mb-6">
          <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Boarding Time</span>
          <span className="font-mono text-xl font-bold">
            {/* Roughly 40 mins before departure */}
            {flight.departureTime.replace(/(\d+):(\d+)/, (match, h, m) => {
              let mins = parseInt(m, 10) - 40;
              let hrs = parseInt(h, 10);
              if (mins < 0) { mins += 60; hrs -= 1; }
              if (hrs < 0) hrs += 24;
              return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
            })}
          </span>
        </div>
        
        {/* QR Code Placeholder */}
        <div className="w-32 h-32 bg-white p-2 rounded-lg mb-4 shadow-sm border border-border">
          <div className="w-full h-full grid grid-cols-8 grid-rows-8">
            {qrPattern.map((isActive, i) => (
              <div key={i} className={`w-full h-full ${isActive ? 'bg-black' : 'bg-transparent'}`} />
            ))}
          </div>
        </div>

        <div className="text-center w-full">
          <span className="font-mono font-bold text-lg tracking-widest">{bookingRef}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mt-2">Scan at gate</span>
        </div>
      </div>
    </div>
  );
}
