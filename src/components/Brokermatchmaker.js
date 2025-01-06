import React, { useState, useEffect } from "react";
import axios from "../services/axios";

const BrokerMatchmaker = ({ buyerId }) => {
  const [brokers, setBrokers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState(null);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axios.get("/brokers");
        setBrokers(response.data);
      } catch (error) {
        console.error("Error fetching brokers", error);
      }
    };
    fetchBrokers();
  }, []);

  const assignBroker = async () => {
    try {
      await axios.post("/brokers/assign", { buyerId, brokerId: selectedBroker });
      alert("Broker assigned successfully!");
    } catch (error) {
      console.error("Error assigning broker", error);
    }
  };

  return (
    <div>
      <h2>Select a Broker</h2>
      {brokers.map((broker) => (
        <div key={broker.id}>
          <p>Name: {broker.name}</p>
          <p>Specialization: {broker.specialization}</p>
          <p>Average Rating: {broker.averageRating.toFixed(1)}</p>
          <button onClick={() => setSelectedBroker(broker.id)}>Select</button>
        </div>
      ))}
      {selectedBroker && (
        <button onClick={assignBroker} style={{ marginTop: "10px" }}>
          Assign Broker
        </button>
      )}
    </div>
  );
};

export default BrokerMatchmaker;
