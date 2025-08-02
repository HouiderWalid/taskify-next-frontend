import Dashboard from "@/layouts/Dashboard"
import SmallStatsCards from "@/components/SmallStatsCards";
import ChartCards from "@/components/ChartCards";

export default async function Home() {

    return <Dashboard>
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
                <SmallStatsCards/>
            </div>
            <div className="flex gap-4">
                <ChartCards/>
            </div>
        </div>
    </Dashboard>
}
