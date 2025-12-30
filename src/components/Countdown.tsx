import { useState, useEffect } from 'react';
import './Countdown.css';

interface CountdownProps {
    birthdayMonth: number;
    birthdayDay: number;
    birthYear: number;
    isPast: boolean;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown = ({ birthdayMonth, birthdayDay, birthYear, isPast }: CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [age, setAge] = useState<number>(0);

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Get current time in IST
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
            const utcTime = now.getTime();
            const istTime = new Date(utcTime + istOffset);

            const currentYear = istTime.getFullYear();

            // Determine target year (this year or next year)
            let targetYear = currentYear;
            if (isPast) {
                targetYear = currentYear + 1;
            }

            // Create birthday date in IST
            const birthdayThisYear = new Date(Date.UTC(targetYear, birthdayMonth, birthdayDay, 0, 0, 0));
            const birthdayIST = birthdayThisYear.getTime() - istOffset;

            const difference = birthdayIST - utcTime;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }

            // Calculate age
            const nextAge = targetYear - birthYear;
            setAge(nextAge);
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [birthdayMonth, birthdayDay, birthYear, isPast]);

    return (
        <div className="countdown-container">
            <div className="content">
                <h1 className="name">Mahima Singha</h1>
                <p className="subtitle">
                    {isPast
                        ? `Counting down to the ${age}${getOrdinalSuffix(age)} birthday!`
                        : `${age}${getOrdinalSuffix(age)} Birthday Countdown`}
                </p>

                <div className="timer-grid">
                    <div className="timer-box">
                        <div className="timer-value">{String(timeLeft.days).padStart(2, '0')}</div>
                        <div className="timer-label">Days</div>
                    </div>
                    <div className="timer-box">
                        <div className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="timer-label">Hours</div>
                    </div>
                    <div className="timer-box">
                        <div className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="timer-label">Minutes</div>
                    </div>
                    <div className="timer-box">
                        <div className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="timer-label">Seconds</div>
                    </div>
                </div>

                <p className="date-info">January 7th • IST Timezone</p>
            </div>
        </div>
    );
};

function getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

export default Countdown;
