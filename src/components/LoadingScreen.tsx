import { Layout } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[500px] h-[500px] rounded-full border border-blue-200/20 dark:border-blue-800/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 w-[400px] h-[400px] rounded-full border border-blue-200/40 dark:border-blue-800/40 animate-[spin_8s_linear_infinite_reverse] m-[50px]" />
            <div className="absolute inset-0 w-[300px] h-[300px] rounded-full border border-blue-200/60 dark:border-blue-800/60 animate-[spin_6s_linear_infinite] m-[100px]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo Container */}
          <div className="relative">
            {/* Glowing Background */}
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/30 dark:bg-blue-400/20 rounded-full blur-xl" />
            </div>

            {/* Logo */}
            <div className="relative transform hover:scale-110 transition-transform duration-300">
              <div className="relative p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl animate-float">
                <Layout className="w-12 h-12 text-white animate-pulse" />
              </div>

              {/* Orbiting Dots */}
              <div className="absolute top-0 left-0 w-full h-full animate-[spin_3s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full animate-[spin_3s_linear_infinite] delay-[1000ms]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-lg shadow-indigo-500/50" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full animate-[spin_3s_linear_infinite] delay-[2000ms]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-500/50" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-12 text-center relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              NestTask
            </h1>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-loading-bar" />
            </div>

            {/* Loading Text */}
            <div className="relative">
              <p className="text-gray-600 dark:text-gray-400 animate-pulse">
                <span className="inline-block animate-bounce-slow">P</span>
                <span className="inline-block animate-bounce-slow delay-[100ms]">r</span>
                <span className="inline-block animate-bounce-slow delay-[200ms]">e</span>
                <span className="inline-block animate-bounce-slow delay-[300ms]">p</span>
                <span className="inline-block animate-bounce-slow delay-[400ms]">a</span>
                <span className="inline-block animate-bounce-slow delay-[500ms]">r</span>
                <span className="inline-block animate-bounce-slow delay-[600ms]">i</span>
                <span className="inline-block animate-bounce-slow delay-[700ms]">n</span>
                <span className="inline-block animate-bounce-slow delay-[800ms]">g</span>
                <span className="inline-block animate-bounce-slow delay-[900ms]">.</span>
                <span className="inline-block animate-bounce-slow delay-[1000ms]">.</span>
                <span className="inline-block animate-bounce-slow delay-[1100ms]">.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-[0.02] dark:opacity-[0.01]" />
        </div>
      </div>
    </div>
  );
}
