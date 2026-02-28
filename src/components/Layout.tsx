import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 font-sans flex justify-center items-center md:py-10">
      <div className="w-full h-full min-h-screen md:min-h-[844px] md:w-[390px] md:h-[844px] md:rounded-[3rem] bg-gray-50 relative shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden md:border-[8px] md:border-white flex flex-col">
        {/* Fake Notch for Desktop Simulation */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-white rounded-b-3xl z-50"></div>
        
        <Header />
        <main className="flex-1 w-full overflow-y-auto hide-scroll relative z-10 pb-28">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
