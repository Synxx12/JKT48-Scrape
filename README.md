---

# Web Scrape JKT48 API

Welcome to the Web Scrape JKT48 API! This API provides information about schedules, news, and events related to theaters.

## Getting Started

### Installation

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

```bash
# Clone the repository
git clone https://github.com/Synxx12/JKT48-Scrape.git

# Navigate to the project directory
cd JKT48-Scrape

# Install dependencies
npm install
```

### Run the Application

```bash
# Run the application
npm run dev
```

The API will be available at `http://localhost:3000`.

## Endpoints

### `/schedule`

**Description**: Get schedule data.

**Endpoint**: `/schedule`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/schedule
```


### `/news`

**Description**: Get news data.

**Endpoint**: `/news`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/news
```


### `/events`

**Description**: Get events data.

**Endpoint**: `/events`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/events
```


### `/birthdays`

**Description**: Get birthdays data.

**Endpoint**: `/birthdays`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/birthdays
```
### `/member/:id`

**Description**: Get member detail data.

**Endpoint**: `/member/:id`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/member/:id
```
### `/news/:page`

**Description**: Get member detail data.

**Endpoint**: `/news/:page`

**Method**: `GET`

**Example**:

```bash
 http://localhost:3000/api/news/:page
```


Feel free to explore and integrate these endpoints into your applications! If you encounter any issues, please refer to the [troubleshooting](#troubleshooting) section or open an [issue](https://github.com/Synxx12/JKT48-Scrape/issues).

---
