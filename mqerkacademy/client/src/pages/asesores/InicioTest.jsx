import { useState } from 'react';
import Topbar from '../../components/web/Topbar';
import InicioTest from '../../components/asesores/InicioTest';
import Bigfive from "../../components/asesores/Bigfive";
import Dass from "../../components/asesores/Dass21";
import Zavic from "../../components/asesores/Zavic";
import Baron from "../../components/asesores/Baron";
import Wais from "../../components/asesores/Wais";
import Academica from "../../components/asesores/Academica";
import Resultados from "../../components/asesores/ResultadosTest";
import CountdownTimer from '../../components/asesores/ContadorTest';

export default function RegistroPage() {
  const [currentStep, setCurrentStep] = useState('inicio');
  const [showTimer, setShowTimer] = useState(false);

  const handleStart = () => {
    setCurrentStep('bigfive');
    setShowTimer(true);
  };

  const handleTimeUp = () => {
    console.log("¡Tiempo terminado!");
    // Aquí puedes manejar qué hacer cuando se acabe el tiempo
    // Por ejemplo, enviar respuestas automáticamente
  };

  const renderComponent = () => {
    switch(currentStep) {
      case 'inicio':
        return <InicioTest onStart={handleStart} />;
      case 'bigfive':
        return <Bigfive onNext={() => setCurrentStep('dass')} />;
      case 'dass':
        return <Dass onNext={() => setCurrentStep('zavic')} />;
      case 'zavic':
        return <Zavic onNext={() => setCurrentStep('baron')} />;
      case 'baron':
        return <Baron onNext={() => setCurrentStep('wais')} />;
      case 'wais':
        return <Wais onNext={() => setCurrentStep('academica')} />;
      case 'academica':
        return <Academica onNext={() => setCurrentStep('resultados')} />;
      case 'resultados':
        return <Resultados />;
      default:
        return <InicioTest onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Topbar />
      {/* Temporizador global - solo se muestra después de iniciar */}
      {showTimer && (
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <CountdownTimer initialMinutes={80} onTimeUp={handleTimeUp} />
        </div>
      )}
      <div>
        {renderComponent()}
      </div>
    </div>
  );
}