"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { key: string };
}) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (searchParams.key === undefined) {
      redirect("/404");
    }
    const ws = new WebSocket(
      `ws://localhost:3000?key=${encodeURIComponent(searchParams.key)}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.key);
    };

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [searchParams.key]);

  return (
    <div>
      <h1>Main Page</h1>
      <p>Received message: {message}</p>
    </div>
  );
}
