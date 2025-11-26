"use client";

import { useState } from "react";
import { Brain, Target, Star, CheckCircle } from "lucide-react";

type TrainingMode = "write" | "convert";

export default function TrainingPage() {
    const [mode, setMode] = useState<TrainingMode>("write");

    // Mode A: Write & Evaluate
    const [writeForm, setWriteForm] = useState({
        intent: "request",
        target: "professor",
        keywords: "병원 / 내일 / 결석 / 과제 연장",
        userSentence: "",
    });

    interface Evaluation {
        scores: {
            politeness: number;
            clarity: number;
            understanding: number;
        };
        feedback: string;
        aiSuggestion: string;
    }
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

    // Mode B: Convert
    const [convertForm, setConvertForm] = useState({
        baseSentence: "내일 수업 못 갈 것 같습니다.",
        mission: "교수님에게 더 정중하게",
        userSentence: "",
    });

    interface ConvertFeedback {
        result: string;
        message: string;
        aiExample: string;
    }
    const [convertFeedback, setConvertFeedback] = useState<ConvertFeedback | null>(null);

    const handleWriteEvaluate = () => {
        // TODO: API 호출
        setEvaluation({
            scores: {
                politeness: 75,
                clarity: 85,
                understanding: 80,
            },
            feedback: "전반적으로 잘 작성하셨습니다. 다만, 구체적인 날짜와 수업명을 포함하면 더 명확할 것 같습니다.",
            aiSuggestion: "교수님, 안녕하세요. 내일(11월 27일) 병원 진료 예약이 있어 부득이하게 수업에 참석하지 못할 것 같습니다. 마감이 임박한 과제가 있는데, 기한을 며칠 연장해 주시면 감사하겠습니다.",
        });
    };

    const handleConvertEvaluate = () => {
        // TODO: API 호출
        setConvertFeedback({
            result: "good",
            message: "이 정도면 충분히 정중합니다! 상대방을 배려하는 표현이 잘 드러나 있습니다.",
            aiExample: "교수님, 죄송하지만 내일 수업에 참석하기 어려울 것 같습니다. 양해 부탁드립니다.",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
                        <Brain className="w-4 h-4" />
                        <span>AI와 함께하는 글쓰기 연습</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        훈련 <span className="gradient-text">센터</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        직접 작성해보고 AI의 피드백을 받아보세요
                    </p>
                </div>

                {/* Mode Tabs */}
                <div className="card mb-8">
                    <div className="flex gap-4 border-b border-gray-200 pb-4 mb-6">
                        <button
                            onClick={() => setMode("write")}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${mode === "write"
                                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Target className="w-5 h-5" />
                            <span>모드 A: 내가 먼저 써보기</span>
                        </button>
                        <button
                            onClick={() => setMode("convert")}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${mode === "convert"
                                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Star className="w-5 h-5" />
                            <span>모드 B: 표현 바꾸기 연습</span>
                        </button>
                    </div>

                    {/* Mode A: Write & Evaluate */}
                    {mode === "write" && (
                        <div className="space-y-6">
                            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                <p className="text-purple-900 font-medium">
                                    💡 상황과 키워드가 주어집니다. 직접 문장을 작성해보고 AI의 채점을 받아보세요!
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">상황/의도</label>
                                    <select
                                        value={writeForm.intent}
                                        onChange={(e) => setWriteForm({ ...writeForm, intent: e.target.value })}
                                        className="select-field"
                                    >
                                        <option value="request">요청</option>
                                        <option value="apology">사과</option>
                                        <option value="question">질문</option>
                                        <option value="notice">공지</option>
                                        <option value="complaint">불만</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">말하는 대상</label>
                                    <select
                                        value={writeForm.target}
                                        onChange={(e) => setWriteForm({ ...writeForm, target: e.target.value })}
                                        className="select-field"
                                    >
                                        <option value="professor">교수님</option>
                                        <option value="senior_junior">선/후배</option>
                                        <option value="friend">친구</option>
                                        <option value="boss">직장 상사</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">주어진 키워드</label>
                                <input
                                    type="text"
                                    value={writeForm.keywords}
                                    onChange={(e) => setWriteForm({ ...writeForm, keywords: e.target.value })}
                                    className="input-field"
                                    placeholder="병원 / 내일 / 결석 / 과제 연장"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    이 키워드로 문장을 직접 작성해보세요
                                </label>
                                <textarea
                                    value={writeForm.userSentence}
                                    onChange={(e) => setWriteForm({ ...writeForm, userSentence: e.target.value })}
                                    rows={6}
                                    className="input-field resize-none"
                                    placeholder="여기에 문장을 작성하세요..."
                                />
                            </div>

                            <button
                                onClick={handleWriteEvaluate}
                                disabled={!writeForm.userSentence.trim()}
                                className="w-full btn-primary"
                            >
                                AI 채점 받기
                            </button>

                            {evaluation && (
                                <div className="space-y-4 pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                        <span>평가 결과</span>
                                    </h3>

                                    {/* Scores */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="card bg-purple-50 border-purple-100 text-center">
                                            <div className="text-3xl font-bold text-purple-600 mb-1">{evaluation.scores.politeness}</div>
                                            <div className="text-sm text-gray-600">정중함</div>
                                        </div>
                                        <div className="card bg-purple-50 border-purple-100 text-center">
                                            <div className="text-3xl font-bold text-purple-600 mb-1">{evaluation.scores.clarity}</div>
                                            <div className="text-sm text-gray-600">명확성</div>
                                        </div>
                                        <div className="card bg-pink-50 border-pink-100 text-center">
                                            <div className="text-3xl font-bold text-pink-600 mb-1">{evaluation.scores.understanding}</div>
                                            <div className="text-sm text-gray-600">이해도</div>
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="card bg-gray-50">
                                        <h4 className="font-semibold text-gray-900 mb-2">피드백</h4>
                                        <p className="text-gray-700">{evaluation.feedback}</p>
                                    </div>

                                    {/* AI Suggestion */}
                                    <div className="card bg-gradient-to-r from-purple-50 to-violet-50 border-purple-100">
                                        <h4 className="font-semibold text-gray-900 mb-2">AI가 제안하는 수정 문장</h4>
                                        <p className="text-gray-800 leading-relaxed">{evaluation.aiSuggestion}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mode B: Tone Conversion */}
                    {mode === "convert" && (
                        <div className="space-y-6">
                            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                <p className="text-purple-900 font-medium">
                                    💡 주어진 문장을 미션에 맞게 바꿔보세요. AI가 당신의 표현력을 평가합니다!
                                </p>
                            </div>

                            <div className="card bg-gray-50">
                                <h4 className="font-semibold text-gray-900 mb-2">기본 문장</h4>
                                <p className="text-lg text-gray-800">{convertForm.baseSentence}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">미션 선택</label>
                                <select
                                    value={convertForm.mission}
                                    onChange={(e) => setConvertForm({ ...convertForm, mission: e.target.value })}
                                    className="select-field"
                                >
                                    <option value="교수님에게 더 정중하게">교수님에게 더 정중하게</option>
                                    <option value="친구에게 카톡 말투로">친구에게 카톡 말투로</option>
                                    <option value="직장 상사에게 비즈니스 메일 톤으로">직장 상사에게 비즈니스 메일 톤으로</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    바꿔서 작성해보세요
                                </label>
                                <textarea
                                    value={convertForm.userSentence}
                                    onChange={(e) => setConvertForm({ ...convertForm, userSentence: e.target.value })}
                                    rows={6}
                                    className="input-field resize-none"
                                    placeholder="여기에 바꾼 문장을 작성하세요..."
                                />
                            </div>

                            <button
                                onClick={handleConvertEvaluate}
                                disabled={!convertForm.userSentence.trim()}
                                className="w-full btn-primary"
                            >
                                평가 받기
                            </button>

                            {convertFeedback && (
                                <div className="space-y-4 pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                        <span>피드백</span>
                                    </h3>

                                    <div className={`card ${convertFeedback.result === "good" ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
                                        <p className="text-gray-800">{convertFeedback.message}</p>
                                    </div>

                                    <div className="card bg-gradient-to-r from-purple-50 to-violet-50 border-purple-100">
                                        <h4 className="font-semibold text-gray-900 mb-2">AI 예시</h4>
                                        <p className="text-gray-800">{convertFeedback.aiExample}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
