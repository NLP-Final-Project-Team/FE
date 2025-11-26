"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 연동
        console.log("Login:", formData);
        // 임시: 로그인 후 홈으로
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center mb-4 shadow-xl">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
                    <p className="text-gray-600">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            회원가입
                        </Link>
                    </p>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                아이디
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="input-field"
                                placeholder="아이디를 입력하세요"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="input-field"
                                placeholder="비밀번호를 입력하세요"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary">
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
