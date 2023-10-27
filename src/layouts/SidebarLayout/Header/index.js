import { useNavigate } from 'react-router-dom';

const Header = ({ store }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between bg-color: to-blue-300 h-20 w-full px-12 py-4">
        <div className=" text-4xl">Logo</div>
        <div className="flex justify-around gap-24">
          <div>
            <button className=" text-3xl">Help</button>
          </div>
          <div>
            <button
              className=" text-3xl"
              onClick={() => {
                store.handleLogout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
