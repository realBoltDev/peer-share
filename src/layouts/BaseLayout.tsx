import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { navigationData } from '@/data/navigation';

export default function BaseLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header navigationData={navigationData}/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
