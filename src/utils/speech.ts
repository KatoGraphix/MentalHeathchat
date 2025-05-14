// Speech synthesis utility
const speech = {
  // Speech synthesis instance
  synth: window.speechSynthesis,
  
  // Voice settings
  settings: {
    voice: null as SpeechSynthesisVoice | null,
    pitch: 1.1, // Slightly higher pitch for a sweeter voice
    rate: 0.9,  // Slightly slower rate for softer delivery
    volume: 0.9 // Slightly reduced volume for gentler sound
  },

  // Initialize voice
  init() {
    // Wait for voices to be loaded
    if (speech.synth.getVoices().length === 0) {
      speech.synth.addEventListener('voiceschanged', () => {
        speech.settings.voice = speech.synth.getVoices()
          .find(voice => 
            (voice.lang === 'en-US' && voice.name.includes('Female')) ||
            voice.name.includes('Samantha') // Prioritize Samantha voice if available
          ) || speech.synth.getVoices()[0];
      });
    } else {
      speech.settings.voice = speech.synth.getVoices()
        .find(voice => 
          (voice.lang === 'en-US' && voice.name.includes('Female')) ||
          voice.name.includes('Samantha')
        ) || speech.synth.getVoices()[0];
    }
  },

  // Speak text
  speak(text: string) {
    if (!speech.settings.voice) return;
    
    // Cancel any ongoing speech
    speech.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speech.settings.voice;
    utterance.pitch = speech.settings.pitch;
    utterance.rate = speech.settings.rate;
    utterance.volume = speech.settings.volume;

    speech.synth.speak(utterance);
  },

  // Stop speaking
  stop() {
    speech.synth.cancel();
  }
};

export default speech;