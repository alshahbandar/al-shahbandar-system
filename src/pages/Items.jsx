import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase-simple";

const Items = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsData = [];
    querySnapshot.forEach((doc) => {
      itemsData.push({ id: doc.id, ...doc.data() });
    });
    setItems(itemsData);
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "items"), {
        name: newItem.name,
        description: newItem.description,
        createdAt: new Date()
      });
      setNewItem({ name: "", description: "" });
      fetchItems();
    } catch (error) {
      alert("Error adding item: " + error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      fetchItems();
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };

  return React.createElement("div", { style: { padding: "20px" } },
    React.createElement("h1", null, "Manage Items"),
    
    // Add Item Form
    React.createElement("form", { onSubmit: addItem, style: { marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" } },
      React.createElement("h3", null, "Add New Item"),
      React.createElement("input", {
        type: "text",
        placeholder: "Item Name",
        value: newItem.name,
        onChange: (e) => setNewItem({...newItem, name: e.target.value}),
        style: { margin: "5px", padding: "8px" },
        required: true
      }),
      React.createElement("input", {
        type: "text",
        placeholder: "Description",
        value: newItem.description,
        onChange: (e) => setNewItem({...newItem, description: e.target.value}),
        style: { margin: "5px", padding: "8px" },
        required: true
      }),
      React.createElement("button", { 
        type: "submit",
        style: { margin: "5px", padding: "8px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }
      }, "Add Item")
    ),

    // Items List
    React.createElement("div", null,
      React.createElement("h3", null, "Items List"),
      items.length === 0 ? React.createElement("p", null, "No items found") :
      React.createElement("div", { style: { display: "grid", gap: "10px" } },
        items.map(item => 
          React.createElement("div", { 
            key: item.id,
            style: { 
              padding: "15px", 
              border: "1px solid #ddd", 
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }
          },
            React.createElement("div", null,
              React.createElement("strong", null, item.name),
              React.createElement("p", { style: { margin: "5px 0 0 0", color: "#666" } }, item.description)
            ),
            React.createElement("button", {
              onClick: () => deleteItem(item.id),
              style: { 
                padding: "5px 10px", 
                backgroundColor: "#dc3545", 
                color: "white", 
                border: "none", 
                borderRadius: "4px",
                cursor: "pointer"
              }
            }, "Delete")
          )
        )
      )
    )
  );
};

export default Items;
