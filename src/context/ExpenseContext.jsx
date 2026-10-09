import { createContext, useContext, useState, useEffect } from "react";
const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => {
        setExpenses(prev => [
            { id: Date.now(), title: expense.title, amount: expense.amount },
            ...prev,
        ]);
    };

    const removeExpense = (id) => {
        const PrevExpenses = expenses.filter((item, index) => item.id != id);
        setExpenses([...PrevExpenses]);
    };

    const totalExpensesAmount = () => {
        const total = expenses.reduce(
            (init, expense) => expense.amount + init,
            0
        );
        return total;
    };

    return (
        <>
            <ExpenseContext.Provider
                value={{
                    expenses,
                    addExpense,
                    removeExpense,
                    totalExpensesAmount
                }}
            >
                {children}
            </ExpenseContext.Provider>
        </>
    );
}

export function useExpense() {
    return useContext(ExpenseContext);
}
