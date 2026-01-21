import { useState, useEffect } from "react";
import {
  User,
  Sparkles,
  Copy,
  Heart,
  BookOpen,
  Globe,
  Filter,
  RefreshCw,
  Check,
  Star,
  Users,
  Hash,
  CaseSensitive,
} from "lucide-react";



const NameGenerator = () => {
  const [category, setCategory] = useState("all");
  const [gender, setGender] = useState("any");
  const [origin, setOrigin] = useState("all");
  const [style, setStyle] = useState("modern");
  const [nameLength, setNameLength] = useState("any");
  const [generatedNames, setGeneratedNames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);

  const nameDatabase = {
    modern: [
      {
        name: "Aiden",
        gender: "male",
        origin: "english",
        meaning: "Little fire",
        syllables: 2,
      },
      {
        name: "Olivia",
        gender: "female",
        origin: "latin",
        meaning: "Olive tree",
        syllables: 3,
      },
      {
        name: "Liam",
        gender: "male",
        origin: "irish",
        meaning: "Strong-willed warrior",
        syllables: 1,
      },
      {
        name: "Emma",
        gender: "female",
        origin: "german",
        meaning: "Universal",
        syllables: 2,
      },
      {
        name: "Noah",
        gender: "male",
        origin: "hebrew",
        meaning: "Rest, comfort",
        syllables: 2,
      },
      {
        name: "Ava",
        gender: "female",
        origin: "latin",
        meaning: "Bird",
        syllables: 2,
      },
      {
        name: "Mia",
        gender: "female",
        origin: "italian",
        meaning: "Mine",
        syllables: 2,
      },
      {
        name: "Ethan",
        gender: "male",
        origin: "hebrew",
        meaning: "Strong, firm",
        syllables: 2,
      },
      {
        name: "Sophia",
        gender: "female",
        origin: "greek",
        meaning: "Wisdom",
        syllables: 3,
      },
      {
        name: "Jackson",
        gender: "male",
        origin: "english",
        meaning: "Son of Jack",
        syllables: 2,
      },
    ],
    traditional: [
      {
        name: "William",
        gender: "male",
        origin: "german",
        meaning: "Resolute protector",
        syllables: 3,
      },
      {
        name: "Elizabeth",
        gender: "female",
        origin: "hebrew",
        meaning: "God is my oath",
        syllables: 4,
      },
      {
        name: "James",
        gender: "male",
        origin: "hebrew",
        meaning: "Supplanter",
        syllables: 1,
      },
      {
        name: "Mary",
        gender: "female",
        origin: "hebrew",
        meaning: "Bitter",
        syllables: 2,
      },
      {
        name: "Robert",
        gender: "male",
        origin: "german",
        meaning: "Bright fame",
        syllables: 2,
      },
      {
        name: "Margaret",
        gender: "female",
        origin: "greek",
        meaning: "Pearl",
        syllables: 3,
      },
      {
        name: "John",
        gender: "male",
        origin: "hebrew",
        meaning: "God is gracious",
        syllables: 1,
      },
      {
        name: "Catherine",
        gender: "female",
        origin: "greek",
        meaning: "Pure",
        syllables: 3,
      },
      {
        name: "Charles",
        gender: "male",
        origin: "german",
        meaning: "Free man",
        syllables: 1,
      },
      {
        name: "Anne",
        gender: "female",
        origin: "hebrew",
        meaning: "Grace",
        syllables: 1,
      },
    ],
    unique: [
      {
        name: "Zephyr",
        gender: "unisex",
        origin: "greek",
        meaning: "West wind",
        syllables: 2,
      },
      {
        name: "Lyra",
        gender: "female",
        origin: "greek",
        meaning: "Lyre",
        syllables: 2,
      },
      {
        name: "Orion",
        gender: "male",
        origin: "greek",
        meaning: "Hunter",
        syllables: 3,
      },
      {
        name: "Seraphina",
        gender: "female",
        origin: "hebrew",
        meaning: "Fiery ones",
        syllables: 4,
      },
      {
        name: "Atlas",
        gender: "male",
        origin: "greek",
        meaning: "Bearer of the heavens",
        syllables: 2,
      },
      {
        name: "Nova",
        gender: "female",
        origin: "latin",
        meaning: "New",
        syllables: 2,
      },
      {
        name: "Phoenix",
        gender: "unisex",
        origin: "greek",
        meaning: "Dark red",
        syllables: 2,
      },
      {
        name: "Luna",
        gender: "female",
        origin: "latin",
        meaning: "Moon",
        syllables: 2,
      },
      {
        name: "Kairo",
        gender: "male",
        origin: "egyptian",
        meaning: "Victorious one",
        syllables: 2,
      },
      {
        name: "Wren",
        gender: "unisex",
        origin: "english",
        meaning: "Small bird",
        syllables: 1,
      },
    ],
    fantasy: [
      {
        name: "Arya",
        gender: "female",
        origin: "sanskrit",
        meaning: "Noble",
        syllables: 3,
      },
      {
        name: "Draven",
        gender: "male",
        origin: "english",
        meaning: "Hunter",
        syllables: 2,
      },
      {
        name: "Elara",
        gender: "female",
        origin: "greek",
        meaning: "Moon of Jupiter",
        syllables: 3,
      },
      {
        name: "Kael",
        gender: "male",
        origin: "irish",
        meaning: "Mighty warrior",
        syllables: 1,
      },
      {
        name: "Lyanna",
        gender: "female",
        origin: "english",
        meaning: "Grace",
        syllables: 3,
      },
      {
        name: "Thorin",
        gender: "male",
        origin: "norse",
        meaning: "Daring",
        syllables: 2,
      },
      {
        name: "Morgana",
        gender: "female",
        origin: "welsh",
        meaning: "Sea circle",
        syllables: 3,
      },
      {
        name: "Gideon",
        gender: "male",
        origin: "hebrew",
        meaning: "Great warrior",
        syllables: 3,
      },
      {
        name: "Isolde",
        gender: "female",
        origin: "welsh",
        meaning: "Fair lady",
        syllables: 3,
      },
      {
        name: "Caspian",
        gender: "male",
        origin: "english",
        meaning: "From Caspian Sea",
        syllables: 3,
      },
    ],
  };

  const categories = [
    { id: "all", name: "All Names", icon: "🌐" },
    { id: "modern", name: "Modern", icon: "⚡" },
    { id: "traditional", name: "Traditional", icon: "🏛️" },
    { id: "unique", name: "Unique", icon: "✨" },
    { id: "fantasy", name: "Fantasy", icon: "🧙" },
    { id: "unisex", name: "Unisex", icon: "⚧️" },
  ];

  const genders = [
    { id: "any", name: "Any Gender" },
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "unisex", name: "Unisex" },
  ];

  const origins = [
    { id: "all", name: "All Origins" },
    { id: "english", name: "English" },
    { id: "greek", name: "Greek" },
    { id: "latin", name: "Latin" },
    { id: "hebrew", name: "Hebrew" },
    { id: "german", name: "German" },
    { id: "irish", name: "Irish" },
  ];

  const nameLengths = [
    { id: "any", name: "Any Length" },
    { id: "short", name: "Short (1-3 letters)" },
    { id: "medium", name: "Medium (4-6 letters)" },
    { id: "long", name: "Long (7+ letters)" },
  ];

  const generateNames = () => {
    let allNames = [];

    // Combine names from selected style(s)
    if (style === "all") {
      Object.values(nameDatabase).forEach((styleNames) => {
        allNames.push(...styleNames);
      });
    } else {
      allNames = [...nameDatabase[style]];
    }

    // Apply filters
    let filteredNames = allNames.filter((name) => {
      // Gender filter
      if (
        gender !== "any" &&
        name.gender !== gender &&
        name.gender !== "unisex"
      ) {
        return false;
      }

      // Origin filter
      if (origin !== "all" && name.origin !== origin) {
        return false;
      }

      // Name length filter
      if (nameLength !== "any") {
        const nameLen = name.name.length;
        if (nameLength === "short" && nameLen > 3) return false;
        if (nameLength === "medium" && (nameLen < 4 || nameLen > 6))
          return false;
        if (nameLength === "long" && nameLen < 7) return false;
      }

      return true;
    });

    // Shuffle and pick 8 names
    const shuffled = [...filteredNames].sort(() => 0.5 - Math.random());
    const selectedNames = shuffled.slice(0, 8);

    setGeneratedNames(selectedNames);
  };

  const toggleFavorite = (name) => {
    const isFavorite = favorites.some((fav) => fav.name === name.name);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== name.name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const copyToClipboard = (name) => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearFilters = () => {
    setCategory("all");
    setGender("any");
    setOrigin("all");
    setStyle("modern");
    setNameLength("any");
  };

  useEffect(() => {
    generateNames();
  }, []);

  const getPopularityScore = (name) => {
    // Mock popularity calculation
    const baseScore = 50;
    const lengthBonus = 10 - Math.min(name.name.length, 10);
    const syllableBonus = name.syllables * 5;
    const styleBonus =
      style === "modern" ? 20 : style === "traditional" ? 15 : 10;

    return Math.min(baseScore + lengthBonus + syllableBonus + styleBonus, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <User className="w-10 h-10 text-indigo-600" />
          Name Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Discover perfect names for your characters, babies, or projects with
          advanced filters and meanings.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Filters & Settings */}
        <div className="space-y-6">
          {/* Category Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Name Categories
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                      category === cat.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-medium text-sm">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Advanced Filters
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {genders.map((gen) => (
                    <button
                      key={gen.id}
                      onClick={() => setGender(gen.id)}
                      className={`py-3 rounded-lg font-medium ${
                        gender === gen.id
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {gen.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origin Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Origin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {origins.map((orig) => (
                    <button
                      key={orig.id}
                      onClick={() => setOrigin(orig.id)}
                      className={`py-3 rounded-lg font-medium ${
                        origin === orig.id
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {orig.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Name Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setStyle("modern")}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      style === "modern"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Modern
                  </button>
                  <button
                    onClick={() => setStyle("traditional")}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      style === "traditional"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Traditional
                  </button>
                  <button
                    onClick={() => setStyle("unique")}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      style === "unique"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    Unique
                  </button>
                  <button
                    onClick={() => setStyle("fantasy")}
                    className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                      style === "fantasy"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Fantasy
                  </button>
                </div>
              </div>

              {/* Length Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Name Length
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {nameLengths.map((len) => (
                    <button
                      key={len.id}
                      onClick={() => setNameLength(len.id)}
                      className={`py-3 rounded-lg font-medium ${
                        nameLength === len.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {len.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={generateNames}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate New Names
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">
                Click generate to create new names with current filters
              </p>
            </div>
          </div>

          {/* Popular Names */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-600" />
              Trending Names
            </h3>
            <div className="space-y-3">
              {[
                { name: "Luna", trend: "+15%", style: "Modern" },
                { name: "Kai", trend: "+12%", style: "Unisex" },
                { name: "Atlas", trend: "+10%", style: "Unique" },
                { name: "Nova", trend: "+8%", style: "Modern" },
              ].map((trending, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {trending.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {trending.style}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {trending.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Generated Names */}
        <div className="lg:col-span-2 space-y-6">
          {/* Generated Names Grid */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Generated Names
                </h2>
                <div className="text-sm text-gray-600">
                  {generatedNames.length} names found
                </div>
              </div>
            </div>

            <div className="p-6">
              {generatedNames.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {generatedNames.map((name, idx) => {
                    const isFavorite = favorites.some(
                      (fav) => fav.name === name.name
                    );
                    const popularity = getPopularityScore(name);

                    return (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="text-2xl font-bold text-gray-900">
                            {name.name}
                          </div>
                          <button
                            onClick={() => toggleFavorite(name)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isFavorite ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="text-xs font-medium text-gray-500">
                              {name.gender === "male"
                                ? "♂️ Male"
                                : name.gender === "female"
                                ? "♀️ Female"
                                : "⚧️ Unisex"}
                            </div>
                            <div className="text-xs font-medium text-gray-500">
                              • {name.syllables} syllables
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">
                            {name.meaning}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Globe className="w-3 h-3" />
                            {name.origin.charAt(0).toUpperCase() +
                              name.origin.slice(1)}
                          </div>
                        </div>

                        {/* Popularity Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Popularity</span>
                            <span>{popularity}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${popularity}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(name.name)}
                            className="flex-1 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-200 flex items-center justify-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                          <button className="flex-1 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200">
                            Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    No Names Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to find more names.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg"
                  >
                    <Filter className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-4 border-b border-pink-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Your Favorites
                  </h2>
                  <div className="text-sm text-gray-600">
                    {favorites.length} saved
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {favorites.slice(0, 4).map((fav, idx) => (
                    <div
                      key={idx}
                      className="bg-pink-50 rounded-xl p-4 border border-pink-100"
                    >
                      <div className="text-xl font-bold text-gray-900 mb-2">
                        {fav.name}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        {fav.meaning}
                      </div>
                      <div className="text-xs text-gray-500">
                        {fav.origin.charAt(0).toUpperCase() +
                          fav.origin.slice(1)}{" "}
                        • {fav.gender}
                      </div>
                    </div>
                  ))}
                </div>
                {favorites.length > 4 && (
                  <div className="text-center mt-4 text-sm text-gray-600">
                    + {favorites.length - 4} more favorites
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Name Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Name Statistics
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {generatedNames.length}
                  </div>
                  <div className="text-sm text-gray-700">Generated Names</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-gray-700">Favorites</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {generatedNames.filter((n) => n.gender === "unisex").length}
                  </div>
                  <div className="text-sm text-gray-700">Unisex Names</div>
                </div>
                <div className="bg-pink-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600 mb-1">
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </div>
                  <div className="text-sm text-gray-700">Current Style</div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Perfect For
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Baby Names</div>
                <div className="text-sm text-gray-600">
                  Find the perfect name for your newborn
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Character Names
                </div>
                <div className="text-sm text-gray-600">
                  Names for books, games, and stories
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">
                  Business Names
                </div>
                <div className="text-sm text-gray-600">
                  Creative names for brands and projects
                </div>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">Usernames</div>
                <div className="text-sm text-gray-600">
                  Unique handles for social media
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Filter className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Advanced Filters
          </h3>
          <p className="text-gray-600">
            Filter by gender, origin, style, and length to find the perfect name
            for any purpose.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Name Meanings
          </h3>
          <p className="text-gray-600">
            Every name comes with its origin and meaning, helping you choose
            names with significance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Save Favorites
          </h3>
          <p className="text-gray-600">
            Save your favorite names and compare them later. Export your list
            for easy reference.
          </p>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Name Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              By Gender & Style
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: "Modern Boy Names",
                  count: "125+",
                  trend: "🔥 Popular",
                },
                {
                  name: "Elegant Girl Names",
                  count: "98+",
                  trend: "✨ Trending",
                },
                {
                  name: "Strong Unisex Names",
                  count: "75+",
                  trend: "⚡ Rising",
                },
                {
                  name: "Traditional Classics",
                  count: "200+",
                  trend: "🏛️ Timeless",
                },
              ].map((category, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-white/50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.count} names
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                    {category.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              By Origin & Culture
            </h3>
            <div className="space-y-3">
              {[
                {
                  origin: "Greek & Latin",
                  example: "Athena, Julian",
                  count: "85",
                },
                {
                  origin: "Nordic & Celtic",
                  example: "Freya, Liam",
                  count: "62",
                },
                {
                  origin: "Hebrew & Arabic",
                  example: "Elijah, Aaliyah",
                  count: "73",
                },
                {
                  origin: "Japanese & Korean",
                  example: "Sakura, Min",
                  count: "48",
                },
              ].map((origin, idx) => (
                <div key={idx} className="p-3 bg-white/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">
                      {origin.origin}
                    </div>
                    <div className="text-sm font-medium text-indigo-600">
                      {origin.count}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Example: {origin.example}
                  </div>
                </div>
              ))}
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
            <div className="text-xs mt-1">Support free tools development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameGenerator;
