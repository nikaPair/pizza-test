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

                // Отладочный вывод
                console.log("Загружены данные сотрудника:", employeeData);
            } else {
                navigate("/");
            }
        }
    }, [id, employees, navigate]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Проверяем, что все обязательные поля заполнены
        if (!formData.name || !formData.phone || !formData.birthday) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        // Отладочный вывод перед отправкой
        console.log("Отправка данных формы:", formData);

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

        // Отладочный вывод
        console.log(
            `Изменение поля: ${name}, значение: ${value}, тип: ${type}`
        );

        setFormData((prev) => {
            const newData = {
                ...prev,
                [name]:
                    type === "checkbox"
                        ? (e.target as HTMLInputElement).checked
                        : value,
            };

            // Отладочный вывод обновленных данных
            console.log("Обновленные данные формы:", newData);

            return newData;
        });
    };

    return {
        formData,
        employee,
        handleSubmit,
        handleChange,
    };
};
