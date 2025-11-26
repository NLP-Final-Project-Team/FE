import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CustomerService from "./components/CustomerService";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "NLP 프로젝트 - AI 문장 생성 도우미",
  description: "키워드를 입력하면 상황에 맞는 자연스러운 문장을 생성해드립니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-bold gradient-text">
                  NLP 프로젝트
                </span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg font-medium transition-colors">
                  홈
                </Link>
                <Link href="/training" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg font-medium transition-colors">
                  훈련
                </Link>
                <Link href="/login" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg font-medium transition-colors">
                  로그인
                </Link>
                <Link href="/signup" className="btn-primary text-sm px-3 py-1.5">
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16 min-h-screen">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NLP 프로젝트. All rights reserved.
          </div>
        </footer>

        <CustomerService />
      </body>
    </html>
  );
}
