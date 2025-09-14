
import { Wrench } from 'lucide-react'; // An icon for a clean visual cue

export default function ToolsPage() {
  return (
    
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl [animation-delay:2s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg p-8 text-center">
        
        {/* Icon */}
        <Wrench size={48} className="mx-auto text-slate-400" />

        {/* Main Heading */}
        <h1 className="mt-6 text-4xl font-bold text-slate-800">
          Tools Page Coming Soon
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-lg text-slate-600">
          We are currently building new features and tools for you. <br />
          This section will be available shortly.
        </p>

        {/* A subtle divider */}
        <div className="my-8 h-px w-2/3 mx-auto bg-slate-200"></div>

        <p className="text-sm text-slate-500">
          Thank you for your patience!
        </p>
        
      </div>
    </div>
  );
}