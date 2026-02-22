"use client";

import { useState } from "react";

function calculateRepayment(
  principal: number,
  aprPercent: number,
  termMonths: number
) {
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) {
    return {
      monthlyPayment: principal / termMonths,
      totalCost: principal,
      totalInterest: 0,
    };
  }
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  const totalCost = monthlyPayment * termMonths;
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalInterest: Math.round((totalCost - principal) * 100) / 100,
  };
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function LoanCalculator() {
  const [amount, setAmount] = useState(500);
  const [apr, setApr] = useState(200);
  const [term, setTerm] = useState(6);

  const result = calculateRepayment(amount, apr, term);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            Loan Amount: <span className="text-brand">${amount.toLocaleString()}</span>
          </label>
          <input
            id="amount"
            type="range"
            min={100}
            max={35000}
            step={100}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>$100</span>
            <span>$35,000</span>
          </div>
        </div>

        {/* APR */}
        <div>
          <label
            htmlFor="apr"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            APR: <span className="text-brand">{apr}%</span>
          </label>
          <input
            id="apr"
            type="range"
            min={1}
            max={700}
            step={1}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>1%</span>
            <span>700%</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <label
            htmlFor="term"
            className="mb-1 block text-sm font-medium text-gray-900"
          >
            Term: <span className="text-brand">{term} months</span>
          </label>
          <input
            id="term"
            type="range"
            min={1}
            max={60}
            step={1}
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>1 month</span>
            <span>60 months</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-brand-lighter p-4 text-center">
          <p className="text-sm text-gray-500">Monthly Payment</p>
          <p className="text-2xl font-bold text-brand">
            {formatUsd(result.monthlyPayment)}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatUsd(result.totalCost)}
          </p>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-sm text-gray-500">Total Interest</p>
          <p className="text-2xl font-bold text-red-600">
            {formatUsd(result.totalInterest)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Calculation uses standard amortization formula. Actual costs may vary.
      </p>
    </div>
  );
}
