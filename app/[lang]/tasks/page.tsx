import Dashboard from "@/layouts/Dashboard"
import TaskPage from "@/components/tasks/TaskPage";

export default function Tasks() {
    return <Dashboard>
        <div className="flex flex-col gap-4">
            <TaskPage/>
        </div>
    </Dashboard>
}