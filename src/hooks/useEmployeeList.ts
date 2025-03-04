import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Role } from "../types/employee";
import { RootState } from "../store/store";

type SortField = "name" | "birthday";
type SortOrder = "asc" | "desc";

export const useEmployeeList = () => {
    const navigate = useNavigate();
    const employees = useSelector(
        (state: RootState) => state.employees.employees
    );

    const [sortField, setSortField] = useState<SortField>("name");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
    const [archiveFilter, setArchiveFilter] = useState(false);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const handleEmployeeClick = (id: number) => {
        navigate(`/employee/${id}`);
    };

    const handleAddEmployee = () => {
        navigate("/employee/new");
    };

    const filteredAndSortedEmployees = useMemo(() => {
        let filtered = employees.filter((employee) => {
            const matchesRole =
                roleFilter === "all" || employee.role === roleFilter;
            const matchesArchive = !archiveFilter || employee.isArchive;
            return matchesRole && matchesArchive;
        });

        return [...filtered].sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                const dateA = new Date(
                    a.birthday.split(".").reverse().join("-")
                );
                const dateB = new Date(
                    b.birthday.split(".").reverse().join("-")
                );
                return sortOrder === "asc"
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            }
        });
    }, [employees, sortField, sortOrder, roleFilter, archiveFilter]);

    const getRoleName = (role: Role) => {
        const roleNames: Record<Role, string> = {
            cook: "Повар",
            waiter: "Официант",
            driver: "Водитель",
        };
        return roleNames[role];
    };

    return {
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
    };
};
