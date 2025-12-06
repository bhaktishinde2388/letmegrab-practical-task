
**Author:** Bhakti Dattatray Shinde  
**Email:** bhaktishinde2388@gmail.com | **Phone:** 7709722873

---

## 🚀 Project Overview
 
The app implements user signup/login (stored in `localStorage`), a protected Products page and CRUD operations for products (using the provided FakeStore API), plus search, filter and responsive UI.

---

## ✅ Features Implemented

- Landing page with responsive **Navbar** (Logo, Login, Signup).
- Image carousel on landing page.
- **Signup** with validation (username, email, password, confirm password). Data stored in `localStorage`.
- **Login** (only a user who signed up can login).
- After login: Navbar shows **user name** and **Logout**.
- Protected **Products** page (accessible only when logged in).
- **Products** table with:
  - Title, Price, Description, Category
  - Actions: **View** (modal), **Edit** (modal with pre-filled form), **Delete** (confirmation)
- **Add Product** form (adds via API and updates UI).
- **Search** bar (live filtering by title).
- **Category filter** dropdown.
- Toast notifications for Add / Update / Delete (React-Toastify).
- Responsive layout — table converts to card-style on small screens.
- Reusable components: `Button`, `Modal`, `Navbar`.
- Custom hook `useConfirmDelete` for delete confirmation messages (shows website name).

---

## 🧰 Tech Stack

- React (Functional components + Hooks)
- React Router
- Axios
- React Toastify
- CSS + responsive styles
- FakeStore API (`https://fakestoreapi.com/`) for product CRUD requests
- LocalStorage for auth data

---



