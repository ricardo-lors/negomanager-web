import { Sidebar } from "../shared/Sidebar"
import { DashboardRoutes } from "./routes/DashboardRoutes"

export const DashboardPage = () => {
    return (
        // <div className="container-fluid">
        <div className="row vh-100">
            <Sidebar />
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <DashboardRoutes />
            </div>
        </div>
    )
}
