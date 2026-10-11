"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Plane, Minus, Plus } from "lucide-react";
import { airports } from "@/data/demo/aeroreserve/airports";
import { Button } from "@/components/ui/button";

export interface FlightSearchFormProps {
  onSearch?: (params: {
    from: string;
    to: string;
    date: string;
    passengers: number;
    travelClass: string;
  }) => void;
  defaultValues?: {
    from?: string;
    to?: string;
    date?: string;
    passengers?: string;
    travelClass?: string;
  };
}

export function FlightSearchForm({
  onSearch,
  defaultValues,
}: FlightSearchFormProps) {
  const router = useRouter();

  const [from, setFrom] = useState(defaultValues?.from || "");
  const [to, setTo] = useState(defaultValues?.to || "");
  const [date, setDate] = useState(defaultValues?.date || "");
  const [passengers, setPassengers] = useState(
    defaultValues?.passengers ? parseInt(defaultValues.passengers, 10) : 1
  );
  const [travelClass, setTravelClass] = useState(
    defaultValues?.travelClass || "economy"
  );

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) return;

    if (onSearch) {
      onSearch({ from, to, date, passengers, travelClass });
    } else {
      const params = new URLSearchParams({
        from,
        to,
        date,
        passengers: passengers.toString(),
        travelClass,
      });
      router.push(`/demo/airline-reservation-system/flights?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="rounded-2xl border border-border bg-card shadow-lg p-6 max-w-4xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        {/* From */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none"
            required
          >
            <option value="" disabled>
              Select departure
            </option>
            {airports.map((apt) => (
              <option key={apt.code} value={apt.code}>
                {apt.city} ({apt.code})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwap}
          className="mt-5 p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors hidden md:block"
          title="Swap departure and arrival"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        {/* To */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none"
            required
          >
            <option value="" disabled>
              Select destination
            </option>
            {airports.map((apt) => (
              <option key={apt.code} value={apt.code}>
                {apt.city} ({apt.code})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
          {/* Passengers */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase text-muted-foreground">
              Passengers
            </span>
            <div className="flex items-center bg-background border border-border rounded-lg p-1">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-foreground disabled:opacity-50"
                disabled={passengers <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{passengers}</span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-foreground disabled:opacity-50"
                disabled={passengers >= 9}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Class */}
          <div className="flex items-center gap-2 bg-background border border-border p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setTravelClass("economy")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                travelClass === "economy"
                  ? "bg-sky-500 text-white"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              Economy
            </button>
            <button
              type="button"
              onClick={() => setTravelClass("business")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                travelClass === "business"
                  ? "bg-sky-500 text-white"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto bg-sky-500 hover:bg-sky-600 text-white px-8 h-12 rounded-xl text-lg font-medium shadow-md flex items-center justify-center gap-2"
        >
          <Plane className="w-5 h-5" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}
