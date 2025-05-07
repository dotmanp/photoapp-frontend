
# 🎨 Photo Share App — Frontend

This is the **React + Tailwind CSS** frontend for the Photo Share App.  
It connects to a RESTful backend and supports both *creator* and *consumer* user flows.

---

## ⚙️ Tech Stack

- React (with React Router)
- Tailwind CSS
- Fetch API (JWT secured requests)

---

## 📁 Folder Structure

```
photo-app-frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Creator.jsx
│   │   ├── Feed.jsx
│   │   └── LogoutButton.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── public/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🧪 Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. App runs on [http://localhost:3000](http://localhost:3000)

> Make sure your backend server is running at `http://localhost:3000/api`  
> or update the `BASE_URL` in components to match your API host.

---

## ✨ Features

- JWT-based login & role-aware routing
- Creator UI for uploading media
- Consumer UI for viewing, liking, commenting, and rating
- Tailwind styled UI components

---

## 🌐 Deployment

This frontend can be deployed to:
- Vercel
- Netlify
- Azure Blob Static Website
- GitHub Pages

---

## 📜 License

MIT — for academic and demo use.
