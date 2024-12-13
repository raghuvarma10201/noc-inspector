import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';
import './Loader.css'; // Optional for custom styles

interface LoaderProps {
  message?: string; // Optional dynamic text
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <IonSpinner name="crescent" />
      <IonText className="loader-message">{message}</IonText>
    </div>
  );
};

export default Loader;
