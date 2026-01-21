import { useState } from "react";
import {
  Calculator,
  Plus,
  Trash2,
  RefreshCw,
  TrendingUp,
  Award,
} from "lucide-react";

const GPACalculator = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", creditHours: 3, grade: "A" },
    { id: 2, name: "Physics", creditHours: 4, grade: "B+" },
    { id: 3, name: "English", creditHours: 3, grade: "A-" },
  ]);

  const [semesterName, setSemesterName] = useState("Fall 2024");
  const [scale, setScale] = useState("4.0"); // 4.0, 5.0, or 10.0 scale

  const gradePoints = {
    "4.0": {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    },
    "5.0": {
      A: 5.0,
      "A-": 4.5,
      "B+": 4.0,
      B: 3.5,
      "B-": 3.0,
      "C+": 2.5,
      C: 2.0,
      "C-": 1.5,
      "D+": 1.0,
      D: 0.5,
      F: 0.0,
    },
    "10.0": {
      A: 10.0,
      "A-": 9.0,
      "B+": 8.0,
      B: 7.0,
      "B-": 6.0,
      "C+": 5.0,
      C: 4.0,
      "C-": 3.0,
      "D+": 2.0,
      D: 1.0,
      F: 0.0,
    },
  };

  const calculateGPA = () => {
    let totalCreditHours = 0;
    let totalGradePoints = 0;

    courses.forEach((course) => {
      const creditHours = parseFloat(course.creditHours) || 0;
      const gradePoint = gradePoints[scale][course.grade] || 0;

      totalCreditHours += creditHours;
      totalGradePoints += creditHours * gradePoint;
    });

    if (totalCreditHours === 0) return { gpa: 0, totalCreditHours: 0 };

    return {
      gpa: (totalGradePoints / totalCreditHours).toFixed(2),
      totalCreditHours,
    };
  };

  const addCourse = () => {
    const newId =
      courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([
      ...courses,
      { id: newId, name: `Course ${newId}`, creditHours: 3, grade: "B" },
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) {
      alert("You must have at least one course");
      return;
    }
    setCourses(courses.filter((course) => course.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: "Course 1", creditHours: 3, grade: "B" }]);
    setSemesterName("Fall 2024");
    setScale("4.0");
  };

  const { gpa, totalCreditHours } = calculateGPA();

  const getGPAColor = (gpa) => {
    const num = parseFloat(gpa);
    const max = parseFloat(scale);
    const percentage = (num / max) * 100;

    if (percentage >= 90) return "from-green-500 to-emerald-500";
    if (percentage >= 80) return "from-blue-500 to-cyan-500";
    if (percentage >= 70) return "from-yellow-500 to-orange-500";
    if (percentage >= 60) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getGPAStatus = (gpa) => {
    const num = parseFloat(gpa);
    const max = parseFloat(scale);
    const percentage = (num / max) * 100;

    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Good";
    if (percentage >= 70) return "Satisfactory";
    if (percentage >= 60) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          GPA Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate your Grade Point Average (GPA) for any semester or
          cumulative GPA
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Input & Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {semesterName} GPA
                  </h2>
                  <p className="text-gray-600">
                    Enter your courses and grades below
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA Scale
                    </label>
                    <select
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="4.0">4.0 Scale</option>
                      <option value="5.0">5.0 Scale</option>
                      <option value="10.0">10.0 Scale</option>
                    </select>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Course Input */}
              <div className="space-y-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name
                      </label>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) =>
                          updateCourse(course.id, "name", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credit Hours
                      </label>
                      <select
                        value={course.creditHours}
                        onChange={(e) =>
                          updateCourse(course.id, "creditHours", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade
                      </label>
                      <select
                        value={course.grade}
                        onChange={(e) =>
                          updateCourse(course.id, "grade", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Object.keys(gradePoints[scale]).map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Course Button */}
              <button
                onClick={addCourse}
                className="mt-6 w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <Plus className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-600">
                  Add Another Course
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* GPA Display */}
          <div
            className={`bg-gradient-to-br ${getGPAColor(
              gpa
            )} rounded-2xl p-8 text-white`}
          >
            <div className="text-center">
              <div className="text-sm font-medium opacity-90 mb-2">
                SEMESTER GPA
              </div>
              <div className="text-6xl font-bold mb-2">{gpa}</div>
              <div className="text-lg opacity-90">on {scale} scale</div>
              <div className="mt-4 text-lg font-semibold">
                {getGPAStatus(gpa)}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Semester Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Total Credit Hours
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {totalCreditHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Courses Taken</div>
                    <div className="text-xl font-bold text-gray-900">
                      {courses.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  Grade Scale Reference
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {Object.entries(gradePoints[scale])
                    .slice(0, 6)
                    .map(([grade, points]) => (
                      <span key={grade} className="inline-block mr-3">
                        {grade}: {points}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              GPA Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>
                  Focus on credit-heavy courses for maximum GPA impact
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Maintain consistency across semesters</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5"></div>
                <span>Use this for planning future semesters</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            How GPA is Calculated
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              GPA (Grade Point Average) is calculated by multiplying the grade
              points for each course by the credit hours, summing these values,
              and dividing by the total credit hours.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm">
                GPA = Σ(Credit Hours × Grade Points) ÷ Total Credit Hours
              </code>
            </div>
            <p>
              For example, if you get an A (4.0) in a 3-credit course and a B
              (3.0) in a 4-credit course:
              <br />
              GPA = ((3 × 4.0) + (4 × 3.0)) ÷ (3 + 4) = (12 + 12) ÷ 7 = 3.43
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Common GPA Scales
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                4.0 Scale (Most Common)
              </h4>
              <p className="text-sm text-gray-600">
                Used by most US colleges and universities. A = 4.0, B = 3.0, C =
                2.0, D = 1.0, F = 0.0
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                5.0 Scale (Weighted)
              </h4>
              <p className="text-sm text-gray-600">
                Often used for honors/AP classes. Adds extra points for advanced
                courses.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">10.0 Scale</h4>
              <p className="text-sm text-gray-600">
                Common in some international systems. A = 10.0, B = 8.0, C =
                6.0, etc.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 text-center">
        <div className="text-gray-500 mb-2">Advertisement</div>
        <div className="h-[90px] flex items-center justify-center bg-white rounded-xl border border-gray-300">
          <div className="text-gray-400">
            Ad Space (728x90)
            <div className="text-xs mt-1">Your ad could be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
