import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX } from 'lucide-react';
import { Message } from '../types';
import { generateBotResponse } from '../utils/chatbot-logic';
import speech from '../utils/speech';
import { v4 as uuidv4 } from 'uuid';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Mindy, your friendly mental health companion. I'm here to listen and support you with a gentle heart. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech synthesis
  useEffect(() => {
    speech.init();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      speech.stop();
      setIsSpeaking(false);
    } else {
      const lastBotMessage = messages.findLast(m => m.sender === 'bot');
      if (lastBotMessage) {
        speech.speak(lastBotMessage.text);
        setIsSpeaking(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // If speech is enabled, speak the response
      if (isSpeaking) {
        speech.speak(botResponse.text);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3 
                  ${message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'}
                `}
              >
                <p>{message.text}</p>
                <div 
                  className={`text-xs mt-1 
                    ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleSpeech}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isSpeaking ? "Mute Mindy" : "Let Mindy speak"}
          >
            {isSpeaking ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            type="submit"
            className="bg-purple-600 text-white p-3 rounded-r-lg hover:bg-purple-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Remember: I'm not a substitute for professional mental health advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;