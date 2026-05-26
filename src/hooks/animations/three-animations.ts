
// Утилиты анимации Three.js
export const useThreeAnimations = () => {
  return {
    orbitRotation: (object: any, speed: number = 0.01) => {
      object.rotation.x += speed;
      object.rotation.y += speed;
    },
    
    pulseScale: (object: any, intensity: number = 0.1) => {
      const scale = 1 + Math.sin(Date.now() * 0.001) * intensity;
      object.scale.set(scale, scale, scale);
    },
    
    floatAnimation: (object: any, amplitude: number = 0.5) => {
      object.position.y = Math.sin(Date.now() * 0.001) * amplitude;
    },
    
    colorShift: (material: any, colors: any[], speed: number = 0.001) => {
      const time = Date.now() * speed;
      const colorIndex = Math.floor(time % colors.length);
      const nextIndex = (colorIndex + 1) % colors.length;
      const progress = time % 1;
      
      if (material instanceof (window as any).THREE.MeshBasicMaterial) {
        material.color.lerpColors(colors[colorIndex], colors[nextIndex], progress);
      }
    },
    
    waveDeformation: (geometry: any, amplitude: number = 0.5) => {
      const positions = geometry.attributes.position.array;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(positions[i] + time) * amplitude;
      }
      geometry.attributes.position.needsUpdate = true;
    }
  };
};