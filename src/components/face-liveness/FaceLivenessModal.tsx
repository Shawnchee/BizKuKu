'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Camera, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision'

interface FaceLivenessModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (capturedPhoto: string) => void
  onFailure: () => void
}

type ChallengeType = 'blink' | 'smile' | 'turnHead' | 'lookUpDown'

interface Challenge {
  type: ChallengeType
  instruction: string
  instructionMs: string
  completed: boolean
}

export default function FaceLivenessModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  onFailure 
}: FaceLivenessModalProps) {
  const { t } = useLanguage()
  
  // States
  const [currentStep, setCurrentStep] = useState<'permission' | 'challenge' | 'success' | 'failure'>('permission')
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [retryCount, setRetryCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState<string>('')
  const [isMediaPipeReady, setIsMediaPipeReady] = useState(false)
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // MediaPipe refs
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null)
  
  // Detection states for challenges
  const [eyeAspectRatios, setEyeAspectRatios] = useState<number[]>([])
  const [blinkCount, setBlinkCount] = useState(0)
  const [isSmiling, setIsSmiling] = useState(false)
  const [headPosition, setHeadPosition] = useState({ yaw: 0, pitch: 0 })
  const [challengeProgress, setChallengeProgress] = useState(0)

  const challenges: Challenge[] = [
    {
      type: 'blink',
      instruction: 'Please blink twice slowly',
      instructionMs: 'Sila kelip mata dua kali perlahan-lahan',
      completed: false
    },
    {
      type: 'smile',
      instruction: 'Please smile for 2 seconds',
      instructionMs: 'Sila senyum selama 2 saat',
      completed: false
    },
    {
      type: 'turnHead',
      instruction: 'Turn your head left, then right',
      instructionMs: 'Pusing kepala ke kiri, kemudian ke kanan',
      completed: false
    },
    {
      type: 'lookUpDown',
      instruction: 'Look up, then look down',
      instructionMs: 'Pandang ke atas, kemudian ke bawah',
      completed: false
    }
  ]

  // Initialize MediaPipe Face Landmarker
  const initializeMediaPipe = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      
      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
        },
        runningMode: "VIDEO",
        numFaces: 1,
        minFaceDetectionConfidence: 0.6,
        minFacePresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true
      });
      
      setIsMediaPipeReady(true)
      console.log('MediaPipe Face Landmarker initialized successfully')
    } catch (error) {
      console.error('MediaPipe initialization failed:', error)
      setIsMediaPipeReady(false)
    }
  }

  // Calculate Eye Aspect Ratio for blink detection
  const calculateEAR = (eyeLandmarks: any[]) => {
    // Calculate distances for eye aspect ratio
    const d1 = Math.sqrt(Math.pow(eyeLandmarks[1].x - eyeLandmarks[5].x, 2) + Math.pow(eyeLandmarks[1].y - eyeLandmarks[5].y, 2))
    const d2 = Math.sqrt(Math.pow(eyeLandmarks[2].x - eyeLandmarks[4].x, 2) + Math.pow(eyeLandmarks[2].y - eyeLandmarks[4].y, 2))
    const d3 = Math.sqrt(Math.pow(eyeLandmarks[0].x - eyeLandmarks[3].x, 2) + Math.pow(eyeLandmarks[0].y - eyeLandmarks[3].y, 2))
    
    const ear = (d1 + d2) / (2.0 * d3)
    return ear
  }

  // Detect blink using Eye Aspect Ratio
  const detectBlink = (landmarks: any[]) => {
    // Left eye landmarks: 362, 385, 387, 263, 373, 380
    const leftEye = [362, 385, 387, 263, 373, 380].map(i => landmarks[i])
    // Right eye landmarks: 33, 160, 158, 133, 153, 144
    const rightEye = [33, 160, 158, 133, 153, 144].map(i => landmarks[i])
    
    const leftEAR = calculateEAR(leftEye)
    const rightEAR = calculateEAR(rightEye)
    const avgEAR = (leftEAR + rightEAR) / 2.0
    
    // Store recent EAR values for blink detection
    setEyeAspectRatios(prev => {
      const newRatios = [...prev, avgEAR].slice(-10) // Keep last 10 values
      
      // Detect blink (EAR drops below threshold then rises)
      if (newRatios.length >= 3) {
        const recent = newRatios.slice(-3)
        const isBlinkPattern = recent[0] > 0.2 && recent[1] < 0.15 && recent[2] > 0.2
        
        if (isBlinkPattern) {
          setBlinkCount(prev => prev + 1)
        }
      }
      
      return newRatios
    })
    
    return avgEAR < 0.15 // Return true if eyes are closed
  }

  // Detect smile using mouth landmarks
  const detectSmile = (landmarks: any[]) => {
    // Mouth corner landmarks: 61 (left), 291 (right), 13 (top), 14 (bottom)
    const leftCorner = landmarks[61]
    const rightCorner = landmarks[291]
    const topLip = landmarks[13]
    const bottomLip = landmarks[14]
    
    // Calculate mouth width and height
    const mouthWidth = Math.sqrt(Math.pow(rightCorner.x - leftCorner.x, 2) + Math.pow(rightCorner.y - leftCorner.y, 2))
    const mouthHeight = Math.sqrt(Math.pow(topLip.x - bottomLip.x, 2) + Math.pow(topLip.y - bottomLip.y, 2))
    
    // Smile detected when corners are higher than center and mouth is wide
    const smileRatio = mouthWidth / mouthHeight
    const isSmiling = smileRatio > 3.0 && leftCorner.y < topLip.y && rightCorner.y < topLip.y
    
    setIsSmiling(isSmiling)
    return isSmiling
  }

  // Calculate head pose (yaw, pitch, roll)
  const calculateHeadPose = (landmarks: any[]) => {
    // Use nose tip (1), chin (18), left eye (33), right eye (362)
    const noseTip = landmarks[1]
    const chin = landmarks[18]
    const leftEye = landmarks[33]
    const rightEye = landmarks[362]
    
    // Calculate yaw (left-right rotation)
    const eyeCenter = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2
    }
    
    const yaw = Math.atan2(noseTip.x - eyeCenter.x, noseTip.z || 0.1) * (180 / Math.PI)
    
    // Calculate pitch (up-down rotation)
    const pitch = Math.atan2(noseTip.y - eyeCenter.y, noseTip.z || 0.1) * (180 / Math.PI)
    
    const newHeadPosition = { yaw, pitch }
    setHeadPosition(newHeadPosition)
    return newHeadPosition
  }

  // Real-time face analysis
  const analyzeFace = () => {
    if (!faceLandmarkerRef.current || !videoRef.current || !isMediaPipeReady) return
    
    const video = videoRef.current
    if (video.readyState !== 4) return // Wait until video is ready
    
    try {
      const results = faceLandmarkerRef.current.detectForVideo(video, Date.now())
      
      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0]
        
        // Perform challenge-specific analysis
        if (currentChallenge) {
          switch (currentChallenge.type) {
            case 'blink':
              detectBlink(landmarks)
              // Check if user has blinked twice
              if (blinkCount >= 2) {
                handleChallengeSuccess()
              }
              break
              
            case 'smile':
              const isSmiling = detectSmile(landmarks)
              if (isSmiling) {
                setChallengeProgress(prev => Math.min(prev + 1, 60)) // 2 seconds at 30fps
                if (challengeProgress >= 60) {
                  handleChallengeSuccess()
                }
              } else {
                setChallengeProgress(0)
              }
              break
              
            case 'turnHead':
              const headPose = calculateHeadPose(landmarks)
              // Check for left then right head movement
              if (Math.abs(headPose.yaw) > 20) {
                setChallengeProgress(prev => Math.min(prev + 1, 30))
                if (challengeProgress >= 30) {
                  handleChallengeSuccess()
                }
              }
              break
              
            case 'lookUpDown':
              const headPoseUpDown = calculateHeadPose(landmarks)
              // Check for up then down head movement
              if (Math.abs(headPoseUpDown.pitch) > 15) {
                setChallengeProgress(prev => Math.min(prev + 1, 30))
                if (challengeProgress >= 30) {
                  handleChallengeSuccess()
                }
              }
              break
          }
        }
      }
    } catch (error) {
      console.error('Face analysis error:', error)
    }
  }

  // Start camera
  const startCamera = async () => {
    console.log('🎥 Starting camera...')
    try {
      console.log('📝 Requesting getUserMedia...')
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      })
      
      console.log('✅ Camera stream obtained:', stream)
      console.log('📊 Stream tracks:', stream.getTracks())
      
      // Store the stream first
      streamRef.current = stream
      
      // Move to challenge step first, then set up video
      console.log('🎯 Moving to challenge step...')
      setCurrentStep('challenge')
      
      // Wait a bit for React to render the video element
      setTimeout(() => {
        console.log('⏰ Setting up video element...')
        if (videoRef.current) {
          console.log('🎬 Setting video srcObject...')
          videoRef.current.srcObject = stream
          
          // Initialize after video is set up
          setTimeout(async () => {
            console.log('🔧 Initializing MediaPipe and challenges...')
            try {
              await initializeMediaPipe()
              selectRandomChallenge()
            } catch (initError) {
              console.error('❌ MediaPipe initialization failed:', initError)
              // Continue without MediaPipe for basic camera test
              selectRandomChallenge()
            }
          }, 500)
          
        } else {
          console.error('❌ videoRef.current is still null after delay')
          setCurrentStep('failure')
        }
      }, 100)
      
    } catch (error) {
      console.error('❌ Camera access failed:', error)
      console.error('Error details:', error.name, error.message)
      setCurrentStep('failure')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    // Stop face analysis interval
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
  }

  // Select random challenge
  const selectRandomChallenge = () => {
    console.log('🎲 Selecting random challenge...')
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    console.log('🎯 Selected challenge:', randomChallenge.type)
    
    setCurrentChallenge(randomChallenge)
    // Don't change step here - we're already on challenge step
    setTimeLeft(15)
    
    // Reset challenge-specific states
    setBlinkCount(0)
    setEyeAspectRatios([])
    setIsSmiling(false)
    setHeadPosition({ yaw: 0, pitch: 0 })
    setChallengeProgress(0)
    
    console.log('⏰ Starting timer and face analysis...')
    startTimer()
    startFaceAnalysis()
  }

  // Start real-time face analysis
  const startFaceAnalysis = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
    }
    
    // Analyze face at 30 FPS
    detectionIntervalRef.current = setInterval(analyzeFace, 33)
  }

  // Start challenge timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleChallengeFailure()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Handle challenge success
  const handleChallengeSuccess = () => {
    stopTimer()
    
    // Stop face analysis
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
      detectionIntervalRef.current = null
    }
    
    setIsProcessing(true)
    
    // Capture photo
    setTimeout(() => {
      capturePhoto()
      setCurrentStep('success')
      setIsProcessing(false)
    }, 1000)
  }

  // Handle challenge failure
  const handleChallengeFailure = () => {
    stopTimer()
    
    if (retryCount < 1) {
      setRetryCount(prev => prev + 1)
      selectRandomChallenge()
    } else {
      setCurrentStep('failure')
      stopCamera()
    }
  }

  // Capture photo from video
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)
        
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setCapturedPhoto(photoDataUrl)
      }
    }
  }

  // Handle modal open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep('permission')
      setRetryCount(0)
      setTimeLeft(15)
      setCapturedPhoto('')
    } else {
      stopCamera()
      stopTimer()
    }
  }, [isOpen])

  // Video loaded event handler
  useEffect(() => {
    // Remove the old mock detection - now using real-time analysis
    // Face analysis is started in selectRandomChallenge() function
  }, [currentStep, isProcessing])

  // Handle success
  const handleSuccess = () => {
    stopCamera()
    onSuccess(capturedPhoto)
    onClose()
  }

  // Handle retry
  const handleRetry = () => {
    setCurrentStep('permission')
    setRetryCount(0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {t('language') === 'ms' ? 'Pengesahan Wajah' : 'Face Verification'}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('language') === 'ms' ? 'Ujian kewujudan secara langsung' : 'Live presence verification'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Camera Permission Step */}
          {currentStep === 'permission' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  {t('language') === 'ms' ? 'Akses Kamera Diperlukan' : 'Camera Access Required'}
                </h4>
                <p className="text-gray-600 mb-4">
                  {t('language') === 'ms' 
                    ? 'Kami perlu akses kamera untuk mengesahkan identiti anda'
                    : 'We need camera access to verify your identity'
                  }
                </p>
                <button
                  onClick={() => {
                    console.log('🔘 Start Verification button clicked!')
                    startCamera()
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  {t('language') === 'ms' ? 'Mula Pengesahan' : 'Start Verification'}
                </button>
              </div>
            </div>
          )}

          {/* Challenge Step */}
          {currentStep === 'challenge' && currentChallenge && (
            <div className="space-y-6">
              {/* Video Feed */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                
                {/* Timer Overlay */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {timeLeft}s
                </div>

                {/* Retry Count */}
                {retryCount > 0 && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('language') === 'ms' ? 'Cuba Lagi' : 'Retry'} {retryCount}/1
                  </div>
                )}

                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
                      <div className="text-sm">
                        {t('language') === 'ms' ? 'Memproses...' : 'Processing...'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Challenge Instructions */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('language') === 'ms' ? currentChallenge.instructionMs : currentChallenge.instruction}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('language') === 'ms' 
                    ? 'Ikuti arahan di atas untuk meneruskan'
                    : 'Follow the instruction above to continue'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Success Step */}
          {currentStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-2">
                  {t('language') === 'ms' ? 'Pengesahan Berjaya!' : 'Verification Successful!'}
                </h4>
                <p className="text-gray-600 mb-4">
                  {t('language') === 'ms' 
                    ? 'Identiti anda telah disahkan dengan jayanya'
                    : 'Your identity has been successfully verified'
                  }
                </p>
                <button
                  onClick={handleSuccess}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  {t('language') === 'ms' ? 'Teruskan' : 'Continue'}
                </button>
              </div>
            </div>
          )}

          {/* Failure Step */}
          {currentStep === 'failure' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-2">
                  {t('language') === 'ms' ? 'Pengesahan Gagal' : 'Verification Failed'}
                </h4>
                <p className="text-gray-600 mb-4">
                  {t('language') === 'ms' 
                    ? 'Tidak dapat mengesahkan identiti anda. Sila cuba lagi.'
                    : 'Unable to verify your identity. Please try again.'
                  }
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleRetry}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('language') === 'ms' ? 'Cuba Lagi' : 'Try Again'}
                  </button>
                  <button
                    onClick={() => {
                      onFailure()
                      onClose()
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t('language') === 'ms' ? 'Batal' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}