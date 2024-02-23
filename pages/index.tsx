import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://efbdpjvnpulvomzjmpfz.supabase.co/functions/v1/rest-interview"
      );
      const jsonData = await response.json();
      setData(jsonData.locations);
      console.log(jsonData.locations);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.loc}>
      <h1>Find Location</h1>
      <p>Welcome to the home page!</p>
      <input
        type="text"
        placeholder="Enter location name"
        className={styles.search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table
        className={styles.table}
        border={1}
        cellSpacing={0}
        cellPadding={14}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Is Permanent</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.isPermanent ? "Yes" : "No"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
