
import { useMediaQuery } from '@mui/material';
import MainSectionCarrusel from './MainSectionCarrusel';
import MainSectionCard from './MainSectionCard';

const Main = () => {
  const isMobile = useMediaQuery('(max-width:768px)'); 

  return (
    <div>
         {isMobile ? (
          <MainSectionCarrusel/>
         ):<MainSectionCard/>}
    </div>
  );
};

export default Main;
