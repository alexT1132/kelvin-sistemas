import { useState, useEffect } from "react";
import Footer from "../../components/web/footer.jsx";
import Navbar from "../../components/web/Navbar.jsx";
import HeroVideo from "../../components/web/HeroVideo.jsx";
import Nuestroscursos from "../../components/web/Cursos.jsx";
import Trayectoria, { DEMO_ITEMS } from "../../components/web/Trayectoria.jsx";
import Modelo from "../../components/web/Modelo.jsx";
import Video from "../../assets/web/video.mp4";
import NuestrosAsesores from "../../components/web/NuestrosAsesores.jsx";
import FloatingWhatsapp from "../../components/web/FloatingWhatsapp.jsx";
import Uno1 from "../../assets/web/convenios/1.png";
import Dos2 from "../../assets/web/convenios/2.png";
import Tres3 from "../../assets/web/convenios/3.png";
import Cuatro4 from "../../assets/web/convenios/4.png";
import Cinco5 from "../../assets/web/convenios/5.png";
import Seis6 from "../../assets/web/convenios/6.png";
import Siete7 from "../../assets/web/convenios/7.png";
import Ocho8 from "../../assets/web/convenios/8.png";
import Foto1 from "../../assets/web/carrusel/1.png";
import Foto2 from "../../assets/web/carrusel/2.png";
import Foto3 from "../../assets/web/carrusel/3.png";
import Foto4 from "../../assets/web/carrusel/4.png";
import Foto5 from "../../assets/web/carrusel/5.png";
import Foto6 from "../../assets/web/carrusel/6.png";
import Foto7 from "../../assets/web/carrusel/7.png";
import Foto8 from "../../assets/web/carrusel/8.png";

function Web() {

    const imagenes = [
      Uno1,
      Dos2,
      Tres3,
      Cuatro4,
      Cinco5,
      Seis6,
      Siete7,
      Ocho8,
    ];
  
    // Repetimos las imágenes para crear el efecto loop sin cortes
    const carruselImagenes = [
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
      ...imagenes,
    ];

    const images = [
      Foto1,
      Foto2,
      Foto3,
      Foto4,
      Foto5,
      Foto6,
      Foto7,
      Foto8
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (forward) {
            if (prev === images.length - 1) {
              setForward(false);
              return prev - 1;
            }
            return prev + 1;
          } else {
            if (prev === 0) {
              setForward(true);
              return prev + 1;
            }
            return prev - 1;
          }
        });
      }, 4000);
      return () => clearInterval(interval);
    }, [forward]);

    const getLeftImage = () => images[(currentIndex - 1 + images.length) % images.length];
    const getRightImage = () => images[(currentIndex + 1) % images.length];


  return (
    <div className="min-h-screen flex flex-col" id="inicio" >
        <Navbar />
        <HeroVideo
          mp4Src={Video}
          headline={<>Educación disruptiva en <span className="whitespace-nowrap">Ciencia + Tecnología</span></>}
          subheadline="igual mentes que transforman el mundo."
          highlight="¡Da el primer paso hacia tu éxito académico!"
          ctaText="¡Regístrate aquí!"
          ctaHref="#registro"
        />
        <Nuestroscursos />
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c24ba]">+10 convenios y participaciones con instituciones</h2>
          <div className="overflow-hidden w-full py-6">
            <div className="flex animate-marquee space-x-6 w-max">
              {carruselImagenes.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`img-${index}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F4138A]">Nuestros estudiantes</h2>
          <br />
          <div className="pasarela-3d-container mb-10">
            <div className="pasarela-3d">
              <img src={getLeftImage()} alt="left" className="pasarela-img left" />
              <img src={images[currentIndex]} alt="center" className="pasarela-img center" />
              <img src={getRightImage()} alt="right" className="pasarela-img right" />
            </div>
          </div>
        </div>

        <Trayectoria items={DEMO_ITEMS} />

        <Modelo />

        <NuestrosAsesores />

        <FloatingWhatsapp
          phone="522871515760" 
          message="¡Hola MQerk! Me quiero registrar a un curso."
          position="br"        
          showAfter={200}      
          tooltip="¿Dudas? Escríbenos"
          pulse={true}
        />

        <Footer />
    </div>
  )
}

export default Web