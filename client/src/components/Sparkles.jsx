import React from "react";
import "../App.css";

// Softer, smaller, more subtle sparkles
const SPARKLES = [
  { top: "12%", left: "10%", size: 3.2, delay: 0 },
  { top: "18%", left: "22%", size: 2.7, delay: 0.5 },
  { top: "22%", left: "38%", size: 3.5, delay: 0.7 },
  { top: "30%", left: "65%", size: 2.8, delay: 1.2 },
  { top: "44%", left: "80%", size: 3.8, delay: 0.3 },
  { top: "60%", left: "25%", size: 2.5, delay: 1.5 },
  { top: "68%", left: "55%", size: 3.1, delay: 0.9 },
  { top: "75%", left: "78%", size: 2.6, delay: 1.8 },
  { top: "82%", left: "15%", size: 3.2, delay: 0.5 },
  { top: "55%", left: "50%", size: 3.7, delay: 1.1 },
  { top: "35%", left: "75%", size: 2.9, delay: 0.8 },
  { top: "70%", left: "60%", size: 3.4, delay: 1.3 },
  { top: "80%", left: "40%", size: 2.8, delay: 1.6 },
  { top: "25%", left: "60%", size: 3.1, delay: 0.6 },
  { top: "50%", left: "20%", size: 2.7, delay: 1.4 },
];

export default function Sparkles() {
  return (
    <div className="sparkles-container">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size + "px",
            height: s.size + "px",
            animationDelay: s.delay + "s",
          }}
        />
      ))}
    </div>
  );
}
