import React, { useState, useEffect } from 'react';

interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ElapsedTimeClock: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState<ElapsedTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentDay, setCurrentDay] = useState<string>('');

  useEffect(() => {
    const startTime = new Date('2024-07-28T16:00:00');

    const updateElapsedTime = () => {
      const now = new Date();
      const difference = now.getTime() - startTime.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setElapsedTime({ days, hours, minutes, seconds });
    };

    updateElapsedTime();
    const timer = setInterval(updateElapsedTime, 1000);

    setCurrentDay(new Date().toDateString());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-black rounded-3xl p-4 sm:p-8 shadow-2xl border-4 border-red-600 w-full max-w-md">
        <div className="text-center mb-4 sm:mb-8 text-xl sm:text-2xl text-white">
          Current Day: {currentDay}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
          {[
            { label: 'Days', value: elapsedTime.days },
            { label: 'Hours', value: elapsedTime.hours },
            { label: 'Minutes', value: elapsedTime.minutes },
            { label: 'Seconds', value: elapsedTime.seconds },
          ].map((item) => (
            <div key={item.label} className="bg-red-600 rounded-xl p-2 sm:p-4">
              <div className="text-4xl sm:text-6xl font-bold text-white">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-lg sm:text-2xl text-white mt-1 sm:mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElapsedTimeClock;