
import React, { useEffect, useState } from "react";
import { contract, web3 } from "../App";

function CauseCatalog() {
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    const loadCauses = async () => {
      const causeCount = await contract.methods.causeCount().call();
      const causesArray = [];
      for (let i = 1; i <= causeCount; i++) {
        const cause = await contract.methods.getCause(i).call();
        causesArray.push({ id: i, ...cause });
      }
      setCauses(causesArray);
    };

    loadCauses();
  }, []);

  const handleDonate = async (causeId) => {
    const amount = prompt("Enter the amount to donate (in wei):");
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.makeDonation(causeId).send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "wei"),
        gas: 300000,
      });
      alert("Donation successful!");

      const updatedCauses = await Promise.all(
        causes.map(async (cause) => {
          const updatedCause = await contract.methods.getCause(cause.id).call();
          return { id: cause.id, ...updatedCause };
        })
      );
      setCauses(updatedCauses);
    } catch (error) {
      console.error(error);
      alert("Error making donation");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">All Causes</h2>
      
      {causes.length === 0 ? (
        <p className="text-center text-gray-500">No causes available.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {causes.map((cause) => (
            <div key={cause.id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{cause.name}</h3>
              <p className="text-gray-600 mb-2">{cause.description}</p>
              <p className="text-gray-700 font-medium">Total Donations: <span className="font-bold">{web3.utils.fromWei(cause.totalDonations,'wei')} wei</span></p>
              <p className={`font-medium mt-2 ${cause.isActive ? 'text-green-600' : 'text-red-600'}`}>
                Status: {cause.isActive ? "Active" : "Inactive"}
              </p>
              {cause.isActive && (
                <button
                  onClick={() => handleDonate(cause.id)}
                  className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Donate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CauseCatalog;
