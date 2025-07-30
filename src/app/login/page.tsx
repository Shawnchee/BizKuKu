'use client'

import { useRef, useEffect } from 'react'

// Global variables (like in the original JS)
let faceLandmarker: any
let runningMode: "IMAGE" | "VIDEO" = "IMAGE"
let webcamRunning: boolean = false
let lastVideoTime = -1
let results: any = undefined
let drawingUtils: any = null

const videoWidth = 480

export default function FaceLandmarkDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageBlendShapesRef = useRef<HTMLUListElement>(null)
  const videoBlendShapesRef = useRef<HTMLUListElement>(null)
  const enableWebcamButtonRef = useRef<HTMLButtonElement>(null)
  const demosSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    createFaceLandmarker()
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
      </section>
    </div>
  )
}