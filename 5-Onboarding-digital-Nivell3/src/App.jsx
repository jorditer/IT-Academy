import { useState } from 'react'; // Import useState from React
import './css/style.css'
import Card from './components/Card.jsx'

const tutorialData = [
	{
		title: 'Dedica moltes hores',
    description: 'Un mínim de 30 hores a la setmana. Si no en tens prou, hauràs de dedicar-li més hores. Al principi sembla impossible, però notaràs una millora ràpidament.',
    bgColor: 'bg-teal-700',
    image: 'src/imgs/time_managment.svg'
	},
	{
    title: 'Programa projectes propis',
    description: 'Més val 10 hores treballant en projectes propis, que 10 hores mirant tutorials. La motivació i la implicació en el projecte ajudarà a accelerar el teu aprenentatge.',
    bgColor: 'bg-gray-400',
    image: 'src/imgs/programming.svg'
	},
	{
    title: 'Procura descansar',
    description: 'Descansar bé i desconnectar són vitals. D\'aquesta manera reduiràs l\'estrès i l\'ansietat. Milloraràs la teva concentració i consolidaràs el teu aprenentatge.',
    bgColor: 'bg-yellow-400',
    image: 'src/imgs/meditation.svg'

	},
]



function App() {
  const [step, setStep] = useState(0);

  const increaseStep = () => { // Asegura que no pase de arr.length - 1
    setStep((prevStep) => Math.min(prevStep + 1, tutorialData.length - 1));
  };

  const decreaseStep = () => { // Asegura que no baje de 0
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const moveTo = (pos) => { //Cambiar carta x
    setStep(pos);
  }

  return (
    <div className='w-full'>
    <Card 
      currentCardData={tutorialData[step]}
      increaseStep={increaseStep}
      decreaseStep={decreaseStep}
      step={step}
      length={tutorialData.length}
      moveTo={moveTo}
    />
    </div>
  )
}

export default App
