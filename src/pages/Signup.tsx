
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Eye, EyeOff, CheckCircle } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    console.log("회원가입 시도:", formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">AI Interview</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">회원가입</h1>
          <p className="text-slate-600">새 계정을 만들어 AI 면접을 시작하세요</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">회원가입</CardTitle>
            <CardDescription className="text-center">
              필요한 정보를 입력하여 계정을 만들어보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  최소 8자, 대문자, 소문자, 숫자 포함
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    className="rounded border-slate-300"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-slate-600">
                    <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                      이용약관
                    </Link>에 동의합니다 *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="agreePrivacy"
                    type="checkbox"
                    className="rounded border-slate-300"
                    checked={formData.agreePrivacy}
                    onChange={(e) => handleInputChange("agreePrivacy", e.target.checked)}
                    required
                  />
                  <Label htmlFor="agreePrivacy" className="text-sm text-slate-600">
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                      개인정보처리방침
                    </Link>에 동의합니다 *
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.agreeTerms || !formData.agreePrivacy}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                계정 만들기
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">또는</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.624-.312-1.547c0-1.448.839-2.529 1.884-2.529.888 0 1.319.664 1.319 1.46 0 .888-.565 2.219-.856 3.449-.244 1.013.507 1.839 1.506 1.839 1.808 0 3.27-2.282 3.27-4.958 0-2.055-1.382-3.591-3.914-3.591-2.955 0-4.77 2.183-4.77 4.615 0 .838.246 1.431.571 1.895.144.175.165.247.112.449-.037.148-.121.498-.157.636-.05.198-.202.246-.465.148-1.299-.538-1.911-1.974-1.911-3.570 0-2.706 2.287-5.890 6.840-5.890 3.681 0 6.131 2.612 6.131 5.428 0 3.710-2.056 6.484-5.089 6.484-1.015 0-1.971-.544-2.298-1.171 0 0-.549 2.230-.665 2.705-.218.827-.551 1.518-.919 2.081C9.384 23.68 10.671 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                  Kakao
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-600">이미 계정이 있으신가요? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
