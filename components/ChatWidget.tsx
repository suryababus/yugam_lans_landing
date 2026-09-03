"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import {
  ChatCircleDots,
  CircleNotch,
  PaperPlaneRight,
  X,
} from "@phosphor-icons/react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const inputClasses =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-base transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [attract, setAttract] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || status === "loading") return;

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(history);
    setInput("");
    setStatus("loading");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      setMessages([...history, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        const current = reply;
        setMessages([...history, { role: "assistant", content: current }]);
      }
      setStatus("idle");
    } catch {
      setMessages(history);
      setStatus("error");
    }
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Yugam Labs"
          className="fixed right-4 bottom-24 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-3xl border border-black/10 bg-background shadow-2xl sm:right-6"
        >
          <div className="flex items-center justify-between bg-surface px-5 py-4">
            <div>
              <p className="text-sm font-semibold">Yugam Labs assistant</p>
              <p className="text-xs text-muted">Ask us anything</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-muted transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <p className="text-sm text-muted">
                Hi! Ask about our services, process, or how we can help with
                your project.
              </p>
            )}
            {messages.map((message, i) => (
              <div
                key={i}
                className={
                  message.role === "user"
                    ? "ml-8 w-fit max-w-full justify-self-end rounded-2xl rounded-br-md bg-accent px-3 py-2 text-sm whitespace-pre-wrap text-white"
                    : "mr-8 w-fit max-w-full space-y-2 rounded-2xl rounded-bl-md bg-surface px-3 py-2 text-sm [&_a]:font-semibold [&_a]:underline [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/5 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-5"
                }
              >
                {message.content ? (
                  message.role === "user" ? (
                    message.content
                  ) : (
                    <Markdown>{message.content}</Markdown>
                  )
                ) : (
                  <CircleNotch
                    size={16}
                    className="animate-spin text-muted"
                    aria-hidden
                  />
                )}
              </div>
            ))}
            {status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="flex items-center gap-2 border-t border-black/10 px-4 py-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-input"
              name="message"
              type="text"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={inputClasses}
              placeholder="Type a message"
            />
            <button
              type="submit"
              disabled={status === "loading" || !input.trim()}
              aria-label="Send message"
              className="flex shrink-0 items-center justify-center rounded-full bg-accent p-2.5 text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {status === "loading" ? (
                <CircleNotch size={18} className="animate-spin" aria-hidden />
              ) : (
                <PaperPlaneRight size={18} weight="fill" aria-hidden />
              )}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setAttract(false);
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed right-4 bottom-4 z-50 flex items-center justify-center rounded-full bg-accent p-4 text-white shadow-lg transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6 sm:bottom-6"
      >
        {!open && attract && (
          <span
            aria-hidden
            className="chat-ping pointer-events-none absolute inset-0 rounded-full bg-accent"
          />
        )}
        {open ? (
          <X size={24} aria-hidden />
        ) : (
          <span className={attract ? "chat-wiggle flex" : "flex"}>
            <ChatCircleDots size={24} weight="fill" aria-hidden />
          </span>
        )}
      </button>
    </>
  );
}
