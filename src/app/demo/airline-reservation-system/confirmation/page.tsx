"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, RefreshCw, BarChart2 } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getFlightById } from '@/data/demo/aeroreserve/flights';
import { getAirportByCode } from '@/data/demo/aeroreserve/airports';
import { TicketCard } from '@/components/demo/aeroreserve/ticket-card';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  
  const bookingRef = searchParams.get('ref') || '';
  const flightId = searchParams.get('flight') || '';
  const seatsStr = searchParams.get('seats') || '';
  const travelClass = searchParams.get('class') || 'economy';
  const passengerName = searchParams.get('name') || 'Guest Passenger';

  const flight = getFlightById(flightId);
  
  if (!flight || !bookingRef || !seatsStr) {
    return (
      <Container size="small" className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-destructive">Booking Information Missing</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the details for this booking.</p>
        <Button href="/demo/airline-reservation-system" variant="primary">
          Return to Home
        </Button>
      </Container>
    );
  }

  const seats = seatsStr.split(',');
  const fromAirport = getAirportByCode(flight.from);
  const toAirport = getAirportByCode(flight.to);

  if (!fromAirport || !toAirport) {
    return (
      <Container size="small" className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-destructive">Route Information Missing</h1>
        <Button href="/demo/airline-reservation-system" variant="primary">
          Return to Home
        </Button>
      </Container>
    );
  }

  // Calculate Price
  const basePrice = travelClass === 'business' ? flight.price.business : flight.price.economy;
  const seatSelectionFee = 50 * seats.length;
  const serviceFee = 150;
  const totalPaid = (basePrice * seats.length) + seatSelectionFee + serviceFee;

  const formattedPrice = new Intl.NumberFormat('en-ZA', { 
    style: 'currency', 
    currency: 'ZAR' 
  }).format(totalPaid);

  return (
    <Container size="small" className="pt-32 pb-20 max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your reservation is complete. Reference:{' '}
          <span className="font-mono font-bold text-foreground">{bookingRef}</span>
        </p>
      </div>

      <div className="mb-10">
        <TicketCard 
          bookingRef={bookingRef}
          flight={flight}
          seats={seats}
          passengerName={passengerName}
          travelClass={travelClass}
          fromAirport={fromAirport}
          toAirport={toAirport}
        />
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground block">Route</span>
            <span className="font-medium">{fromAirport.city} ({fromAirport.code}) to {toAirport.city} ({toAirport.code})</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block">Date & Time</span>
            <span className="font-medium">{flight.date}, {flight.departureTime} - {flight.arrivalTime}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block">Passenger</span>
            <span className="font-medium">{passengerName}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground block">Total Paid</span>
            <span className="font-bold text-lg text-sky-500">{formattedPrice}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button 
          variant="primary" 
          onClick={() => alert("Mock download started for " + bookingRef)}
          className="bg-sky-500 hover:bg-sky-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Boarding Pass
        </Button>
        <Button 
          variant="outline" 
          href="/demo/airline-reservation-system"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Book Another Flight
        </Button>
        <Button 
          variant="secondary" 
          href="/demo/airline-reservation-system/admin"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          View Flight Status
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          This is an interactive demo by OmniTech Digital. No real booking was made.
        </p>
      </div>
    </Container>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <Container size="small" className="pt-32 pb-20 text-center">
        <div className="animate-pulse">Loading booking details...</div>
      </Container>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
