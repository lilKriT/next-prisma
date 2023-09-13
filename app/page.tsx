import UserList from "./components/UserList";

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-4xl text-center font-bold mb-8">Current goals:</h1>
      <UserList />
    </div>
  );
}
