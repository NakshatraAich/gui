import { useState, useEffect } from 'preact/hooks';
import { fan, logo } from '../../assets';

export function Home() {

    const [capacity, setCapacity] = useState(100);

    const [dateTime, setDateTime] = useState({
        date: "",
        time: ""
    });

    const [timer, setTimer] = useState(0); // 8 hours in seconds (example)

    // Update Date & Time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = now.toLocaleDateString("en-US", options);
            const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

            setDateTime({ date: formattedDate, time: formattedTime });
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Capacity Countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCapacity((prev) => (Math.floor(prev > 0 ? prev - 1 : 0)));
        }, (25*60*60*1000)/100); // Decrease every second

        return () => clearInterval(interval);
    }, []);


    // Format Time (HH:MM:SS)
    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return { hrs, mins, secs };
    };

    const { hrs, mins, secs } = formatTime(timer);

    return (
        <div className="home h-[320px] w-[480px] bg-black flex flex-col text-white">
            <div className="flex flex-row justify-between items-center p-4 border-b border-[#1d1d1d]">
                <img src={logo} className="h-7 w-auto"/>
                <div className="custom-font font-semibold text-xl">AL 500</div>
            </div>

            <div className="p-4 mt-8 flex flex-col flex-stretch h-full gap-4">
                <div className="flex flex-row justify-between items-end"> 
                    <div className="custom-font text-[100px] leading-[80px] font-bold">{capacity}%</div>
                    <div className="font-semibold text-xl leading-[15px]">{hrs}:{mins}:{secs}</div>
                </div>
            
            <div className="relative p-[10px] w-full">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#B5D411] to-[#8BAA10] h-full" style={{ width: `${capacity}%` }}></div>
                <div className="absolute top-0 left-0 bg-[#1D1D1D] h-full" style={{ width: `${100 - capacity}%` }}></div>
            </div>
                
                <div className="font-semibold text-sm leading-[15px]">
                    OUTPUT: 30W
                </div>
            </div>

            <div className="col-start-1 col-end-9 row-start-10 row-end-11 rounded-sm text-[#626262] flex flex-row w-full justify-between border-t border-[#1d1d1d] py-2 px-4">
                <div className="text-[10px] font-bold tracking-wider self-center">{dateTime.date.toUpperCase()}</div>
                <div className="text-[10px] font-bold self-center">{dateTime.time}</div>
            </div>
        </div>
    );
}
