import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Employee, EmployeeFormData } from "../types/employee";
import { addEmployee, updateEmployee } from "../store/employeeSlice";
import { RootState } from "../store/store";

const initialFormData: EmployeeFormData = {
    name: "",
    isArchive: false,
    role: "cook",
    phone: "",
    birthday: "",
};

export const useEmployeeForm = (onClose: () => void) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const employees = useSelector(
        (state: RootState) => state.employees.employees
    );
    const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);

    useEffect(() => {
        if (id && id !== "new") {
            const foundEmployee = employees.find(
                (emp) => emp.id === parseInt(id)
            );
            if (foundEmployee) {
                setEmployee(foundEmployee);
                const { id: _, ...employeeData } = foundEmployee;
                setFormData(employeeData);
            } else {
                navigate("/");
            }
        }
    }, [id, employees, navigate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (employee) {
            dispatch(updateEmployee({ ...formData, id: employee.id }));
        } else {
            dispatch(addEmployee(formData));
        }
        onClose();
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };

    return {
        formData,
        employee,
        handleSubmit,
        handleChange,
    };
};
