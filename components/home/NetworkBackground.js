import { useEffect, useRef } from 'react';
import VANTA from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

export default function NetworkBackground({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = VANTA.NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 600,
        minWidth: 600,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xffffff,
        backgroundColor: 0x000000,
        points: 15,
        maxDistance: 25,
        spacing: 15,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={vantaRef} className="absolute inset-0 -z-10">
      {children}
    </div>
  );
}
