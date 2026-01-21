import React from "react";
import BMICalculator from "./bmi-calculator";
import CalorieCounter from "./calorie-counter";
import WorkoutPlanner from "./workout-planner";

const PlaceholderComponent = ({ name }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
    <p className="text-gray-600 text-lg mb-8">This tool is under development</p>
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-12">
      <div className="text-3xl font-bold text-gray-400">Coming Soon</div>
    </div>
  </div>
);

export const healthTools = [
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    component: BMICalculator,
    description: "Calculate Body Mass Index",
    icon: "Heart",
    tags: ["health", "calculator", "bmi"],
    color: "rose",
    popular: true,
  },
  {
    id: "calorie-counter",
    name: "Calorie Counter",
    component: CalorieCounter,
    description: "Track and count daily calories",
    icon: "Apple",
    tags: ["health", "calorie", "diet"],
    color: "green",
  },
  {
    id: "workout-planner",
    name: "Workout Planner",
    component: WorkoutPlanner,
    description: "Create and plan workout routines",
    icon: "Dumbbell",
    tags: ["health", "workout", "fitness"],
    color: "blue",
  },
];

export { BMICalculator, CalorieCounter, WorkoutPlanner };
