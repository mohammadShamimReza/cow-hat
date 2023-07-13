# cow_hat_with_auth

Short description of your project.

## Live Link

[https://cow-hat-with-auth-alpha.vercel.app/api/v1/]

## Application Routes

### Auth(User)
- `POST`  https://cow-hat-with-auth-alpha.vercel.app/api/v1/auth/login
- `POST`  https://cow-hat-with-auth-alpha.vercel.app/api/v1/auth/signup
- `POST`  https://cow-hat-with-auth-alpha.vercel.app/api/v1/auth/refresh-toke


### Auth(Admin)
- `POST`  https://cow-hat-with-auth-alpha.vercel.app/api/v1/admins/create-admin
- `POST`  https://cow-hat-with-auth-alpha.vercel.app/api/v1/admins/login

### User

- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/users
- `PATCH` https://cow-hat-with-auth-alpha.vercel.app/api/v1/users/64a2362cc137393f7160130a 
- `DELETE` https://cow-hat-with-auth-alpha.vercel.app/api/v1/users/64a007a691a746eb936052b3 

### Cows

- `POST` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows/6496961a956a69bac0d74847 (Single GET, include an ID saved in your database)
- `PATCH` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows/6495ba7ac960573243f7e551 (include an ID saved in your database)
- `DELETE` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows/6496e38f32cb4ddc26f9abaf (include an ID saved in your database)

### Pagination and Filtering routes of Cows

- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows?pag=1&limit=10
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows?minPrice=1000&maxPrice=70000
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows?location=Chattogram
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/cows?searchTerm=Cha

### Orders

- `POST` https://cow-hat-with-auth-alpha.vercel.app/api/v1/orders
- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/orders

### My profile

- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/users/my-profile
- `PATCH` https://cow-hat-with-auth-alpha.vercel.app/api/v1/users/my-profile

### Order

- `GET` https://cow-hat-with-auth-alpha.vercel.app/api/v1/orders/64a26b3e8c5a4c9cd9fde715

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install this project.

```bash
npm install
