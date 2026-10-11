"use client";

import { Flight } from "@/data/demo/aeroreserve/flights";
import { getAirportByCode } from "@/data/demo/aeroreserve/airports";
import { Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface FlightCardProps {
  flight: Flight;
  travelClass: "economy" | "business";
  passengers: number;
}

export function FlightCard({ flight, travelClass, passengers }: FlightCardProps) {
  const fromCity = getAirportByCode(flight.from)?.city || flight.from;
  const toCity = getAirportByCode(flight.to)?.city || flight.to;
  
  const price = travelClass === "economy" ? flight.price.economy : flight.price.business;
  const formattedPrice = new Intl.NumberFormat('en-ZA', { 
    style: 'currency', 
    currency: 'ZAR', 
    maximumFractionDigits: 0 
  }).format(price);

  const statusColors = {
    "on-time": "bg-green-500",
    "delayed": "bg-amber-500",
    "cancelled": "bg-red-500",
  };

  const statusLabels = {
    "on-time": "On Time",
    "delayed": "Delayed",
    "cancelled": "Cancelled",
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-sky-500/40 transition-all hover:shadow-md flex flex-col md:flex-row gap-6 items-center">
      
      {/* Flight Info (Left/Center/Right) */}
      <div className="flex-1 w-full flex items-center justify-between">
        {/* Departure */}
        <div className="text-center w-24">
          <p className="text-2xl font-bold text-foreground">{flight.departureTime}</p>
          <p className="text-sm font-mono font-medium mt-1">{flight.from}</p>
          <p className="text-xs text-muted-foreground truncate">{fromCity}</p>
        </div>

        {/* Duration */}
        <div className="flex-1 flex flex-col items-center mx-4 max-w-[200px]">
          <span className="text-xs text-muted-foreground mb-1">{flight.duration}</span>
          <div className="w-full flex items-center">
            <div className="h-px bg-border flex-1"></div>
            <Plane className="w-4 h-4 text-sky-500 mx-2" />
            <div className="h-px bg-border flex-1 border-dashed"></div>
          </div>
          <span className="text-xs font-mono text-muted-foreground mt-1 bg-secondary px-2 py-0.5 rounded">
            {flight.flightNumber}
          </span>
        </div>

        {/* Arrival */}
        <div className="text-center w-24">
          <p className="text-2xl font-bold text-foreground">{flight.arrivalTime}</p>
          <p className="text-sm font-mono font-medium mt-1">{flight.to}</p>
          <p className="text-xs text-muted-foreground truncate">{toCity}</p>
        </div>
      </div>

      {/* Action / Price */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary text-xs font-medium">
            <span className={`w-2 h-2 rounded-full ${statusColors[flight.status]}`}></span>
            {statusLabels[flight.status]}
          </div>
        </div>
        
        <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-1">
          {formattedPrice}
        </div>
        <p className="text-xs text-muted-foreground mb-4">per person</p>
        
        <Link 
          href={`/demo/airline-reservation-system/booking?flight=${flight.id}&class=${travelClass}&passengers=${passengers}`}
          tabIndex={flight.status === "cancelled" ? -1 : 0}
        >
          <Button 
            className="w-full md:w-32 bg-sky-500 hover:bg-sky-600 text-white" 
            disabled={flight.status === "cancelled"}
          >
            Select Flight
          </Button>
        </Link>
      </div>
    </div>
  );
}
