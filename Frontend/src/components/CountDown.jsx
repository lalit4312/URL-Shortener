import { useState, useEffect } from "react";

function Countdown({ seconds, onFinish }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [remaining, onFinish]);

  if (remaining <= 0) return null;

  return (
    <p className="countdown">
      You can create another URL in {remaining} seconds.
    </p>
  );
}

export default Countdown;
