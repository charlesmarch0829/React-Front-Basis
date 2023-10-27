import Header from './Header';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <>
      <div className="flex-1 h-full">
        <Header />
        <div className="relative z-5 flex-1 px-12 ml-56">
          <div className="block">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
