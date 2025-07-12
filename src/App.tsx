import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Search, Zap, Plus, ExternalLink, ChevronRight, Star, Award, TrendingUp, Users, Globe, Shield } from 'react-feather';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'walkthrough' | 'modes'>('walkthrough');
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [walkthroughDisabled, setWalkthroughDisabled] = useState(() => {
    return localStorage.getItem('walkthroughDisabled') === 'true';
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (walkthroughDisabled) {
      setCurrentScreen('modes');
    }
  }, [walkthroughDisabled]);

  const walkthroughSteps = [
    {
      title: "Welcome to Dr.researcher",
      subtitle: "Your Personal Research Companion",
      description: "Master research methodologies, maintain laboratory standards, and build your academic portfolio with precision and excellence.",
      glpStandards: [
        { title: "Data Integrity", description: "Ensure all research data is accurate, complete, and verifiable" },
        { title: "Documentation", description: "Maintain detailed records of all experimental procedures and results" },
        { title: "Quality Control", description: "Implement systematic checks to verify experimental accuracy" },
        { title: "Equipment Validation", description: "Regular calibration and maintenance of laboratory instruments" },
        { title: "Safety Protocols", description: "Follow established safety procedures for laboratory work" },
        { title: "Sample Management", description: "Proper handling, storage, and tracking of research samples" },
        { title: "Standard Operating Procedures", description: "Develop and follow consistent methodological approaches" },
        { title: "Audit Trail", description: "Maintain clear records of all changes and modifications" }
      ]
    },
    {
      title: "My Research Portfolio",
      subtitle: "Published Works & Studies",
      description: "Build and showcase your research journey. Add your publications, studies, and academic achievements as you progress.",
      works: [
        {
          title: "Click + to add your first research work",
          journal: "Your Journal Here",
          year: "Year",
          citations: "0",
          link: "#",
          isPlaceholder: true
        }
      ]
    },
    {
      title: "Academic Excellence",
      subtitle: "Skills & Achievements Tracker",
      description: "Monitor your academic growth, research skills development, and scholarly achievements throughout your educational journey.",
      metrics: [
        { label: "Research Skills", value: "Growing", icon: TrendingUp },
        { label: "Lab Techniques", value: "Learning", icon: Zap },
        { label: "Academic Grade", value: "A+", icon: Award },
        { label: "Study Progress", value: "85%", icon: BookOpen }
      ]
    }
  ];

  const researchModes = [
    {
      id: 'study',
      title: 'Study Mode',
      subtitle: 'Academic Research',
      description: 'Access curated academic papers, literature reviews, and educational resources',
      icon: BookOpen,
      color: 'from-blue-400/20 to-blue-500/20',
      borderColor: 'border-blue-400/30',
      hoverColor: 'hover:border-blue-400/60',
      iconColor: 'text-blue-400',
      link: 'https://biovit.netlify.app',
      features: ['Peer-reviewed papers', 'Citation tools', 'Research methodology']
    },
    {
      id: 'research',
      title: 'Research Mode',
      subtitle: 'Active Investigation',
      description: 'Advanced tools for conducting original research and data analysis',
      icon: Search,
      color: 'from-emerald-400/20 to-emerald-500/20',
      borderColor: 'border-emerald-400/30',
      hoverColor: 'hover:border-emerald-400/60',
      iconColor: 'text-emerald-400',
      link: 'https://example.com/research-mode',
      features: ['Data analysis tools', 'Collaboration space', 'Publication support']
    },
    {
      id: 'advanced',
      title: 'Advanced Mode',
      subtitle: 'Expert Level',
      description: 'Premium features for seasoned researchers and academic professionals',
      icon: Zap,
      color: 'from-purple-400/20 to-purple-500/20',
      borderColor: 'border-purple-400/30',
      hoverColor: 'hover:border-purple-400/60',
      iconColor: 'text-purple-400',
      link: 'https://example.com/advanced-mode',
      features: ['AI-powered insights', 'Custom workflows', 'Priority support']
    }
  ];

  const handleSkipWalkthrough = () => {
    setShowSkipDialog(true);
  };

  const confirmSkip = (permanently: boolean) => {
    if (permanently) {
      localStorage.setItem('walkthroughDisabled', 'true');
      setWalkthroughDisabled(true);
    }
    setShowSkipDialog(false);
    switchToModes();
  };

  const cancelSkip = () => {
    setShowSkipDialog(false);
  };

  const nextWalkthroughStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (walkthroughStep < walkthroughSteps.length - 1) {
        setWalkthroughStep(walkthroughStep + 1);
      } else {
        setCurrentScreen('modes');
      }
      setIsTransitioning(false);
      setAnimationPhase(0);
      setTimeout(() => setAnimationPhase(1), 50);
    }, 200);
  };

  const handleModeSelect = (mode: any) => {
    setSelectedMode(mode.id);
    setTimeout(() => {
      window.open(mode.link, '_blank');
      setSelectedMode(null);
    }, 400);
  };

  const createNewMode = () => {
    alert('Create new research mode - Coming soon!');
  };

  const switchToModes = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('modes');
      setIsTransitioning(false);
      setAnimationPhase(0);
      setTimeout(() => setAnimationPhase(1), 50);
    }, 200);
  };

  const switchToWalkthrough = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen('walkthrough');
      setIsTransitioning(false);
      setAnimationPhase(0);
      setTimeout(() => setAnimationPhase(1), 50);
    }, 200);
  };

  if (currentScreen === 'walkthrough') {
    const currentStep = walkthroughSteps[walkthroughStep];
    
    return (
      <div className="min-h-screen w-full bg-black text-white overflow-hidden">
        {/* Skip Dialog */}
        {showSkipDialog && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-light text-white mb-4 text-center">Skip Walkthrough</h3>
              <p className="text-white/70 font-light mb-8 text-center leading-relaxed">
                Would you like to skip the walkthrough permanently or just for this session?
              </p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => confirmSkip(true)}
                  className="px-6 py-3 bg-red-500/20 border border-red-400/30 text-red-400 font-light rounded-full hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-200"
                >
                  Skip Permanently
                </button>
                <button
                  onClick={() => confirmSkip(false)}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-light rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                >
                  Skip This Time
                </button>
                <button
                  onClick={cancelSkip}
                  className="px-6 py-3 text-white/60 font-light hover:text-white/90 transition-all duration-200"
                >
                  Continue Walkthrough
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Optimized background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className={`relative z-10 w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 py-8 transition-all duration-300 ease-out ${
          isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-3">
              {walkthroughSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ease-out ${
                    index === walkthroughStep ? 'bg-white w-12' : 
                    index < walkthroughStep ? 'bg-white/60 w-6' : 'bg-white/20 w-6'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={`text-center max-w-6xl mx-auto w-full transform transition-all duration-500 ease-out ${
            animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white mb-6 tracking-tight leading-tight">
                {currentStep.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/70 font-light mb-6 tracking-wide">
                {currentStep.subtitle}
              </p>
              <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed font-light px-4">
                {currentStep.description}
              </p>
            </div>

            {/* Step-specific Content */}
            {walkthroughStep === 0 && (
              <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-light text-white/90 mb-8 text-center">Good Laboratory Practice Standards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
                  {currentStep.glpStandards?.map((standard, index) => (
                    <div
                      key={index}
                      className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl transform transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/20 text-left ${
                        animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h3 className="font-medium text-white/90 text-base sm:text-lg mb-2">{standard.title}</h3>
                          <p className="font-light text-white/70 text-sm leading-relaxed">{standard.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {walkthroughStep === 1 && (
              <div className="space-y-4 sm:space-y-6 mb-12 px-4">
                {currentStep.works?.map((work, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 backdrop-blur-xl border ${work.isPlaceholder ? 'border-dashed border-white/20' : 'border-white/10'} p-6 sm:p-8 rounded-3xl text-left transform transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/20 group cursor-pointer ${
                      animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => work.isPlaceholder ? alert('Add your research work - Feature coming soon!') : window.open(work.link, '_blank')}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg sm:text-xl font-light mb-3 group-hover:text-blue-400 transition-colors duration-200 ${work.isPlaceholder ? 'text-white/50' : 'text-white'}`}>
                          {work.title}
                        </h3>
                        <p className={`font-light mb-2 text-sm tracking-wide ${work.isPlaceholder ? 'text-white/30' : 'text-blue-400/80'}`}>{work.journal}</p>
                        <div className={`flex items-center space-x-6 text-sm font-light ${work.isPlaceholder ? 'text-white/30' : 'text-white/50'}`}>
                          <span>{work.year}</span>
                          <span>•</span>
                          <span>{work.citations} citations</span>
                        </div>
                      </div>
                      {work.isPlaceholder ? (
                        <Plus 
                          className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors duration-200" 
                          strokeWidth={1}
                        />
                      ) : (
                        <ExternalLink 
                          className="w-5 h-5 text-white/40 group-hover:text-blue-400 transition-colors duration-200" 
                          strokeWidth={1}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {walkthroughStep === 2 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 px-4">
                {currentStep.metrics?.map((metric, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl transform transition-all duration-500 ease-out hover:bg-white/10 hover:border-white/20 ${
                      animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 75}ms` }}
                  >
                    <metric.icon 
                      className="w-6 h-6 text-white/70 mx-auto mb-4" 
                      strokeWidth={1}
                    />
                    <div className="text-2xl sm:text-3xl font-thin text-white mb-2">{metric.value}</div>
                    <div className="text-xs sm:text-sm text-white/60 font-light">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between px-4">
              <button
                onClick={handleSkipWalkthrough}
                className="px-6 sm:px-8 py-3 sm:py-4 text-white/60 font-light hover:text-white/90 transition-all duration-200"
              >
                Skip Walkthrough
              </button>
              
              <button
                onClick={nextWalkthroughStep}
                className="flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-light rounded-full hover:bg-white/20 hover:border-white/30 transform transition-all duration-300 ease-out"
              >
                <span className="text-base sm:text-lg">{walkthroughStep === walkthroughSteps.length - 1 ? 'Get Started' : 'Next'}</span>
                <ArrowRight className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className={`relative z-10 w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 py-12 transition-all duration-300 ease-out ${
        isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
      }`}>
        {/* Header */}
        <div className="text-center mb-16 max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 sm:mb-10">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" strokeWidth={1} />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-6 tracking-tight">
            Choose Your Research Mode
          </h1>
          
          <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Select the mode that best fits your current research needs and objectives
          </p>
        </div>

        {/* Mode Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 max-w-6xl mx-auto w-full px-4">
          {researchModes.map((mode, index) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            
            return (
              <div
                key={mode.id}
                className={`relative cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 ${
                  animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${isSelected ? 'scale-105' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleModeSelect(mode)}
              >
                <div className={`bg-gradient-to-br ${mode.color} backdrop-blur-xl border ${mode.borderColor} ${mode.hoverColor} rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out hover:bg-white/10 ${
                  isSelected ? 'border-white/40 bg-white/10' : ''
                }`}>
                  
                  {/* Icon */}
                  <div className="mb-6 sm:mb-8">
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${mode.iconColor} mx-auto`} strokeWidth={1} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-light text-white mb-2 text-center">
                    {mode.title}
                  </h3>
                  
                  <p className="text-sm font-light text-white/60 mb-4 text-center tracking-wide">
                    {mode.subtitle}
                  </p>
                  
                  <p className="text-white/50 text-sm leading-relaxed mb-6 text-center font-light">
                    {mode.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6 sm:mb-8">
                    {mode.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-white/40 font-light">
                        <div className="w-1 h-1 bg-white/40 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* Action */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2 text-sm font-light text-white/70">
                      <span>Enter Mode</span>
                      <ChevronRight className="w-4 h-4" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Create New Mode */}
          <div
            className={`relative cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 ${
              animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
            onClick={createNewMode}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-dashed border-white/20 rounded-3xl p-6 sm:p-8 hover:border-white/40 hover:bg-white/10 transition-all duration-300 ease-out h-full flex flex-col items-center justify-center text-center">
              
              <div className="mb-6 sm:mb-8">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-white/60 mx-auto" strokeWidth={1} />
              </div>
              
              <h3 className="text-lg sm:text-xl font-light text-white/80 mb-2">
                Create New Mode
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Customize your own research environment with specific tools and workflows
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mb-8">
          <button
            onClick={switchToWalkthrough}
            className="text-white/50 hover:text-white/80 font-light transition-all duration-200"
          >
            ← Back to Walkthrough
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-8 sm:space-x-12 text-xs text-white/30 font-light flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" strokeWidth={1} />
            <span>Secure Platform</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4" strokeWidth={1} />
            <span>Academic Grade</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" strokeWidth={1} />
            <span>Global Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
