"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Send } from "lucide-react";

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

    // URL params로 전달
    const params = new URLSearchParams({
      keywords: formData.keywords,
      tone: formData.tone,
      length: formData.length,
      target: formData.target,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI 기반 문장 생성 도구</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            키워드를 입력하면{" "}
            <span className="gradient-text">자연스러운 문장</span>을<br />
            만들어드립니다
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            간단한 키워드만 입력하세요. AI가 상황에 맞는 완벽한 문장을 생성합니다.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* Keyword Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                키워드 / 짧은 문장 입력
              </label>
              <textarea
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="예: 병원 / 내일 / 결석 / 과제 연장"
                rows={4}
                className="input-field resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                키워드를 / 또는 , 로 구분하여 입력하세요
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  톤 선택
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="select-field"
                >
                  <option value="neutral">기본 톤</option>
                  <option value="polite">정중하게</option>
                  <option value="business">비즈니스/공식적으로</option>
                  <option value="emotional">따뜻하고 감성 있게</option>
                </select>
              </div>

              {/* Length Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  길이 옵션
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "short", label: "짧게" },
                    { value: "normal", label: "보통" },
                    { value: "long", label: "자세하게" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, length: option.value })}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.length === option.value
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  말하는 대상
                </label>
                <select
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="select-field"
                >
                  <option value="professor">교수님</option>
                  <option value="senior_junior">선/후배</option>
                  <option value="friend">친구</option>
                  <option value="boss">직장 상사</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary flex items-center justify-center space-x-2 py-4">
              <span>문장 생성하기</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">상황 자동 파악</h3>
            <p className="text-sm text-gray-600">AI가 의도를 분석합니다</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">자연스러운 문장</h3>
            <p className="text-sm text-gray-600">완벽한 문장 구성</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">맞춤형 스타일</h3>
            <p className="text-sm text-gray-600">상황에 맞는 톤 조절</p>
          </div>
        </div>
      </div>
    </div>
  );
}
