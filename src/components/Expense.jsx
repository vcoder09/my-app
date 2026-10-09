import { useForm } from "react-hook-form";
import { useExpense } from "../context/ExpenseContext";
import { RiDeleteBin6Line } from "react-icons/ri"
import { GiCash } from "react-icons/gi"
const Expense = () => {
    const { expenses, addExpense, totalExpensesAmount, removeExpense } = useExpense();
    const {
        register,
        watch,
        handleSubmit,
         reset,
        formState: { errors }
    } = useForm();
    function onSubmit(data) {
        addExpense(data);
         reset()
    }
    return (
        <>
            <section id="expense-tracker">
                <div className="expense-heading">
                    <h1>Expense Tracker</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            {...register("title", {
                                required: "Please enter a title"
                            })}
                            placeholder="e.g. Chai, Petrol, Grocery"
                             autofocus
                        />
                        {errors.title && (
                            <p style={{ color: "#dc3545", fontSize: 15 }}>
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            {...register("amount", {
                                required: "Please enter a amount",
                                valueAsNumber: true
                            })}
                            placeholder="Amount"
                        />
                        {errors.amount && (
                            <p style={{ color: "#dc3545", fontSize: 15 }}>
                                {errors.amount.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input type="submit" value="Add Expense" />
                    </div>
                </form>
                 <div>
                      <h3 style={{ textAlign: "center", color: "#035b03"}}>Pay Amount: ₹{totalExpensesAmount().toFixed(2)}</h3>
                 </div>
                 <hr />
                <div className="expense-list">
                     { expenses.length > 0 ? expenses.map((expense, index) => (
                        <div key={index} className="expense-item">
                            <strong>{expense.title}</strong>
                            <strong>₹{expense.amount}</strong>
                            <button onClick={()=>removeExpense(expense.id)}><RiDeleteBin6Line /></button>
                        </div>
                    )) : <p style={{ textAlign: "center", fontWeight: 600, color: "rgba(0,0,0,0.7)"}}>No Expense Items :(</p>}
                </div>
            </section>
        </>
    );
};

export default Expense;
