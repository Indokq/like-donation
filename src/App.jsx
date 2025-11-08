import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import DonationForm from './components/DonationForm';

function App() {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const handleEnter = () => {
    setShowDonationForm(true);
  };

  return (
    <>
      {!showDonationForm ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <DonationForm />
      )}
    </>
  );
}

export default App;
