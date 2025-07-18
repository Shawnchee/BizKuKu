import { OnboardingData } from '@/app/onboarding/page'

const STORAGE_KEY = 'bizzku_onboarding_progress'

export interface OnboardingProgress {
  data: OnboardingData
  currentStep: number
  lastUpdated: string
  completedSteps: number[]
  userId?: string
}

export class OnboardingStorage {
  static save(progress: OnboardingProgress): void {
    try {
      const serializedData = JSON.stringify(progress)
      localStorage.setItem(STORAGE_KEY, serializedData)
      
      // Also save to a backup key with timestamp
      const backupKey = `${STORAGE_KEY}_backup_${Date.now()}`
      localStorage.setItem(backupKey, serializedData)
      
      // Clean up old backups (keep only last 3)
      this.cleanupBackups()
    } catch (error) {
      console.error('Error saving onboarding progress:', error)
    }
  }

  static load(): OnboardingProgress | null {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (!savedData) return null

      const progress = JSON.parse(savedData) as OnboardingProgress
      
      // Validate the data structure
      if (this.isValidProgress(progress)) {
        return progress
      } else {
        console.warn('Invalid onboarding progress data, clearing storage')
        this.clear()
        return null
      }
    } catch (error) {
      console.error('Error loading onboarding progress:', error)
      return null
    }
  }

  static clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
      
      // Also clear backups
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(`${STORAGE_KEY}_backup_`)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Error clearing onboarding progress:', error)
    }
  }

  static export(): string {
    const progress = this.load()
    if (!progress) return ''
    
    return JSON.stringify(progress, null, 2)
  }

  static import(jsonData: string): boolean {
    try {
      const progress = JSON.parse(jsonData) as OnboardingProgress
      if (this.isValidProgress(progress)) {
        this.save(progress)
        return true
      }
      return false
    } catch (error) {
      console.error('Error importing onboarding progress:', error)
      return false
    }
  }

  static getProgressPercentage(): number {
    const progress = this.load()
    if (!progress) return 0

    const totalSteps = 4
    const completedSteps = progress.completedSteps.length
    return Math.round((completedSteps / totalSteps) * 100)
  }

  static markStepCompleted(stepNumber: number): void {
    const progress = this.load()
    if (!progress) return

    if (!progress.completedSteps.includes(stepNumber)) {
      progress.completedSteps.push(stepNumber)
      progress.lastUpdated = new Date().toISOString()
      this.save(progress)
    }
  }

  static isStepCompleted(stepNumber: number): boolean {
    const progress = this.load()
    return progress ? progress.completedSteps.includes(stepNumber) : false
  }

  private static isValidProgress(progress: any): progress is OnboardingProgress {
    return (
      progress &&
      typeof progress === 'object' &&
      progress.data &&
      typeof progress.currentStep === 'number' &&
      typeof progress.lastUpdated === 'string' &&
      Array.isArray(progress.completedSteps) &&
      progress.currentStep >= 1 &&
      progress.currentStep <= 4
    )
  }

  private static cleanupBackups(): void {
    try {
      const keys = Object.keys(localStorage)
      const backupKeys = keys
        .filter(key => key.startsWith(`${STORAGE_KEY}_backup_`))
        .sort()
        .reverse()

      // Keep only the 3 most recent backups
      if (backupKeys.length > 3) {
        backupKeys.slice(3).forEach(key => {
          localStorage.removeItem(key)
        })
      }
    } catch (error) {
      console.error('Error cleaning up backups:', error)
    }
  }

  // Utility method to download progress as JSON file
  static downloadProgress(): void {
    const progress = this.load()
    if (!progress) return

    const dataStr = JSON.stringify(progress, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `bizzku-onboarding-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  // Method to check if user can resume onboarding
  static canResume(): boolean {
    const progress = this.load()
    return progress !== null && progress.currentStep < 4
  }

  // Method to get resume information
  static getResumeInfo(): { step: number; lastUpdated: Date } | null {
    const progress = this.load()
    if (!progress) return null

    return {
      step: progress.currentStep,
      lastUpdated: new Date(progress.lastUpdated)
    }
  }
}
