// Integration between face verification login and Supabase
import { faceVerifications, auth } from './supabase-integration'

export interface VerificationResult {
  success: boolean
  verificationId?: string
  error?: string
}

export class FaceVerificationService {
  
  /**
   * Record a successful face verification attempt
   * Call this when the MediaPipe verification passes
   */
  static async recordVerification(
    verificationType: 'blink' | 'head_turn' | 'nod',
    confidenceScore?: number,
    faceImageBase64?: string
  ): Promise<VerificationResult> {
    try {
      // Get current user
      const { user } = await auth.getCurrentUser()
      if (!user) {
        return { success: false, error: 'User not authenticated' }
      }

      // Prepare verification data
      const verificationData = {
        user_id: user.id,
        verification_type: verificationType,
        verification_status: 'passed' as const,
        confidence_score: confidenceScore || 0.95,
        session_token: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
        // Note: face_image_url would be set after uploading to storage
      }

      // Record verification in database
      const { data, error } = await faceVerifications.create(verificationData)
      
      if (error) {
        console.error('Failed to record verification:', error)
        return { success: false, error: error.message }
      }

      return { 
        success: true, 
        verificationId: data?.id 
      }

    } catch (error) {
      console.error('Verification recording error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  /**
   * Record a failed verification attempt
   */
  static async recordFailedVerification(
    verificationType: 'blink' | 'head_turn' | 'nod',
    reason?: string
  ): Promise<VerificationResult> {
    try {
      const { user } = await auth.getCurrentUser()
      if (!user) {
        return { success: false, error: 'User not authenticated' }
      }

      const verificationData = {
        user_id: user.id,
        verification_type: verificationType,
        verification_status: 'failed' as const,
        session_token: `failed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
      }

      const { data, error } = await faceVerifications.create(verificationData)
      
      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, verificationId: data?.id }

    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  /**
   * Get user's verification history for security dashboard
   */
  static async getVerificationHistory(limit: number = 10) {
    try {
      const { user } = await auth.getCurrentUser()
      if (!user) {
        return { data: null, error: 'User not authenticated' }
      }

      return await faceVerifications.getUserHistory(user.id, limit)
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  /**
   * Get verification statistics for user dashboard
   */
  static async getVerificationStats() {
    try {
      const { user } = await auth.getCurrentUser()
      if (!user) {
        return { data: null, error: 'User not authenticated' }
      }

      return await faceVerifications.getStats(user.id)
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  /**
   * Helper function to get client IP (simplified)
   */
  private static async getClientIP(): Promise<string> {
    try {
      // In a real app, you might use a service to get the actual IP
      // For now, return a placeholder
      return '127.0.0.1'
    } catch {
      return '0.0.0.0'
    }
  }

  /**
   * Upload face image to Supabase Storage (for AWS Face Recognition integration)
   */
  static async uploadFaceImage(
    imageBlob: Blob, 
    verificationId: string
  ): Promise<{ success: boolean, url?: string, error?: string }> {
    try {
      const { user } = await auth.getCurrentUser()
      if (!user) {
        return { success: false, error: 'User not authenticated' }
      }

      // TODO: Implement Supabase Storage upload
      // This would integrate with your AWS Face Recognition workflow
      /*
      const fileName = `face-verifications/${user.id}/${verificationId}.jpg`
      const { data, error } = await supabase.storage
        .from('face-images')
        .upload(fileName, imageBlob)
      
      if (error) {
        return { success: false, error: error.message }
      }

      // Get public URL
      const { publicURL } = supabase.storage
        .from('face-images')
        .getPublicUrl(fileName)

      return { success: true, url: publicURL }
      */

      // Placeholder implementation
      return { 
        success: true, 
        url: `placeholder-url-for-${verificationId}` 
      }

    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      }
    }
  }
}

// Example usage in your login page:
/*

// In your login page MediaPipe success handler:
async function handleVerificationSuccess(verificationType: 'blink' | 'head_turn' | 'nod') {
  console.log(`${verificationType} verification passed!`)
  
  // Record in database
  const result = await FaceVerificationService.recordVerification(
    verificationType,
    0.95, // confidence score from MediaPipe
    // capturedImageBase64 // optional face image
  )
  
  if (result.success) {
    console.log('Verification recorded:', result.verificationId)
    // Proceed with login
  } else {
    console.error('Failed to record verification:', result.error)
  }
}

// In your login page MediaPipe failure handler:
async function handleVerificationFailure(verificationType: 'blink' | 'head_turn' | 'nod') {
  console.log(`${verificationType} verification failed`)
  
  await FaceVerificationService.recordFailedVerification(
    verificationType,
    'User failed to complete verification'
  )
}

*/

export default FaceVerificationService