'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Upload, Paperclip, X, Bot, CheckCircle, Circle, ArrowRight, CreditCard, Building, Globe, FileText, Banknote, QrCode } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import GradientBackground from "@/components/backgrounds/GradientBackground"
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  options?: ChatOption[]
  type?: 'text' | 'options' | 'form' | 'checklist' | 'payment-setup' | 'completion'
  files?: File[]
}

interface ChatOption {
  id: string
  text: string
  icon?: React.ReactNode
  action?: () => void
}

interface FormField {
  id: string
  label: string
  type: 'text' | 'select' | 'textarea'
  value: string
  options?: string[]
  required?: boolean
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  buttonText: string
  completed: boolean
  action?: () => void
}

interface PaymentOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  buttonText: string
  action?: () => void
}

export default function AvatarOnboarding() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<any>({})
  const [isInitialized, setIsInitialized] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [pendingPayment, setPendingPayment] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with welcome message only once
    if (!isInitialized) {
      setIsInitialized(true)
      setTimeout(() => {
        addBotMessage("Hi there! I'm **BizMate**, your personal MSME onboarding assistant.\n\nLet's get your business up and running in just a few steps.")
        setTimeout(() => {
          showBusinessJourneyOptions()
        }, 2000)
      }, 1000)
    }
  }, [isInitialized])

  const addBotMessage = (text: string, options?: ChatOption[], type?: 'text' | 'options' | 'form' | 'checklist' | 'payment-setup' | 'completion') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      options,
      type: type || (options ? 'options' : 'text')
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (text: string, files?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      files
    }
    setMessages(prev => [...prev, newMessage])
  }

  const showBusinessJourneyOptions = () => {
    setTimeout(() => {
      addBotMessage("**Where are you in your business journey?**\n\nPlease select one of the options below:", [
        {
          id: 'just-starting',
          text: "I'm just starting (no registration yet)",
          icon: <Circle className="w-4 h-4" />,
          action: () => handleJourneySelection('just-starting')
        },
        {
          id: 'have-ssm',
          text: "I already have an SSM number",
          icon: <Circle className="w-4 h-4" />,
          action: () => handleJourneySelection('have-ssm')
        },
        {
          id: 'operating-offline',
          text: "I'm already operating but not online",
          icon: <Circle className="w-4 h-4" />,
          action: () => handleJourneySelection('operating-offline')
        },
        {
          id: 'fully-digital',
          text: "I'm fully digital and want to grow more",
          icon: <Circle className="w-4 h-4" />,
          action: () => handleJourneySelection('fully-digital')
        }
      ])
    }, 1000)
  }

  const handleJourneySelection = (journey: string) => {
    addUserMessage(journey === 'just-starting' ? "I'm just starting" : 
                  journey === 'have-ssm' ? "I already have an SSM number" :
                  journey === 'operating-offline' ? "I'm already operating but not online" :
                  "I'm fully digital and want to grow more")
    
    setUserData((prev: any) => ({ ...prev, journey }))
    
    if (journey === 'just-starting') {
      setTimeout(() => {
        addBotMessage("**Great! You're taking your first step.** 🎉\n\nPlease upload your **MyKad** for registration.")
      }, 1000)
    }
  }

  const showBasicInfoForm = () => {
    setTimeout(() => {
      addBotMessage("**✅ MyKad uploaded successfully!**\n\n**Please complete your personal and business information:**", [], 'form')
    }, 1000)
  }

  const showOnboardingChecklist = () => {
    setTimeout(() => {
      const hasCompletedSteps = completedSteps.size > 0
      const message = hasCompletedSteps 
        ? "Let us proceed with the onboarding checklist:"
        : "Awesome! Now, let me guide you through each step to get your business fully set up. \n\n**Here's your onboarding checklist:**"
      
      addBotMessage(message, [], 'checklist')
    }, 1000)
  }

  const handleSSMApplication = () => {  
    addUserMessage("Start SSM Application")
    
    // Step 1: Ask for confirmation before proceeding
    setTimeout(() => {
      addBotMessage("Before we proceed, let's confirm: \n\n**Are you ready to apply for SSM registration?** \n\n\n\nThis will allow you to:\n\n• Legally operate your business\n\n• Open a business bank account\n\n• Apply for loans and grants", [
        {
          id: 'confirm-ssm',
          text: "✔️ Confirm",
          action: () => handleSSMConfirmation("confirm")
        },
        {
          id: 'cancel-ssm',
          text: "❌ Cancel",
          action: () => handleSSMConfirmation("cancel")
        }
      ])
    }, 1000)
  }
  
  const handleSSMConfirmation = (response: string) => {
    if (response === "confirm") {
      // Step 2: Proceed with the application submission after confirmation
      addUserMessage("✔️ Confirmed")
  
      setTimeout(() => {
        addBotMessage("**SSM Registration in Progress** 📋\n\nWe're submitting your application now. You'll receive updates on the status.")
      }, 1000)
  
      setTimeout(() => {
        addBotMessage("**✅ Application Submitted!**\n\nYou will get your **Business Registration Number** after approval (within 2–3 days).\n\nWe'll notify you once it's done.")
      }, 2000)
  
      // Mark SSM step as completed
      setCompletedSteps(prev => new Set([...prev, 'ssm-registration']))
  
      // Return to onboarding checklist instead of going to payment setup
      setTimeout(() => {
        showOnboardingChecklist()
      }, 3000)
    } else {
      // Step 3: If user cancels, return a message and do not proceed
      addUserMessage("❌ Application Canceled")
      setTimeout(() => {
        addBotMessage("No worries! Let me know if you'd like to apply later.")
      }, 1000)
    }
  }

  const handleBankAccountSetup = () => {
    addUserMessage("Open business bank account")
    
    setTimeout(() => {
      addBotMessage("**Let's set up your business bank account!** 🏦\n\nChoose your preferred bank for your business account:", [
        {
          id: 'cimb',
          text: 'CIMB Bank',
          action: () => handleBankSelection('CIMB', 'account')
        },
        {
          id: 'maybank',
          text: 'Maybank',
          action: () => handleBankSelection('Maybank', 'account')
        },
        {
          id: 'rhb',
          text: 'RHB Bank',
          action: () => handleBankSelection('RHB Bank', 'account')
        },
        {
          id: 'public-bank',
          text: 'Public Bank',
          action: () => handleBankSelection('Public Bank', 'account')
        },
        {
          id: 'hong-leong',
          text: 'Hong Leong Bank',
          action: () => handleBankSelection('Hong Leong Bank', 'account')
        }
      ])
    }, 1000)
  }

  const showPaymentSetup = () => {
    addUserMessage("Set up digital payment")
    
    setTimeout(() => {
      addBotMessage("**Let's activate your payment channels!** 💳\n\nChoose one or more payment methods to accept customer payments:", [], 'payment-setup')
    }, 1000)
  }

  const handlePaymentSelection = (payment: string) => {
    // Map payment IDs to proper display names
    const paymentNames = {
      'duitnow-qr': 'DuitNow QR',
      'boost-grabpay': 'Boost / GrabPay',
      'fpx': 'FPX',
      'payment-gateway': 'Payment Gateway'
    }
    
    const displayName = paymentNames[payment as keyof typeof paymentNames] || payment
    addUserMessage(`Activate ${displayName}`)
    
    // Show consent modal instead of direct text
    setPendingPayment(payment)
    setShowConsentModal(true)
  }

  const handleConsentAgreed = () => {
    setTimeout(() => {
      addBotMessage("**✅ Setup Complete!**\n\nYour **DuitNow QR is processing** and will be ready in **3–5 days**.\n\nYou'll receive a notification when it's activated.")
    }, 1000)
    
    // Mark payment step as completed
    setCompletedSteps(prev => new Set([...prev, 'payments']))
    
    setTimeout(() => {
      showOnboardingCompletion()
    }, 2000)
  }

  const handleBankSelection = (bank: string, context: 'account' | 'payment' = 'account') => {
    addUserMessage(bank)
    
    if (context === 'account') {
      // Bank account setup flow
      setTimeout(() => {
        addBotMessage(`**Great choice!** ${bank} is a reliable bank for business accounts.\n\nWe'll help you set up your business account with ${bank}.\n\nYou'll receive account details within 1-2 business days.`)
      }, 1000)
      
      setTimeout(() => {
        addBotMessage("**✅ Bank Account Setup Complete!**\n\nYour business bank account application has been submitted successfully.")
      }, 2000)
      
      // Mark bank account step as completed
      setCompletedSteps(prev => new Set([...prev, 'bank-account']))
      
      // Return to onboarding checklist
      setTimeout(() => {
        showOnboardingChecklist()
      }, 3000)
    } else {
      // Payment setup flow
      setTimeout(() => {
        addBotMessage("**Consent Required** 📋\n\nWe need your consent to share your SSM details with **" + bank + "** for merchant QR setup.\n\nThis will enable you to accept QR payments from customers.")
      }, 1000)
      
      setTimeout(() => {
        addBotMessage("**✅ Setup Complete!**\n\nYour **DuitNow QR is processing** and will be ready in **3–5 days**.\n\nYou'll receive a notification when it's activated.")
      }, 2000)
      
      setTimeout(() => {
        showOnboardingCompletion()
      }, 3000)
    }
  }

  const showOnboardingCompletion = () => {
    setTimeout(() => {
      addBotMessage("**🎉 Onboarding Successful!**\n\n**Congratulations!** Your business setup is now complete.\n\nYou can now:\n\n• Access your business dashboard\n\n• Track sales and customers\n\n• Apply for funding\n\n• Use digital payment tools\n\n\n\n**Ready to start your business journey?**")
    }, 1000)
    
    setTimeout(() => {
      addBotMessage("**Continue to your Dashboard**", [
        {
          id: 'go-home',
          text: "Continue to Dashboard",
          icon: <ArrowRight className="w-4 h-4" />,
          action: () => {
            setTimeout(() => {
              router.push('/home')
            }, 1000)
          }
        }
      ], 'completion')
    }, 2000)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && selectedFiles.length === 0) return

    addUserMessage(inputMessage, selectedFiles.length > 0 ? [...selectedFiles] : undefined)
    
    // Check if user uploaded files after MyKad request
    if (selectedFiles.length > 0 && userData.journey === 'just-starting') {
      showBasicInfoForm()
    }
    
    setInputMessage('')
    setSelectedFiles([])
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'options':
        return (
          <div>
            {message.text && (
              <div className="text-sm leading-relaxed mb-3 [&>ul]:space-y-1 [&>ul>li]:block">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
            <div className="space-y-2">
              {message.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={option.action}
                  className="w-full text-left p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:border-blue-300 transition-all duration-200 flex items-center space-x-3"
                >
                  {option.icon && <span>{option.icon}</span>}
                  <span className="text-sm text-gray-700">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )
      
      case 'form':
        return (
          <div className="mt-3">
            {message.text && (
                <div className="text-sm leading-relaxed mb-4 ml-2">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
            )}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4">
              <div className="space-y-4">
                
                {/* Pre-filled fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Pak Mat"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-filled from MyKad</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IC Number
                    </label>
                    <input
                      type="text"
                      defaultValue="850122074553"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-filled from MyKad</p>
                  </div>
                </div>

                {/* Editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your business name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full h-11 border border-gray-300 rounded-lg px-3 pr-8 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition">
                    <option value="">Select business type</option>
                    <option value="sole-proprietor">Sole Proprietor</option>
                    <option value="partnership">Partnership</option>
                    <option value="sdn-bhd">Sdn. Bhd. (Private Limited)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    placeholder="Describe your business activities"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Enter your business address"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => showOnboardingChecklist()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Continue to Next Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'completion':
        return (
          <div className="space-y-3 mt-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Onboarding Complete!</span>
              </div>
              <p className="text-sm text-green-700">
                Your business setup is now complete. You can now access all features in your dashboard.
              </p>
            </div>
            {message.options?.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="w-full text-left p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-3 font-medium"
              >
                {option.icon && <span>{option.icon}</span>}
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        )
      
        case 'checklist':
            return (
              <div>
                {message.text && (
                  <div className="text-sm leading-relaxed mb-4">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                )}
                <div className="space-y-4 mt-3 w-full">
                  {[
                    {
                      id: 'ssm-registration',
                      title: 'Step 1',
                      description: 'Apply for SSM registration',
                      buttonText: completedSteps.has('ssm-registration') ? 'Done' : 'Start Now',
                      completed: completedSteps.has('ssm-registration'),
                      action: completedSteps.has('ssm-registration') ? undefined : () => handleSSMApplication()
                    },
                    {
                      id: 'bank-account',
                      title: 'Step 2',
                      description: 'Open a business bank account',
                      buttonText: completedSteps.has('bank-account') ? 'Done' : 'Start Now',
                      completed: completedSteps.has('bank-account'),
                      action: completedSteps.has('bank-account') ? undefined : () => handleBankAccountSetup()
                    },
                    {
                      id: 'payments',
                      title: 'Step 3',
                      description: 'Set up digital payment',
                      buttonText: completedSteps.has('payments') ? 'Done' : 'Start Now',
                      completed: completedSteps.has('payments'),
                      action: completedSteps.has('payments') ? undefined : () => showPaymentSetup()
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200"
                    >
                      <div className="flex flex-col mb-2 sm:mb-0">
                        <span className="text-base font-semibold text-gray-800">{item.title}</span>
                        <span className="text-sm text-gray-600">{item.description}</span>
                      </div>
                      {item.action ? (
                        <button
                          onClick={item.action}
                          className="ml-6 px-6 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors w-fit"
                        >
                          {item.buttonText}
                        </button>
                      ) : (
                        <div className="ml-6 px-6 py-2 bg-green-100 text-green-700 text-sm rounded-md w-fit font-medium">
                          {item.buttonText}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
        );
          
      
      case 'payment-setup':
        return (
          <div>
            {message.text && (
              <div className="text-sm leading-relaxed mb-4">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {[
                {
                  id: 'duitnow-qr',
                  name: 'DuitNow QR', 
                  description: 'Accept QR payments instantly',
                  icon: <QrCode className="w-6 h-6" />,
                  buttonText: 'Activate',
                  action: () => handlePaymentSelection('duitnow-qr')
                },
                {
                  id: 'boost-grabpay',
                  name: 'Boost / GrabPay',
                  description: 'Mobile payment solutions',
                  icon: <CreditCard className="w-6 h-6" />,
                  buttonText: 'Apply',
                  action: () => handlePaymentSelection('boost-grabpay')
                },
                {
                  id: 'fpx',
                  name: 'FPX',
                  description: 'Online banking transfers',
                  icon: <Banknote className="w-6 h-6" />,
                  buttonText: 'Setup',
                  action: () => handlePaymentSelection('fpx')
                },
                {
                  id: 'payment-gateway',
                  name: 'Payment Gateway',
                  description: 'Advanced payment processing',
                  icon: <Globe className="w-6 h-6" />,
                  buttonText: 'Explore',
                  action: () => handlePaymentSelection('payment-gateway')
                }
              ].map((option) => (
                <div key={option.id} className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-blue-600">{option.icon}</span>
                    <h4 className="font-medium text-gray-800">{option.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <button
                    onClick={option.action}
                    className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {option.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            <div className="text-sm leading-relaxed">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
            
            {/* File attachments */}
            {message.files && message.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-white/20'
                        : 'bg-gray-50'
                    }`}
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs truncate">{file.name}</span>
                    <span className="text-xs opacity-70">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <GradientBackground />
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 relative z-10 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-200'
                  }`}
                >
                  {renderMessageContent(message)}
                  
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Typing...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consent Required</h3>
              <p className="text-sm text-gray-600 mb-6">
                We need your consent to share your SSM details for merchant QR setup. This will enable you to accept QR payments from customers.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowConsentModal(false)
                    setPendingPayment('')
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    setShowConsentModal(false)
                    handleConsentAgreed()
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agree & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Input Bar - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-4 z-50">
        <div className="max-w-4xl mx-auto">
          {/* File Preview */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200"
                  >
                    <Paperclip className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700 truncate max-w-32">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({formatFileSize(file.size)})
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Attach file"
              >
                <Upload className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && selectedFiles.length === 0) || isLoading}
                className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}