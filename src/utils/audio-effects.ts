
import { Howl } from 'howler'; // Import Howl

// Map to store Howl instances for other UI sounds
const howlInstances: Map<string, Howl> = new Map();

export const playUiSound = (fileName: string) => {
  try {
    const audioPath = `/audio/${fileName}`;
    console.log(`[playUiSound] Attempting to play: ${audioPath}`);

    // Use Howler.js for all sounds, managing instances to prevent recreation
    let sound = howlInstances.get(fileName);
    if (!sound) {
      sound = new Howl({
        src: [audioPath],
        volume: 0.7,
        html5: true, // Use HTML5 Audio for Howler.js to avoid Web Audio API limitations for short sounds
        onend: function() {
          // No need to unload here if we want to reuse the instance
        },
        onloaderror: (id, err) => {
          console.error(`[playUiSound] Howler.js load error for ${fileName}:`, err, `(ID: ${id})`);
          console.trace(`[playUiSound] Call stack for Howler.js load error for ${fileName}`);
        },
        onplayerror: (id, err) => {
          console.error(`[playUiSound] Howler.js play error for ${fileName}:`, err, `(ID: ${id})`);
          console.trace(`[playUiSound] Call stack for Howler.js play error for ${fileName}`);
        }
      });
      howlInstances.set(fileName, sound);
    }
    sound.play(); // Play the existing or newly created instance
  } catch (e) {
    console.error("Error creating or playing UI audio:", e);
  }
};