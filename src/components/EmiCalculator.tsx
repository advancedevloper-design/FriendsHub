import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, PieChart, Info } from 'lucide-react';

interface EmiCalculatorProps {
  onApplyWithAmount: (amount: number, tenure: number, interestRate: number) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onApplyWithAmount }) => {
  const [loanAmount, setLoanAmount] = useState<number>(1500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // EMI Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    if (monthlyRate === 0) {
      const emi = principal / totalMonths;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalPayment: principal,
      };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  };

  const { monthlyEmi, totalInterest, totalPayment } = calculateEMI();
  const principalPercentage = Math.round((loanAmount / totalPayment) * 100);
  const interestPercentage = 100 - principalPercentage;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#040e21] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#dfb135]/10 border border-[#dfb135]/30 text-[#dfb135] text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Planning</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Accurate Loan EMI Calculator
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Adjust loan parameters to calculate precise monthly repayments, interest liabilities, and find a loan structure matching your monthly cash flows.
          </p>
        </div>

        {/* Calculator Frame */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0a1e3d]/80 to-[#06142a]/90 border border-slate-800/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Loan Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-300">
                    Desired Loan Amount
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-[#dfb135]">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>

                <input
                  type="range"
                  min="50000"
                  max="20000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#dfb135]"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>₹50,000</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                  <span>₹2 Crores</span>
                </div>

                {/* Amount Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[200000, 500000, 1500000, 3500000, 7500000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setLoanAmount(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                        loanAmount === preset
                          ? 'bg-[#dfb135] text-[#040e21]'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      {formatCurrency(preset)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-300">
                    Interest Rate (% per annum)
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-cyan-400">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                </div>

                <input
                  type="range"
                  min="6.5"
                  max="24.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>6.5% (Home Loan)</span>
                  <span>10.5% (Personal)</span>
                  <span>14.0% (Business)</span>
                  <span>24.0%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-slate-300">
                    Loan Tenure (Years / Months)
                  </label>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-400">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

            </div>

            {/* Right Column: Calculated Results Breakdown Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#061226] border border-slate-700/80 p-6 sm:p-7 space-y-6 shadow-xl">
              
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Estimated Monthly Repayment (EMI)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {formatCurrency(monthlyEmi)}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
              </div>

              {/* Breakdown details */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dfb135] mr-2" />
                    Principal Loan Amount:
                  </span>
                  <span className="font-bold text-white">{formatCurrency(loanAmount)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mr-2" />
                    Total Interest Amount:
                  </span>
                  <span className="font-bold text-cyan-300">{formatCurrency(totalInterest)}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm sm:text-base">
                  <span className="font-bold text-white">Total Overall Payable:</span>
                  <span className="font-extrabold text-[#dfb135]">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              {/* Ratio Visual Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span>Principal: {principalPercentage}%</span>
                  <span>Interest: {interestPercentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercentage}%` }}
                    className="h-full bg-[#dfb135] transition-all duration-300"
                    title={`Principal: ${principalPercentage}%`}
                  />
                  <div
                    style={{ width: `${interestPercentage}%` }}
                    className="h-full bg-cyan-400 transition-all duration-300"
                    title={`Interest: ${interestPercentage}%`}
                  />
                </div>
              </div>

              {/* Direct Apply Button with calculated values */}
              <button
                onClick={() => onApplyWithAmount(loanAmount, tenureYears * 12, interestRate)}
                className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] via-[#efc44b] to-[#dfb135] hover:brightness-110 shadow-lg shadow-[#dfb135]/25 flex items-center justify-center space-x-2 transition"
              >
                <span>Apply for {formatCurrency(loanAmount)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Indicative rate. Final sanction depends on credit evaluation.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
