export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if Google Maps script is already loaded
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }
  
      // Create script element to load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`; // Add other libraries if needed
      script.async = true;
      script.defer = true;
  
      script.onload = () => {
        resolve();
      };
  
      script.onerror = () => {
        reject(new Error('Google Maps script could not be loaded.'));
      };
  
      document.head.appendChild(script);
    });
  };
