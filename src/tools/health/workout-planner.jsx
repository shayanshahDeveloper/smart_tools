import { useState, useEffect } from "react";
import {
  Dumbbell,
  Target,
  Calendar,
  Clock,
  Flame,
  Heart,
  Zap,
  Award,
  Check,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  X,
  TrendingUp,
  Users,
  Timer,
  Activity,
  BarChart3,
  Star,
  Target as TargetIcon,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  CheckCircle,
  Circle,
  AlertCircle,
  Info,
  Activity as ActivityIcon,
  Target as TargetIcon2,
  // Icons that might not exist - replace with alternatives
  // Running, // Doesn't exist - replace with Activity
  // Medal, // Doesn't exist - replace with Award
} from "lucide-react";

const WorkoutPlanner = () => {
  // State for user fitness level and goals
  const [fitnessLevel, setFitnessLevel] = useState("beginner");
  const [primaryGoal, setPrimaryGoal] = useState("weightLoss");
  const [workoutDays, setWorkoutDays] = useState(3);
  const [workoutDuration, setWorkoutDuration] = useState(45);
  const [focusAreas, setFocusAreas] = useState(["fullBody"]);

  // State for generated workout plan
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);

  // State for workout timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [restTimerActive, setRestTimerActive] = useState(false);
  const [restSeconds, setRestSeconds] = useState(60);

  // State for workout progress
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  // Exercise database
  const exerciseDatabase = {
    chest: [
      {
        id: 1,
        name: "Push-ups",
        sets: 3,
        reps: "10-15",
        duration: null,
        calories: 50,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 2,
        name: "Bench Press",
        sets: 4,
        reps: "8-12",
        duration: null,
        calories: 60,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 3,
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "10-12",
        duration: null,
        calories: 55,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 4,
        name: "Chest Fly",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    back: [
      {
        id: 5,
        name: "Pull-ups",
        sets: 3,
        reps: "8-12",
        duration: null,
        calories: 60,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 6,
        name: "Bent-over Rows",
        sets: 4,
        reps: "10-12",
        duration: null,
        calories: 55,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 7,
        name: "Lat Pulldown",
        sets: 3,
        reps: "10-15",
        duration: null,
        calories: 50,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 8,
        name: "Face Pulls",
        sets: 3,
        reps: "15-20",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    legs: [
      {
        id: 9,
        name: "Squats",
        sets: 4,
        reps: "8-12",
        duration: null,
        calories: 70,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 10,
        name: "Lunges",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 55,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 11,
        name: "Leg Press",
        sets: 4,
        reps: "10-15",
        duration: null,
        calories: 60,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 12,
        name: "Calf Raises",
        sets: 3,
        reps: "15-20",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    shoulders: [
      {
        id: 13,
        name: "Overhead Press",
        sets: 3,
        reps: "8-12",
        duration: null,
        calories: 50,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
      {
        id: 14,
        name: "Lateral Raises",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 15,
        name: "Front Raises",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 16,
        name: "Shrugs",
        sets: 3,
        reps: "15-20",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    arms: [
      {
        id: 17,
        name: "Bicep Curls",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 18,
        name: "Tricep Dips",
        sets: 3,
        reps: "10-15",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 19,
        name: "Hammer Curls",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 20,
        name: "Tricep Pushdown",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    core: [
      {
        id: 21,
        name: "Plank",
        sets: 3,
        reps: null,
        duration: "60s",
        calories: 35,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 22,
        name: "Crunches",
        sets: 3,
        reps: "15-20",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 23,
        name: "Russian Twists",
        sets: 3,
        reps: "20-25",
        duration: null,
        calories: 45,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 24,
        name: "Leg Raises",
        sets: 3,
        reps: "12-15",
        duration: null,
        calories: 40,
        difficulty: "Beginner",
        videoUrl: "#",
      },
    ],
    cardio: [
      {
        id: 25,
        name: "Jumping Jacks",
        sets: 3,
        reps: null,
        duration: "60s",
        calories: 80,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 26,
        name: "High Knees",
        sets: 3,
        reps: null,
        duration: "45s",
        calories: 75,
        difficulty: "Beginner",
        videoUrl: "#",
      },
      {
        id: 27,
        name: "Burpees",
        sets: 3,
        reps: "10-12",
        duration: null,
        calories: 100,
        difficulty: "Advanced",
        videoUrl: "#",
      },
      {
        id: 28,
        name: "Mountain Climbers",
        sets: 3,
        reps: null,
        duration: "45s",
        calories: 70,
        difficulty: "Intermediate",
        videoUrl: "#",
      },
    ],
  };

  // Fitness level options
  const fitnessLevels = [
    {
      value: "beginner",
      label: "Beginner",
      description: "New to exercise or returning after break",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      description: "Regularly exercise 2-3 times/week",
    },
    {
      value: "advanced",
      label: "Advanced",
      description: "Consistent training experience",
    },
  ];

  // Goal options - Updated icons to use only valid ones
  const goalOptions = [
    {
      value: "weightLoss",
      label: "Weight Loss",
      icon: TrendingUp,
      color: "from-blue-600 to-cyan-600",
    },
    {
      value: "muscleGain",
      label: "Muscle Gain",
      icon: Zap,
      color: "from-green-600 to-emerald-600",
    },
    {
      value: "strength",
      label: "Strength",
      icon: Target,
      color: "from-yellow-600 to-orange-600",
    },
    {
      value: "endurance",
      label: "Endurance",
      icon: ActivityIcon,
      color: "from-purple-600 to-pink-600",
    },
    {
      value: "toning",
      label: "Toning",
      icon: Heart,
      color: "from-red-600 to-rose-600",
    },
  ];

  // Focus area options
  const focusAreaOptions = [
    {
      value: "fullBody",
      label: "Full Body",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      value: "upperBody",
      label: "Upper Body",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "lowerBody",
      label: "Lower Body",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "core",
      label: "Core/Abs",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "cardio", label: "Cardio", color: "bg-red-100 text-red-800" },
  ];

  // Day of week options
  const dayOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  // Generate workout plan based on user preferences
  const generateWorkoutPlan = () => {
    const plan = [];
    const availableDays = [...dayOptions].slice(0, workoutDays);

    availableDays.forEach((day, index) => {
      let dayFocus = focusAreas;
      if (focusAreas.includes("fullBody")) {
        dayFocus = [
          "chest",
          "back",
          "legs",
          "shoulders",
          "arms",
          "core",
          "cardio",
        ];
      }

      const dayExercises = [];
      dayFocus.forEach((area) => {
        if (exerciseDatabase[area]) {
          const availableExercises = exerciseDatabase[area];
          const selectedExercise =
            availableExercises[
              Math.floor(Math.random() * Math.min(availableExercises.length, 2))
            ];
          if (selectedExercise) {
            dayExercises.push({
              ...selectedExercise,
              completed: false,
              notes: "",
            });
          }
        }
      });

      // Limit exercises based on workout duration
      const maxExercises = Math.floor(workoutDuration / 10);
      const finalExercises = dayExercises.slice(0, Math.min(maxExercises, 8));

      plan.push({
        day: day.value,
        dayLabel: day.label,
        exercises: finalExercises,
        completed: false,
        calories: finalExercises.reduce((sum, ex) => sum + ex.calories, 0),
        duration: workoutDuration,
      });
    });

    setWorkoutPlan(plan);
    if (plan.length > 0) {
      setCurrentWorkout(plan[0]);
    }
  };

  // Start workout
  const startWorkout = (workout) => {
    setCurrentWorkout(workout);
    setCurrentExercise(0);
    setTimerSeconds(0);
    setTimerActive(true);
  };

  // Complete exercise
  const completeExercise = (exerciseIndex) => {
    if (currentWorkout) {
      const updatedExercises = [...currentWorkout.exercises];
      updatedExercises[exerciseIndex].completed = true;

      setCurrentWorkout({
        ...currentWorkout,
        exercises: updatedExercises,
      });

      // Calculate calories burned
      const exerciseCalories = updatedExercises[exerciseIndex].calories || 0;
      setTotalCaloriesBurned((prev) => prev + exerciseCalories);

      // Start rest timer
      setRestTimerActive(true);
      setRestSeconds(60);
    }
  };

  // Complete workout
  const completeWorkout = () => {
    if (currentWorkout) {
      const updatedPlan = workoutPlan.map((workout) =>
        workout.day === currentWorkout.day
          ? { ...workout, completed: true }
          : workout
      );

      setWorkoutPlan(updatedPlan);
      setCompletedWorkouts([...completedWorkouts, currentWorkout.day]);
      setCurrentWorkout(null);
      setTimerActive(false);
      setRestTimerActive(false);

      // Update weekly progress
      const newProgress = ((completedWorkouts.length + 1) / workoutDays) * 100;
      setWeeklyProgress(Math.min(100, newProgress));
    }
  };

  // Timer effects
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    let interval;
    if (restTimerActive && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restSeconds === 0) {
      setRestTimerActive(false);
      setCurrentExercise((prev) => prev + 1);
    }
    return () => clearInterval(interval);
  }, [restTimerActive, restSeconds]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate weekly progress
  useEffect(() => {
    const progress = (completedWorkouts.length / workoutDays) * 100;
    setWeeklyProgress(progress);
  }, [completedWorkouts, workoutDays]);

  // Initialize workout plan
  useEffect(() => {
    generateWorkoutPlan();
  }, [fitnessLevel, primaryGoal, workoutDays, workoutDuration, focusAreas]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Dumbbell className="w-10 h-10 text-indigo-600" />
          Workout Planner
        </h1>
        <p className="text-gray-600 text-lg">
          Create personalized workout plans based on your fitness level, goals,
          and schedule. Track your progress and stay motivated!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Planner Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workout Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Workout Preferences
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Fitness Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Fitness Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {fitnessLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setFitnessLevel(level.value)}
                        className={`p-4 rounded-xl text-center transition-all ${
                          fitnessLevel === level.value
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        <div className="font-medium mb-1">{level.label}</div>
                        <div className="text-xs opacity-75">
                          {level.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Goal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Primary Goal
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {goalOptions.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.value}
                          onClick={() => setPrimaryGoal(goal.value)}
                          className={`p-3 rounded-xl flex flex-col items-center gap-2 ${
                            primaryGoal === goal.value
                              ? `bg-gradient-to-r ${goal.color} text-white shadow-md`
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {goal.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workout Days & Duration */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days per Week: {workoutDays} days
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      value={workoutDays}
                      onChange={(e) => setWorkoutDays(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 day</span>
                      <span>7 days</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration per Workout: {workoutDuration} min
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="5"
                      value={workoutDuration}
                      onChange={(e) =>
                        setWorkoutDuration(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>15 min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Focus Areas
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {focusAreaOptions.map((area) => (
                      <button
                        key={area.value}
                        onClick={() => {
                          if (area.value === "fullBody") {
                            setFocusAreas(["fullBody"]);
                          } else {
                            setFocusAreas((prev) => {
                              const newAreas = prev.filter(
                                (a) => a !== "fullBody"
                              );
                              if (newAreas.includes(area.value)) {
                                return newAreas.filter((a) => a !== area.value);
                              } else {
                                return [...newAreas, area.value];
                              }
                            });
                          }
                        }}
                        className={`p-3 rounded-xl text-center font-medium ${
                          focusAreas.includes(area.value)
                            ? `${area.color} shadow-md`
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <button
                    onClick={generateWorkoutPlan}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg"
                  >
                    Generate Workout Plan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Workout Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Weekly Workout Plan
                </h2>
                <div className="text-sm font-medium text-gray-700">
                  {completedWorkouts.length} of {workoutDays} completed
                </div>
              </div>
            </div>

            <div className="p-6">
              {workoutPlan.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Dumbbell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <div>No workout plan generated yet</div>
                  <div className="text-sm">
                    Adjust your preferences and click "Generate Workout Plan"
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutPlan.map((workout) => (
                    <div
                      key={workout.day}
                      className={`p-4 rounded-xl border ${
                        workout.completed
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                          : currentWorkout?.day === workout.day
                          ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              workout.completed
                                ? "bg-green-100 text-green-600"
                                : "bg-indigo-100 text-indigo-600"
                            }`}
                          >
                            {workout.completed ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Calendar className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {workout.dayLabel}
                            </div>
                            <div className="text-sm text-gray-600">
                              {workout.exercises.length} exercises •{" "}
                              {workout.duration} min
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {workout.calories}
                            </div>
                            <div className="text-xs text-gray-600">
                              calories
                            </div>
                          </div>
                          {!workout.completed && (
                            <button
                              onClick={() => startWorkout(workout)}
                              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90"
                            >
                              {currentWorkout?.day === workout.day
                                ? "Continue"
                                : "Start"}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {workout.exercises.slice(0, 4).map((exercise, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg text-sm ${
                              exercise.completed
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="font-medium truncate">
                              {exercise.name}
                            </div>
                            <div className="text-xs">
                              {exercise.sets} sets •{" "}
                              {exercise.reps || exercise.duration}
                            </div>
                          </div>
                        ))}
                        {workout.exercises.length > 4 && (
                          <div className="p-2 rounded-lg bg-gray-100 text-gray-700 text-sm flex items-center justify-center">
                            +{workout.exercises.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Active Workout & Progress */}
        <div className="space-y-6">
          {/* Active Workout */}
          {currentWorkout && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm">
              <div className="px-6 py-4 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Active Workout
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimerActive(!timerActive)}
                      className="p-2 hover:bg-blue-100 rounded-lg"
                    >
                      {timerActive ? (
                        <Pause className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                    <button
                      onClick={() => setTimerSeconds(0)}
                      className="p-2 hover:bg-blue-100 rounded-lg"
                    >
                      <RotateCcw className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Timer */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="text-sm text-gray-600">Workout Duration</div>
                </div>

                {/* Current Exercise */}
                {currentExercise < currentWorkout.exercises.length ? (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {currentWorkout.exercises[currentExercise].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Exercise {currentExercise + 1} of{" "}
                          {currentWorkout.exercises.length}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">
                          {currentWorkout.exercises[currentExercise].calories}
                        </div>
                        <div className="text-xs text-gray-600">calories</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {currentWorkout.exercises[currentExercise].sets}
                          </div>
                          <div className="text-sm text-gray-600">Sets</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {currentWorkout.exercises[currentExercise].reps ||
                              currentWorkout.exercises[currentExercise]
                                .duration}
                          </div>
                          <div className="text-sm text-gray-600">
                            {currentWorkout.exercises[currentExercise].reps
                              ? "Reps"
                              : "Duration"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rest Timer */}
                    {restTimerActive && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600 mb-2">
                            {restSeconds}s
                          </div>
                          <div className="text-sm text-gray-700">Rest Time</div>
                          <div className="text-xs text-gray-600">
                            Next exercise starts automatically
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => completeExercise(currentExercise)}
                      disabled={restTimerActive}
                      className={`w-full py-3 rounded-xl font-bold text-lg ${
                        restTimerActive
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90"
                      }`}
                    >
                      Complete Exercise
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <div className="text-xl font-bold text-gray-900 mb-2">
                      Workout Complete!
                    </div>
                    <div className="text-gray-600 mb-6">
                      Great job completing all exercises
                    </div>
                    <button
                      onClick={completeWorkout}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:opacity-90"
                    >
                      Finish Workout
                    </button>
                  </div>
                )}

                {/* Exercise Progress */}
                <div className="space-y-2">
                  {currentWorkout.exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        idx === currentExercise
                          ? "bg-blue-100 border-2 border-blue-200"
                          : exercise.completed
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            exercise.completed
                              ? "bg-green-500 text-white"
                              : idx === currentExercise
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {exercise.completed ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <div className="text-xs">{idx + 1}</div>
                          )}
                        </div>
                        <div className="font-medium">{exercise.name}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {exercise.sets}×{exercise.reps || exercise.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress Tracking */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Weekly Progress
              </h2>
            </div>

            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    Weekly Goal
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {completedWorkouts.length} of {workoutDays} workouts
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${weeklyProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>{weeklyProgress.toFixed(0)}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">Calories Burned</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {totalCaloriesBurned}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Total Workout Time</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {formatTime(timerSeconds)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Workouts Completed</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {completedWorkouts.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-700">Weekly Streak</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {completedWorkouts.length} days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Library */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-indigo-600" />
              Exercise Library
            </h3>
            <div className="space-y-3">
              {Object.entries(exerciseDatabase)
                .slice(0, 4)
                .map(([category, exercises]) => (
                  <div key={category} className="p-3 bg-white/70 rounded-lg">
                    <div className="font-medium text-gray-900 mb-2 capitalize">
                      {category}
                    </div>
                    <div className="text-sm text-gray-600">
                      {exercises.length} exercises available
                    </div>
                  </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium">
              Browse All Exercises
            </button>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 mb-2">Quick Tips</div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Always warm up before starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Stay hydrated throughout workout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Focus on form over weight</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Personalized Plans
          </h3>
          <p className="text-gray-600">
            Generate workout plans tailored to your fitness level, goals, and
            schedule with intelligent exercise selection.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Timer className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Live Workout Tracking
          </h3>
          <p className="text-gray-600">
            Track your workouts in real-time with built-in timer, rest periods,
            and exercise completion tracking.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Progress Monitoring
          </h3>
          <p className="text-gray-600">
            Monitor your weekly progress, calories burned, and workout
            consistency with detailed statistics.
          </p>
        </div>
      </div>

      {/* Workout Tips */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Essential Workout Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Before Workout</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Warm up for 5-10 minutes with dynamic stretches</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Stay hydrated throughout the day</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Have a light snack 30-60 minutes before</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5"></div>
                <span>Wear appropriate workout clothing and shoes</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">After Workout</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Cool down with static stretching</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Refuel with protein and carbs within 45 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Stay hydrated to replace lost fluids</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Get adequate rest for muscle recovery</span>
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

export default WorkoutPlanner;
