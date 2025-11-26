"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export default function CustomerService() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([
    { text: "안녕하세요! 고객센터 챗봇입니다. 무엇을 도와드릴까요?", sender: "bot" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    setMessages([...messages, { text: inputMessage, sender: "user" }]);
    setInputMessage("");

    // 챗봇 응답 시뮬레이션
    setTimeout(() => {
      const responses = [
        "네, 이해했습니다. 더 자세히 설명해드릴까요?",
        "감사합니다. 추가로 도움이 필요하시면 언제든 말씀해주세요!",
        "알겠습니다. 다른 질문이 있으시면 편하게 물어보세요.",
        "좋은 질문이네요! 제가 도와드리겠습니다.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: "bot" }]);
    }, 1000);
  };

  // 스크롤에 따른 Y 위치 계산 (위아래로 부드럽게 움직임)
  const floatingOffset = Math.sin(scrollY / 50) * 10;

  return (
    <>
      {/* 고객센터 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
          aria-label="고객센터 열기"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div
          className="fixed right-6 bottom-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in"
          style={{
            transform: `translateY(${floatingOffset}px)`,
          }}
        >
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">고객센터</h3>
                <p className="text-xs text-white/80">보통 몇 분 내에 응답합니다</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="챗봇 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 입력 영역 */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200"
                aria-label="메시지 전송"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

