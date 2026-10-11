"use client";

import React from "react";
import { Seat, AircraftConfig } from "@/data/demo/aeroreserve/aircraft";

interface SeatMapProps {
  seats: Seat[];
  aircraftConfig: AircraftConfig;
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  maxSelections: number;
  travelClass: "economy" | "business";
}

export function SeatMap({
  seats,
  aircraftConfig,
  selectedSeats,
  onSeatSelect,
  maxSelections,
  travelClass,
}: SeatMapProps) {
  // Group seats by class
  const businessSeats = seats.filter((s) => s.type === "business");
  const economySeats = seats.filter((s) => s.type === "economy");

  // Determine row numbers
  const maxBusinessRow = businessSeats.length > 0 ? Math.max(...businessSeats.map((s) => s.row)) : 0;
  const minEconomyRow = economySeats.length > 0 ? Math.min(...economySeats.map((s) => s.row)) : 0;
  const maxEconomyRow = economySeats.length > 0 ? Math.max(...economySeats.map((s) => s.row)) : 0;

  const renderSeat = (seat: Seat | undefined) => {
    if (!seat) return <div className="w-9 h-9" />;
    const isSelected = selectedSeats.includes(seat.id);
    const isAvailable = seat.available && (seat.type === travelClass || !travelClass);
    const isDisabled = !isAvailable;

    return (
      <button
        key={seat.id}
        disabled={isDisabled && !isSelected}
        onClick={() => {
          if (!isDisabled || isSelected) {
            if (isSelected) {
              onSeatSelect(seat.id);
            } else if (selectedSeats.length < maxSelections) {
              onSeatSelect(seat.id);
            }
          }
        }}
        title={`${seat.id} - ${seat.position.charAt(0).toUpperCase() + seat.position.slice(1)}`}
        className={`relative flex items-center justify-center rounded-md text-[10px] font-mono transition-colors border
          ${seat.type === "business" ? "w-11 h-11" : "w-9 h-9"}
          ${isSelected ? "bg-sky-500 text-white border-sky-600 z-10" : ""}
          ${
            !isSelected && isAvailable
              ? "bg-secondary hover:bg-sky-500/20 border-border text-foreground cursor-pointer"
              : ""
          }
          ${
            isDisabled && !isSelected
              ? "bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-50"
              : ""
          }
        `}
      >
        {seat.id}
        {isDisabled && !isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-full h-full text-muted-foreground/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
      </button>
    );
  };

  const renderRow = (rowNum: number, seatType: "business" | "economy") => {
    const rowSeats = seats.filter((s) => s.row === rowNum && s.type === seatType);
    const leftCols = seatType === "business" ? ["A", "B"] : ["A", "B", "C"];
    const rightCols = seatType === "business" ? ["E", "F"] : ["D", "E", "F"];

    return (
      <div
        key={`row-${rowNum}`}
        className={`flex items-center gap-4 my-2 ${
          seatType !== travelClass ? "opacity-40" : ""
        }`}
      >
        <div className="w-6 text-center text-xs font-mono text-muted-foreground">
          {rowNum}
        </div>
        <div className="flex gap-2">
          {leftCols.map((col) => renderSeat(rowSeats.find((s) => s.column === col)))}
        </div>
        <div className="w-8 text-center" /> {/* Aisle gap */}
        <div className="flex gap-2">
          {rightCols.map((col) => renderSeat(rowSeats.find((s) => s.column === col)))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-t-[100px] rounded-b-3xl overflow-hidden p-6 pb-12 shadow-sm">
      {/* Cockpit */}
      <div className="h-24 bg-secondary rounded-t-full mb-12 flex items-center justify-center">
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Cockpit
        </span>
      </div>

      <div className="flex flex-col items-center">
        {/* Business Class Section */}
        {businessSeats.length > 0 && (
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="text-xs font-mono font-medium text-muted-foreground mb-4 bg-muted px-3 py-1 rounded-full uppercase">
              Business Class
            </div>
            {/* Column Labels */}
            <div className="flex items-center gap-4 mb-2 pl-10">
              <div className="flex gap-2 w-[96px] justify-around text-xs text-muted-foreground font-mono">
                <span>A</span>
                <span>B</span>
              </div>
              <div className="w-8" />
              <div className="flex gap-2 w-[96px] justify-around text-xs text-muted-foreground font-mono">
                <span>E</span>
                <span>F</span>
              </div>
            </div>
            {Array.from({ length: maxBusinessRow }).map((_, i) =>
              renderRow(i + 1, "business")
            )}
          </div>
        )}

        {/* Divider */}
        {businessSeats.length > 0 && economySeats.length > 0 && (
          <div className="w-full border-t border-border my-8 relative flex justify-center">
            <span className="bg-card px-2 absolute -top-2 text-[10px] uppercase font-mono text-muted-foreground">
              Exit
            </span>
          </div>
        )}

        {/* Economy Class Section */}
        {economySeats.length > 0 && (
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="text-xs font-mono font-medium text-muted-foreground mb-4 bg-muted px-3 py-1 rounded-full uppercase">
              Economy Class
            </div>
            {/* Column Labels */}
            <div className="flex items-center gap-4 mb-2 pl-10">
              <div className="flex gap-2 w-[124px] justify-around text-xs text-muted-foreground font-mono">
                <span>A</span>
                <span>B</span>
                <span>C</span>
              </div>
              <div className="w-8" />
              <div className="flex gap-2 w-[124px] justify-around text-xs text-muted-foreground font-mono">
                <span>D</span>
                <span>E</span>
                <span>F</span>
              </div>
            </div>
            {Array.from({ length: maxEconomyRow - minEconomyRow + 1 }).map((_, i) =>
              renderRow(i + minEconomyRow, "economy")
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary border border-border" />
          <span className="text-xs text-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sky-500 border border-sky-600" />
          <span className="text-xs text-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
            <svg
              className="w-3 h-3 text-muted-foreground/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <span className="text-xs text-foreground">Occupied</span>
        </div>
      </div>
    </div>
  );
}
