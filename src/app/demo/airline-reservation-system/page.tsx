"use client";

import { Container } from "@/components/ui/container";
import { FlightSearchForm } from "@/components/demo/aeroreserve/flight-search-form";
import { Shield, Clock, Wallet, MapPin, Plane, ArrowRight, Star, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { airports } from "@/data/demo/aeroreserve/airports";

const POPULAR_ROUTES = [
  { from: "JNB", to: "CPT", price: 1250, duration: "2h 15m" },
  { from: "CPT", to: "HLA", price: 950, duration: "2h 10m" },
  { from: "JNB", to: "DUR", price: 850, duration: "1h 10m" },
  { from: "CPT", to: "PLZ", price: 1100, duration: "1h 20m" },
  { from: "HLA", to: "GRJ", price: 1350, duration: "2h 00m" },
  { from: "JNB", to: "ELS", price: 980, duration: "1h 30m" },
];

export default function AeroReserveLandingPage() {
  const router = useRouter();

  const getCityName = (code: string) => {
    const airport = airports.find((a) => a.code === code);
    return airport ? airport.city : code;
  };

  const handleRouteClick = (from: string, to: string) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const dateStr = nextWeek.toISOString().split("T")[0];
    const params = new URLSearchParams({
      from,
      to,
      date: dateStr,
      passengers: "1",
      travelClass: "economy",
    });
    router.push(`/demo/airline-reservation-system/flights?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-500/10 to-background pt-16 pb-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-sm font-medium mb-6 font-mono">
              <Plane className="w-4 h-4" /> AeroReserve Aviation Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Discover. Book. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">Fly.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience the future of seamless air travel. Search for flights, manage your bookings, and explore new horizons with AeroReserve.
            </p>
          </div>
          
          <div className="relative z-10">
            <FlightSearchForm />
          </div>
        </Container>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-sky-500/20 blur-3xl rounded-full pointer-events-none opacity-50"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-sky-400/10 blur-3xl rounded-full pointer-events-none opacity-50"></div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card/50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <MapPin className="w-6 h-6 text-sky-500" />
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm text-muted-foreground font-mono uppercase">Destinations</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Users className="w-6 h-6 text-sky-500" />
              <span className="text-2xl font-bold">500K+</span>
              <span className="text-sm text-muted-foreground font-mono uppercase">Happy Passengers</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Star className="w-6 h-6 text-sky-500" />
              <span className="text-2xl font-bold">99.98%</span>
              <span className="text-sm text-muted-foreground font-mono uppercase">On-time</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Shield className="w-6 h-6 text-sky-500" />
              <span className="text-2xl font-bold">24/7</span>
              <span className="text-sm text-muted-foreground font-mono uppercase">Support</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Routes */}
      <section className="py-24">
        <Container>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-3">Popular Routes</h2>
              <p className="text-muted-foreground">Explore our most frequently booked flights across South Africa.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_ROUTES.map((route, i) => (
              <div 
                key={i}
                onClick={() => handleRouteClick(route.from, route.to)}
                className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-sky-500/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold">{route.from}</span>
                    <p className="text-xs text-muted-foreground mt-1">{getCityName(route.from)}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center mx-4">
                    <Plane className="w-5 h-5 text-sky-500 mb-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="w-full border-t-2 border-dashed border-border relative"></div>
                    <span className="text-xs text-muted-foreground mt-2">{route.duration}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold">{route.to}</span>
                    <p className="text-xs text-muted-foreground mt-1">{getCityName(route.to)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="font-semibold text-lg text-sky-600 dark:text-sky-400">
                    {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(route.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary/30">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose AeroReserve?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Bookings</h3>
              <p className="text-muted-foreground">Your data and payments are protected by enterprise-grade encryption. Book with complete peace of mind.</p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Our modern platform ensures you can search, select, and book your flight in less than two minutes.</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-muted-foreground">No hidden fees or unexpected charges. We guarantee competitive pricing on all routes we operate.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
