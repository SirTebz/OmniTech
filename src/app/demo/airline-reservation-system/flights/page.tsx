"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { FlightSearchForm } from "@/components/demo/aeroreserve/flight-search-form";
import { FlightCard } from "@/components/demo/aeroreserve/flight-card";
import { searchFlights } from "@/data/demo/aeroreserve/flights";
import { getAirportByCode } from "@/data/demo/aeroreserve/airports";
import { Plane } from "lucide-react";

function FlightsResults() {
  const searchParams = useSearchParams();
  
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const passengers = parseInt(searchParams.get("passengers") || "1", 10);
  const travelClass = (searchParams.get("travelClass") || "economy") as "economy" | "business";

  const [sortOption, setSortOption] = useState<"price" | "duration" | "departure">("departure");

  const flights = useMemo(() => {
    let results = searchFlights(from, to, date);
    
    // Manual filter for travel class (availability > passengers)
    results = results.filter(f => f.seatsAvailable[travelClass] >= passengers);

    // Sort
    results.sort((a, b) => {
      if (sortOption === "price") {
        return a.price[travelClass] - b.price[travelClass];
      }
      if (sortOption === "duration") {
        // Simple duration sort based on "Xh Ym"
        const parseDuration = (dur: string) => {
          const match = dur.match(/(\d+)h\s*(\d+)m/);
          if (match) return parseInt(match[1]) * 60 + parseInt(match[2]);
          return 9999;
        };
        return parseDuration(a.duration) - parseDuration(b.duration);
      }
      if (sortOption === "departure") {
        return a.departureTime.localeCompare(b.departureTime);
      }
      return 0;
    });

    return results;
  }, [from, to, date, travelClass, passengers, sortOption]);

  const fromCity = getAirportByCode(from)?.city || from;
  const toCity = getAirportByCode(to)?.city || to;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <Container>
        {/* Modify Search Form */}
        <div className="mb-10">
          <FlightSearchForm 
            defaultValues={{
              from, to, date, passengers: passengers.toString(), travelClass
            }}
          />
        </div>

        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {flights.length} flights found
            </h1>
            <p className="text-muted-foreground mt-1">
              {fromCity} to {toCity} on {date}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex bg-secondary p-1 rounded-lg">
              {(["price", "duration", "departure"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortOption(opt)}
                  className={`px-3 py-1.5 text-sm rounded-md capitalize transition-colors ${
                    sortOption === opt 
                      ? "bg-background text-foreground shadow-sm font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {flights.length > 0 ? (
            flights.map(flight => (
              <FlightCard 
                key={flight.id}
                flight={flight}
                travelClass={travelClass}
                passengers={passengers}
              />
            ))
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-card/50">
              <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-sky-500 opacity-50" />
              </div>
              <h2 className="text-xl font-bold mb-2">No flights available</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any flights matching your criteria. Try selecting different dates or travel classes.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading flights...</div>}>
      <FlightsResults />
    </Suspense>
  );
}
