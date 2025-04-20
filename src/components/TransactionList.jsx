//import { useTransactions } from "../context/TransactionContext";

const TransactionList = ({ expenses }) => {
    return (
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul>
            {expenses.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between border-b py-2 text-sm text-gray-700"
              >
                <span>{tx.name}</span>
                <span>{tx.amount.toLocaleString()}₦</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TransactionList;
  