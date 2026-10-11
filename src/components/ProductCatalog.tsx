import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Percent, 
  Clock, 
  Calendar, 
  X, 
  Sparkles, 
  Building2,
  FileText,
  CreditCard
} from 'lucide-react';
import { FINANCIAL_PRODUCTS } from '../data/products';
import { FinancialProduct } from '../types';

interface ProductCatalogProps {
  onSelectProductForApply: (product: FinancialProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProductForApply }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailProduct, setActiveDetailProduct] = useState<FinancialProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'instant', label: 'Instant KYC' },
    { id: 'personal', label: 'Personal Loan' },
    { id: 'business', label: 'Business & MSME' },
    { id: 'home', label: 'Home & Property' },
    { id: 'vehicle', label: 'Auto & Vehicles' },
    { id: 'insurance', label: 'Health Insurance' },
    { id: 'cards_investment', label: 'Cards & Demat' },
  ];

  const filteredProducts = FINANCIAL_PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.lenders && item.lenders.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#030b18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#dfb135]/10 border border-[#dfb135]/30 text-[#dfb135] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Financial Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Financial Products & Instant Digital Loans
          </h2>

          <p className="text-slate-400 text-base">
            Choose from 25+ institutional financial offerings matched across 50+ banking partners for lowest interest, fastest approval, and maximum loan amounts.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Scrollable category pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#dfb135] text-[#040e21] shadow-lg shadow-[#dfb135]/20 font-bold'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or banks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#dfb135] focus:ring-1 focus:ring-[#dfb135]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group relative rounded-2xl bg-gradient-to-b from-[#0a1b38]/90 to-[#061226]/90 border border-slate-800 hover:border-[#dfb135]/60 transition-all duration-300 p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#dfb135]/10"
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md">
                    {prod.categoryLabel}
                  </span>
                  {prod.highlightBadge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfb135] bg-[#dfb135]/15 border border-[#dfb135]/30 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{prod.highlightBadge}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#dfb135] transition-colors">
                  {prod.name}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {prod.tagline}
                </p>

                {/* Key Metrics Grid */}
                <div className="mt-5 grid grid-cols-2 gap-3 py-3 px-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center space-x-1">
                      <Percent className="w-3 h-3 text-[#dfb135]" />
                      <span>Rate / Pricing</span>
                    </div>
                    <div className="font-bold text-white mt-0.5">{prod.interestRate}</div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-emerald-400" />
                      <span>Max Limit</span>
                    </div>
                    <div className="font-bold text-white mt-0.5">{prod.maxAmount}</div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-blue-400" />
                      <span>Tenure</span>
                    </div>
                    <div className="font-bold text-white mt-0.5">{prod.tenure}</div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Approval Speed</span>
                    </div>
                    <div className="font-bold text-emerald-400 mt-0.5">{prod.processingTime}</div>
                  </div>
                </div>

                {/* Bullet Features */}
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {prod.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb135] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Partner Commission Note */}
                {prod.partnerCommissionRate && (
                  <div className="mt-4 p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center justify-between">
                    <span className="font-medium">DSA Partner Payout:</span>
                    <span className="font-bold">{prod.partnerCommissionRate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center space-x-2">
                <button
                  onClick={() => onSelectProductForApply(prod)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-md shadow-[#dfb135]/20 flex items-center justify-center space-x-1.5 transition"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveDetailProduct(prod)}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition"
                  title="View full details and document checklist"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p>No products found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-[#dfb135] underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {activeDetailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#08152c] border border-slate-700 p-6 sm:p-8 shadow-2xl text-slate-200">
            
            <button
              onClick={() => setActiveDetailProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-xs uppercase font-bold text-cyan-400">
              <span>{activeDetailProduct.categoryLabel}</span>
              <span>•</span>
              <span className="text-[#dfb135]">{activeDetailProduct.highlightBadge || 'Verified'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {activeDetailProduct.name}
            </h3>

            <p className="mt-2 text-sm text-slate-300">
              {activeDetailProduct.tagline}
            </p>

            {/* Quick Metrics */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Interest Rate</span>
                <strong className="text-white text-sm">{activeDetailProduct.interestRate}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Max Limit</span>
                <strong className="text-white text-sm">{activeDetailProduct.maxAmount}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tenure</span>
                <strong className="text-white text-sm">{activeDetailProduct.tenure}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Turnaround Time</span>
                <strong className="text-emerald-400 text-sm">{activeDetailProduct.processingTime}</strong>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Eligibility Guidelines
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 leading-relaxed">
                {activeDetailProduct.eligibility}
              </p>
            </div>

            {/* Required Documents Checklist */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Mandatory Documentation Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDetailProduct.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Lending Institutions */}
            {activeDetailProduct.lenders && (
              <div className="mt-6 space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Partner Banks & Disbursing Lenders
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeDetailProduct.lenders.map((lender, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700">
                      {lender}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Modal CTA */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
              <button
                onClick={() => setActiveDetailProduct(null)}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prod = activeDetailProduct;
                  setActiveDetailProduct(null);
                  onSelectProductForApply(prod);
                }}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#040e21] bg-gradient-to-r from-[#dfb135] to-[#efc44b] hover:brightness-110 shadow-lg shadow-[#dfb135]/20 flex items-center space-x-1.5"
              >
                <span>Proceed to Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
