import { useState } from "react";
import {
  RefreshCw,
  Ruler,
  Thermometer,
  Scale,
  Droplets,
  Clock,
  Zap,
  Calculator,
} from "lucide-react";

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");

  const categories = {
    length: {
      icon: Ruler,
      units: [
        "millimeters",
        "centimeters",
        "meters",
        "kilometers",
        "inches",
        "feet",
        "yards",
        "miles",
      ],
      conversions: {
        millimeters: 0.001,
        centimeters: 0.01,
        meters: 1,
        kilometers: 1000,
        inches: 0.0254,
        feet: 0.3048,
        yards: 0.9144,
        miles: 1609.34,
      },
    },
    temperature: {
      icon: Thermometer,
      units: ["celsius", "fahrenheit", "kelvin"],
      isSpecial: true,
    },
    weight: {
      icon: Scale,
      units: ["milligrams", "grams", "kilograms", "ounces", "pounds", "tons"],
      conversions: {
        milligrams: 0.000001,
        grams: 0.001,
        kilograms: 1,
        ounces: 0.0283495,
        pounds: 0.453592,
        tons: 907.185,
      },
    },
    volume: {
      icon: Droplets,
      units: [
        "milliliters",
        "liters",
        "cubic meters",
        "teaspoons",
        "tablespoons",
        "cups",
        "pints",
        "quarts",
        "gallons",
      ],
      conversions: {
        milliliters: 0.001,
        liters: 1,
        "cubic meters": 1000,
        teaspoons: 0.00492892,
        tablespoons: 0.0147868,
        cups: 0.236588,
        pints: 0.473176,
        quarts: 0.946353,
        gallons: 3.78541,
      },
    },
    time: {
      icon: Clock,
      units: [
        "seconds",
        "minutes",
        "hours",
        "days",
        "weeks",
        "months",
        "years",
      ],
      conversions: {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        months: 2592000, // 30 days
        years: 31536000, // 365 days
      },
    },
    energy: {
      icon: Zap,
      units: [
        "joules",
        "kilojoules",
        "calories",
        "kilocalories",
        "watt hours",
        "kilowatt hours",
        "electronvolts",
      ],
      conversions: {
        joules: 1,
        kilojoules: 1000,
        calories: 4.184,
        kilocalories: 4184,
        "watt hours": 3600,
        "kilowatt hours": 3600000,
        electronvolts: 1.60218e-19,
      },
    },
  };

  const convertTemperature = (value, from, to) => {
    let celsius;
    const val = parseFloat(value) || 0;

    // Convert to Celsius first
    if (from === "celsius") celsius = val;
    else if (from === "fahrenheit") celsius = ((val - 32) * 5) / 9;
    else if (from === "kelvin") celsius = val - 273.15;

    // Convert from Celsius to target
    if (to === "celsius") return celsius;
    else if (to === "fahrenheit") return (celsius * 9) / 5 + 32;
    else if (to === "kelvin") return celsius + 273.15;

    return 0;
  };

  const convertValue = () => {
    const value = parseFloat(inputValue) || 0;
    const cat = categories[category];

    if (cat.isSpecial && category === "temperature") {
      return convertTemperature(value, fromUnit, toUnit).toFixed(6);
    }

    const fromFactor = cat.conversions[fromUnit];
    const toFactor = cat.conversions[toUnit];

    if (fromFactor && toFactor) {
      const baseValue = value * fromFactor;
      return (baseValue / toFactor).toFixed(6);
    }

    return 0;
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = convertValue();

  const CategoryIcon = categories[category].icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <RefreshCw className="w-10 h-10 text-blue-600" />
          Unit Converter
        </h1>
        <p className="text-gray-600 text-lg">
          Convert between different units of measurement instantly
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Converter */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              {/* Category Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {Object.entries(categories).map(([key, { icon: Icon }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setCategory(key);
                        const catUnits = categories[key].units;
                        setFromUnit(catUnits[0]);
                        setToUnit(catUnits[1] || catUnits[0]);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        category === key
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Icon
                          className={`w-6 h-6 mb-2 ${
                            category === key ? "text-blue-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium capitalize ${
                            category === key ? "text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {key}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Converter */}
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-6">
                  {/* From Unit */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-4 py-4 pr-24 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl font-semibold"
                        placeholder="Enter value"
                      />
                      <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories[category].units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="pt-8">
                    <button
                      onClick={swapUnits}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <RefreshCw className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* To Unit */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={result}
                        readOnly
                        className="w-full px-4 py-4 pr-24 border border-gray-300 rounded-xl bg-gray-50 text-2xl font-semibold"
                      />
                      <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories[category].units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Quick Conversions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Conversions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[0.5, 2, 5, 10].map((multiplier) => (
                      <button
                        key={multiplier}
                        onClick={() => setInputValue(multiplier.toString())}
                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                      >
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">
                            {multiplier} {fromUnit}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            ={" "}
                            {(
                              (parseFloat(inputValue || 0) *
                                multiplier *
                                categories[category].conversions[fromUnit]) /
                              categories[category].conversions[toUnit]
                            ).toFixed(4)}{" "}
                            {toUnit}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6">
          {/* Current Conversion */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <CategoryIcon className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 capitalize">
                {category} Conversion
              </h3>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {inputValue || 0}
                </div>
                <div className="text-gray-600 capitalize">{fromUnit}</div>
              </div>
              <div className="text-center text-gray-500">equals</div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {result}
                </div>
                <div className="text-gray-600 capitalize">{toUnit}</div>
              </div>
            </div>
          </div>

          {/* Common Conversions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Common Conversions
            </h3>
            <div className="space-y-3">
              {category === "length" && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 meter =</span>
                    <span className="font-medium">3.28084 feet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 kilometer =</span>
                    <span className="font-medium">0.621371 miles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 inch =</span>
                    <span className="font-medium">2.54 centimeters</span>
                  </div>
                </>
              )}
              {category === "temperature" && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">0°C =</span>
                    <span className="font-medium">32°F</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">100°C =</span>
                    <span className="font-medium">212°F</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">0°C =</span>
                    <span className="font-medium">273.15K</span>
                  </div>
                </>
              )}
              {category === "weight" && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 kilogram =</span>
                    <span className="font-medium">2.20462 pounds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1 ounce =</span>
                    <span className="font-medium">28.3495 grams</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conversion Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Calculator className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Double-check important conversions</span>
              </li>
              <li className="flex items-start gap-2">
                <Calculator className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Use appropriate precision for your needs</span>
              </li>
              <li className="flex items-start gap-2">
                <Calculator className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Remember temperature conversions are not linear</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          About Unit Conversion
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Measurement Systems
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Metric System
                </h4>
                <p className="text-sm text-gray-600">
                  Used worldwide, based on powers of 10. Includes meters,
                  liters, grams, etc.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Imperial System
                </h4>
                <p className="text-sm text-gray-600">
                  Primarily used in the United States. Includes feet, pounds,
                  gallons, etc.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Important Notes
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>
                  Temperature conversions use different formulas than other
                  units
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>
                  Some units have multiple definitions (e.g., US vs UK gallons)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>
                  Always specify which measurement system you're using
                </span>
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

export default UnitConverter;
