import { useState } from "react";
import "./style.css";

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main>
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header>
      <h1>
        Pronto Facts
        <span className="material-symbols-sharp check-icon"> check_box </span>
      </h1>
      <button className="add-btn" onClick={() => setShowForm((show) => !show)}>
        <span className="material-symbols-sharp add-icon close=icon">
          {showForm ? "close" : "add"}
        </span>
      </button>
    </header>
  );
}

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#eab308" },
  { name: "society", color: "#ef4444" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#8b5cf6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#14b8a6" },
];

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault();

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      const newFact = {
        id: Math.round(Math.random() * 100000),
        text,
        source,
        category,
        like: 0,
        dislike: 0,
        createdIn: new Date().getFullYear(),
      };

      setFacts((facts) => [newFact, ...facts]);

      setText("");
      setSource("");
      setCategory("");

      setShowForm(false);
    } else {
      alert("Invalid input!");
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled selected>
          Category
        </option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="post-btn">Post!</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul className="category-buttons">
        <li>
          <button id="all-category-btn">All</button>
        </li>

        {categories.map((category) => (
          <li key={category.name}>
            <button
              className="category-btn"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>
        There are currently {facts.length} facts in the database. Add your own!
      </p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a href={fact.source} target="_blank">
          [Source]
        </a>
        <span
          className="tag"
          style={{
            backgroundColor: categories.find(
              (category) => category.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
      </p>
      <div className="fact-buttons">
        <button className="like-btn">
          <span className="material-symbols-sharp"> thumb_up </span>{" "}
          {fact.votesInteresting}
        </button>
        <button className="dislike-btn">
          <span className="material-symbols-sharp"> thumb_down </span>{" "}
          {fact.votesFalse}
        </button>
        <button className="share-btn">
          <span className="material-symbols-sharp"> share </span>
        </button>
      </div>
    </li>
  );
}

export default App;
