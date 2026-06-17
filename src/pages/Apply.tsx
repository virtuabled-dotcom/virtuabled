import React, { useState, useRef } from "react";
import { HeroImage } from "@/components/shared/HeroImage";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, ArrowRight, CheckCircle2, Square, Upload, Play, Camera, Milestone } from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { cn } from "@/lib/utils";
import { CandidateDashboard } from "@/components/CandidateDashboard";
import { useLocalStore, generateApplicationId, type ApplicationRecord } from "@/utils/localStore";
import { putBlob } from "@/utils/mediaStore";

export default function Apply() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"onboarding" | "dashboard">("dashboard");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showStandardForm, setShowStandardForm] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordStartRef = useRef<number | null>(null);
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoBlobRef = useRef<Blob | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [applications, setApplications] = useLocalStore<ApplicationRecord[]>("virtuabled_applications", []);
  
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    skills: '',
    disabilityType: '',
    natureOfDisability: ''
  });
  const [listeningField, setListeningField] = useState<string | null>(null);

  const startListeningElmarie = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      let temp = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        temp += event.results[i][0].transcript;
      }
      setTranscript(prev => prev + ' ' + temp);
    };
    recognition.onspeechend = () => recognition.stop();
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  const startListeningField = (field: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListeningField(field);
    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setFormData(prev => ({ ...prev, [field]: prev[field as keyof typeof prev] ? prev[field as keyof typeof prev] + ' ' + speechResult : speechResult }));
    };
    recognition.onspeechend = () => recognition.stop();
    recognition.onend = () => setListeningField(null);
    recognition.onerror = () => setListeningField(null);

    recognition.start();
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      recordedChunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        videoBlobRef.current = blob;
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      recordStartRef.current = Date.now();
      setRecording(true);
    } catch (err) {
      alert("Could not access camera/microphone.");
    }
  };

  const stopVideoRecording = () => {
    // Snapshot a profile photo from the final frame if none chosen yet.
    if (!photoDataUrl && videoRef.current && streamRef.current) {
      capturePhotoFromVideo();
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setVideoRecorded(true);
    setVideoDuration(Math.round((Date.now() - (recordStartRef.current ?? Date.now())) / 1000));
    setRecording(false);
  };

  // Grab the current camera frame into a compact profile photo (data URL).
  const capturePhotoFromVideo = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const size = 320;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // center-crop square
    const min = Math.min(v.videoWidth, v.videoHeight);
    const sx = (v.videoWidth - min) / 2;
    const sy = (v.videoHeight - min) / 2;
    ctx.drawImage(v, sx, sy, min, min, 0, 0, size, size);
    setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.8));
  };

  // Upload + downscale a photo to a compact data URL.
  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 320;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
        setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative overflow-hidden">
      <HeroImage src="/images/people/david-vanwyk.jpeg" tint="#14B8A6" />
      <div className={cn("pt-32 pb-24 px-6 mx-auto transition-all duration-300 relative z-10", activeTab === "dashboard" ? "max-w-6xl" : "max-w-4xl")}>
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-light leading-[1.05] tracking-tight mb-6 text-white">
          Candidate <span className="text-brand-teal font-medium italic">Portal.</span>
        </h1>
        <p className="text-xl text-zinc-300 font-light max-w-2xl mx-auto">
          Create your profile, specify physical/systemic accommodations, and track your industry-leading placement journey.
        </p>
      </div>

      {/* Premium Tab Buttons */}
      <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-800 max-w-xs sm:max-w-md mx-auto mb-10 shadow-lg relative z-20">
        <button
          onClick={() => {
            setActiveTab("dashboard");
            showToast("Career Dashboard", "info", "Displaying your active placement checklist and status.");
          }}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer select-none",
            activeTab === "dashboard" 
              ? "bg-brand-teal text-[#050C1A] shadow-md" 
              : "text-zinc-550 hover:text-white"
          )}
        >
          <Milestone size={14} /> My Dashboard
        </button>
        <button
          onClick={() => {
            setActiveTab("onboarding");
            showToast("Onboarding Setup", "info", "Loading modular voice-fill onboarding sequence.");
          }}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer select-none",
            activeTab === "onboarding" 
              ? "bg-brand-teal text-[#050C1A] shadow-md" 
              : "text-zinc-550 hover:text-white"
          )}
        >
          <Mic size={14} /> Setup Wizard
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "dashboard" ? (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <CandidateDashboard />
          </motion.div>
        ) : (
          <motion.div
            key="onboarding-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            {!showStandardForm ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm">
                <Mic size={14} /> Recommended Workflow
              </div>
              <h2 className="text-3xl font-display font-light tracking-tight">Voice-Fill Onboarding</h2>
              <p className="text-zinc-400 font-light">
                Skip the typing. Dialogue with Elmarie, our expert accessibility advisor, and complete your entire professional profile and setup requirements through interactive guided conversation.
              </p>
              <button 
                onClick={isListening ? undefined : startListeningElmarie}
                className={`flex items-center justify-center gap-2 w-full py-4 font-bold text-xs uppercase tracking-widest transition-colors relative overflow-hidden group ${isListening ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-brand-teal text-black hover:bg-white'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isListening ? (
                    <>Listening... <div className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" /></>
                  ) : (
                    <>Start Voice Session <Mic size={18} /></>
                  )}
                </span>
              </button>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] bg-[#050505] rounded-2xl border border-white/5 p-4 flex flex-col justify-end relative shadow-inner overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-colors ${isListening ? 'border-brand-coral/50 animate-pulse' : 'border-brand-teal/30'}`}>
                     <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${isListening ? 'bg-brand-coral/20' : 'bg-brand-teal/10'}`}>
                       <Mic className={isListening ? 'text-brand-coral' : 'text-brand-teal'} size={32} />
                     </div>
                   </div>
                 </div>
                 <div className="bg-zinc-900/90 backdrop-blur border border-white/10 p-4 rounded-xl relative z-10 text-sm xl:text-xs">
                   <div className="text-brand-teal font-mono mb-1">Elmarie:</div>
                   <div className="italic text-zinc-400 mb-4">"Hello! Let's build your profile. What is your primary area of expertise?"</div>
                   
                   {transcript && (
                     <>
                       <div className="text-brand-coral font-mono mb-1">You:</div>
                       <div className="text-zinc-300 h-16 overflow-y-auto">{transcript}</div>
                     </>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {!showStandardForm && (
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Prefer manual onboarding?</p>
          <button 
            onClick={() => setShowStandardForm(true)}
            className="px-6 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 transition-colors"
          >
            Open Standard Portal
          </button>
        </div>
      )}

      <AnimatePresence>
        {showStandardForm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-800">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${activeStep >= step ? 'bg-brand-teal text-[#0a0a0a]' : 'bg-zinc-800 text-zinc-500'}`}>
                    {step}
                  </div>
                  {step < 3 && <div className={`w-8 h-px ${activeStep > step ? 'bg-brand-teal' : 'bg-zinc-800'}`} />}
                </div>
              ))}
              <h3 className="ml-4 text-xl font-display text-white">
                {activeStep === 1 && "Personal & Professional Info"}
                {activeStep === 2 && "Accommodation Matrix & CV"}
                {activeStep === 3 && "Video Intro (Optional)"}
              </h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (activeStep < 3) setActiveStep(activeStep + 1); }}>
              {activeStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="full-name-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">Full Name</label>
                    <div className="relative">
                      <input 
                        id="full-name-input"
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors" 
                        placeholder="e.g. John Doe"
                      />
                      <button type="button" onClick={() => startListeningField('fullName')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${listeningField === 'fullName' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                        <Mic size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="primary-role-input" className="text-[10px] font-bold text-white uppercase tracking-widest block">Primary Role</label>
                    <div className="relative">
                      <input 
                        id="primary-role-input"
                        type="text" 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors" 
                        placeholder="e.g. Senior Frontend Developer"
                      />
                      <button type="button" onClick={() => startListeningField('role')} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${listeningField === 'role' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                        <Mic size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-brand-teal transition-colors flex items-center gap-2">
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="accommodations-input" className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      Nature of Disability / Accommodation Requirements
                      <button type="button" onClick={() => startListeningField('natureOfDisability')} className={`flex items-center gap-1.5 transition-colors ${listeningField === 'natureOfDisability' ? 'text-brand-coral animate-pulse' : 'text-zinc-500 hover:text-brand-teal'}`}>
                        <Mic size={14} /> <span className="text-[9px]">Voice Input</span>
                      </button>
                    </label>
                    <textarea 
                      id="accommodations-input"
                      rows={3} 
                      value={formData.natureOfDisability}
                      onChange={(e) => setFormData({...formData, natureOfDisability: e.target.value})}
                      className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal transition-colors resize-none" 
                      placeholder="Be as specific as possible (e.g. Wheelchair access required, specific screen reader compatibility, quiet workspace needed...)"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white uppercase tracking-widest block">Curriculum Vitae</label>
                    <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center hover:border-brand-teal/50 transition-colors bg-[#0d0d0d] cursor-pointer group">
                       <Upload size={24} className="mx-auto mb-3 text-zinc-500 group-hover:text-brand-teal transition-colors" />
                       <p className="text-sm text-white font-medium mb-1">Click to upload or drag & drop</p>
                       <p className="text-xs text-zinc-500">PDF or Word document (Max 5MB)</p>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-light text-center">
                      Prefer email? Send your CV to{" "}
                      <a href="mailto:hello@virtuabled.com?subject=CV%20Submission" className="text-brand-teal hover:underline font-medium">hello@virtuabled.com</a>
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <button type="button" onClick={() => setActiveStep(1)} className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Back</button>
                    <button type="submit" className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-brand-teal transition-colors flex items-center gap-2">
                      Next Step <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="text-sm text-zinc-400 font-light leading-relaxed">
                    A short "About Me" video dramatically increases alignment with our enterprise partners. Talk about your passion, preferred workflow, and technical strengths.
                  </div>

                  <div className="aspect-video bg-[#050505] border-2 border-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    {recording ? (
                      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                    ) : videoPreviewUrl ? (
                      <video src={videoPreviewUrl} controls playsInline className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                         <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                           <Camera size={24} className="text-zinc-500" />
                         </div>
                         <p className="text-sm text-zinc-400">Record a short intro — it plays back here</p>
                      </div>
                    )}

                    {videoRecorded && !recording && (
                      <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-brand-teal bg-black/70 px-2 py-1 rounded-full">
                        <CheckCircle2 size={11} /> Saved {videoDuration ? `· ${videoDuration}s` : ""}
                      </span>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                      {!recording ? (
                        <button type="button" onClick={startVideoRecording} className="px-6 py-2.5 bg-brand-coral text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg">
                          <Play size={14} fill="currentColor" /> {videoPreviewUrl ? "Re-record" : "Record Video"}
                        </button>
                      ) : (
                        <button type="button" onClick={stopVideoRecording} className="px-6 py-2.5 bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-700 transition-colors flex items-center gap-2 shadow-lg border border-gray-700">
                          <Square size={14} fill="currentColor" /> Stop Recording
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Profile photo */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d0d0d] border border-gray-800">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0 flex items-center justify-center">
                      {photoDataUrl ? (
                        <img src={photoDataUrl} alt="Your profile" className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={20} className="text-zinc-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Profile photo</p>
                      <p className="text-[11px] text-zinc-500 font-light">Employers see this on your card. Snap from camera or upload.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={capturePhotoFromVideo}
                        disabled={!recording}
                        className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-brand-teal disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Snap
                      </button>
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-brand-teal transition-colors"
                      >
                        Upload
                      </button>
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center border-t border-gray-800 mt-6">
                    <button type="button" onClick={() => setActiveStep(2)} className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Back</button>
                    <button type="button" onClick={async () => {
                      const id = generateApplicationId();
                      let videoBlobId: string | undefined;
                      if (videoBlobRef.current) {
                        try {
                          videoBlobId = await putBlob(videoBlobRef.current, `video-${id}`);
                        } catch { /* media store unavailable — keep metadata only */ }
                      }
                      setApplications(prev => [{
                        id,
                        submittedAt: new Date().toISOString(),
                        fullName: formData.fullName,
                        role: formData.role,
                        skills: formData.skills,
                        disabilityType: formData.disabilityType,
                        natureOfDisability: formData.natureOfDisability,
                        voiceTranscript: transcript.trim(),
                        videoRecorded,
                        videoDurationSec: videoDuration,
                        photoDataUrl: photoDataUrl ?? undefined,
                        videoBlobId,
                        status: "submitted",
                      }, ...prev]);
                      showToast(
                        "Application Saved",
                        "success",
                        `Application ${id} saved on this device. Track it under My Dashboard.`
                      );
                      setActiveStep(1);
                      setShowStandardForm(false);
                      setFormData({ fullName: '', role: '', skills: '', disabilityType: '', natureOfDisability: '' });
                      setTranscript("");
                      setVideoRecorded(false);
                      setVideoDuration(null);
                      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
                      setVideoPreviewUrl(null);
                      videoBlobRef.current = null;
                      setPhotoDataUrl(null);
                      setActiveTab("dashboard");
                    }} className="px-8 py-4 bg-brand-teal text-[#0a0a0a] font-bold uppercase text-xs tracking-widest rounded-lg hover:bg-white transition-colors flex items-center gap-2">
                      Submit Profile <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
