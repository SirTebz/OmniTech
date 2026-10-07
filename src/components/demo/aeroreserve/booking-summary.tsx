"use client";

import React from "react";
import { Flight } from "@/data/demo/aeroreserve/flights";

interface PassengerDetail {
  firstName: string;
  lastName: string;
  email: string;
}

interface BookingSummaryProps {
  flight: Flight;
  selectedSeats: string[];
  travelClass: "economy" | "business";
  passengers: number;
  passengerDetails?: PassengerDetail[];
}

export function BookingSummary({
  flight,
  selectedSeats,
  travelClass,
  passengers,
  passengerDetails,
}: BookingSummaryProps) {
  const formatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  const baseFare = flight.price[travelClass];
  const seatFee = selectedSeats.length * 50;
  const serviceFee = 150;
  const total = baseFare * passengers + seatFee + serviceFee;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
      <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>

      <div className="pb-4 border-b border-border mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Flight</span>
          <span className="font-mono text-sm text-foreground">
            {flight.flightNumber}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">{flight.from}</div>
          <div className="flex-1 px-4 flex items-center justify-center text-muted-foreground">
            <div className="w-full h-px bg-border flex-1" />
            <svg
              className="w-4 h-4 mx-2 text-sky-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <div className="w-full h-px bg-border flex-1" />
          </div>
          <div className="text-xl font-bold text-foreground">{flight.to}</div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>{flight.date}</span>
          <span>{flight.departureTime}</span>
        </div>
      </div>

      <div className="pb-4 border-b border-border mb-4">
        <div className="text-sm font-medium text-foreground mb-2">Selected Seats</div>
        {selectedSeats.length === 0 ? (
          <div className="text-sm text-muted-foreground italic">No seats selected</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat, index) => (
              <span
                key={seat}
                className="inline-flex items-center justify-center px-2 py-1 rounded bg-secondary text-foreground text-xs font-mono"
              >
                {seat}
                {passengerDetails?.[index]?.firstName &&
                  ` (${passengerDetails[index].firstName})`}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Base Fare ({passengers} × {formatter.format(baseFare)})
          </span>
          <span className="text-foreground">
            {formatter.format(baseFare * passengers)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Seat Selection ({selectedSeats.length} × {formatter.format(50)})
          </span>
          <span className="text-foreground">{formatter.format(seatFee)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Service Fee</span>
          <span className="text-foreground">{formatter.format(serviceFee)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-xl font-bold text-sky-500">
          {formatter.format(total)}
        </span>
      </div>
    </div>
  );
}
