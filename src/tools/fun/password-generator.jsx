import { useState, useEffect } from "react";
import {
  Lock,
  Copy,
  RefreshCw,
  Check,
  Shield,
  Zap,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [strength, setStrength] = useState("Strong");
  const [strengthScore, setStrengthScore] = useState(80);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const similarChars = "il1Lo0O";
  const ambiguousChars = "{}[]()/\\'\"`~,;:.<>";

  const generatePassword = () => {
    let charset = "";
    let generatedPassword = "";

    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += symbols;

    if (excludeSimilar) {
      charset = charset
        .split("")
        .filter((char) => !similarChars.includes(char))
        .join("");
    }

    if (excludeAmbiguous) {
      charset = charset
        .split("")
        .filter((char) => !ambiguousChars.includes(char))
        .join("");
    }

    if (charset.length === 0) {
      alert("Please select at least one character type");
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  const calculateStrength = (pass) => {
    let score = 0;

    if (pass.length >= 8) score += 10;
    if (pass.length >= 12) score += 10;
    if (pass.length >= 16) score += 10;
    if (pass.length >= 20) score += 10;

    if (/[a-z]/.test(pass)) score += 10;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 20;

    if (/(.)\1{2,}/.test(pass)) score -= 15;
    if (/123|abc|qwerty|password/i.test(pass)) score -= 30;

    score = Math.max(0, Math.min(100, score));
    setStrengthScore(score);

    if (score >= 80) setStrength("Very Strong");
    else if (score >= 60) setStrength("Strong");
    else if (score >= 40) setStrength("Good");
    else if (score >= 20) setStrength("Weak");
    else setStrength("Very Weak");
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetPasswords = [
    {
      length: 12,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      name: "Standard",
    },
    {
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      name: "Strong",
    },
    {
      length: 20,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      name: "Maximum",
    },
    {
      length: 8,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      name: "Basic",
    },
  ];

  const applyPreset = (preset) => {
    setLength(preset.length);
    setIncludeUppercase(preset.uppercase);
    setIncludeLowercase(preset.lowercase);
    setIncludeNumbers(preset.numbers);
    setIncludeSymbols(preset.symbols);
    generatePassword();
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const getStrengthBarColor = () => {
    if (strengthScore >= 80) return "bg-emerald-500";
    if (strengthScore >= 60) return "bg-blue-500";
    if (strengthScore >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Lock className="w-10 h-10 text-indigo-600" />
          Password Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Generate strong passwords with custom options.
        </p>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Generated Password Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated Password
              </h2>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    readOnly
                    className="w-full px-6 py-4 text-xl font-mono bg-gray-50 border border-gray-300 rounded-xl"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <button
                  onClick={copyToClipboard}
                  className={`px-6 py-4 rounded-xl font-semibold flex items-center gap-2 ${
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-indigo-600 text-white hover:shadow"
                  }`}
                >
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Strength Bar */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">
                    Password Strength
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {strength}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthBarColor()} transition-all`}
                    style={{ width: `${strengthScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Presets
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetPasswords.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(preset)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-indigo-50"
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-sm text-gray-600">
                      {preset.length} chars
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <button
              onClick={generatePassword}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-3"
            >
              <RefreshCw />
              Generate New Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
