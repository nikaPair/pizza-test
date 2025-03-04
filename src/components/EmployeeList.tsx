import React from "react";
import { useEmployeeList } from "../hooks/useEmployeeList";
import "../styles/EmployeeList.scss";

export const EmployeeList: React.FC = () => {
    const {
        sortField,
        sortOrder,
        roleFilter,
        archiveFilter,
        filteredAndSortedEmployees,
        handleSort,
        handleEmployeeClick,
        handleAddEmployee,
        setRoleFilter,
        setArchiveFilter,
        getRoleName,
    } = useEmployeeList();

    return (
        <div className="employee-list">
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="roleFilter">Должность:</label>
                    <select
                        id="roleFilter"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as any)}>
                        <option value="all">Все</option>
                        <option value="cook">Повар</option>
                        <option value="waiter">Официант</option>
                        <option value="driver">Водитель</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={archiveFilter}
                            onChange={(e) => setArchiveFilter(e.target.checked)}
                        />
                        В архиве
                    </label>
                </div>
            </div>

            <div className="sort-buttons">
                <button
                    onClick={() => handleSort("name")}
                    className={sortField === "name" ? "active" : ""}>
                    Сортировать по имени{" "}
                    {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
                <button
                    onClick={() => handleSort("birthday")}
                    className={sortField === "birthday" ? "active" : ""}>
                    Сортировать по дате рождения{" "}
                    {sortField === "birthday" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                </button>
            </div>

            <div className="employee-grid">
                {filteredAndSortedEmployees.map((employee) => (
                    <div
                        key={employee.id}
                        className={`employee-card ${
                            employee.isArchive ? "archived" : ""
                        }`}
                        onClick={() => handleEmployeeClick(employee.id)}>
                        <h3>{employee.name}</h3>
                        <p>Должность: {getRoleName(employee.role)}</p>
                        <p>Телефон: {employee.phone}</p>
                        <p>Дата рождения: {employee.birthday}</p>
                        {employee.isArchive && (
                            <span className="archive-badge">В архиве</span>
                        )}
                    </div>
                ))}
            </div>

            <button className="add-employee-btn" onClick={handleAddEmployee}>
                Добавить сотрудника
            </button>
        </div>
    );
};
