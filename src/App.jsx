import { useRef, useState } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import Hero from './components/Hero';
import PersonalNote from './components/PersonalNote';
import SaveTheDate from './components/SaveTheDate';
import Ceremony from './components/Ceremony';
import Reception from './components/Reception';
import Itinerary from './components/Itinerary';
import DressCode from './components/DressCode';
import Countdown from './components/Countdown';
import Confirm from './components/Confirm';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const audioRef = useRef(null);
  const heroRef = useRef(null);

  const handleOpen = () => {
    setEnvelopeOpened(true);
    audioRef.current?.play().catch(() => {});
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
  };

  return (
    <>
      <EnvelopeScreen onOpen={handleOpen} />

      {envelopeOpened && (
        <>
          <div ref={heroRef}>
            <Hero />
          </div>
          <PersonalNote />
          <SaveTheDate />
          <Ceremony />
          <Reception />
          <Itinerary />
          <DressCode />
          <Countdown />
          <Confirm />
          <Footer />
        </>
      )}

      <MusicPlayer envelopeOpened={envelopeOpened} audioRef={audioRef} />
    </>
  );
}
