# ✦ Famous Quotes

A sleek, responsive web application and RESTful API that curates **100 inspirational and timeless quotes** across 10 distinct categories. Built with **Python Flask** and **Vanilla HTML5, CSS3, and JavaScript**.

![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0%2B-000000?logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern%20Responsive-1572B6?logo=css3&logoColor=white)

---

## ✨ Features

- **🎲 Dynamic Hero Quote Card**: Features a prominent quote on page load with a single-click button (`New Random Quote`) to seamlessly discover new wisdom.
- **🔍 Real-Time Live Search**: Debounced instant search (400ms) by author name as you type, with Enter key support.
- **🏷️ Category Filtering**: Filter quotes dynamically by themes using the automatically populated dropdown selector.
- **🌙 Light & Dark Mode**: Built-in dark mode toggle with persistent state saved in browser `localStorage`.
- **🃏 Interactive Grid & Click-to-Hero**: Browse quotes in a clean card grid layout with staggered entry animations. Click any card to promote it to the featured Hero card.
- **⚡ Lightweight & Dependency-Free Frontend**: Crafted entirely in pure vanilla JavaScript and CSS—no bulky frameworks, CDNs, or external build steps required.
- **📡 RESTful JSON API**: Clean, developer-friendly endpoints for fetching random, filtered, or aggregated quotes and author lists.

---

## 📚 Curated Quote Categories

The project includes **100 quotes** categorized across 10 diverse themes:

| Category | Description | Example Authors |
| :--- | :--- | :--- |
| **Motivation** | Drive, perseverance, and ambition | *Steve Jobs, Theodore Roosevelt, Winston Churchill* |
| **Wisdom** | Life insights, self-awareness, and learning | *Socrates, Confucius, Nelson Mandela* |
| **Philosophy** | Existential thought, reason, and logic | *René Descartes, Aristotle, Friedrich Nietzsche* |
| **Science** | Discovery, curiosity, and the cosmos | *Albert Einstein, Carl Sagan, Nikola Tesla* |
| **Leadership** | Guidance, integrity, and influence | *John C. Maxwell, Eleanor Roosevelt, Martin Luther King Jr.* |
| **Life** | Living well, adventure, and perspective | *Abraham Lincoln, Helen Keller, Seneca* |
| **Humor** | Wit, satire, and clever observations | *Oscar Wilde, Groucho Marx, Lucille Ball* |
| **Creativity** | Imagination, art, and original thought | *Pablo Picasso, Henri Matisse, Maya Angelou* |
| **Success** | Achievement, habit, and overcoming failure | *Henry David Thoreau, Estée Lauder, Albert Schweitzer* |
| **Love** | Compassion, connection, and human bonds | *Audrey Hepburn, Edgar Allan Poe, Victor Hugo* |

---

## 🛠️ Technology Stack

- **Backend**:
  - Python 3.10+
  - [Flask](https://flask.palletsprojects.com/) (>= 3.0.0)
- **Frontend**:
  - HTML5 (Semantic structure)
  - CSS3 (Custom CSS variables, Flexbox & CSS Grid, responsive design, dark mode theme)
  - JavaScript (ES6+ async/await, Fetch API, DOM manipulation, debouncing)

---

## 📁 Repository Structure

```text
famous-quotes/
├── app.py              # Flask server and REST API route handlers
├── quotes.py           # In-memory dataset of 100 categorized quotes
├── requirements.txt    # Python package dependencies
├── .gitignore          # Git ignore configuration
├── README.md           # Project documentation
├── templates/
│   └── index.html      # Single-page HTML application template
└── static/
    ├── app.js          # Client-side logic (API requests, live filter, theme toggle)
    └── style.css       # Clean stylesheet with light/dark palettes and category badges
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites

Ensure you have **Python 3.9+** installed on your system. Verify with:

```bash
python --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/ItsPietro/ItsPietro-famous-quotes.git
cd ItsPietro-famous-quotes
```

### 3. Create a Virtual Environment (Recommended)

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows (Command Prompt)
python -m venv venv
venv\Scripts\activate

# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the Application

```bash
python app.py
```

By default, the server will launch in debug mode on port `5000`.

### 6. Open in Your Browser

Navigate to:
👉 **[http://localhost:5000](http://localhost:5000)** (or `http://127.0.0.1:5000`)

---

## 📡 RESTful API Reference

All responses return data in `application/json` format.

### 1. Get a Random Quote
Returns a single randomly selected quote.

- **Endpoint**: `GET /api/random`
- **Example Request**:
  ```bash
  curl http://localhost:5000/api/random
  ```
- **Example Response (`200 OK`)**:
  ```json
  {
    "id": 1,
    "author": "Steve Jobs",
    "category": "Motivation",
    "text": "The only way to do great work is to love what you do."
  }
  ```

---

### 2. Query / Filter Quotes
Retrieve quotes matching optional author and category filters.

- **Endpoint**: `GET /api/quotes`
- **Query Parameters**:
  - `author` *(optional, string)*: Case-insensitive partial match on author name.
  - `category` *(optional, string)*: Exact match on category name.
- **Example Requests**:
  ```bash
  # Filter by category
  curl "http://localhost:5000/api/quotes?category=Science"

  # Search by author
  curl "http://localhost:5000/api/quotes?author=einstein"

  # Combine both filters
  curl "http://localhost:5000/api/quotes?author=einstein&category=Wisdom"
  ```
- **Example Response (`200 OK`)**:
  ```json
  [
    {
      "id": 12,
      "author": "Albert Einstein",
      "category": "Wisdom",
      "text": "In the middle of every difficulty lies opportunity."
    },
    {
      "id": 20,
      "author": "Albert Einstein",
      "category": "Wisdom",
      "text": "The measure of intelligence is the ability to change."
    }
  ]
  ```

---

### 3. List All Categories
Returns a sorted array of all unique category names.

- **Endpoint**: `GET /api/categories`
- **Example Request**:
  ```bash
  curl http://localhost:5000/api/categories
  ```
- **Example Response (`200 OK`)**:
  ```json
  [
    "Creativity",
    "Humor",
    "Leadership",
    "Life",
    "Love",
    "Motivation",
    "Philosophy",
    "Science",
    "Success",
    "Wisdom"
  ]
  ```

---

### 4. List All Authors
Returns a sorted array of all unique author names.

- **Endpoint**: `GET /api/authors`
- **Example Request**:
  ```bash
  curl http://localhost:5000/api/authors
  ```
- **Example Response (`200 OK`)**:
  ```json
  [
    "Abraham Lincoln",
    "Albert Einstein",
    "Albert Schweitzer",
    "Aristotle",
    "Audrey Hepburn"
  ]
  ```

---

## 🎨 Adding Custom Quotes

To add or modify quotes, simply edit `quotes.py`. Add a new dictionary item to the `QUOTES` list:

```python
{
    "id": 101,
    "text": "Simplicity is the soul of efficiency.",
    "author": "Austin Freeman",
    "category": "Wisdom"
}
```

The application will immediately recognize the new quote, include any new categories in the category selector, and index the author for search.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
