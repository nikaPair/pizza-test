import React from "react";
import { MaskedInput } from "./MaskedInput";
import { useEmployeeForm } from "../hooks/useEmployeeForm";
import "../styles/EmployeeForm.scss";

interface EmployeeFormProps {
    onClose: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onClose }) => {
    const { formData, employee, handleSubmit, handleChange } =
        useEmployeeForm(onClose);

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <h2>
                {employee ? "Редактирование сотрудника" : "Новый сотрудник"}
            </h2>

            <div className="form-group">
                <label htmlFor="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Телефон:</label>
                <MaskedInput
                    mask="(999) 999-9999"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthday">Дата рождения:</label>
                <MaskedInput
                    mask="99.99.9999"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Должность:</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
            </div>

            <div className="form-group checkbox">
                <label>
                    <input
                        type="checkbox"
                        name="isArchive"
                        checked={formData.isArchive}
                        onChange={handleChange}
                    />
                    В архиве
                </label>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {employee ? "Сохранить" : "Добавить"}
                </button>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}>
                    Отмена
                </button>
            </div>
        </form>
    );
};
