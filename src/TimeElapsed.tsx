import React, { useState, useEffect } from 'react';

const ElapsedTimeClock = () => {
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const startTime: Date = new Date();

    const updateElapsedTime = () => {
      const now: Date = new Date();
      const difference = now - startTime;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);

      setElapsedTime({ days, hours, minutes });
    };

    const timer = setInterval(updateElapsedTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-black rounded-3xl p-8 shadow-2xl border-4 border-red-600">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-red-600 rounded-xl p-4">
            <div className="text-6xl font-bold text-white">{elapsedTime.days.toString().padStart(2, '0')}</div>
            <div className="text-2xl text-white mt-2">Days</div>
          </div>
          <div className="bg-red-600 rounded-xl p-4">
            <div className="text-6xl font-bold text-white">{elapsedTime.hours.toString().padStart(2, '0')}</div>
            <div className="text-2xl text-white mt-2">Hours</div>
          </div>
          <div className="bg-red-600 rounded-xl p-4">
            <div className="text-6xl font-bold text-white">{elapsedTime.minutes.toString().padStart(2, '0')}</div>
            <div className="text-2xl text-white mt-2">Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElapsedTimeClock;