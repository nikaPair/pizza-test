import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeFormData } from "../types/employee";

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload;
        },
        addEmployee: (state, action: PayloadAction<EmployeeFormData>) => {
            const newEmployee: Employee = {
                ...action.payload,
                id: Math.max(...state.employees.map((emp) => emp.id), 0) + 1,
            };
            state.employees.push(newEmployee);
        },
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex(
                (emp) => emp.id === action.payload.id
            );
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setEmployees,
    addEmployee,
    updateEmployee,
    setLoading,
    setError,
} = employeeSlice.actions;
export default employeeSlice.reducer;
