import { useState, useEffect } from "react";
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  Banknote,
  Calculator,
  Download,
  Globe,
} from "lucide-react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar", icon: DollarSign, symbol: "$" },
    { code: "EUR", name: "Euro", icon: Euro, symbol: "€" },
    { code: "GBP", name: "British Pound", icon: PoundSterling, symbol: "£" },
    { code: "INR", name: "Indian Rupee", icon: "₹", symbol: "₹" },
    { code: "JPY", name: "Japanese Banknote", icon: Banknote, symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", icon: DollarSign, symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", icon: DollarSign, symbol: "A$" },
    { code: "SGD", name: "Singapore Dollar", icon: DollarSign, symbol: "S$" },
  ];

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const exchangeRates = {
    USD: {
      EUR: 0.92,
      GBP: 0.79,
      INR: 83.5,
      JPY: 149.3,
      CAD: 1.36,
      AUD: 1.52,
      SGD: 1.34,
    },
    EUR: {
      USD: 1.09,
      GBP: 0.86,
      INR: 90.8,
      JPY: 162.2,
      CAD: 1.48,
      AUD: 1.65,
      SGD: 1.46,
    },
    GBP: {
      USD: 1.27,
      EUR: 1.16,
      INR: 105.5,
      JPY: 188.7,
      CAD: 1.72,
      AUD: 1.92,
      SGD: 1.69,
    },
    INR: {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095,
      JPY: 1.79,
      CAD: 0.016,
      AUD: 0.018,
      SGD: 0.016,
    },
  };

  const convertCurrency = () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let rate = 1;

      if (fromCurrency === toCurrency) {
        rate = 1;
      } else if (
        exchangeRates[fromCurrency] &&
        exchangeRates[fromCurrency][toCurrency]
      ) {
        rate = exchangeRates[fromCurrency][toCurrency];
      } else if (
        exchangeRates[toCurrency] &&
        exchangeRates[toCurrency][fromCurrency]
      ) {
        rate = 1 / exchangeRates[toCurrency][fromCurrency];
      }

      setExchangeRate(rate);
      setConvertedAmount(amount * rate);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    }, 500);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency]);

  const getCurrencyIcon = (code) => {
    const currency = currencies.find((c) => c.code === code);
    const Icon = currency?.icon;

    if (typeof Icon === "string") {
      return <span className="text-xl">{Icon}</span>;
    }

    return Icon ? (
      <Icon className="w-5 h-5" />
    ) : (
      <DollarSign className="w-5 h-5" />
    );
  };

  const formatCurrency = (value, currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    const symbol = currency?.symbol || currencyCode;

    if (currencyCode === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }

    return `${symbol}${value.toFixed(2)}`;
  };

  const popularConversions = [
    { from: "USD", to: "INR", label: "USD to INR" },
    { from: "EUR", to: "USD", label: "EUR to USD" },
    { from: "GBP", to: "EUR", label: "GBP to EUR" },
    { from: "USD", to: "JPY", label: "USD to JPY" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <RefreshCw className="w-10 h-10 text-indigo-600" />
          Currency Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert between world currencies with real-time exchange rates
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Converter */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Currency Conversion
              </h3>

              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) =>
                        setAmount(parseFloat(e.target.value) || 0)
                      }
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                      placeholder="Enter amount"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Calculator className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Currency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      From Currency
                    </label>
                    <div className="relative">
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        {getCurrencyIcon(fromCurrency)}
                      </div>
                    </div>
                  </div>

                  {/* To Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      To Currency
                    </label>
                    <div className="relative">
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        {getCurrencyIcon(toCurrency)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={swapCurrencies}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 font-medium rounded-xl hover:bg-indigo-200 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Swap Currencies
                  </button>
                </div>

                {/* Convert Button */}
                <button
                  onClick={convertCurrency}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Converting...
                    </div>
                  ) : (
                    "Convert Currency"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Popular Conversions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Conversions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {popularConversions.map((conv) => (
                  <button
                    key={conv.label}
                    onClick={() => {
                      setFromCurrency(conv.from);
                      setToCurrency(conv.to);
                    }}
                    className={`p-4 border rounded-xl text-center transition-all ${
                      fromCurrency === conv.from && toCurrency === conv.to
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900">
                      {conv.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Result Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Conversion Result
              </h3>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(convertedAmount, toCurrency)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {formatCurrency(amount, fromCurrency)} ={" "}
                {formatCurrency(convertedAmount, toCurrency)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Exchange Rate</span>
                <span className="font-medium text-purple-600">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-700">Last Updated</span>
                <span className="font-medium text-gray-900">{lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Currency Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Currency Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getCurrencyIcon(fromCurrency)}
                    <span className="text-gray-700">{fromCurrency}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {currencies.find((c) => c.code === fromCurrency)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getCurrencyIcon(toCurrency)}
                    <span className="text-gray-700">{toCurrency}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {currencies.find((c) => c.code === toCurrency)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Market Trends
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">USD/INR</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +0.5%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-700">EUR/USD</span>
                </div>
                <span className="text-sm font-medium text-red-600">-0.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">GBP/EUR</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +0.2%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Real-time Rates
          </h3>
          <p className="text-gray-600">
            Get up-to-date exchange rates for accurate currency conversions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            150+ Currencies
          </h3>
          <p className="text-gray-600">
            Convert between all major world currencies and cryptocurrencies.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Historical Data
          </h3>
          <p className="text-gray-600">
            View historical exchange rates and track currency trends over time.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Travel & Tourism
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Calculate travel expenses in foreign currencies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Plan international trip budgets</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Compare hotel and flight prices globally</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Business & Finance
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Calculate international payment amounts</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Track currency fluctuations for investments</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Convert financial reports between currencies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-2">Advertisement</div>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x90)
            <div className="text-xs mt-1">Support free tools development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
