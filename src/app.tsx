import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";
import "./App.scss";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="app">
                    <header className="app-header">
                        <h1>Управление сотрудниками</h1>
                    </header>
                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<EmployeeList />} />
                            <Route
                                path="/employee/new"
                                element={
                                    <EmployeeForm
                                        onClose={() => window.history.back()}
                                    />
                                }
                            />
                            <Route
                                path="/employee/:id"
                                element={
                                    <EmployeeForm
                                        onClose={() => window.history.back()}
                                    />
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
