import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome To CaféFinder.ID</h1>
      <p className="mb-6">Find a cafe with your style in Bandar Lampung!</p>
      <Link to="/cafes" className="bg-brown-500 text-white px-4 py-2 rounded">Lihat Daftar Kafe</Link>
    </div>
  );
}