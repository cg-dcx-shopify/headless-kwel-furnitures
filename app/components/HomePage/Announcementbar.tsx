"use client";
import { useEffect, useState } from "react";
import "@/app/components/main.css";

export default function Announcementbar() {
  const announcement = [
    { id: 1, title: "Free Shipping on Orders Over $50!" },
    { id: 2, title: "Get 20% Off Your Next Purchase!" },
    { id: 3, title: "New Arrivals Just Landed - Shop Now!" },
  ];

  const [lines, setLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => (prev + 1) % announcement.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar">
      <p
        key={announcement[lines].id}
        className="announcement-lines"
      >
        {announcement[lines].title}
      </p>
    </div>
  );
}
