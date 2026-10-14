from flask import Flask, render_template, jsonify, request
import random
from quotes import QUOTES

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/random")
def get_random():
    """Return a single random quote."""
    return jsonify(random.choice(QUOTES))


@app.route("/api/quotes")
def get_quotes():
    """
    Return filtered quotes.
    Query params:
      - author (str): partial, case-insensitive match on author name
      - category (str): exact match on category
    """
    author = request.args.get("author", "").lower().strip()
    category = request.args.get("category", "").strip()

    results = QUOTES

    if author:
        results = [q for q in results if author in q["author"].lower()]

    if category:
        results = [q for q in results if q["category"] == category]

    return jsonify(results)


@app.route("/api/categories")
def get_categories():
    """Return sorted list of all unique categories."""
    cats = sorted(set(q["category"] for q in QUOTES))
    return jsonify(cats)


@app.route("/api/authors")
def get_authors():
    """Return sorted list of all unique authors."""
    authors = sorted(set(q["author"] for q in QUOTES))
    return jsonify(authors)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
