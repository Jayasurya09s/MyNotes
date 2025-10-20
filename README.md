#  MyNotes - Full Stack Notes Application

A modern, full-stack notes application built with React, Node.js, Express, and MongoDB. Create, edit, and manage your notes seamlessly with cloud sync for logged-in users and local storage for guests.

##  Live Demo

- **Frontend**: (https://my-notes-jka8.vercel.app)
- **Backend API**:(https://mynotes-kmb3.onrender.com)

##  Features

-  **User Authentication** - Firebase authentication with Google Sign-In
-  **Cloud Sync** - Logged-in users get cloud storage via MongoDB
-  **Guest Mode** - Non-authenticated users can use local storage
-  **CRUD Operations** - Create, Read, Update, and Delete notes
-  **Modern UI** - Beautiful gradient design with Tailwind CSS
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
-  **Secure** - Rate limiting and user-specific data access
-  **Fast** - Optimized performance with efficient data fetching

##  Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Firebase** - Authentication
- **React Toastify** - Notifications
- **UUID** - Unique ID generation for local notes
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Upstash** - Rate limiting
- **dotenv** - Environment variables

##  Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Firebase project
- npm 

### Clone the Repository
```bash
git clone https://github.com/Jayasurya09s/MyNotes.git
cd mynotes
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend root:
```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend root:
```env
VITE_API_URL=http://localhost:5001/api/notes

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server:
```bash
npm run dev
```

5. Open (http://localhost:5173) in your browser

## 🚀 Deployment

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard
5. Deploy!

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `VITE_API_URL=https://mynotes-kmb3.onrender/api/notes.com`
   - Add all Firebase configuration variables
5. Deploy!

##  Project Structure

```
mynotes/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   └── Navbar.jsx
│   │   │   └── Notecard.jsx
│   │   │   └── MultiColorTitle.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthProvider.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateNotePage.jsx
│   │   │   ├── NoteDetailPage.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │   ├── .env
│   │   ├── .gitignore
│   ├── public/
│   ├── index.html
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── db.js
    │   └── upstash.js
    ├── controllers/
    │   └── notescontrollers.js
    ├── middleware/
    │   └── ratelimiter.js
    ├── models/
    │   └── Note.js
    ├── routes/
    │   └── noteroutes.js
    ├── server.js
    │   ├── .env
    │   ├── .gitignore
    └── package.json
```

##  API Endpoints

### Notes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all notes for user | Yes (header) |
| GET | `/api/notes/:id` | Get single note | Yes (header) |
| POST | `/api/notes` | Create new note | Yes (body) |
| PUT | `/api/notes/:id` | Update note | Yes (body) |
| DELETE | `/api/notes/:id` | Delete note | Yes (header) |



##  Authentication

The app uses Firebase Authentication with Google Sign-In. User ID is sent via:
- **Header**: `x-user-id` (automatically added by Axios interceptor)
- **Body**: `userId` field for POST/PUT requests

##  Usage

### For Guests (No Login)
1. Visit the app
2. Create notes - they're saved in browser local storage
3. Edit and delete notes locally
4. Data persists until browser cache is cleared

### For Logged-In Users
1. Click "Login" and sign in with Google
2. Create notes - they're saved to MongoDB cloud
3. Access your notes from any device
4. Notes are synced across all your devices

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



##  Author

**Your Name**
- GitHub:(https://github.com/Jayasurya09s)
- LinkedIn: Jayanth Midde-https://www.linkedin.com/in/jayanth-midde-968150321/

##  Acknowledgments

- Firebase for authentication
- MongoDB Atlas for cloud database
- Render for backend hosting
- Vercel for frontend hosting
- Tailwind CSS for beautiful styling

##  Support

For support, email your.JayanthJay751@gmail.com or create an issue in this repository.

---

Star this repo if you find it helpful!
