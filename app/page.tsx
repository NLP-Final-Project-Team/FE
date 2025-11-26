"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Send, Zap, Heart, Palette } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    keywords: "",
    tone: "neutral",
    length: "normal",
    target: "professor",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.keywords.trim()) {
      alert("키워드를 입력해주세요.");
      return;
    }

    const params = new URLSearchParams({
      keywords: formData.keywords,
      tone: formData.tone,
      length: formData.length,
      target: formData.target,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 rounded-full text-purple-700 text-sm font-semibold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI 기반 문장 생성 도구</span>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            키워드만 입력하면
            <br />
            <span className="gradient-text">완벽한 문장</span>이 완성됩니다
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            복잡한 생각 정리는 이제 AI에게 맡기세요
            <br className="hidden sm:block" />
            간단한 키워드만으로 상황에 맞는 자연스러운 문장을 만들어드립니다
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">빠른 이해</h3>
            <p className="text-sm text-gray-600 leading-relaxed">AI가 상황을 즉시 파악하여<br />적절한 문장을 생성합니다</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">자연스러움</h3>
            <p className="text-sm text-gray-600 leading-relaxed">어색하지 않고<br />완벽하게 구성된 문장</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">맞춤 스타일</h3>
            <p className="text-sm text-gray-600 leading-relaxed">상황과 대상에 맞게<br />톤을 자동으로 조절합니다</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Tone Selection */}
              <div className="flex flex-col">
                <label className="block text-base font-semibold text-gray-800 mb-4">
                  🎭 톤 선택
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="select-field h-[3.5rem]"
                >
                  <option value="neutral">기본 톤</option>
                  <option value="polite">정중하게</option>
                  <option value="business">비즈니스/공식적으로</option>
                  <option value="emotional">따뜻하고 감성 있게</option>
                </select>
              </div>

              {/* Length Option */}
              <div className="flex flex-col">
                <label className="block text-base font-semibold text-gray-800 mb-4">
                  📏 길이 옵션
                </label>
                <div className="flex gap-2 h-[3.5rem]">
                  {[
                    { value: "short", label: "짧게", emoji: "📝" },
                    { value: "normal", label: "보통", emoji: "📄" },
                    { value: "long", label: "자세하게", emoji: "📑" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, length: option.value })}
                      className={`flex-1 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center h-full ${
                        formData.length === option.value
                          ? "bg-gradient-to-r from-[#a78bfa] to-[#c084fc] text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-1">{option.emoji}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Selection */}
              <div className="flex flex-col">
                <label className="block text-base font-semibold text-gray-800 mb-4">
                  👤 말하는 대상
                </label>
                <select
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="select-field h-[3.5rem]"
                >
                  <option value="professor">교수님</option>
                  <option value="senior_junior">선/후배</option>
                  <option value="friend">친구</option>
                  <option value="boss">직장 상사</option>
                </select>
              </div>
            </div>

            {/* Keyword Input */}
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <span>💬</span>
                <span>키워드 또는 짧은 문장을 입력하세요</span>
              </label>
              <textarea
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="예: 병원 / 내일 / 결석 / 과제 연장&#10;또는: 내일 병원 가야 해서 수업 못 갈 것 같아요"
                rows={5}
                className="input-field resize-none text-base"
              />
              <p className="text-sm text-gray-500 mt-3 ml-1">
                💡 키워드는 / 또는 , 로 구분하세요
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full btn-primary flex items-center justify-center space-x-3 py-5 text-lg mt-8"
            >
              <span>문장 생성하기</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
