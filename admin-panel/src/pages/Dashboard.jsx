import AdminNavbar from "../components/AdminNavbar";

function Dashboard() {
  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          Welcome Admin 👋
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;
