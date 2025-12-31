# CoffeeWorld App

**Author:** Bhakti Dattatray Shinde  
**Email:** bhaktishinde2388@gmail.com | **Phone:** 7709722873  

[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/) [![Axios](https://img.shields.io/badge/Axios-0.27.2-green)](https://axios-http.com/) [![CSS](https://img.shields.io/badge/CSS-Responsive-red)](#)

---

## 🚀 Project Overview

CoffeeWorld is a responsive web application for coffee enthusiasts. It allows users to signup/login, explore coffee products, add products to cart, and perform CRUD operations on products. All data is handled via `localStorage` for authentication and cart, and the FakeStore API for product management.

The app is designed with a modern theme, attractive gradients, and responsive UI across all devices.

---

## ✅ Features Implemented

### Landing Page
- Responsive Navbar (Logo, Login, Signup, Logout)
- Hamburger menu for mobile view
- Image carousel showcasing coffee images
- Intro section: “Why Choose Us?” cards (text-only, attractive, responsive)
- Welcome section with Explore Products button

### Authentication
- **Signup**
  - Username, Email, Password, Confirm Password validation
  - Regex validations: username, email, strong password
  - Stores user data in localStorage
  - Responsive themed form
- **Login**
  - Only registered users can log in
  - Themed Login form with gradient backgrounds
  - Shows toast notifications for errors and successful login
  - Navbar updates to show logged-in username and Logout button

### Products Page
- Protected route: accessible only when logged in
- **Products Table / Cards**:
  - Columns: Title, Price, Description, Category
  - Actions:
    - **View Product** → Modal with product details
    - **Edit Product** → Modal with pre-filled form
    - **Delete Product** → Confirmation before deleting
  - **Add Product Form**: Adds product via API and updates the UI
  - **Search & Filter**:
    - Search bar filters by title
    - Category dropdown filter
- **Add to Cart**:
  - Button inside product modal
  - Only visible to logged-in users
  - Prompts login if user is not logged in
  - Adds product to localStorage cart
  - Shows alert/toast on adding product

### UI & UX
- Themed and gradient-based color scheme across the site
- Rounded cards, shadows, hover effects
- Responsive design:
  - Product cards increase in size on mobile
  - Tables convert to card-style on small screens
  - Navbar converts to hamburger menu
- Modals/popups themed consistently with gradient colors

### Reusable Components
- **Button**: Themed, rounded buttons with hover effects
- **Modal**: Themed modal for view/edit product
- **Navbar**: Responsive with user login state
- Custom hook: **useConfirmDelete** for delete confirmations

---

## 🧰 Tech Stack

- **Frontend**: React (Functional components + Hooks)  
- **Routing**: React Router  
- **API**: Axios with FakeStore API (https://fakestoreapi.com/)  
- **State & Storage**: localStorage for authentication & cart  
- **Notifications**: React Hot Toast / React Toastify  
- **Styling**: CSS with responsive design and themed colors  

---





