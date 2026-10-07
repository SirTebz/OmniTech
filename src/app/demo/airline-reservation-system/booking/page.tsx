"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getFlightById, Flight } from "@/data/demo/aeroreserve/flights";
import { generateSeats, getAircraftConfig, Seat, AircraftConfig } from "@/data/demo/aeroreserve/aircraft";
import { SeatMap } from "@/components/demo/aeroreserve/seat-map";
import { BookingSummary } from "@/components/demo/aeroreserve/booking-summary";

function BookingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightId = searchParams.get("flight");
  const travelClass = (searchParams.get("class") as "economy" | "business") || "economy";
  const passengers = parseInt(searchParams.get("passengers") || "1", 10);

  const [flight, setFlight] = useState<Flight | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [config, setConfig] = useState<AircraftConfig | null>(null);
  
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const [passengerDetails, setPassengerDetails] = useState<{ firstName: string; lastName: string; email: string; phone: string }[]>(
    Array(passengers).fill({ firstName: "", lastName: "", email: "", phone: "" })
  );

  useEffect(() => {
    if (flightId) {
      const f = getFlightById(flightId);
      if (f) {
        setFlight(f);
        const cfg = getAircraftConfig(f.aircraft);
        if (cfg) {
          setConfig(cfg);
          setSeats(generateSeats(cfg, f.seatsAvailable));
        }
      }
    }
  }, [flightId]);

  if (!flightId || !flight || !config) {
    return (
      <Container size="default">
        <div className="min-h-[50vh] flex flex-col items-center justify-center pt-24">
          <p className="text-muted-foreground mb-4">Flight not found or invalid parameters.</p>
          <Button variant="primary" href="/demo/airline-reservation-system" size="md">
            Back to Search
          </Button>
        </div>
      </Container>
    );
  }

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }
      if (prev.length < passengers) {
        return [...prev, seatId];
      }
      return prev;
    });
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerDetails(updated);
  };

  const completeBooking = () => {
    const ref = "AR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    const names = passengerDetails.map(p => p.firstName || "Passenger").join(",");
    router.push(
      `/demo/airline-reservation-system/confirmation?ref=${ref}&flight=${flight.id}&seats=${selectedSeats.join(",")}&class=${travelClass}&name=${encodeURIComponent(names)}`
    );
  };

  return (
    <Container size="default">
      <div className="py-8 pt-24">
        {/* Progress Indicator */}
        <div className="mb-12 flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10" />
          {[1, 2, 3].map(step => (
            <div key={step} className="flex flex-col items-center bg-background px-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors
                ${currentStep === step ? 'bg-sky-500 text-white ring-4 ring-background' : 
                  currentStep > step ? 'bg-sky-500/20 text-sky-500 ring-4 ring-background' : 
                  'bg-secondary text-muted-foreground ring-4 ring-background'}
              `}>
                {step}
              </div>
              <span className={`text-xs font-mono uppercase transition-colors ${currentStep === step ? 'text-sky-500 font-bold' : 'text-muted-foreground'}`}>
                {step === 1 ? 'Seats' : step === 2 ? 'Passengers' : 'Payment'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* STEP 1: SEATS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Step 1 of 3 — Select Your Seats</h2>
                  <p className="text-muted-foreground text-sm">Please select {passengers} seat(s) for your {travelClass} class booking.</p>
                </div>
                
                <SeatMap
                  seats={seats}
                  aircraftConfig={config}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                  maxSelections={passengers}
                  travelClass={travelClass}
                />

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={selectedSeats.length !== passengers}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Passenger Details
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: PASSENGERS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Step 2 of 3 — Passenger Details</h2>
                  <p className="text-muted-foreground text-sm">Enter information for all passengers.</p>
                </div>

                <div className="space-y-6">
                  {Array.from({ length: passengers }).map((_, idx) => (
                    <div key={idx} className="bg-card border border-border p-6 rounded-xl shadow-sm">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <h3 className="font-semibold text-foreground">Passenger {idx + 1}</h3>
                        {selectedSeats[idx] && (
                          <span className="bg-sky-500/10 text-sky-500 px-3 py-1 rounded-full text-xs font-mono font-medium">
                            Seat {selectedSeats[idx]}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">First Name</label>
                          <input
                            type="text"
                            value={passengerDetails[idx].firstName}
                            onChange={(e) => handlePassengerChange(idx, "firstName", e.target.value)}
                            className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full transition-shadow"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Last Name</label>
                          <input
                            type="text"
                            value={passengerDetails[idx].lastName}
                            onChange={(e) => handlePassengerChange(idx, "lastName", e.target.value)}
                            className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full transition-shadow"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Email</label>
                          <input
                            type="email"
                            value={passengerDetails[idx].email}
                            onChange={(e) => handlePassengerChange(idx, "email", e.target.value)}
                            className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full transition-shadow"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Phone Number</label>
                          <input
                            type="tel"
                            value={passengerDetails[idx].phone}
                            onChange={(e) => handlePassengerChange(idx, "phone", e.target.value)}
                            className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full transition-shadow"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" size="lg" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setCurrentStep(3)}
                    disabled={passengerDetails.some(p => !p.firstName || !p.lastName)}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Step 3 of 3 — Payment</h2>
                  <p className="text-muted-foreground text-sm">This is a demo — no real payment is processed.</p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-foreground mb-4 pb-4 border-b border-border">Payment Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Card Number</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full font-mono transition-shadow"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full font-mono transition-shadow"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full font-mono transition-shadow"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase text-muted-foreground mb-1.5 block">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" size="lg" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  {/* Using a standard button here since Button might not support overriding classes perfectly */}
                  <button
                    onClick={completeBooking}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-sky-500 text-white hover:bg-sky-600 shadow-sm"
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <BookingSummary
              flight={flight}
              selectedSeats={selectedSeats}
              travelClass={travelClass}
              passengers={passengers}
              passengerDetails={currentStep >= 2 ? passengerDetails : undefined}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center font-mono text-sm text-muted-foreground">Loading booking engine...</div>}>
      <BookingFlow />
    </Suspense>
  );
}
