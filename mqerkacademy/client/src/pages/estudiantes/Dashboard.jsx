// import Dashboard1 from "../../components/estudiantes/Dashboard1";
// import Dashboard2 from "../../components/estudiantes/Dashboard2";
import Dashboard3 from "../../components/estudiantes/Dashboard3";
import Topbar from "../../components/estudiantes/TopbarUno";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-900">
      <Topbar />
      <Dashboard3 />
    </div>
  )
}

export default Dashboard