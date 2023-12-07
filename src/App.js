import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("likes", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert("There was a problem getting the data");

        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
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
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      setIsUploading(false);

      if (!error) setFacts((facts) => [newFact[0], ...facts]);

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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="" disabled selected>
          Category
        </option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="post-btn" disabled={isUploading}>
        Post!
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul className="category-buttons">
        <li>
          <button
            id="all-category-btn"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {categories.map((category) => (
          <li key={category.name}>
            <button
              className="category-btn"
              style={{ backgroundColor: category.color }}
              onClick={() => setCurrentCategory(category.name)}
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
  if (facts.length === 0) {
    return (
      <p className="message">
        There are no facts for this category yet! Create the first one!
      </p>
    );
  }

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
  function handleVote() {}

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
        <button className="like-btn" onClick={handleVote}>
          <span className="material-symbols-sharp"> thumb_up </span>{" "}
          {fact.likes}
        </button>
        <button className="dislike-btn" onClick={handleVote}>
          <span className="material-symbols-sharp"> thumb_down </span>{" "}
          {fact.dislikes}
        </button>
        <button className="share-btn">
          <span className="material-symbols-sharp"> share </span>
        </button>
      </div>
    </li>
  );
}

export default App;
