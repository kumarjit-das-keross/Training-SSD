export default function Header({children}) {
  return (
    <div className="bg-blue-50  rounded-md shadow-md mb-4">
      <h2 className="text-lg font-bold text-blue-900 text-center">
        {children}
      </h2>
    </div>
  );
}
