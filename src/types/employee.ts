export type Role = "cook" | "waiter" | "driver";

export interface Employee {
    id: number;
    name: string;
    isArchive: boolean;
    role: Role;
    phone: string;
    birthday: string;
}

export interface EmployeeFormData extends Omit<Employee, "id"> {}
