"use client";

import React, { useState, useMemo } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { flights, Flight } from '@/data/demo/aeroreserve/flights';
import { airports } from '@/data/demo/aeroreserve/airports';
import { getAircraftConfig } from '@/data/demo/aeroreserve/aircraft';
import { 
  Activity, 
  Plane, 
  Map as MapIcon, 
  DollarSign, 
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

type SortField = keyof Flight;
type SortDirection = 'asc' | 'desc';

export default function AdminDashboardPage() {
  const [sortField, setSortField] = useState<SortField>('departureTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      
      // Handle nested or complex types if necessary
      if (sortField === 'price') {
        valA = a.price.economy;
        valB = b.price.economy;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortField, sortDirection]);

  const stats = useMemo(() => {
    const totalFlights = flights.length;
    const uniqueRoutes = new Set(flights.map(f => `${f.from}-${f.to}`)).size;
    const onTimeFlights = flights.filter(f => f.status === 'on-time').length;
    const onTimeRate = totalFlights > 0 ? Math.round((onTimeFlights / totalFlights) * 100) : 0;
    
    let totalRev = 0;
    flights.forEach(f => {
      totalRev += f.price.economy * f.seatsAvailable.economy;
      totalRev += f.price.business * f.seatsAvailable.business;
    });

    return { totalFlights, uniqueRoutes, onTimeRate, totalRev };
  }, []);

  const uniqueAircraftIds = useMemo(() => {
    return Array.from(new Set(flights.map(f => f.aircraft)));
  }, []);

  const formatZAR = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };

  return (
    <Container size="large" className="pt-24 pb-20">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-sky-500" />
          <h1 className="text-3xl font-bold">Fleet & Schedule Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage operations, monitor flight status, and track revenue.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Flights</h3>
            <Plane className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-3xl font-bold">{stats.totalFlights}</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Routes</h3>
            <MapIcon className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-3xl font-bold">{stats.uniqueRoutes}</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">On-Time Rate</h3>
            <Activity className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold">{stats.onTimeRate}%</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue Potential</h3>
            <DollarSign className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{formatZAR(stats.totalRev)}</p>
        </div>
      </div>

      {/* Flight Schedule Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mb-10">
        <div className="p-6 border-b border-border bg-secondary/30">
          <h2 className="text-xl font-semibold">Flight Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('flightNumber')}>
                  <div className="flex items-center gap-1">Flight # <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('departureTime')}>
                  <div className="flex items-center gap-1">Departure <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('arrivalTime')}>
                  <div className="flex items-center gap-1">Arrival <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4">Eco. Price</th>
                <th className="px-6 py-4">Bus. Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedFlights.map((flight, idx) => (
                <tr key={flight.id} className={`border-b border-border/50 hover:bg-muted/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-card/50'}`}>
                  <td className="px-6 py-4 font-mono font-medium">{flight.flightNumber}</td>
                  <td className="px-6 py-4 font-bold">{flight.from} → {flight.to}</td>
                  <td className="px-6 py-4 font-mono">{flight.date}</td>
                  <td className="px-6 py-4 font-mono">{flight.departureTime}</td>
                  <td className="px-6 py-4 font-mono">{flight.arrivalTime}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      flight.status === 'on-time' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                      flight.status === 'delayed' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                    }`}>
                      {flight.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatZAR(flight.price.economy)}</td>
                  <td className="px-6 py-4">{formatZAR(flight.price.business)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      href={`/demo/airline-reservation-system?flightId=${flight.id}`}
                      className="h-8 text-sky-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Route Map Placeholder */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border bg-secondary/30">
            <h2 className="text-xl font-semibold">Route Network</h2>
          </div>
          <div className="flex-1 p-8 relative min-h-[300px] flex items-center justify-center bg-background/50">
            {/* Visual placeholder for map */}
            <div className="relative w-full max-w-sm aspect-video">
              {airports.map((airport, i) => {
                // Pseudo-random deterministic positions
                const top = 20 + ((i * 37) % 60);
                const left = 10 + ((i * 73) % 80);
                return (
                  <div key={airport.code} className="absolute flex flex-col items-center" style={{ top: `${top}%`, left: `${left}%` }}>
                    <div className="w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)] z-10" />
                    <span className="text-[10px] font-mono mt-1 font-bold">{airport.code}</span>
                  </div>
                );
              })}
              
              {/* Fake connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-sky-500" strokeWidth="2" strokeDasharray="4 4">
                 <line x1="25%" y1="35%" x2="70%" y2="60%" />
                 <line x1="70%" y1="60%" x2="40%" y2="80%" />
                 <line x1="40%" y1="80%" x2="80%" y2="20%" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fleet Overview */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border bg-secondary/30">
            <h2 className="text-xl font-semibold">Fleet Overview</h2>
          </div>
          <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[400px]">
            {uniqueAircraftIds.map(id => {
              const config = getAircraftConfig(id);
              if (!config) return null;
              const businessTotal = config.businessRows * config.seatsPerRowBusiness;
              const economyTotal = config.economyRows * config.seatsPerRowEconomy;
              
              return (
                <div key={id} className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-sky-500" />
                      <span className="font-bold text-lg">{config.name}</span>
                    </div>
                    <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">ID: {config.id}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-sky-50 dark:bg-sky-900/10 p-3 rounded border border-sky-100 dark:border-sky-900/30">
                      <span className="block text-xs text-muted-foreground uppercase mb-1">Business Class</span>
                      <span className="font-bold text-lg">{businessTotal} seats</span>
                      <span className="block text-xs text-muted-foreground">{config.businessRows} rows, {config.seatsPerRowBusiness}/row</span>
                    </div>
                    <div className="flex-1 bg-secondary/30 p-3 rounded border border-border">
                      <span className="block text-xs text-muted-foreground uppercase mb-1">Economy Class</span>
                      <span className="font-bold text-lg">{economyTotal} seats</span>
                      <span className="block text-xs text-muted-foreground">{config.economyRows} rows, {config.seatsPerRowEconomy}/row</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
