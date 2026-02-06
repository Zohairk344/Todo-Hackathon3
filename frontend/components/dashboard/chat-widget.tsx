"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, AlertTriangle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  userId: string;
  onTasksChange: () => void;
}

export function ChatWidget({ userId, onTasksChange }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://todo-hackathon3.hf.space";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      fetch(`/api/${userId}/chat`, {
         method: "GET",
         headers: { "Content-Type": "application/json" },
         credentials: "include" 
      })
        .then((res) => {
            if (res.ok) return res.json();
            return [];
        })
        .then((data) => {
            if (Array.isArray(data)) setMessages(data);
        })
        .catch(() => {}) 
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, userId, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (retries = 3) => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setErrorMessage(null);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    const attemptRequest = async (remaining: number): Promise<void> => {
      try {
        const res = await fetch(`/api/${userId}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: userMessage }),
        });

        if (!res.ok) throw new Error("API request failed");
        const data = await res.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        onTasksChange();
      } catch (error) {
        if (remaining > 0) {
          setErrorMessage(`Retrying... (${retries - remaining + 1})`);
          await new Promise(r => setTimeout(r, 2000));
          return attemptRequest(remaining - 1);
        }
        throw error;
      }
    };

    try {
      await attemptRequest(retries);
    } catch (error) {
      console.error(error);
      setErrorMessage("Connection Error. Please check your internet.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-xl hover:bg-primary/90 transition-all z-50">
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[95vw] sm:w-96 h-[32rem] max-h-[80vh] flex flex-col bg-card text-card-foreground rounded-2xl shadow-2xl border border-border overflow-hidden z-50">
      <div className="bg-muted/40 p-4 flex justify-between items-center border-b border-border">
        <h3 className="font-semibold text-lg flex items-center gap-2"><MessageCircle size={20} /> AI Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-full"><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
        {messages.length === 0 && !isLoading && <div className="text-center text-muted-foreground mt-10 text-sm">No messages yet. Ask me to add a task!</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground border border-border rounded-bl-none"}`}>{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-muted p-3 rounded-2xl rounded-bl-none border border-border flex items-center gap-2 text-muted-foreground text-sm"><Loader2 className="animate-spin" size={16} /> Thinking...</div></div>}
        {errorMessage && <div className="flex justify-center mt-2"><div className="bg-destructive/10 text-destructive px-3 py-2 rounded-lg text-sm flex items-center gap-2"><AlertTriangle size={14} /> {errorMessage}</div></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-2 relative">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())} placeholder="Type a message..." disabled={isLoading} className="flex-1 p-3 pr-12 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="absolute right-2 top-2 p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}