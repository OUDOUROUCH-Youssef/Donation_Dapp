
import React, { useState } from "react";
import { contract, web3 } from "../App";

function CauseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addCause = async () => {
    const accounts = await web3.eth.getAccounts();
    try {
      await contract.methods.addCause(name, description).send({ from: accounts[0], gas: 300000 });
      
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add Cause</h2>
      
      <input
        type="text"
        placeholder="Cause Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <textarea
        placeholder="Cause Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
      
      <button
        onClick={addCause}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Add Cause
      </button>
    </div>
  );
}

export default CauseForm;
