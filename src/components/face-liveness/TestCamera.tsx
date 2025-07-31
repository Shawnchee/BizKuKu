'use client'

import { useState, useRef, useEffect } from 'react'

export default function TestCamera() {
  const [isOpen, setIsOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    console.log('Starting basic camera test...')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' } 
      })
      
      console.log('Camera access granted:', mediaStream)
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        console.log('Video srcObject set')
      }
      
    } catch (error) {
      console.error('Camera error:', error)
      alert('Camera access failed: ' + error.message)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isOpen ? 'Close Test' : 'Open Camera Test'}
      </button>

      {isOpen && (
        <div className="border p-4">
          <h3 className="text-lg font-bold mb-4">Camera Test</h3>
          
          <div className="mb-4">
            <button 
              onClick={startCamera}
              className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Start Camera
            </button>
            <button 
              onClick={stopCamera}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Stop Camera
            </button>
          </div>

          <div className="bg-black w-full max-w-md h-64 mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>

          <p className="text-sm text-gray-600">
            Check browser console for detailed logs
          </p>
        </div>
      )}
    </div>
  )
}