import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function ProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleRouteChange = () => {
      NProgress.start();

      setTimeout(() => {
        NProgress.done();
      }, 500);
    };

    handleRouteChange();

    return () => {
      NProgress.done();
    };
  }, [location]);

  return null;
}
