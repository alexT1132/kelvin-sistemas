import Topbar from '../../components/administrativo/Topbar.jsx';
import Sidebar from '../../components/administrativo/Sidebar.jsx';
import Dashboard from "../../components/administrativo/Dashboard.jsx"

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Topbar - Fixed at top */}
      <div className="flex-shrink-0">
        <Topbar />
      </div>
      
      {/* Main Container - Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Full height below topbar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
            <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Layout;