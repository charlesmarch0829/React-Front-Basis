import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

const BaseLayout = ({ children }) => {
  return <div className="flex-1 h-full">{children || <Outlet />}</div>;
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
