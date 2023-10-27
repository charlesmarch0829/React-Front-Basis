import { useEffect } from 'react';
import NProgress from 'nprogress';

import { Spin } from 'antd';

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

export default SuspenseLoader;
