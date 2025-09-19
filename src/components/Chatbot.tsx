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
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 z-40"
        aria-label="Open chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border">
          <div className="bg-blue-600 text-white p-3 font-semibold">AskCounsel</div>
          <div ref={listRef} className="h-64 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] rounded-lg p-2 text-sm ${m.sender === "bot" ? "bg-gray-100 self-start" : "bg-blue-600 text-white self-end"}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-2 border-t">
            <button onClick={startVoice} className="px-2 py-1 rounded bg-gray-100">🎤</button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 outline-none"
              placeholder="Type your message..."
            />
            <button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
