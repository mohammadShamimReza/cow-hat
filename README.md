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

- `GET` https://digital-cat-hut.vercel.app/api/v1/users
- `GET` https://digital-cat-hut.vercel.app/api/v1/users/64a2668bf66f680d36e8282f 
- `PATCH` https://digital-cat-hut.vercel.app/api/v1/users/64a2362cc137393f7160130a 
- `DELETE` https://digital-cat-hut.vercel.app/api/v1/users/64a007a691a746eb936052b3 

### Cows

- `POST` https://digital-cat-hut.vercel.app/api/v1/cows
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows/6496961a956a69bac0d74847 (Single GET, include an ID saved in your database)
- `PATCH` https://digital-cat-hut.vercel.app/api/v1/cows/6495ba7ac960573243f7e551 (include an ID saved in your database)
- `DELETE` https://digital-cat-hut.vercel.app/api/v1/cows/6496e38f32cb4ddc26f9abaf (include an ID saved in your database)

### Pagination and Filtering routes of Cows

- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?pag=1&limit=10
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?minPrice=1000&maxPrice=70000
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?location=Chattogram
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?searchTerm=Cha

### Orders

- `POST` https://digital-cat-hut.vercel.app/api/v1/orders
- `GET` https://digital-cat-hut.vercel.app/api/v1/orders

### My profile

- `GET` https://digital-cat-hut.vercel.app/api/v1/users/my-profile
- `PATCH` https://digital-cat-hut.vercel.app/api/v1/users/my-profile

### Order

- `GET` https://digital-cat-hut.vercel.app/api/v1/orders/64a26b3e8c5a4c9cd9fde715

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install this project.

```bash
npm install
