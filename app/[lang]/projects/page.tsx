import Dashboard from "@/layouts/Dashboard"
import ProjectPage from "@/components/projects/ProjectPage";

export default function Projects() {

    return <Dashboard>
        <div className="flex flex-col gap-4">
            <ProjectPage/>
        </div>
    </Dashboard>
}