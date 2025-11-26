"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Volume2, Copy, RefreshCw, ArrowLeft, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const MOCK_GENERATED_SENTENCE = "교수님, 안녕하세요. 내일 병원 진료 예약이 있어 부득이하게 수업에 참석하지 못할 것 같습니다. 제출 기한이 임박한 과제가 있는데, 기한을 며칠 연장해 주시면 감사하겠습니다. 불편을 끼쳐드려 죄송합니다.";

const MOCK_SIMILAR_SENTENCES = [
    "교수님, 병원 일정으로 인해 내일 수업을 결석하게 되어 양해 부탁드립니다. 과제 제출 기한을 연장해 주실 수 있을까요?",
    "안녕하세요 교수님. 급한 병원 예약으로 내일 수업에 참석하기 어려울 것 같습니다. 과제 제출일을 조금 미뤄주시면 감사하겠습니다.",
    "교수님께, 건강상의 이유로 내일 수업을 빠지게 되었습니다. 진행 중인 과제의 마감일을 연장해 주시길 부탁드립니다.",
];

const MOCK_TEMPLATE_SCORES = [
    { template: "요청_마감연장", similarity: 0.89 },
    { template: "요청_결석양해", similarity: 0.76 },
    { template: "요청_도움요청", similarity: 0.42 },
    { template: "사과_일반", similarity: 0.28 },
    { template: "질문_정보요청", similarity: 0.18 },
];

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const keywords = searchParams.get("keywords") || "";
    const tone = searchParams.get("tone") || "neutral";
    const length = searchParams.get("length") || "normal";


    const [generatedText, setGeneratedText] = useState(MOCK_GENERATED_SENTENCE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [copied, setCopied] = useState(false);
    const [modifyOptions, setModifyOptions] = useState({
        tone: tone,
        length: length,
    });

    const handleTTS = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(generatedText);
            utterance.lang = 'ko-KR';
            setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("이 브라우저에서는 TTS가 지원되지 않습니다.");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRegenerate = () => {
        // TODO: API 호출하여 새로운 문장 생성
        console.log("Regenerating with:", modifyOptions);
        setGeneratedText("새로운 문장이 생성되었습니다. (예시)");
        alert("문장을 다시 생성합니다.");
    };

    const getToneLabel = (value: string) => {
        const labels: Record<string, string> = {
            neutral: "기본 톤",
            polite: "정중하게",
            business: "비즈니스",
            emotional: "감성적으로",
        };
        return labels[value] || value;
    };

    const getLengthLabel = (value: string) => {
        const labels: Record<string, string> = {
            short: "짧게",
            normal: "보통",
            long: "자세하게",
        };
        return labels[value] || value;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>돌아가기</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Keywords Display */}
                        <div className="card">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">입력한 키워드</h3>
                            <p className="text-lg text-gray-900">{keywords}</p>
                            <div className="flex gap-2 mt-3">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                                    {getToneLabel(tone)}
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                                    {getLengthLabel(length)}
                                </span>
                            </div>
                        </div>

                        {/* Generated Sentence */}
                        <div className="card">
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">생성된 문장</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleTTS}
                                        disabled={isSpeaking}
                                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="음성으로 듣기"
                                    >
                                        <Volume2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="복사하기"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                                <p className="text-lg leading-relaxed text-gray-800">{generatedText}</p>
                            </div>
                        </div>

                        {/* Modification Options */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">문체 수정 & 길이 조절</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">톤 변경</label>
                                    <select
                                        value={modifyOptions.tone}
                                        onChange={(e) => setModifyOptions({ ...modifyOptions, tone: e.target.value })}
                                        className="select-field"
                                    >
                                        <option value="neutral">기본 톤</option>
                                        <option value="polite">정중하게</option>
                                        <option value="business">비즈니스/공식적으로</option>
                                        <option value="emotional">따뜻하고 감성 있게</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">길이 변경</label>
                                    <select
                                        value={modifyOptions.length}
                                        onChange={(e) => setModifyOptions({ ...modifyOptions, length: e.target.value })}
                                        className="select-field"
                                    >
                                        <option value="short">짧게</option>
                                        <option value="normal">보통</option>
                                        <option value="long">자세하게</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={handleRegenerate}
                                className="w-full btn-primary mt-4 flex items-center justify-center space-x-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                <span>다시 생성하기</span>
                            </button>
                        </div>

                        {/* Similar Sentences */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">유사 문장 추천</h3>
                            <div className="space-y-3">
                                {MOCK_SIMILAR_SENTENCES.map((sentence, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer group"
                                        onClick={() => {
                                            navigator.clipboard.writeText(sentence);
                                            alert("클립보드에 복사되었습니다!");
                                        }}
                                    >
                                        <p className="text-gray-700 group-hover:text-indigo-900">{sentence}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Template Similarity Chart */}
                        <div className="card">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">템플릿 매칭 유사도</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={MOCK_TEMPLATE_SCORES} layout="horizontal">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 12 }} />
                                        <YAxis type="category" dataKey="template" tick={{ fontSize: 11 }} width={100} />
                                        <Tooltip
                                            formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                                            contentStyle={{
                                                background: "white",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "12px",
                                                padding: "8px 12px",
                                            }}
                                        />
                                        <Bar dataKey="similarity" fill="url(#colorGradient)" radius={[0, 4, 4, 0]} />
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                            <h3 className="font-semibold text-gray-900 mb-3">만족하지 못하셨나요?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                다시 입력하거나 훈련 모드에서 직접 작성해보세요.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="w-full btn-secondary"
                            >
                                다시 입력하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultContent />
        </Suspense>
    );
}
