import Navbar from '@/components/Navbar/navbar';
import ProfileCard from '@/components/profilecard';
import HistoryList from '@/components/historylist';

const History = () => {

    const purchases = [
        {
          date: '8 Juni 2024',
          id: 'SS4498',
          store: 'Dunkin Donuts Cabang Kemang',
          name: 'Standard Mystery Pack 1',
          price: 'Rp 18.000',
        },
        {
          date: '5 Juni 2024',
          id: 'SS4952',
          store: 'JCO Cabang Kemang',
          name: 'Standard Mystery Pack 1',
          price: 'Rp 21.000',
        },
      ];
    
    return (
        <div>
            <Navbar />
        <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/4">
        <ProfileCard />
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-4">Pembelian</h2>
        {purchases.map((purchase, index) => (
          <HistoryList key={index} {...purchase} />
        ))}
      </div>
    </div>
    </div>
    )
}
export default History;