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

  useEffect(() => {
    let startTime: Date;

    const fetchServerTime = async () => {
      try {
        const response = await fetch('https://danieldenni-how-many-da-99.deno.dev/time');
        const data: { serverTime: string } = await response.json();
        console.log(data);
        startTime = new Date(data.serverTime);
        updateElapsedTime();
      } catch (error) {
        console.error('Failed to fetch server time:', error);
      }
    };

    const updateElapsedTime = () => {
      const now = new Date();
      const difference = now.getTime() - startTime.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setElapsedTime({ days, hours, minutes, seconds });
    };

    fetchServerTime();

    // Update every second (1000 milliseconds)
    const timer = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-black rounded-3xl p-8 shadow-2xl border-4 border-red-600">
        <div className="grid grid-cols-4 gap-4 text-center">
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
          <div className="bg-red-600 rounded-xl p-4">
            <div className="text-6xl font-bold text-white">{elapsedTime.seconds.toString().padStart(2, '0')}</div>
            <div className="text-2xl text-white mt-2">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElapsedTimeClock;
