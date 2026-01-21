# Smart Tools

Smart Tools is a modern, responsive web application that provides 100+ free online tools to boost productivity for developers, designers, and everyday users. All tools are completely free, fast, and privacy-focused with no login required.

---

# Screenshots
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/9be15812-57ff-4d57-9e09-fb1b0951ba22" />
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/85aa7969-f8ec-436b-b072-bfa9c1b719ce" />
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/61e8bc23-cbb1-445f-8b56-72f8e92dc2a7" />
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/6383c95d-42e1-4963-8a1a-15f0417cb88a" />
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/5f3a3c22-7198-481c-91a7-d15e5253ed25" />
<img width="1915" height="961" alt="Image" src="https://github.com/user-attachments/assets/50e9e7be-4d65-48ba-a363-1a60e93a4017" />

##  Features

- ⚡ Instant access to tools without signup
- 🧰 100+ smart tools for developers and general users
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔐 Privacy-first approach (most tools run in the browser)
- 📩 EmailJS integration for:
  - Contact form
  - Feature request submissions
- ❓ Interactive FAQ section
- 🎨 Modern UI built with Tailwind CSS
- 🚀 Fast navigation using React Router

---

## 🛠 Tech Stack

- Frontend: React.js
- Styling: Tailwind CSS
- Routing: React Router DOM
- Icons: Lucide React
- Email Service: EmailJS
- State Management: React Hooks (useState)
- Build Tool: Vite

---

## 📂 Project Structure

src/
│── components/
│   └── sections/
│       ├── HeroSection.jsx
│       ├── CategoriesSection.jsx
│       └── FeaturesSection.jsx
│
│── pages/
│   └── HomePage.jsx
│
│── App.jsx
│── main.jsx

---

## 📩 EmailJS Integration

EmailJS is used for handling user communication without a backend.

### Used For:
- Contact form messages
- Feature request submissions

### Setup Steps:
1. Create an account at https://www.emailjs.com
2. Create an Email Service
3. Create an Email Template
4. Get your:
   - SERVICE_ID
   - TEMPLATE_ID
   - PUBLIC_KEY

### Example Usage:

emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  formData,
  "YOUR_PUBLIC_KEY"
);

---

## ❓ FAQ Highlights

- Smart Tools is 100% free
- No account or login required
- Works on all devices
- Supports many file formats (PDF, JPG, PNG, DOCX, TXT, JSON, CSV, etc.)
- Secure and privacy-friendly

---

## ▶️ Getting Started

### Clone the Repository

git clone https://github.com/shayanshahDeveloper/smart_tools

### Install Dependencies

npm install

### Run the Project

npm run dev

---

## 📸 UI Overview

The homepage includes:
- Hero Section
- Categories Section
- Features Section
- Call to Action
- FAQ Section
- Live Stats & Testimonials

---

## 👨‍💻 Author

Shayan Shah  
MERN Stack Developer

- LinkedIn: https://www.linkedin.com/in/shayan-shah-dev/
- Email: shayanshahdev@gmail.com

---

## 📜 License

This project is open-source and free to use for learning and personal projects.

---

⭐ If you find this project useful, please give it a star on GitHub!
