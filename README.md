# Sportz

**Sportz** is a live scoreboard application that provides real-time updates using WebSockets. Built with **Express.js**, **Neon DB**, and **Drizzle ORM**, it allows seamless tracking of sports scores with a fast and reliable backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Features

- Live real-time scoreboard updates via WebSockets
- Database management using **Neon DB** and **Drizzle ORM**
- Simple and clean backend with **Express.js**
- Easy to extend and integrate with frontend apps

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **WebSocket:** `ws` library
- **Database:** Neon DB
- **ORM:** Drizzle ORM
- **Language:** JavaScript / Node.js

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sabihkahn/Sportz.git
cd Sportz

Install dependencies:

npm install

Configure the database connection in drizzle.config.js:

// Example Neon DB configuration
module.exports = {
  connectionString: process.env.DATABASE_URL,
};

Start the server:

npm start
