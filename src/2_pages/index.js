import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { LayoutPage } from "./layout/layout";
import { Suspense } from "react";

const Projects = lazy(() => import("./projects_page/ProjectsPage"));
const Tasks = lazy(() => import("./tasks_page/TasksPage"));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loading />}>
                            <Projects />
                        </Suspense>
                    }
                ></Route>
                <Route
                    path="/task/:projectName"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Tasks />
                        </Suspense>
                    }
                ></Route>
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Projects />
                        </Suspense>
                    }
                ></Route>
            </Route>
        </Routes>
    );
};

function Loading() {
    return <h2>🌀 Loading...</h2>;
}
