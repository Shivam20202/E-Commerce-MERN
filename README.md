# ShopZone 🛍️

ShopZone is a full-featured MERN stack e-commerce application built with a clean, modern UI using Tailwind CSS and React. It includes user authentication, cart management, order placement, and an admin panel. The app is responsive, fast, and mobile-friendly.

## ✨ Features

- 🔐 User Authentication (Register/Login/Logout)
- 🛒 Add to Cart, Remove from Cart, and View Cart
- 📦 Product Categories and Listings
- 🧾 Order Management (User + Admin)
- 🧾 Download Invoice after Order Completion
- 🧑‍💻 Admin Dashboard (Only visible for admin users)
- 🎨 Beautiful Animated UI with Framer Motion
- 🔍 Search and Filter 

## 🖼️ Screenshots

![Home Page](https://raw.githubusercontent.com/Shivam20202/E-Commerce-MERN/main/client/public/screen.png)

## 📦 Tech Stack
### Frontend:
- React.js
- React Router
- Tailwind CSS
- Axios
- Framer Motion

### Backend:
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT & Bcrypt for auth
- CORS


## 🛠️ Installation & Setup

### Clone the repo
```bash
git clone https://github.com/Shivam20202/E-Commerce-MERN.git
cd E-Commerce-MERN
```

### Backend Setup (in `/server`)
```bash
cd server
npm install
# Add a .env file with MONGO_URI and JWT_SECRET
npm start
```

### Frontend Setup (in `/client` or root)
```bash
cd client
npm install
npm run dev
```


## 📁 Folder Structure

```
client/
│
├── components/
├── context/
├── pages/
├── api/
├── App.jsx
├── main.jsx
├── index.css
└── tailwind.config.js
```
```
server/
│
├── config/
│   └── db.js                # MongoDB connection setup
│
├── controllers/
│   ├── authController.js    # Handles login, register
│   ├── productController.js # CRUD for products
│   ├── cartController.js    # Handles cart logic
│   └── orderController.js   # Order placement, history
│
├── middleware/
│   ├── authMiddleware.js    # Verifies JWT, user roles
│   └── errorHandler.js      # Global error handling
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
│
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
│
├── .env                     # Environment variables (MONGO_URI, JWT_SECRET, etc.)
├── index.js                 # Entry point
├── package.json


```

## 🌍 Deployment
- Backend: Deployed to [Render](https://render.com)
- Frontend: Deployed to [Vercel](https://vercel.com)

## 🧪 Environment Variables

### Backend `.env`
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```


Made with ❤️ by Shivam
