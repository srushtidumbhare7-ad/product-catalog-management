# 🛒 Product Catalog Management Web App

A full-stack web application for managing products with **CRUD**, **Search**, **Filter**, **Sort**, and **Pagination**, built using **Node.js**, **Express**, **MongoDB**, and **Bootstrap**.

---

## 🚀 Features

* Add, Edit, Delete products
* Search products by name
* Filter products by category
* Sort products by price (ASC/DESC)
* Pagination for better navigation
* Dynamic categories
* Modal confirmation for delete
* Loader spinner
* Toast notifications
* Clean and responsive UI

---

## 🏗 Tech Stack

### **Frontend**

* HTML5
* CSS3
* JavaScript (Vanilla)
* Bootstrap 5

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* REST API

---

## 🗄 Database

* MongoDB Atlas (Cloud)
* Mongoose ODM

---

## 📦 Folder Structure

```
product-catalog-management/
 ├── frontend/
 │    ├── index.html
 │    ├── script.js
 │    └── style.css
 └── backend/
      ├── server.js
      ├── package.json
      ├── routes/
      │     └── productRoutes.js
      └── models/
            └── Product.js
```

---

## 🔌 API Endpoints

### **Products**

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/products/add`        | Add new product           |
| GET    | `/products/all`        | Get all products          |
| GET    | `/products/search`     | Search by name / category |
| GET    | `/products/sort`       | Sort products by price    |
| GET    | `/products/paginate`   | Paginated products        |
| PUT    | `/products/update/:id` | Update product            |
| DELETE | `/products/delete/:id` | Delete product            |

---

## 🖥 Setup & Run Locally

### **Backend Setup**

```
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:3000
```

### **Frontend**

Simply open:

```
frontend/index.html
```

---

## 🧩 Future Improvements (optional)

* Product images (Cloudinary)
* Unified filtering/query params
* Deployment (Render + Netlify)
* Chart analytics (Sales/Category)
* Dark mode
* User authentication (JWT)

---

## 📸 Screenshots

### 🏠 Dashboard (Main View)

Displays list of products with category, price, description, actions, and pagination.

```
<img src="screenshots/dashboard.png" width="750" />
```

---

### ✏ Edit Product Modal

Shows form fields for editing product details and update UX.

```
<img src="screenshots/edit-modal.png" width="750" />
```

---

### ❌ Delete Confirmation Modal

Confirmation dialog preventing accidental deletions (UX improvement).

```
<img src="screenshots/delete-modal.png" width="750" />
```

---

### 📄 Pagination

Demonstrates paginated product listing for better navigation.

```
<img src="screenshots/pagination.png" width="750" />
```

---

### 🔍 Search & Filter

Shows filtered results using name search and dynamic category filters.

```
<img src="screenshots/search-filter.png" width="750" />
```

---

### 🖥 Backend Console

Backend server running with MongoDB connection.

```
<img src="screenshots/backend-console.png" width="750" />
```

---

### 🗄 MongoDB View (Optional)

Database representation via MongoDB Atlas/Compass.

```
<img src="screenshots/mongodb-view.png" width="750" />
```


---

## 📄 Status

> This project is part of my full-stack internship/portfolio learning journey.

---
