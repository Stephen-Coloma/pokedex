# 🔥 Pokedex Web App

This project is a **Pokedex web application** built as part of the technical assessment for the Old.St Labs Internship Program. The application showcases a catalog of Pokémon using data fetched from the [PokeAPI](https://pokeapi.co/) and implements features such as search, filter, sorting, and detailed views. Moreover, photo assets are fetched from this link https://assets.pokemon.com/assets/cms2/img/pokedex/full/{id}.png.

---

## 🚀 Deployed on Vercel
### Check out this link: [Pokedex Webapp](https://pokedex.stephencoloma.com) <br>
- Note! Make sure you update your browser for better experience.

## 📌 Features

### 🏠 Home Page
- **Card View** listing of Pokémons (ID, Name, Photo, Type)
- **Initial Load** displays 10 Pokémon, with a “Load More” option through button
- **Search and Filter** functionality by ID number or Name
- **Sorting** by ID or Name (ascending and descending)
- **Click a Card** to view more details

### 📋 Detailed Info View
- Displayed as a **popup**
- Shows:
  - ID No
  - Name
  - Types
  - Photo
  - Height
  - Weight
  - Base experience
  - Descriptions
  - Abilities
  - Stats (HP, Attack, Defense, Speed, Special Attack and Special Defense)
  - Weaknesses (based on Type, derived using [this type chart](https://www.eurogamer.net/pokemon-go-type-chart-effectiveness-weaknesses))
  - Evolution Chain
- Includes **Next** and **Previous** buttons to navigate between Pokémon profiles via ID

---

## 🔧 Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **API:** [PokeAPI](https://pokeapi.co/)
- **Design:** Tailwind CSS
- **Libraries** Axios, Axios Cache Interceptor, Lodash.Debounce, Framer Motion, Zustand 
- **Hosting:** Vercel

---

## 🚀 Getting Started

### 📦 First, clone the project, then install the dependencies needed:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 🏃Then run the development server: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 💻 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
