// 파일: src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ 백엔드에서 login_info 테이블에 필요한 필드만 포함
export type SignUpForm = {
    user_identifier: string;
    password: string;
};

type User = {
    id: number;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    signUp: (form: SignUpForm) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const res = await axios.post("http://localhost:3000/api/login", {
                email,
                password
            });
            const { user, token } = res.data;
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            return {};
        } catch (err: any) {
            return { error: err.response?.data?.error || "로그인 실패" };
        }
    };

    const signUp = async (form: SignUpForm) => {
        try {
            console.log("📤 회원가입 요청 데이터:", form);
            const res = await axios.post("http://localhost:3000/api/signup", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("✅ 회원가입 성공 응답:", res.data);
            return { success: true };
        } catch (err: any) {
            console.error("❌ 회원가입 오류:", err.message);
            console.error("🔴 서버 응답:", err.response?.data);
            return {
                success: false,
                error: err.response?.data?.error || "회원가입 실패"
            };
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth는 AuthProvider 내부에서만 사용해야 합니다.");
    return context;
};
