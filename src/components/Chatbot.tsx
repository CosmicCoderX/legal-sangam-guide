import React, { useState, useRef, useEffect } from "react";

type Msg = { sender: "bot" | "user"; text: string };

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  start(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "bot", text: "Hello! I’m AskCounsel. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { sender: "user", text: input }]);
    // dummy bot reply
    setTimeout(() => {
      setMessages((m) => [...m, { sender: "bot", text: "Thanks — a legal advisor will help you shortly. Meanwhile, try Document Review or Find Lawyers." }]);
    }, 700);
    setInput("");
  };

  // minimal speech-to-text (browser)
  const startVoice = async () => {
    const SpeechRecognition = (window as Window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition || (window as Window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const txt = e.results[0][0].transcript;
      setInput(txt);
    };
    rec.start();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-large hover:bg-primary-dark transition-all duration-300 hover:scale-105 z-40"
        aria-label="Open chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-card shadow-large rounded-2xl overflow-hidden z-50 border border-border animate-scale-in">
          <div className="bg-primary text-primary-foreground p-4 font-semibold">AskCounsel</div>
          <div ref={listRef} className="h-64 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-lg p-3 text-sm animate-fade-in ${m.sender === "bot" ? "bg-muted text-muted-foreground self-start" : "bg-primary text-primary-foreground self-end"}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 border-t border-border bg-background">
            <button onClick={startVoice} className="px-3 py-2 rounded-lg bg-muted hover:bg-accent transition-colors">🎤</button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && send()}
              className="flex-1 px-3 py-2 bg-background border border-input rounded-lg outline-none focus:ring-2 focus:ring-ring transition-all"
              placeholder="Type your message..."
            />
            <button onClick={send} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
