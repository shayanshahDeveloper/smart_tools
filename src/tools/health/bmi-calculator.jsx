import { useState, useEffect } from "react";
import {
  Scale,
  TrendingUp,
  Heart,
  Calculator,
  AlertCircle,
  Info,
  Target,
  Check,
  Activity,
  User,
  Ruler,
  Weight,
  Bell,
} from "lucide-react";

const BMICalculator = () => {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [healthyRange, setHealthyRange] = useState({ min: 0, max: 0 });

  const calculateBMI = () => {
    let heightInMeters = unit === "metric" ? height / 100 : height * 0.0254;
    let weightInKg = unit === "metric" ? weight : weight * 0.453592;

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue);

    // Determine category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }

    // Calculate healthy weight range
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);
    setHealthyRange({
      min: unit === "metric" ? minHealthyWeight : minHealthyWeight * 2.20462,
      max: unit === "metric" ? maxHealthyWeight : maxHealthyWeight * 2.20462,
    });
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight, unit]);

  const bmiCategories = [
    {
      range: "< 18.5",
      category: "Underweight",
      color: "from-blue-600 to-cyan-600",
      risk: "Low",
      description: "May need to gain weight",
    },
    {
      range: "18.5 - 24.9",
      category: "Normal weight",
      color: "from-green-600 to-emerald-600",
      risk: "Very low",
      description: "Healthy weight range",
    },
    {
      range: "25 - 29.9",
      category: "Overweight",
      color: "from-yellow-600 to-orange-600",
      risk: "Increased",
      description: "May need to lose weight",
    },
    {
      range: "30 - 34.9",
      category: "Obese (Class I)",
      color: "from-orange-600 to-red-600",
      risk: "High",
      description: "Health risks present",
    },
    {
      range: "35 - 39.9",
      category: "Obese (Class II)",
      color: "from-red-600 to-pink-600",
      risk: "Very high",
      description: "High health risks",
    },
    {
      range: "≥ 40",
      category: "Obese (Class III)",
      color: "from-purple-600 to-indigo-600",
      risk: "Extremely high",
      description: "Severe health risks",
    },
  ];

  const getBMIColor = () => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    if (bmi < 35) return "text-orange-600";
    if (bmi < 40) return "text-red-600";
    return "text-purple-600";
  };

  const getBmiBarColor = () => {
    if (bmi < 18.5) return "bg-blue-500";
    if (bmi < 25) return "bg-green-500";
    if (bmi < 30) return "bg-yellow-500";
    if (bmi < 35) return "bg-orange-500";
    if (bmi < 40) return "bg-red-500";
    return "bg-purple-500";
  };

  const getBmiBarPosition = () => {
    const maxBmi = 40;
    const minBmi = 15;
    const position = ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
    return Math.min(100, Math.max(0, position));
  };

  const recommendations = {
    underweight: [
      "Increase calorie intake with nutrient-dense foods",
      "Include protein-rich foods in every meal",
      "Strength training to build muscle mass",
      "Eat more frequent, smaller meals",
      "Consult a dietitian for personalized advice",
    ],
    normal: [
      "Maintain current healthy lifestyle",
      "Regular exercise (150 minutes/week)",
      "Balanced diet with fruits and vegetables",
      "Regular health check-ups",
      "Stay hydrated and get enough sleep",
    ],
    overweight: [
      "Reduce calorie intake by 500-750 calories/day",
      "Increase physical activity to 300 minutes/week",
      "Limit processed foods and sugary drinks",
      "Include more fiber in your diet",
      "Track your food intake and exercise",
    ],
    obese: [
      "Consult healthcare professional for guidance",
      "Consider medical supervision for weight loss",
      "Start with low-impact exercises",
      "Focus on sustainable lifestyle changes",
      "Join a support group or program",
    ],
  };

  const getRecommendations = () => {
    if (bmi < 18.5) return recommendations.underweight;
    if (bmi < 25) return recommendations.normal;
    if (bmi < 30) return recommendations.overweight;
    return recommendations.obese;
  };

  const idealWeight =
    healthyRange.min.toFixed(1) + " - " + healthyRange.max.toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Scale className="w-10 h-10 text-indigo-600" />
          BMI Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate your Body Mass Index (BMI) and understand your weight
          category. Get personalized recommendations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Unit Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Measurement Units
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUnit("metric")}
                  className={`py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    unit === "metric"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Ruler className="w-5 h-5" />
                  Metric (cm, kg)
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    unit === "imperial"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Ruler className="w-5 h-5" />
                  Imperial (in, lbs)
                </button>
              </div>
            </div>
          </div>

          {/* Input Parameters */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Enter Your Details
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Height */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Height
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {height} {unit === "metric" ? "cm" : "in"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === "metric" ? 100 : 48}
                    max={unit === "metric" ? 250 : 96}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{unit === "metric" ? "100 cm" : "4 ft"}</span>
                    <span>{unit === "metric" ? "250 cm" : "8 ft"}</span>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {weight} {unit === "metric" ? "kg" : "lbs"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === "metric" ? 30 : 66}
                    max={unit === "metric" ? 200 : 440}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{unit === "metric" ? "30 kg" : "66 lbs"}</span>
                    <span>{unit === "metric" ? "200 kg" : "440 lbs"}</span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <span className="text-sm font-medium text-indigo-600">
                      {age} years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>18</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGender("male")}
                      className={`py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        gender === "male"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      Male
                    </button>
                    <button
                      onClick={() => setGender("female")}
                      className={`py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                        gender === "female"
                          ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      Female
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BMI Categories */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                BMI Categories
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {bmiCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl bg-gradient-to-r ${cat.color} text-white`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg">{cat.category}</div>
                        <div className="text-sm opacity-90">{cat.range}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{cat.risk} Risk</div>
                        <div className="text-sm opacity-90">
                          {cat.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* BMI Result Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Your BMI Result
              </h2>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {bmi.toFixed(1)}
                </div>
                <div className={`text-xl font-bold ${getBMIColor()} mb-1`}>
                  {category}
                </div>
                <div className="text-sm text-gray-600">Body Mass Index</div>
              </div>

              {/* BMI Scale */}
              <div className="mb-6">
                <div className="h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full mb-2 relative">
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-6 bg-white border-2 border-gray-800 rounded-full"
                    style={{ left: `${getBmiBarPosition()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              {/* Healthy Weight Range */}
              <div className="bg-white/70 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <div className="text-sm font-medium text-gray-700">
                    Healthy Weight Range
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {idealWeight} {unit === "metric" ? "kg" : "lbs"}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  For your height of {height} {unit === "metric" ? "cm" : "in"}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white/70 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <div className="text-sm font-medium text-gray-700">
                    Health Risk Assessment
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  {bmi < 18.5 &&
                    "Low risk, but may indicate nutritional deficiencies"}
                  {bmi >= 18.5 &&
                    bmi < 25 &&
                    "Lowest risk for weight-related health problems"}
                  {bmi >= 25 &&
                    bmi < 30 &&
                    "Increased risk for cardiovascular diseases"}
                  {bmi >= 30 &&
                    "High risk for diabetes, heart disease, and other conditions"}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommendations
                </h2>
              </div>
            </div>

            <div className="p-6">
              <ul className="space-y-3">
                {getRecommendations().map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Health Insights
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Metabolic Age</span>
                <span className="font-bold text-indigo-600">
                  {Math.max(age - Math.floor((bmi - 22) * 2), 18)} years
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Body Fat Estimate</span>
                <span className="font-bold text-indigo-600">
                  {gender === "male"
                    ? (bmi * 1.2 + 0.23 * age - 16.2).toFixed(1)
                    : (bmi * 1.2 + 0.23 * age - 5.4).toFixed(1)}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Calories to Maintain</span>
                <span className="font-bold text-indigo-600">
                  {Math.round(
                    10 * weight +
                      6.25 * height -
                      5 * age +
                      (gender === "male" ? 5 : -161)
                  )}{" "}
                  kcal/day
                </span>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Important Note
                </div>
                <div className="text-sm text-gray-700">
                  BMI is a screening tool, not a diagnostic measure. It doesn't
                  account for muscle mass, bone density, or distribution of fat.
                  Consult a healthcare professional for personalized assessment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Scale className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Accurate Calculation
          </h3>
          <p className="text-gray-600">
            Calculate BMI using both metric and imperial units with real-time
            updates as you adjust measurements.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Health Insights
          </h3>
          <p className="text-gray-600">
            Get detailed analysis including risk assessment, healthy weight
            range, and metabolic insights.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Personalized Recommendations
          </h3>
          <p className="text-gray-600">
            Receive actionable advice based on your BMI category to help achieve
            and maintain a healthy weight.
          </p>
        </div>
      </div>

      {/* BMI Limitations */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Understanding BMI Limitations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              What BMI Doesn't Consider
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>
                  Muscle mass vs. fat mass (athletes may show high BMI)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Bone density and body frame size</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Fat distribution (waist circumference matters)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Age, sex, and ethnic differences</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Additional Metrics to Consider
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Waist-to-hip ratio</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Body fat percentage</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Blood pressure and cholesterol levels</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Physical fitness level and activity</span>
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

export default BMICalculator;
