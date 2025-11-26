"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // TODO: API 연동
        console.log("Signup:", formData);
        // 임시: 회원가입 후 로그인 페이지로
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center mb-4 shadow-xl">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h2>
                    <p className="text-gray-600">
                        이미 계정이 있으신가요?{" "}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            로그인
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                이름
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="input-field"
                                placeholder="이름을 입력하세요"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                비밀번호 확인
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="input-field"
                                placeholder="비밀번호를 다시 입력하세요"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary">
                            가입하기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
