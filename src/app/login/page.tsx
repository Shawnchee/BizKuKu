'use client'

import { useRef, useEffect } from 'react'

// Global variables (like in the original JS)
let faceLandmarker: any
let runningMode: "IMAGE" | "VIDEO" = "IMAGE"
let webcamRunning: boolean = false
let lastVideoTime = -1
let results: any = undefined
let drawingUtils: any = null

// Liveness test variables
let livenessTestActive: boolean = false
let currentTestType: 'blink' | 'head_turn' = 'blink'
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

const videoWidth = 480

export default function FaceLandmarkDemo() {
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
  const startBlinkTestButtonRef = useRef<HTMLButtonElement>(null)
  const startHeadTurnTestButtonRef = useRef<HTMLButtonElement>(null)

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

  // When an image is clicked, let's detect it and display results!
  async function handleImageClick(event: React.MouseEvent<HTMLImageElement>) {
    if (!faceLandmarker) {
      console.log("Wait for faceLandmarker to load before clicking!")
      return
    }

    if (runningMode === "VIDEO") {
      runningMode = "IMAGE"
      await faceLandmarker.setOptions({ runningMode })
    }

    const img = event.target as HTMLImageElement
    const container = img.parentNode as HTMLElement
    
    // Remove all landmarks drawn before
    const allCanvas = container.getElementsByClassName("canvas")
    for (let i = allCanvas.length - 1; i >= 0; i--) {
      const n = allCanvas[i]
      n.parentNode?.removeChild(n)
    }

    const faceLandmarkerResult = faceLandmarker.detect(img)
    const canvas = document.createElement("canvas") as HTMLCanvasElement
    canvas.setAttribute("class", "canvas")
    canvas.setAttribute("width", img.naturalWidth + "px")
    canvas.setAttribute("height", img.naturalHeight + "px")
    canvas.style.left = "0px"
    canvas.style.top = "0px"
    canvas.style.width = `${img.width}px`
    canvas.style.height = `${img.height}px`

    container.appendChild(canvas)
    const ctx = canvas.getContext("2d")!
    
    const vision = await import('@mediapipe/tasks-vision')
    const { DrawingUtils, FaceLandmarker } = vision
    const drawingUtils = new DrawingUtils(ctx)
    
    for (const landmarks of faceLandmarkerResult.faceLandmarks) {
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
    
    drawBlendShapes(imageBlendShapesRef.current, faceLandmarkerResult.faceBlendshapes)
  }

  // Enable the live webcam view and start detection
  function enableCam() {
    if (!faceLandmarker) {
      console.log("Wait! faceLandmarker not loaded yet.")
      return
    }

    if (webcamRunning === true) {
      webcamRunning = false
      if (enableWebcamButtonRef.current) {
        enableWebcamButtonRef.current.innerText = "ENABLE PREDICTIONS"
      }
    } else {
      webcamRunning = true
      if (enableWebcamButtonRef.current) {
        enableWebcamButtonRef.current.innerText = "DISABLE PREDICTIONS"
      }
    }

    // getUserMedia parameters
    const constraints = {
      video: true
    }

    // Activate the webcam stream
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener("loadeddata", predictWebcam)
      }
    })
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
    
    drawBlendShapes(videoBlendShapesRef.current, results.faceBlendshapes)

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

  function detectLiveness(blendShapes: any[], landmarks: any[]) {
    if (!livenessTestActive || !blendShapes || !blendShapes.length || !landmarks || !landmarks.length) {
      return
    }

    if (currentTestType === 'blink') {
      detectBlinkTwice(blendShapes)
    } else if (currentTestType === 'head_turn') {
      detectHeadTurn(landmarks[0]) // Use first face landmarks
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
      
      // Auto stop test after 3 seconds
      setTimeout(() => {
        stopLivenessTest()
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
      
      // Auto stop test after 3 seconds
      setTimeout(() => {
        stopLivenessTest()
      }, 3000)
    }
    
    // Log current values for debugging (only when active and waiting)
    if (testStatus === 'waiting' && livenessTestActive) {
      console.log(`Head yaw: ${relativeYaw.toFixed(1)}° (Left: ${hasMovedLeft}, Right: ${hasMovedRight})`)
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
    }
  }

  function updateBlinkUI() {
    if (!testInstructionRef.current || !testStatusRef.current || !startBlinkTestButtonRef.current) {
      return
    }

    switch (testStatus) {
      case 'waiting':
        testInstructionRef.current.innerHTML = livenessTestActive ? 
          '<b>Please blink your eyes TWICE</b>' : 
          'Click "Start Blink Test" and then blink twice when prompted'
        testStatusRef.current.innerHTML = livenessTestActive ? 
          '<span class="text-yellow-600">👁️ Waiting for blinks... (0/2)</span>' : 
          '<span class="text-gray-600">🔄 Ready to test</span>'
        startBlinkTestButtonRef.current.innerHTML = livenessTestActive ? 'Stop Blink Test' : 'Start Blink Test'
        break
      
      case 'in_progress':
        testInstructionRef.current.innerHTML = `<b>Blink detected! (${blinkCount}/${requiredBlinks})</b>`
        testStatusRef.current.innerHTML = `<span class="text-blue-600">👁️ Progress: ${blinkCount}/2 blinks</span>`
        break
      
      case 'passed':
        testInstructionRef.current.innerHTML = '<b>Excellent! All blinks detected!</b>'
        testStatusRef.current.innerHTML = '<span class="text-green-600">✅ BLINK TEST PASSED</span>'
        break
    }
  }

  function updateHeadTurnUI() {
    if (!testInstructionRef.current || !testStatusRef.current || !startHeadTurnTestButtonRef.current) {
      return
    }

    switch (testStatus) {
      case 'waiting':
        testInstructionRef.current.innerHTML = livenessTestActive ? 
          '<b>Turn your head LEFT, then RIGHT</b>' : 
          'Click "Start Head Turn Test" and then turn your head left and right'
        testStatusRef.current.innerHTML = livenessTestActive ? 
          '<span class="text-yellow-600">🔄 Waiting for head movement...</span>' : 
          '<span class="text-gray-600">🔄 Ready to test</span>'
        startHeadTurnTestButtonRef.current.innerHTML = livenessTestActive ? 'Stop Head Turn Test' : 'Start Head Turn Test'
        break
      
      case 'in_progress':
        const leftStatus = hasMovedLeft ? '✅' : '⏳'
        const rightStatus = hasMovedRight ? '✅' : '⏳'
        testInstructionRef.current.innerHTML = `<b>Keep turning!</b>`
        testStatusRef.current.innerHTML = `<span class="text-blue-600">🔄 Left: ${leftStatus} Right: ${rightStatus}</span>`
        break
      
      case 'passed':
        testInstructionRef.current.innerHTML = '<b>Perfect! Head movement detected!</b>'
        testStatusRef.current.innerHTML = '<span class="text-green-600">✅ HEAD TURN TEST PASSED</span>'
        break
    }
  }

  return (
    <div className="font-sans mx-8 my-8 text-gray-800">
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

      <h1 className="text-3xl font-bold text-teal-600 italic">
        Face landmark detection using the MediaPipe FaceLandmarker task
      </h1>

      <section ref={demosSectionRef} className="invisible">
        <h2 className="text-xl font-semibold clear-both">Demo: Detecting Images</h2>
        <p><b>Click on an image below</b> to see the key landmarks of the face.</p>

        <div className="relative float-left w-[48%] mx-[1%] my-[2%] cursor-pointer">
          <img 
            src="https://storage.googleapis.com/mediapipe-assets/portrait.jpg" 
            width="100%" 
            crossOrigin="anonymous" 
            title="Click to get detection!" 
            onClick={handleImageClick}
          />
        </div>
        <div className="float-left w-[48%] mx-[1%] my-[2%]">
          <ul ref={imageBlendShapesRef} className="list-none p-0"></ul>
        </div>

        <h2 className="text-xl font-semibold clear-both">Demo: Webcam continuous face landmarks detection</h2>
        <p>Hold your face in front of your webcam to get real-time face landmarker detection.<br/>Click <b>enable webcam</b> below and grant access to the webcam if prompted.</p>

        <div className="relative float-left w-[48%] mx-[1%] my-[2%]">
          <button 
            ref={enableWebcamButtonRef}
            onClick={enableCam}
            className="bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700 transition-colors mb-4"
          >
            ENABLE WEBCAM
          </button>
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute"
            />
            <canvas
              ref={canvasRef}
              className="output_canvas absolute left-0 top-0"
            />
          </div>
        </div>
        <div className="float-left w-[48%] mx-[1%] my-[2%]">
          <ul ref={videoBlendShapesRef} className="list-none p-0"></ul>
        </div>

        <h2 className="text-xl font-semibold clear-both mb-2">Demo: Liveness Detection Tests</h2>
        <p className="mb-4">
          Test real-time liveness detection with two different challenges: blink twice detection and head turning.
        </p>

        <div ref={livenessTestSectionRef} className="clear-both bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-4">
          <div className="text-center mb-6">
            <div ref={testStatusRef} className="text-2xl font-bold mb-2">
              <span className="text-gray-600">🔄 Ready to test</span>
            </div>
            
            <p ref={testInstructionRef} className="text-lg mb-6">
              Choose a test below and follow the instructions
            </p>
            
            <div className="flex gap-4 justify-center mb-4">
              <button 
                ref={startBlinkTestButtonRef}
                onClick={() => {
                  if (livenessTestActive && currentTestType === 'blink') {
                    stopLivenessTest()
                  } else {
                    startBlinkTest()
                  }
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition-colors font-semibold"
              >
                Start Blink Test
              </button>
              
              <button 
                ref={startHeadTurnTestButtonRef}
                onClick={() => {
                  if (livenessTestActive && currentTestType === 'head_turn') {
                    stopLivenessTest()
                  } else {
                    startHeadTurnTest()
                  }
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors font-semibold"
              >
                Start Head Turn Test
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 text-center space-y-1">
            <p><strong>Note:</strong> Make sure the webcam is enabled and your face is visible</p>
            <p><strong>Blink Test:</strong> Blink both eyes twice (threshold: {blinkThreshold})</p>
            <p><strong>Head Turn Test:</strong> Turn head left then right (threshold: {headTurnThreshold}°)</p>
          </div>
        </div>
      </section>
    </div>
  )
}