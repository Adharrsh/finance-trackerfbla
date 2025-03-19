import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const AddCategory = ({ onSave }: { onSave: (data: string[]) => void }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  // Load categories from localStorage when component mounts
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      console.log("Fetching categories from backend...");
      fetch("http://localhost:3012/api/categories")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched categories:", data);
          setCategories(data);
          localStorage.setItem("categories", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) return;

    try {
      const response = await fetch("http://localhost:3012/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        setNewCategory("");
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        onSave(updatedCategories); // Call onSave with the updated categories
      } else {
        console.error("Error adding category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Categories</h2>
      <input
        type="text"
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleAddCategory} className={styles.button}>
        Add Category
      </button>
      <ul className={styles.list}>
        {categories.map((category, index) => (
          <li key={index} className={styles.listItem}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategory;
