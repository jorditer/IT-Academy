import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useCounterContext } from '../context/useCounterContext';
import Card from './Card';
import Price from './Price';
import Switch from './Switch';
import { useNavigate, useLocation } from 'react-router-dom';

const Form = () => {
  const { handleCheckboxChange, setNumIdiomes, setNumPagines, total, content, numIdiomes, numPagines, checkedStates, setCheckedStates, isSwitchOn, setIsSwitchOn } = useCounterContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const calculatePrice = (price: number) => {
    return isSwitchOn ? price * 0.8 : price;
  };

  // Flags para no tener cambios cuando no toca
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      const params = new URLSearchParams(location.search);
      const newCheckedStates = [
        params.get('Seo') === 'true',
        params.get('Ads') === 'true',
        params.get('Web') === 'true',
      ];
      const newIsSwitchOn = params.get('disc') === 'true';

      // Checkea si hay cambios, si los hay los aplica a los states
      setCheckedStates((prevCheckedStates) => {
        if (JSON.stringify(newCheckedStates) !== JSON.stringify(prevCheckedStates)) {
          return newCheckedStates;
        }
        return prevCheckedStates;
      });

      setIsSwitchOn((prevIsSwitchOn) => {
        if (newIsSwitchOn !== prevIsSwitchOn) {
          return newIsSwitchOn;
        }
        return prevIsSwitchOn;
      });
    }
  // }, []); // Solo quiero que renderice al cargar pero da warning
  }, [location.search, setCheckedStates, checkedStates, setIsSwitchOn]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (isInitialLoad) {
      setIsInitialLoad(false);
      const newNumPagines = parseInt(params.get('pag') || '1', 10);
      const newNumIdiomes = parseInt(params.get('lang') || '1', 10);
      if (newNumPagines !== numPagines) {
        setNumPagines(newNumPagines);
      }
      if (newNumIdiomes !== numIdiomes) {
        setNumIdiomes(newNumIdiomes);
      }
      return;
    }
  
    if (checkedStates[2]) {
      if (params.get('pag') !== numPagines.toString()) {
        params.set('pag', numPagines.toString());
      }
      if (params.get('lang') !== numIdiomes.toString()) {
        params.set('lang', numIdiomes.toString());
      }
    } else {
      params.delete('pag');
      params.delete('lang');
    }
  
    if (checkedStates[0]) params.set('Seo', 'true');
    else params.delete('Seo');
    if (checkedStates[1]) params.set('Ads', 'true');
    else params.delete('Ads');
    if (checkedStates[2]) params.set('Web', 'true');
    else params.delete('Web');
    if (isSwitchOn) params.set('disc', 'true');
    else params.delete('disc');
  
    navigate(`?${params.toString()}`, { replace: true });
  }, [checkedStates, navigate, setNumIdiomes, setNumPagines, isInitialLoad, numIdiomes, numPagines, isSwitchOn, location.search]);


  return (
    <>
      <Switch onChange={handleSwitchChange} isSwitchOn={isSwitchOn}/>
      {content.map((item, index:number) => (
        <Card
          key={index}
          title={item.title}
          text={item.text}
          preu={calculatePrice(item.preu)}
          checked={checkedStates[index]}
          onChange={() => handleCheckboxChange(index)}
          switchState={isSwitchOn}
        />
      ))}
      <Price price={total} />
    </>
  );
};

export default Form;