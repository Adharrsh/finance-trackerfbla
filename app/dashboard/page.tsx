import Sidebar from "../../components/Sidebar";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is a basic demo with a sidebar.</p>
      </main>
    </div>
  );
}
