'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Iridescence from '@/components/backgrounds/Iridescence'
import { useUser } from '@/contexts/UserContext'

// Global variables (like in the original JS)
let faceLandmarker: any
let runningMode: "IMAGE" | "VIDEO" = "IMAGE"
let webcamRunning: boolean = false
let lastVideoTime = -1
let results: any = undefined
let drawingUtils: any = null

// Liveness test variables
let livenessTestActive: boolean = false
let currentTestType: 'blink' | 'head_turn' | 'nod' = 'blink'
let testStatus: 'waiting' | 'in_progress' | 'passed' | 'failed' = 'waiting'

// Blink detection variables
let eyeBlinkLeftHistory: number[] = []
let eyeBlinkRightHistory: number[] = []
let blinkThreshold = 0.5
let blinkCount = 0
let requiredBlinks = 2
let lastBlinkTime = 0
let isCurrentlyBlinking = false

// Head turn detection variables
let headPositionHistory: {yaw: number, timestamp: number}[] = []
let hasMovedLeft = false
let hasMovedRight = false
let centerYaw = 0
let headTurnThreshold = 15 // degrees

// Nod detection variables
let nodCount = 0
let requiredNods = 2
let lastNodTime = 0
let isCurrentlyNodding = false
let verticalPositionHistory: {pitch: number, timestamp: number}[] = []
let centerPitch = 0
let nodThreshold = 10 // degrees for up/down movement

const videoWidth = 480

export default function FaceLandmarkDemo() {
  // React state to track webcam status for UI updates
  const [isWebcamRunning, setIsWebcamRunning] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()
  const { login } = useUser()
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageBlendShapesRef = useRef<HTMLUListElement>(null)
  const videoBlendShapesRef = useRef<HTMLUListElement>(null)
  const enableWebcamButtonRef = useRef<HTMLButtonElement>(null)
  const demosSectionRef = useRef<HTMLElement>(null)
  
  // Liveness test refs
  const livenessTestSectionRef = useRef<HTMLDivElement>(null)
  const testStatusRef = useRef<HTMLDivElement>(null)
  const testInstructionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    createFaceLandmarker()
  }, [])

  // Initialize liveness test UI on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      updateLivenessUI()
    }, 1000) // Wait for refs to be ready
    
    return () => clearTimeout(timer)
  }, [])

  // Before we can use FaceLandmarker class we must wait for it to finish loading
  async function createFaceLandmarker() {
    const vision = await import('@mediapipe/tasks-vision')
    const { FaceLandmarker, FilesetResolver } = vision
    
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    )
    
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 1
    })
    
    if (demosSectionRef.current) {
      demosSectionRef.current.classList.remove("invisible")
    }
  }

  // Image detection removed for cleaner login interface
  // Commented out for cleaner login interface
  // ... image detection code removed ...

  // Enable the live webcam view and start detection
  function enableCam() {
    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.")
      return
    }

    if (webcamRunning === true) {
      // Disable webcam
      webcamRunning = false
      setIsWebcamRunning(false)
      if (enableWebcamButtonRef.current) {
        enableWebcamButtonRef.current.innerText = "ENABLE CAMERA"
      }
      
      // Stop the webcam stream if it exists
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
    } else {
      // Enable webcam
      if (enableWebcamButtonRef.current) {
        enableWebcamButtonRef.current.innerText = "DISABLE CAMERA"
      }

      // getUserMedia parameters
      const constraints = {
        video: true
      }

      // Activate the webcam stream
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.addEventListener("loadeddata", () => {
            // Set both global and React state when video is ready
            webcamRunning = true
            setIsWebcamRunning(true)
            predictWebcam()
          })
        }
      }).catch((error) => {
        console.error("Error accessing webcam:", error)
        webcamRunning = false
        setIsWebcamRunning(false)
        if (enableWebcamButtonRef.current) {
          enableWebcamButtonRef.current.innerText = "ENABLE CAMERA"
        }
      })
    }
  }

  async function predictWebcam() {
    const video = videoRef.current!
    const canvasElement = canvasRef.current!
    const canvasCtx = canvasElement.getContext("2d")!

    const radio = video.videoHeight / video.videoWidth
    video.style.width = videoWidth + "px"
    video.style.height = videoWidth * radio + "px"
    canvasElement.style.width = videoWidth + "px"
    canvasElement.style.height = videoWidth * radio + "px"
    canvasElement.width = video.videoWidth
    canvasElement.height = video.videoHeight

    // Now let's start detecting the stream
    if (runningMode === "IMAGE") {
      runningMode = "VIDEO"
      await faceLandmarker.setOptions({ runningMode: runningMode })
    }
    
    let startTimeMs = performance.now()
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime
      results = faceLandmarker.detectForVideo(video, startTimeMs)
    }
    
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    
    if (results.faceLandmarks) {
      if (!drawingUtils) {
        const vision = await import('@mediapipe/tasks-vision')
        const { DrawingUtils, FaceLandmarker } = vision
        drawingUtils = new DrawingUtils(canvasCtx)
        
        for (const landmarks of results.faceLandmarks) {
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C070", lineWidth: 1 })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#30FF30" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: "#30FF30" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#E0E0E0" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: "#30FF30" })
        }
      } else {
        for (const landmarks of results.faceLandmarks) {
          const vision = await import('@mediapipe/tasks-vision')
          const { FaceLandmarker } = vision
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C070", lineWidth: 1 })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#30FF30" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: "#30FF30" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#E0E0E0" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: "#FF3030" })
          drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: "#30FF30" })
        }
      }
    }
    
    // Hidden blend shapes display for cleaner login UI
    // drawBlendShapes(videoBlendShapesRef.current, results.faceBlendshapes)

    // Run liveness detection if active
    if (results.faceBlendshapes && results.faceLandmarks) {
      detectLiveness(results.faceBlendshapes, results.faceLandmarks)
    }

    // Call this function again to keep predicting when the browser is ready
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam)
    }
  }

  function drawBlendShapes(el: HTMLElement | null, blendShapes: any[]) {
    if (!blendShapes || !blendShapes.length || !el) {
      return
    }

    console.log(blendShapes[0])
    
    let htmlMaker = ""
    blendShapes[0].categories.map((shape: any) => {
      htmlMaker += `
        <li class="flex items-center h-5">
          <span class="flex w-32 justify-end items-center mr-1 text-sm">${shape.displayName || shape.categoryName}</span>
          <span class="flex h-4 items-center bg-teal-600 text-white text-xs px-1" style="width: calc(${+shape.score * 100}% - 120px)">${(+shape.score).toFixed(4)}</span>
        </li>
      `
    })

    el.innerHTML = htmlMaker
  }

  // Liveness detection functions
  function startRandomTest() {
    if (livenessTestActive) {
      stopLivenessTest()
      return
    }

    // Randomly select blink, head turn, or nod test
    const tests = ['blink', 'head_turn', 'nod']
    const randomTest = tests[Math.floor(Math.random() * tests.length)] as 'blink' | 'head_turn' | 'nod'
    
    livenessTestActive = true
    currentTestType = randomTest
    testStatus = 'waiting'
    
    if (randomTest === 'blink') {
      resetBlinkVariables()
      console.log('Random test selected: Blink twice')
    } else if (randomTest === 'head_turn') {
      resetHeadTurnVariables()
      console.log('Random test selected: Head turn left and right')
    } else if (randomTest === 'nod') {
      resetNodVariables()
      console.log('Random test selected: Nod twice')
    }
    
    updateLivenessUI()
  }

  function startBlinkTest() {
    livenessTestActive = true
    currentTestType = 'blink'
    testStatus = 'waiting'
    resetBlinkVariables()
    updateLivenessUI()
    console.log('Blink test started - need to blink twice')
  }

  function startHeadTurnTest() {
    livenessTestActive = true
    currentTestType = 'head_turn'
    testStatus = 'waiting'
    resetHeadTurnVariables()
    updateLivenessUI()
    console.log('Head turn test started - turn left then right')
  }

  function startNodTest() {
    livenessTestActive = true
    currentTestType = 'nod'
    testStatus = 'waiting'
    resetNodVariables()
    updateLivenessUI()
    console.log('Nod test started - nod up and down twice')
  }

  function stopLivenessTest() {
    livenessTestActive = false
    testStatus = 'waiting'
    updateLivenessUI()
    console.log(`${currentTestType} test stopped`)
  }

  function resetBlinkVariables() {
    blinkCount = 0
    eyeBlinkLeftHistory = []
    eyeBlinkRightHistory = []
    lastBlinkTime = 0
    isCurrentlyBlinking = false
  }

  function resetHeadTurnVariables() {
    headPositionHistory = []
    hasMovedLeft = false
    hasMovedRight = false
    centerYaw = 0
  }

  function resetNodVariables() {
    nodCount = 0
    lastNodTime = 0
    isCurrentlyNodding = false
    verticalPositionHistory = []
    centerPitch = 0
  }

  function detectLiveness(blendShapes: any[], landmarks: any[]) {
    if (!livenessTestActive || !blendShapes || !blendShapes.length || !landmarks || !landmarks.length) {
      return
    }

    if (currentTestType === 'blink') {
      detectBlinkTwice(blendShapes)
    } else if (currentTestType === 'head_turn') {
      detectHeadTurn(landmarks[0]) // Use first face landmarks
    } else if (currentTestType === 'nod') {
      detectNodTwice(landmarks[0]) // Use first face landmarks
    }
  }

  function detectBlinkTwice(blendShapes: any[]) {
    const categories = blendShapes[0].categories
    let eyeBlinkLeft = 0
    let eyeBlinkRight = 0

    // Find eye blink values
    categories.forEach((shape: any) => {
      if (shape.categoryName === 'eyeBlinkLeft') {
        eyeBlinkLeft = shape.score
      }
      if (shape.categoryName === 'eyeBlinkRight') {
        eyeBlinkRight = shape.score
      }
    })

    const currentTime = Date.now()
    const bothEyesBlink = eyeBlinkLeft > blinkThreshold && eyeBlinkRight > blinkThreshold

    // Detect start of blink
    if (bothEyesBlink && !isCurrentlyBlinking && (currentTime - lastBlinkTime) > 500) {
      isCurrentlyBlinking = true
      blinkCount++
      lastBlinkTime = currentTime
      testStatus = 'in_progress'
      
      console.log(`Blink ${blinkCount}/${requiredBlinks} detected! Left: ${eyeBlinkLeft.toFixed(3)}, Right: ${eyeBlinkRight.toFixed(3)}`)
      updateLivenessUI()
    }
    
    // Reset blink state when eyes open
    if (!bothEyesBlink && isCurrentlyBlinking) {
      isCurrentlyBlinking = false
    }

    // Check if completed
    if (blinkCount >= requiredBlinks && testStatus !== 'passed') {
      testStatus = 'passed'
      updateLivenessUI()
      
      // Auto stop test after 3 seconds and show success modal
      setTimeout(() => {
        console.log('🎉 Login verification successful via blink test!')
        stopLivenessTest()
        showLoginSuccessModal()
      }, 3000)
    }

    // Log current values for debugging (only when active)
    if (testStatus === 'waiting' && livenessTestActive) {
      console.log(`Eye blink - Left: ${eyeBlinkLeft.toFixed(3)}, Right: ${eyeBlinkRight.toFixed(3)}, Count: ${blinkCount}/${requiredBlinks}`)
    }
  }

  function detectHeadTurn(landmarks: any[]) {
    // Calculate head yaw using nose tip and face center
    const noseTip = landmarks[1] // Nose tip landmark
    const leftEye = landmarks[33] // Left eye outer corner
    const rightEye = landmarks[362] // Right eye outer corner
    
    // Calculate face center
    const faceCenter = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2
    }
    
    // Calculate yaw angle (simplified)
    const deltaX = noseTip.x - faceCenter.x
    const yaw = Math.atan2(deltaX, 0.1) * (180 / Math.PI) // Convert to degrees
    
    const currentTime = Date.now()
    
    // Initialize center position if first measurement
    if (headPositionHistory.length === 0) {
      centerYaw = yaw
    }
    
    // Add to history
    headPositionHistory.push({ yaw, timestamp: currentTime })
    
    // Keep only last 30 measurements (1 second at 30fps)
    if (headPositionHistory.length > 30) {
      headPositionHistory.shift()
    }
    
    // Calculate relative yaw from center
    const relativeYaw = yaw - centerYaw
    
    // Check for left turn (negative yaw)
    if (relativeYaw < -headTurnThreshold && !hasMovedLeft) {
      hasMovedLeft = true
      testStatus = 'in_progress'
      console.log(`Head turned LEFT detected! Yaw: ${relativeYaw.toFixed(1)}°`)
      updateLivenessUI()
    }
    
    // Check for right turn (positive yaw)
    if (relativeYaw > headTurnThreshold && !hasMovedRight) {
      hasMovedRight = true
      testStatus = 'in_progress'
      console.log(`Head turned RIGHT detected! Yaw: ${relativeYaw.toFixed(1)}°`)
      updateLivenessUI()
    }
    
    // Check if completed both directions
    if (hasMovedLeft && hasMovedRight && testStatus !== 'passed') {
      testStatus = 'passed'
      updateLivenessUI()
      
      // Auto stop test after 3 seconds and show success modal
      setTimeout(() => {
        console.log('🎉 Login verification successful via head turn test!')
        stopLivenessTest()
        showLoginSuccessModal()
      }, 3000)
    }
    
    // Log current values for debugging (only when active and waiting)
    if (testStatus === 'waiting' && livenessTestActive) {
      console.log(`Head yaw: ${relativeYaw.toFixed(1)}° (Left: ${hasMovedLeft}, Right: ${hasMovedRight})`)
    }
  }

  function detectNodTwice(landmarks: any[]) {
    if (!landmarks || landmarks.length === 0) return

    const currentTime = performance.now()
    
    // Get key facial landmarks for pitch calculation
    const noseTip = landmarks[1] // Nose tip
    const foreheadCenter = landmarks[9] // Forehead center
    const chinBottom = landmarks[175] // Chin bottom
    
    // Calculate pitch (vertical angle) using nose relative to forehead-chin line
    const faceHeight = Math.abs(foreheadCenter.y - chinBottom.y)
    const noseVerticalPosition = (noseTip.y - foreheadCenter.y) / faceHeight
    
    // Convert to degrees (simplified pitch calculation)
    const pitch = noseVerticalPosition * 45 // Scale to reasonable degree range
    
    // Initialize center pitch on first few frames
    verticalPositionHistory.push({ pitch, timestamp: currentTime })
    
    // Keep only recent history (last 1 second)
    verticalPositionHistory = verticalPositionHistory.filter(
      entry => currentTime - entry.timestamp < 1000
    )
    
    // Set center pitch from early readings
    if (verticalPositionHistory.length === 5) {
      centerPitch = verticalPositionHistory.slice(0, 5).reduce((sum, entry) => sum + entry.pitch, 0) / 5
      console.log(`Center pitch established: ${centerPitch.toFixed(1)}°`)
    }
    
    if (verticalPositionHistory.length < 5) return // Wait for center to be established
    
    const relativePitch = pitch - centerPitch
    
    // Detect nodding motion (down then up movement)
    const isNodding = Math.abs(relativePitch) > nodThreshold
    
    // Count nods with cooldown period
    if (isNodding && !isCurrentlyNodding && (currentTime - lastNodTime) > 800) {
      isCurrentlyNodding = true
      nodCount++
      lastNodTime = currentTime
      testStatus = 'in_progress'
      console.log(`Nod detected! Count: ${nodCount}/${requiredNods}, Pitch: ${relativePitch.toFixed(1)}°`)
      updateLivenessUI()
    }
    
    // Reset nod state when head returns to center
    if (!isNodding && isCurrentlyNodding) {
      isCurrentlyNodding = false
    }
    
    // Check if completed
    if (nodCount >= requiredNods && testStatus !== 'passed') {
      testStatus = 'passed'
      updateLivenessUI()
      
      // Auto stop test after 3 seconds and show success modal
      setTimeout(() => {
        console.log('🎉 Login verification successful via nod test!')
        stopLivenessTest()
        showLoginSuccessModal()
      }, 3000)
    }
    
    // Log current values for debugging (only when active and waiting)
    if (testStatus === 'waiting' && livenessTestActive) {
      console.log(`Head pitch: ${relativePitch.toFixed(1)}° (Nods: ${nodCount}/${requiredNods})`)
    }
  }

  function updateLivenessUI() {
    if (!testInstructionRef.current || !testStatusRef.current) {
      return
    }

    if (currentTestType === 'blink') {
      updateBlinkUI()
    } else if (currentTestType === 'head_turn') {
      updateHeadTurnUI()
    } else if (currentTestType === 'nod') {
      updateNodUI()
    }
  }

  function updateBlinkUI() {
    if (!testInstructionRef.current || !testStatusRef.current) {
      return
    }

    switch (testStatus) {
      case 'waiting':
        testInstructionRef.current.innerHTML = livenessTestActive ? 
          '<b>Please blink your eyes TWICE</b>' : 
          'Click "Start Verification" to begin the liveness test'
        testStatusRef.current.innerHTML = livenessTestActive ? 
          '<span class="text-yellow-600">👁️ Waiting for blinks... (0/2)</span>' : 
          '<span class="text-gray-600">🔄 Ready for verification</span>'
        break
      
      case 'in_progress':
        testInstructionRef.current.innerHTML = `<b>Great! Keep blinking (${blinkCount}/${requiredBlinks})</b>`
        testStatusRef.current.innerHTML = `<span class="text-blue-600">👁️ Progress: ${blinkCount}/2 blinks</span>`
        break
      
      case 'passed':
        testInstructionRef.current.innerHTML = '<b>🎉 Verification Successful!</b>'
        testStatusRef.current.innerHTML = '<span class="text-green-600">✅ LOGIN APPROVED - BLINK TEST PASSED</span>'
        break
    }
  }

  function updateHeadTurnUI() {
    if (!testInstructionRef.current || !testStatusRef.current) {
      return
    }

    switch (testStatus) {
      case 'waiting':
        testInstructionRef.current.innerHTML = livenessTestActive ? 
          '<b>Turn your head LEFT, then RIGHT</b>' : 
          'Click "Start Verification" to begin the liveness test'
        testStatusRef.current.innerHTML = livenessTestActive ? 
          '<span class="text-yellow-600">🔄 Waiting for head movement...</span>' : 
          '<span class="text-gray-600">🔄 Ready for verification</span>'
        break
      
      case 'in_progress':
        const leftStatus = hasMovedLeft ? '✅' : '⏳'
        const rightStatus = hasMovedRight ? '✅' : '⏳'
        testInstructionRef.current.innerHTML = `<b>Keep turning your head!</b>`
        testStatusRef.current.innerHTML = `<span class="text-blue-600">🔄 Left: ${leftStatus} Right: ${rightStatus}</span>`
        break
      
      case 'passed':
        testInstructionRef.current.innerHTML = '<b>🎉 Verification Successful!</b>'
        testStatusRef.current.innerHTML = '<span class="text-green-600">✅ LOGIN APPROVED - HEAD TURN TEST PASSED</span>'
        break
    }
  }

  function updateNodUI() {
    if (!testInstructionRef.current || !testStatusRef.current) {
      return
    }

    switch (testStatus) {
      case 'waiting':
        testInstructionRef.current.innerHTML = livenessTestActive ? 
          '<b>Please NOD your head up and down TWICE</b>' : 
          'Click "Start Verification" to begin the liveness test'
        testStatusRef.current.innerHTML = livenessTestActive ? 
          '<span class="text-yellow-600">🔄 Waiting for nods... (0/2)</span>' : 
          '<span class="text-gray-600">🔄 Ready for verification</span>'
        break
      
      case 'in_progress':
        testInstructionRef.current.innerHTML = `<b>Great! Keep nodding (${nodCount}/${requiredNods})</b>`
        testStatusRef.current.innerHTML = `<span class="text-blue-600">🔄 Progress: ${nodCount}/2 nods</span>`
        break
      
      case 'passed':
        testInstructionRef.current.innerHTML = '<b>🎉 Verification Successful!</b>'
        testStatusRef.current.innerHTML = '<span class="text-green-600">✅ LOGIN APPROVED - NOD TEST PASSED</span>'
        break
    }
  }

  // Login form state
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Function to show login form after face liveness success
  const showLoginSuccessModal = () => {
    setShowSuccessModal(true)
    
    // Show login form after 2 seconds instead of redirecting
    setTimeout(() => {
      setShowSuccessModal(false)
      setShowLoginForm(true)
    }, 2000)
  }

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // Success - redirect to home
        router.push('/home')
      } else {
        setLoginError(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 font-sans mx-8 my-8">
      <style jsx>{`
        .invisible {
          opacity: 0.2;
        }
        .canvas {
          z-index: 1;
          position: absolute;
          pointer-events: none;
        }
        .output_canvas {
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
        }
        video {
          clear: both;
          display: block;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          -moz-transform: rotateY(180deg);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            <span className="bg-gradient-to-r from-black via-purple-800 to-blue-800 bg-clip-text text-transparent">
              🔐 Secure Login
            </span>
          </h1>
          <p className="text-black/80">
            Complete face liveness verification to access your account
          </p>
        </div>

      <section ref={demosSectionRef} className="invisible">
          {/* Camera Section */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 overflow-hidden mb-8">
            <div className="p-6 bg-white/80 backdrop-blur-sm border-b border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Face Verification</h2>
              <p className="text-gray-600">Position your face in front of the camera</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <button 
                  ref={enableWebcamButtonRef}
                  onClick={enableCam}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
                >
                  {isWebcamRunning ? 'DISABLE CAMERA' : 'ENABLE CAMERA'}
                </button>
              </div>
              
              <div className="flex justify-center">
                <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{maxWidth: '480px', width: '100%'}}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    className="output_canvas absolute left-0 top-0 w-full h-64"
                  />
                  
                  {/* Live indicator */}
                  {isWebcamRunning && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🔴 LIVE
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>



          {/* Liveness Test Section */}
          <div ref={livenessTestSectionRef} className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 p-6">
            <div className="text-center mb-6">
              <div ref={testStatusRef} className="text-2xl font-bold mb-4">
                <span className="text-gray-600">🔄 Ready for verification</span>
              </div>
              
              <p ref={testInstructionRef} className="text-lg mb-6 text-gray-700">
                Click "Start Verification" to begin the liveness test
              </p>
              
              <button 
                onClick={() => startRandomTest()}
                disabled={!isWebcamRunning}
                className={`px-8 py-4 rounded-lg shadow font-semibold text-lg transition-colors ${
                  !isWebcamRunning 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : livenessTestActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                }`}
              >
                {!isWebcamRunning 
                  ? 'Enable Camera First' 
                  : livenessTestActive 
                  ? 'Cancel Test' 
                  : 'Start Verification'
                }
              </button>
              
              {!isWebcamRunning && (
                <p className="text-sm text-gray-500 mt-2">
                  Please enable your camera before starting verification
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full border border-white/30">
            <div className="text-center">
              {/* Loading Spinner */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
              
              {/* Success Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ✅ Verification Successful!
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 mb-2">
                Face Liveness Verified
              </p>
              
              <p className="text-sm text-gray-500">
                Preparing login form...
              </p>
              
              {/* Progress dots */}
              <div className="flex justify-center space-x-1 mt-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full border border-white/30">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🔐 Login to BizKuKu
                </span>
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  required
                  disabled={loginLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  required
                  disabled={loginLoading}
                />
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{loginError}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  loginLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {loginLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging in...
                  </div>
                ) : (
                  'Login to BizKuKu'
                )}
              </button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>📧 ahmad.restaurant@bizkuku.com</div>
                  <div>📧 siti.retail@bizkuku.com</div>
                  <div>📧 raj.tech@bizkuku.com</div>
                  <div className="mt-1 font-medium">🔑 Password: password123</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}