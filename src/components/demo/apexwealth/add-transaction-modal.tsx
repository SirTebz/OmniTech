"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Tag as TagIcon } from 'lucide-react';
import { Account, Transaction } from '@/data/demo/apexwealth/types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  accounts: Account[];
}

export function AddTransactionModal({ isOpen, onClose, onAdd, accounts }: AddTransactionModalProps) {
  const [type, setType] = useState<"inflow" | "outflow">("outflow");
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [description, setDescription] = useState("");
  const [accountId, setAccountId] = useState(accounts[0]?.id || "");
  const [category, setCategory] = useState("Groceries");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const categories = ["Income", "Housing", "Groceries", "Dining", "Investments", "Utilities", "Transport", "Entertainment", "Healthcare", "Tech & Software"];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !merchant || !accountId) return;

    const numAmount = parseFloat(amount);
    const finalAmount = type === 'outflow' ? -Math.abs(numAmount) : Math.abs(numAmount);

    onAdd({
      accountId,
      date,
      description: description || merchant,
      merchant,
      category: category as Transaction["category"],
      amount: finalAmount,
      type,
      status: "cleared",
      isRecurring,
      tags
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center p-6 border-b border-border">
            <h3 className="text-xl font-semibold tracking-tight">Add Transaction</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-secondary">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="flex p-1 bg-secondary rounded-lg">
              <button
                type="button"
                onClick={() => setType("outflow")}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'outflow' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("inflow")}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${type === 'inflow' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Income
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Amount (ZAR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">R</span>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg pl-8 pr-3 py-2 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="0.00" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Merchant / Entity</label>
                <input 
                  type="text" 
                  required
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="e.g. Woolworths, Employer Inc" 
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Account</label>
                  <select 
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>{acc.name} ({acc.institution})</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Tags (Press Enter)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-foreground">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full bg-background border border-input rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="Add tags..." 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="recurring" 
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded border-input text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-foreground">Mark as recurring transaction</label>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-card border border-emerald-500/20 shadow-lg rounded-lg p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in z-50">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-sm font-medium">Transaction Added</p>
            <p className="text-xs text-muted-foreground">Your ledger has been securely updated.</p>
          </div>
        </div>
      )}
    </>
  );
}
