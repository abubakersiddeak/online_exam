import Exams from "./component/Exams";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/3649732.jpg')" }}
    >
      <Exams />
    </div>
  );
}
