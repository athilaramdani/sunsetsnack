import Link from 'next/link';

const GoToDashboardSeller = () => {
  return (
    <div className="flex justify-center items-center h-60 md:h-96">
      <div className="bg-white p-4 w-full shadow rounded-lg max-w-sm mx-auto text-center">
        <h1 className="text-2xl font-bold">Pergi ke gerai mu</h1>
        <Link href="/dashboard" className="bg-green-500 text-white px-4 py-2 mt-4 inline-block rounded hover:bg-green-600">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default GoToDashboardSeller;
