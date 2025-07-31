import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { createClient } from '@supabase/supabase-js'

// AWS Configuration from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION || 'us-east-1'
})

const rekognition = new AWS.Rekognition()

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface FaceRecognitionResponse {
  success: boolean
  user?: any
  error?: string
  debugInfo?: any
}

export async function POST(request: NextRequest): Promise<NextResponse<FaceRecognitionResponse>> {
  try {
    console.log('🔍 Face recognition API called')
    
    // Parse the request body to get the image data
    const body = await request.json()
    const { imageData } = body
    
    if (!imageData) {
      console.error('❌ No image data provided')
      return NextResponse.json({ 
        success: false, 
        error: 'No image data provided' 
      }, { status: 400 })
    }

    console.log('🖼️ Image data received, length:', imageData.length)

    // Convert base64 image to buffer
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')
    
    console.log('📏 Image buffer size:', imageBuffer.length, 'bytes')

    // Step 1: Search for faces in AWS Rekognition
    console.log('🔍 Calling AWS Rekognition searchFacesByImage...')
    
    let rekognitionResponse
    try {
      rekognitionResponse = await rekognition.searchFacesByImage({
        CollectionId: 'bisskuuser',
        Image: { Bytes: imageBuffer },
        MaxFaces: 1,
        FaceMatchThreshold: 75 // 75% confidence threshold
      }).promise()
      
      console.log('✅ Rekognition response received:', rekognitionResponse.FaceMatches?.length || 0, 'matches')
    } catch (rekError: any) {
      console.error('❌ AWS Rekognition error:', rekError.message)
      return NextResponse.json({ 
        success: false, 
        error: `Face recognition service error: ${rekError.message}`,
        debugInfo: { 
          errorCode: rekError.code,
          errorType: 'AWS_REKOGNITION_ERROR'
        }
      }, { status: 500 })
    }

    // Step 2: Check if any faces were found
    if (!rekognitionResponse.FaceMatches || rekognitionResponse.FaceMatches.length === 0) {
      console.log('👤 No face matches found')
      return NextResponse.json({ 
        success: false, 
        error: 'Face not recognized. Please try again or use manual login.',
        debugInfo: { 
          faceMatches: 0,
          errorType: 'NO_FACE_MATCH'
        }
      }, { status: 404 })
    }

    const bestMatch = rekognitionResponse.FaceMatches[0]
    const faceId = bestMatch.Face?.FaceId
    const confidence = bestMatch.Face?.Confidence
    
    console.log(`🎯 Best match found - FaceId: ${faceId}, Confidence: ${confidence?.toFixed(1)}%`)

    // Step 3: Search for user profile in Supabase using rekognition_id
    console.log('🗄️ Searching for user profile in Supabase...')
    console.log(`🔍 Looking for rekognition_id: ${faceId}`)
    console.log(`🔍 Supabase URL: ${supabaseUrl}`)
    console.log(`🔍 Supabase Key (first 20 chars): ${supabaseServiceKey?.substring(0, 20)}...`)
    
    // DEBUG: Test basic connection
    const { data: testConnection } = await supabase
      .from('user_profiles')
      .select('count', { count: 'exact', head: true })
    
    console.log('🔍 CONNECTION TEST - Row count:', testConnection)
    
    // DEBUG: Try to get ALL rows to see what's available
    const { data: allRows, error: allError } = await supabase
      .from('user_profiles')
      .select('id, email, full_name, rekognition_id')
      .limit(10)
    
    console.log('🔍 ALL ROWS - Count:', allRows?.length || 0)
    console.log('🔍 ALL ROWS - Data:', JSON.stringify(allRows, null, 2))
    console.log('🔍 ALL ROWS - Error:', allError?.message)
    console.log('🔍 ALL ROWS - Error code:', allError?.code)
    console.log('🔍 ALL ROWS - Error details:', allError?.details)
    
    // DEBUG: Check specific rekognition_id match
    const { data: debugRows, error: debugError } = await supabase
      .from('user_profiles')
      .select('id, email, full_name, rekognition_id')
      .eq('rekognition_id', faceId)
    
    console.log('🔍 REKOGNITION_ID MATCH - Exact match rows:', debugRows?.length || 0)
    console.log('🔍 REKOGNITION_ID MATCH - Match data:', JSON.stringify(debugRows, null, 2))
    console.log('🔍 REKOGNITION_ID MATCH - Error:', debugError?.message)
    
    // DEBUG: Check for partial matches (troubleshooting)
    const { data: partialRows, error: partialError } = await supabase
      .from('user_profiles')
      .select('id, email, full_name, rekognition_id')
      .like('rekognition_id', `%${faceId.substring(0, 8)}%`)
    
    console.log('🔍 PARTIAL MATCH - Partial match rows:', partialRows?.length || 0)
    console.log('🔍 PARTIAL MATCH - Partial data:', JSON.stringify(partialRows, null, 2))
    
    // Main query: Get user profile by rekognition_id
    const { data: userProfiles, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('rekognition_id', faceId)

    if (userError || !userProfiles || userProfiles.length === 0) {
      console.error('❌ User profile not found in Supabase:', userError?.message)
      return NextResponse.json({ 
        success: false, 
        error: 'Face recognized but user profile not found. Please contact support.',
        debugInfo: { 
          faceId,
          confidence: confidence?.toFixed(1),
          supabaseError: userError?.message,
          foundRows: userProfiles?.length || 0,
          errorType: 'USER_NOT_FOUND_IN_SUPABASE',
          searchedRekognitionId: faceId
        }
      }, { status: 404 })
    }
    
    // Handle multiple matches - take the first one
    const userProfile = userProfiles[0]
    if (userProfiles.length > 1) {
      console.log(`⚠️ Found ${userProfiles.length} users with same rekognition_id, using first one`)
      console.log('🔍 All matches:', userProfiles.map(u => ({ id: u.id, email: u.email, name: u.full_name })))
    }

    console.log(`✅ Found complete user profile: ${userProfile.full_name} (${userProfile.email})`)

    // Return successful response with user data
    return NextResponse.json({ 
      success: true, 
      user: {
        profile: userProfile,        // Full profile from Supabase
        confidence: confidence,      // AWS confidence score
        recognitionId: faceId,       // AWS RekognitionId for reference
        debugInfo: {
          faceMatchConfidence: confidence?.toFixed(1),
          rekognitionId: faceId,
          foundInSupabase: true,
          userEmail: userProfile.email,
          userId: userProfile.id
        }
      }
    })

  } catch (error: any) {
    console.error('❌ Unexpected error in face recognition:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'An unexpected error occurred during face recognition.',
      debugInfo: { 
        error: error.message,
        errorType: 'UNEXPECTED_ERROR'
      }
    }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}