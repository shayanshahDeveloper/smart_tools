import { useState, useEffect } from "react";
import {
  Flame,
  Apple,
  Pizza,
  Coffee,
  Salad,
  Fish,
  Beef,
  GlassWater,
  Activity,
  TrendingDown,
  Target,
  Clock,
  Plus,
  Minus,
  Search,
  Trash2,
  Edit,
  Check,
  X,
  BarChart3,
  Calculator,
  Heart,
  AlertCircle,
  Users,
  Target as TargetIcon,
} from "lucide-react";

const CalorieCounter = () => {
  // State for basic user info
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");

  // State for calorie calculations
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);

  // State for food tracking
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  // Sample food database
  const foodDatabase = [
    {
      id: 1,
      name: "Apple",
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      category: "fruit",
      icon: Apple,
    },
    {
      id: 2,
      name: "Banana",
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.4,
      category: "fruit",
      icon: Apple,
    },
    {
      id: 3,
      name: "Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      category: "protein",
      icon: Beef,
    },
    {
      id: 4,
      name: "Salmon",
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13,
      category: "protein",
      icon: Fish,
    },
    {
      id: 5,
      name: "Brown Rice",
      calories: 216,
      protein: 5,
      carbs: 45,
      fat: 1.8,
      category: "grain",
      icon: Salad,
    },
    {
      id: 6,
      name: "Avocado",
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      category: "vegetable",
      icon: Salad,
    },
    {
      id: 7,
      name: "Whole Wheat Bread",
      calories: 81,
      protein: 4,
      carbs: 14,
      fat: 1,
      category: "grain",
      icon: Pizza,
    },
    {
      id: 8,
      name: "Greek Yogurt",
      calories: 100,
      protein: 10,
      carbs: 6,
      fat: 0,
      category: "dairy",
      icon: Coffee,
    },
    {
      id: 9,
      name: "Almonds",
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      category: "nuts",
      icon: Salad,
    },
    {
      id: 10,
      name: "Egg",
      calories: 78,
      protein: 6,
      carbs: 0.6,
      fat: 5,
      category: "protein",
      icon: Apple,
    },
    {
      id: 11,
      name: "Spinach",
      calories: 7,
      protein: 0.9,
      carbs: 1,
      fat: 0.1,
      category: "vegetable",
      icon: Salad,
    },
    {
      id: 12,
      name: "Sweet Potato",
      calories: 103,
      protein: 2,
      carbs: 24,
      fat: 0.2,
      category: "vegetable",
      icon: Salad,
    },
    {
      id: 13,
      name: "Oatmeal",
      calories: 158,
      protein: 6,
      carbs: 27,
      fat: 3.2,
      category: "grain",
      icon: Coffee,
    },
    {
      id: 14,
      name: "Broccoli",
      calories: 55,
      protein: 3.7,
      carbs: 11,
      fat: 0.6,
      category: "vegetable",
      icon: Salad,
    },
    {
      id: 15,
      name: "Orange Juice",
      calories: 112,
      protein: 1.7,
      carbs: 26,
      fat: 0.5,
      category: "drink",
      icon: GlassWater,
    },
  ];

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  // Goal adjustments (calories per day)
  const goalAdjustments = {
    lose: -500,
    maintain: 0,
    gain: 300,
  };

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    // Convert to metric if needed
    let heightInCm = unit === "metric" ? height : height * 2.54;
    let weightInKg = unit === "metric" ? weight : weight * 0.453592;

    if (gender === "male") {
      return 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      return 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    return bmr * activityMultipliers[activityLevel];
  };

  // Calculate target calories based on goal
  const calculateTargetCalories = () => {
    return tdee + goalAdjustments[goal];
  };

  // Calculate macronutrient goals
  const calculateMacros = () => {
    const proteinRatio = goal === "lose" ? 0.35 : goal === "gain" ? 0.25 : 0.3;
    const fatRatio = 0.3;
    const carbRatio = 1 - proteinRatio - fatRatio;

    const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    const carbGrams = Math.round((targetCalories * carbRatio) / 4);

    return { protein: proteinGrams, fat: fatGrams, carbs: carbGrams };
  };

  // Calculate current day's macros
  const calculateCurrentMacros = () => {
    const allFoods = [
      ...meals.breakfast,
      ...meals.lunch,
      ...meals.dinner,
      ...meals.snacks,
    ];
    return allFoods.reduce(
      (acc, food) => ({
        protein: acc.protein + (food.protein || 0),
        fat: acc.fat + (food.fat || 0),
        carbs: acc.carbs + (food.carbs || 0),
        calories: acc.calories + (food.calories || 0),
      }),
      { protein: 0, fat: 0, carbs: 0, calories: 0 }
    );
  };

  // Add food to meal
  const addFoodToMeal = (food) => {
    const foodWithId = { ...food, id: Date.now() + Math.random() };
    setMeals((prev) => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], foodWithId],
    }));
    setIsAddingFood(false);
  };

  // Remove food from meal
  const removeFoodFromMeal = (mealType, foodId) => {
    setMeals((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((food) => food.id !== foodId),
    }));
  };

  // Update water intake
  const updateWaterIntake = (amount) => {
    setWaterIntake((prev) => Math.max(0, prev + amount));
  };

  // Filter food database based on search
  const filteredFoods = searchQuery
    ? foodDatabase.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : foodDatabase.slice(0, 8);

  // Calculate daily calories
  useEffect(() => {
    const total = Object.values(meals)
      .flat()
      .reduce((sum, food) => sum + food.calories, 0);
    setDailyCalories(total);
  }, [meals]);

  // Calculate BMR, TDEE, and target calories when inputs change
  useEffect(() => {
    const calculatedBMR = calculateBMR();
    setBmr(calculatedBMR);

    const calculatedTDEE = calculateTDEE();
    setTdee(calculatedTDEE);

    const calculatedTargetCalories = calculateTargetCalories();
    setTargetCalories(calculatedTargetCalories);
  }, [gender, age, height, weight, activityLevel, goal, unit]);

  const macros = calculateMacros();
  const currentMacros = calculateCurrentMacros();
  const remainingCalories = targetCalories - dailyCalories;
  const waterGoal = weight * 0.033; // 33ml per kg of body weight (liters)

  // Activity level options
  const activityOptions = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little or no exercise",
    },
    {
      value: "light",
      label: "Light",
      description: "Light exercise 1-3 days/week",
    },
    {
      value: "moderate",
      label: "Moderate",
      description: "Moderate exercise 3-5 days/week",
    },
    {
      value: "active",
      label: "Active",
      description: "Hard exercise 6-7 days/week",
    },
    {
      value: "veryActive",
      label: "Very Active",
      description: "Very hard exercise & physical job",
    },
  ];

  // Goal options
  const goalOptions = [
    { value: "lose", label: "Lose Weight", color: "from-blue-600 to-cyan-600" },
    {
      value: "maintain",
      label: "Maintain Weight",
      color: "from-green-600 to-emerald-600",
    },
    {
      value: "gain",
      label: "Gain Weight",
      color: "from-yellow-600 to-orange-600",
    },
  ];

  // Meal options
  const mealOptions = [
    { value: "breakfast", label: "Breakfast", icon: Coffee },
    { value: "lunch", label: "Lunch", icon: Salad },
    { value: "dinner", label: "Dinner", icon: Beef },
    { value: "snacks", label: "Snacks", icon: Apple },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Flame className="w-10 h-10 text-orange-600" />
          Calorie Counter & Nutrition Tracker
        </h1>
        <p className="text-gray-600 text-lg">
          Track your daily calorie intake, set nutrition goals, and monitor your
          progress towards a healthier lifestyle.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Calorie Calculator & Food Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calorie Calculator */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-orange-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Daily Calorie Needs Calculator
              </h2>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setGender("male")}
                        className={`py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                          gender === "male"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        Male
                      </button>
                      <button
                        onClick={() => setGender("female")}
                        className={`py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                          gender === "female"
                            ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        Female
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAge((prev) => Math.max(15, prev - 1))}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {age}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          years
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setAge((prev) => Math.min(100, prev + 1))
                        }
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setHeight((prev) =>
                            Math.max(unit === "metric" ? 100 : 48, prev - 1)
                          )
                        }
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {height}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {unit === "metric" ? "cm" : "in"}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setHeight((prev) =>
                            Math.min(unit === "metric" ? 250 : 96, prev + 1)
                          )
                        }
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setWeight((prev) =>
                            Math.max(unit === "metric" ? 30 : 66, prev - 1)
                          )
                        }
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {weight}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {unit === "metric" ? "kg" : "lbs"}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setWeight((prev) =>
                            Math.min(unit === "metric" ? 200 : 440, prev + 1)
                          )
                        }
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activity Level & Goals */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Activity Level
                    </label>
                    <div className="space-y-2">
                      {activityOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setActivityLevel(option.value)}
                          className={`w-full p-3 text-left rounded-lg transition-all ${
                            activityLevel === option.value
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs opacity-75">
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Your Goal
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {goalOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setGoal(option.value)}
                          className={`py-3 rounded-xl font-medium text-center ${
                            goal === option.value
                              ? `bg-gradient-to-r ${option.color} text-white shadow-md`
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Unit System
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setUnit("metric")}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            unit === "metric"
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          Metric
                        </button>
                        <button
                          onClick={() => setUnit("imperial")}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            unit === "imperial"
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          Imperial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="text-sm text-blue-600 font-medium mb-1">
                    BMR
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {bmr.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600">
                    Calories/day at rest
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="text-sm text-green-600 font-medium mb-1">
                    TDEE
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {tdee.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600">
                    Total daily expenditure
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl">
                  <div className="text-sm text-orange-600 font-medium mb-1">
                    Target
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {targetCalories.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600">
                    Calories/day for your goal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Tracking */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Food Diary
                </h2>
                <div className="text-sm font-medium text-gray-700">
                  Total:{" "}
                  <span className="text-2xl font-bold text-green-600 ml-2">
                    {dailyCalories}
                  </span>{" "}
                  kcal
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Meal Selection */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {mealOptions.map((meal) => {
                  const Icon = meal.icon;
                  const mealCalories = meals[meal.value].reduce(
                    (sum, food) => sum + food.calories,
                    0
                  );
                  return (
                    <button
                      key={meal.value}
                      onClick={() => setSelectedMeal(meal.value)}
                      className={`py-3 rounded-xl font-medium flex flex-col items-center gap-1 ${
                        selectedMeal === meal.value
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{meal.label}</span>
                      <span className="text-xs">{mealCalories} kcal</span>
                    </button>
                  );
                })}
              </div>

              {/* Add Food Button */}
              <button
                onClick={() => setIsAddingFood(true)}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all mb-6"
              >
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">
                    Add Food to{" "}
                    {selectedMeal.charAt(0).toUpperCase() +
                      selectedMeal.slice(1)}
                  </span>
                </div>
              </button>

              {/* Food Search Modal */}
              {isAddingFood && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Add Food
                      </h3>
                      <button
                        onClick={() => setIsAddingFood(false)}
                        className="p-1 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for foods..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {filteredFoods.map((food) => {
                        const FoodIcon = food.icon;
                        return (
                          <button
                            key={food.id}
                            onClick={() => addFoodToMeal(food)}
                            className="w-full p-3 flex items-center justify-between hover:bg-gray-50 rounded-lg mb-1"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                <FoodIcon className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900">
                                  {food.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {food.category}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                {food.calories} kcal
                              </div>
                              <div className="text-xs text-gray-500">
                                P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Current Meal Foods */}
              <div className="space-y-3">
                {meals[selectedMeal].length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Apple className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <div>No foods added to this meal yet</div>
                    <div className="text-sm">
                      Click "Add Food" to get started
                    </div>
                  </div>
                ) : (
                  meals[selectedMeal].map((food) => {
                    const FoodIcon = food.icon || Apple;
                    return (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <FoodIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {food.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {food.protein}g protein • {food.carbs}g carbs •{" "}
                              {food.fat}g fat
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {food.calories} kcal
                            </div>
                            <div className="text-xs text-gray-600">
                              per serving
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              removeFoodFromMeal(selectedMeal, food.id)
                            }
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Progress & Macros */}
        <div className="space-y-6">
          {/* Daily Progress */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm">
            <div className="px-6 py-4 border-b border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Today's Progress
              </h2>
            </div>

            <div className="p-6">
              {/* Calorie Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    Calories
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {dailyCalories} / {targetCalories.toFixed(0)} kcal
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (dailyCalories / targetCalories) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>
                    {remainingCalories > 0
                      ? `${remainingCalories.toFixed(0)} left`
                      : `${Math.abs(remainingCalories).toFixed(0)} over`}
                  </span>
                  <span>{targetCalories.toFixed(0)}</span>
                </div>
              </div>

              {/* Macronutrient Progress */}
              <div className="space-y-4">
                {Object.entries(macros).map(([macro, target]) => {
                  const current = currentMacros[macro] || 0;
                  const percentage = Math.min(100, (current / target) * 100);
                  const colors = {
                    protein: "from-blue-500 to-cyan-500",
                    carbs: "from-green-500 to-emerald-500",
                    fat: "from-yellow-500 to-orange-500",
                  };

                  return (
                    <div key={macro}>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium text-gray-700 capitalize">
                          {macro}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {current.toFixed(0)} / {target}g
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors[macro]} transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Water Tracker */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 shadow-sm">
            <div className="px-6 py-4 border-b border-cyan-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Water Intake
                </h2>
                <div className="text-sm font-medium text-cyan-600">
                  {waterIntake.toFixed(1)} / {waterGoal.toFixed(1)} L
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 border-8 border-cyan-200 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 border-8 border-cyan-300 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 border-8 border-cyan-400 rounded-full flex items-center justify-center">
                        <GlassWater className="w-8 h-8 text-cyan-500" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {waterIntake.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">liters</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[0.25, 0.5, 0.75].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => updateWaterIntake(amount)}
                    className="py-3 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-xl font-medium flex flex-col items-center"
                  >
                    <Plus className="w-4 h-4 mb-1" />
                    <span>{amount} L</span>
                  </button>
                ))}
                {[1, 1.5, 2].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => updateWaterIntake(amount)}
                    className="py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium flex flex-col items-center"
                  >
                    <Plus className="w-4 h-4 mb-1" />
                    <span>{amount} L</span>
                  </button>
                ))}
                <button
                  onClick={() => updateWaterIntake(-0.25)}
                  className="py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium flex flex-col items-center col-span-3"
                >
                  <Minus className="w-4 h-4 mb-1" />
                  <span>Remove 0.25 L</span>
                </button>
              </div>
            </div>
          </div>

          {/* Macronutrient Goals */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <TargetIcon className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Macronutrient Goals
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-blue-700">Protein</div>
                    <div className="font-bold text-gray-900">
                      {macros.protein}g
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Essential for muscle repair and growth
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-green-700">
                      Carbohydrates
                    </div>
                    <div className="font-bold text-gray-900">
                      {macros.carbs}g
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Primary energy source for your body
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-yellow-700">Fats</div>
                    <div className="font-bold text-gray-900">{macros.fat}g</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Important for hormone production and nutrient absorption
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Daily Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Calories Consumed</span>
                <span className="font-bold text-purple-600">
                  {dailyCalories} kcal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Calories Remaining</span>
                <span
                  className={`font-bold ${
                    remainingCalories >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {remainingCalories.toFixed(0)} kcal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Water Progress</span>
                <span className="font-bold text-cyan-600">
                  {((waterIntake / waterGoal) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Meals Tracked</span>
                <span className="font-bold text-purple-600">
                  {Object.values(meals).reduce(
                    (sum, meal) => sum + meal.length,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Apple className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Healthy Eating Tips
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Focus on whole, unprocessed foods</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Include protein in every meal</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Stay hydrated throughout the day</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Weight Management
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Aim for 0.5-1kg weight loss per week</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Combine diet with regular exercise</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Be consistent and patient with progress</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Important Notes
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Calorie needs are estimates</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Individual results may vary</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Consult professional for medical advice</span>
            </li>
          </ul>
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

export default CalorieCounter;
