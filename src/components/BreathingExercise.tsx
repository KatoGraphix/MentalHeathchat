import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { breathingExercises } from '../data/breathing-exercises';
import { BreathingExercise as BreathingExerciseType } from '../types';

const BreathingExerciseComponent: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExerciseType>(breathingExercises[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const stepDuration = 5000; // 5 seconds per step
  
  // Step timing logic
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - (startTimeRef.current || 0);
        const stepProgress = (elapsed % stepDuration) / stepDuration;
        setProgress(stepProgress);
        
        // Update timer
        setTimer(Math.floor(elapsed / 1000));
        
        // Update step
        const newStep = Math.floor(elapsed / stepDuration) % selectedExercise.steps.length;
        if (newStep !== currentStep) {
          setCurrentStep(newStep);
        }
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, currentStep, selectedExercise.steps.length]);
  
  const toggleExercise = () => {
    setIsRunning(!isRunning);
  };
  
  const resetExercise = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setTimer(0);
  };
  
  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const exercise = breathingExercises.find(ex => ex.id === e.target.value);
    if (exercise) {
      resetExercise();
      setSelectedExercise(exercise);
    }
  };
  
  // Calculate circle styles based on breathing pattern
  const getCircleStyle = () => {
    // Different sizes for inhale, hold, exhale states
    const baseSize = 150;
    const maxSize = 220;
    const minSize = 150;
    
    // Determine current action
    const stepName = selectedExercise.steps[currentStep].toLowerCase();
    let targetSize;
    
    if (stepName.includes('inhale') || stepName.includes('breathe in')) {
      // Grow during inhale
      targetSize = minSize + (maxSize - minSize) * progress;
    } else if (stepName.includes('exhale') || stepName.includes('breathe out')) {
      // Shrink during exhale
      targetSize = maxSize - (maxSize - minSize) * progress;
    } else {
      // Hold breath
      targetSize = stepName.includes('hold') ? maxSize : baseSize;
    }
    
    return {
      width: `${targetSize}px`,
      height: `${targetSize}px`,
      transition: 'width 0.3s ease, height 0.3s ease'
    };
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">Breathing Exercises</h2>
      
      <div className="mb-6 w-full max-w-md">
        <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 mb-2">
          Choose an exercise:
        </label>
        <select
          id="exercise-select"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          value={selectedExercise.id}
          onChange={handleExerciseChange}
          disabled={isRunning}
        >
          {breathingExercises.map(exercise => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-700 text-center mb-4">{selectedExercise.description}</p>
      </div>
      
      <div className="flex items-center justify-center mb-8 relative">
        <div 
          className="rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center transition-all duration-700 ease-in-out"
          style={getCircleStyle()}
        >
          <span className="text-purple-800 font-medium text-lg text-center p-4">
            {isRunning ? selectedExercise.steps[currentStep] : "Press play to start"}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={toggleExercise}
          className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span className="ml-2">{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        
        <button
          onClick={resetExercise}
          className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          disabled={!isRunning && timer === 0}
        >
          <RotateCcw size={20} />
          <span className="ml-2">Reset</span>
        </button>
      </div>
      
      {isRunning && (
        <div className="text-center">
          <p className="text-gray-600">{formatTime(timer)}</p>
        </div>
      )}
      
      <div className="mt-8 w-full max-w-lg">
        <h3 className="font-medium mb-2 text-gray-800">Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {selectedExercise.steps.map((step, index) => (
            <li 
              key={index}
              className={currentStep === index && isRunning ? "font-medium text-purple-700" : ""}
            >
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BreathingExerciseComponent;