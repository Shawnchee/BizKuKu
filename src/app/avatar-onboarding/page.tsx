'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Upload, Paperclip, X, Bot, CheckCircle, Circle, ArrowRight, CreditCard, Building, Globe, FileText, Banknote, QrCode, Mic } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import GradientBackground from "@/components/backgrounds/GradientBackground"
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import AzureAvatar from '@/components/avatar/AzureAvatar'
import { useAzureAvatarEnhanced } from '@/hooks/useAzureAvatarEnhanced'

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

export default function AvatarOnboarding() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>({})
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [pendingPayment, setPendingPayment] = useState<string>('')
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false)
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'pending' | 'unknown'>('unknown')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const welcomeTriggeredRef = useRef(false) // Add ref to prevent multiple triggers

  // Enhanced Azure Avatar integration
  const {
    isListening,
    isSpeaking,
    avatarReady,
    error: avatarError,
    isProcessing,
    speakText,
    processTextInput,
    startListening,
    stopSpeaking,
    stopListening,
    clearError,
    handleSpeechRecognized,
    handleSpeechStart,
    handleSpeechEnd,
    handleAvatarReady,
    handleAvatarError
  } = useAzureAvatarEnhanced({
    onSpeechRecognized: (text) => {
      // Ensure text is a string and has content
      const speechText = typeof text === 'string' ? text.trim() : ''
      if (speechText) {
        setInputMessage(speechText)
        // Auto-process speech with context
        handleSendMessage(speechText, true)
      }
    },
    onError: (error) => {
      console.error('Avatar error:', error)
    },
    autoProcessSpeech: true,
    chatEndpoint: '/api/chatbot'
  })

  useEffect(() => {
    setIsAvatarSpeaking(isSpeaking)
  }, [isSpeaking])

  // Request microphone permission and initialize audio on component mount
  useEffect(() => {
    const initializeAudio = async () => {
      setMicrophonePermission('pending');
      try {
        console.log('Requesting microphone permission...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        setMicrophonePermission('granted');
        
        // Test audio playback
        if ('speechSynthesis' in window) {
          const testUtterance = new SpeechSynthesisUtterance("Audio test");
          testUtterance.volume = 0.1; // Very quiet test
          speechSynthesis.speak(testUtterance);
          console.log('🔊 Audio playback test initiated');
        }
        
        stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      } catch (error) {
        console.error('Microphone permission denied:', error);
        setMicrophonePermission('denied');
      }
    };

    initializeAudio();
  }, []);



  // Add this function to handle stopping the avatar from speaking
  const handleStopSpeaking = async () => {
    try {
      console.log('Stopping avatar speech...');
      await stopSpeaking();
      setIsAvatarSpeaking(false);
      
      // Clear any pending speech and allow user interaction
      setInputMessage(''); // Clear any pending input
      console.log('Avatar speech stopped - user can now interact');
    } catch (error) {
      console.error('Error stopping speech:', error);
      setIsAvatarSpeaking(false);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Track if welcome message has been shown and spoken messages
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [welcomeTriggered, setWelcomeTriggered] = useState(false);
  const [spokenMessageIds, setSpokenMessageIds] = useState<Set<string>>(new Set());

  // Debug effect to track avatar ready state
  useEffect(() => {
    console.log('🎭 Avatar ready state changed:', { 
      avatarReady, 
      isAvatarSpeaking, 
      messagesLength: messages.length,
      welcomeShown,
      welcomeTriggered
    })
  }, [avatarReady, isAvatarSpeaking, messages.length, welcomeShown, welcomeTriggered]);

  // Single effect to handle avatar becoming ready and speak any pending messages
  useEffect(() => {
    if (avatarReady && messages.length > 0 && !isAvatarSpeaking) {
      // Find the last unspoken bot message
      const lastUnspokenMessage = messages
        .filter(msg => msg.sender === 'bot' && msg.text && !spokenMessageIds.has(msg.id))
        .pop();
      
      if (lastUnspokenMessage && lastUnspokenMessage.text) {
        // Mark this message as spoken to prevent repetition
        setSpokenMessageIds(prev => new Set([...prev, lastUnspokenMessage.id]));
        
        // Speak immediately with minimal delay for better responsiveness
        setTimeout(() => {
          if (avatarReady && !isAvatarSpeaking) {
            const cleanText = lastUnspokenMessage.text.replace(/\*\*/g, '').replace(/\n/g, ' ');
            console.log(`🗣️ Speaking pending unspoken message (type: ${lastUnspokenMessage.type}):`, cleanText);
            speakText(cleanText);
          }
        }, 100); // Reduced from 200ms to 100ms for faster response
      }
    }
  }, [avatarReady, messages, isAvatarSpeaking, speakText, spokenMessageIds]);

  // Add a listener for when avatar finishes speaking to trigger next message
  useEffect(() => {
    if (!isAvatarSpeaking && avatarReady && messages.length > 0) {
      // Check if there are any unspoken messages when avatar stops speaking
      const unspokenMessages = messages.filter(msg => 
        msg.sender === 'bot' && 
        msg.text && 
        !spokenMessageIds.has(msg.id)
      );
      
      if (unspokenMessages.length > 0) {
        console.log(`Avatar finished speaking, found ${unspokenMessages.length} unspoken messages`);
        // The main useEffect will handle speaking the next message
      }
    }
  }, [isAvatarSpeaking, avatarReady, messages, spokenMessageIds]);

  // Effect to trigger initial welcome when avatar becomes ready
  useEffect(() => {
    if (avatarReady && messages.length === 0 && !welcomeShown && !welcomeTriggered && !welcomeTriggeredRef.current) {
      console.log('Avatar ready and no messages - triggering welcome');
      setWelcomeTriggered(true);
      welcomeTriggeredRef.current = true;
      
      // Add a delay to ensure avatar is fully initialized
      setTimeout(() => {
        if (avatarReady && messages.length === 0 && !welcomeShown) {
          // Double-check to prevent duplicate welcome messages
          const existingWelcome = messages.some(msg => 
            msg.text.includes("Hi there! I'm your **personal MSME onboarding assistant**")
          );
          
          if (existingWelcome) {
            console.log('Welcome message already exists, skipping');
            setWelcomeShown(true);
            return;
          }
          const welcomeMessage = "Hi there! I'm your **personal MSME onboarding assistant**.\n\nWhere are you in your business journey?";
          // Add message directly to avoid dependency issues
          const newMessage: Message = {
            id: Date.now().toString(),
            text: welcomeMessage,
            sender: 'bot',
            type: 'options',
            options: [
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
            ]
          }
          setMessages(prev => [...prev, newMessage]);
          setWelcomeShown(true);
          
          // Mark welcome message as spoken to prevent repetition
          setSpokenMessageIds(prev => new Set([...prev, newMessage.id]));
          
          // Speak the welcome message with a longer delay to ensure avatar is ready
          setTimeout(() => {
            if (avatarReady && !isAvatarSpeaking) {
              console.log('Speaking welcome message...');
              const cleanText = welcomeMessage.replace(/\*\*/g, '').replace(/\n/g, ' ');
              speakText(cleanText);
            }
          }, 500);
        }
      }, 500);
    }
  }, [avatarReady, messages.length, welcomeShown, speakText, isAvatarSpeaking]);

  const addBotMessage = (text: string, options?: ChatOption[], type?: 'text' | 'options' | 'form' | 'checklist' | 'payment-setup' | 'completion') => {
    // Check if this exact message already exists to prevent duplicates
    // But allow checklist messages to be added multiple times since they should appear after each step
    const messageExists = messages.some(msg => 
      msg.text === text && 
      msg.sender === 'bot' && 
      msg.type !== 'checklist' // Allow checklist messages to be added multiple times
    );
    
    if (messageExists) {
      console.log('⚠️ Message already exists, skipping duplicate:', text.substring(0, 50) + '...');
      return;
    }
    
    // Special check for welcome message to prevent duplicates
    if (text.includes("Hi there! I'm your **personal MSME onboarding assistant**")) {
      const welcomeExists = messages.some(msg => 
        msg.text.includes("Hi there! I'm your **personal MSME onboarding assistant**")
      );
      if (welcomeExists) {
        console.log('Welcome message already exists, skipping duplicate');
        return;
      }
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      options,
      type: type || (options ? 'options' : 'text')
    }
    
    console.log('Adding new bot message:', {
      type: newMessage.type,
      text: text.substring(0, 50) + '...',
      id: newMessage.id
    });
    
    setMessages(prev => [...prev, newMessage])
    
    // The speaking will be handled by the main useEffect that watches for new messages
    // This prevents duplicate speaking and ensures proper sequencing
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
    // Add the journey options message immediately without waiting
    console.log('🗣️ Adding journey options message');
    const journeyMessage = "**Where are you in your business journey?**";
    addBotMessage(journeyMessage, [
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
    ], 'options')
  }

  const handleJourneySelection = (journey: string) => {
    addUserMessage(journey === 'just-starting' ? "I'm just starting" : 
                  journey === 'have-ssm' ? "I already have an SSM number" :
                  journey === 'operating-offline' ? "I'm already operating but not online" :
                  "I'm fully digital and want to grow more")
    
    setUserData((prev: any) => ({ ...prev, journey }))
    
    if (journey === 'just-starting') {
      setTimeout(() => {
        const firstStepMessage = "**Great! You're taking your first step.**\n\nPlease upload your **MyKad** for registration.";
        addBotMessage(firstStepMessage);
      }, 500)
    }
  }

  const showBasicInfoForm = () => {
    setTimeout(() => {
      const formMessage = "**MyKad uploaded successfully!**\n\n**Please complete your personal and business information:**";
      addBotMessage(formMessage, [], 'form');
    }, 500)
  }

  const showOnboardingChecklist = () => {
    console.log('Showing onboarding checklist, completed steps:', completedSteps.size);
    setTimeout(() => {
      const hasCompletedSteps = completedSteps.size > 0
      const message = hasCompletedSteps 
        ? "Let us proceed with the onboarding checklist:"
        : "Awesome! Now, let me guide you through each step to get your business fully set up. \n\n**Here's your onboarding checklist:**"
      
      console.log('Adding checklist message:', message.substring(0, 50) + '...');
      addBotMessage(message, [], 'checklist');
    }, 200) // Reduced from 500ms to 200ms for faster response
  }

  const handleSSMApplication = () => {  
    addUserMessage("Start SSM Application")
    
    // Step 1: Ask for confirmation before proceeding - reduced delay
    setTimeout(() => {
      const confirmMessage = "Before we proceed, let's confirm: \n\n**Are you ready to apply for SSM registration?** \n\n\n\nThis will allow you to:\n\n• Legally operate your business\n\n• Open a business bank account\n\n• Apply for loans and grants";
      addBotMessage(confirmMessage, [
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
      ]);
    }, 500) // Reduced from 1000ms to 500ms
  }
  
  const handleSSMConfirmation = (response: string) => {
    if (response === "confirm") {
      // Step 2: Proceed with the application submission after confirmation
      addUserMessage("✔️ Confirmed")
  
      setTimeout(() => {
        const progressMessage = "**SSM Registration in Progress** \n\nWe're submitting your application now. You'll receive updates on the status.";
        addBotMessage(progressMessage);
      }, 1000)
  
      setTimeout(() => {
        const submittedMessage = "**Application Submitted!**\n\nYou will get your **Business Registration Number** after approval (within 2–3 days).\n\nWe'll notify you once it's done.";
        addBotMessage(submittedMessage);
        
        // Mark SSM step as completed immediately
        setCompletedSteps(prev => {
          const newSet = new Set([...prev, 'ssm-registration'])
          console.log('SSM step marked as completed, total completed steps:', newSet.size)
          return newSet
        })
        
        // Show checklist immediately after submission message
        setTimeout(() => {
          console.log('Showing checklist after SSM submission');
          const hasCompletedSteps = true // We just completed SSM
          const message = "Let us proceed with the onboarding checklist:"
          console.log('Adding checklist message:', message)
          addBotMessage(message, [], 'checklist')
        }, 1000) // Short delay to ensure submission message is processed
        
      }, 2000)
    } else {
      // Step 3: If user cancels, return a message and do not proceed
      addUserMessage("Application Canceled")
      setTimeout(() => {
        const cancelMessage = "No worries! Let me know if you'd like to apply later.";
        addBotMessage(cancelMessage);
      }, 500)
    }
  }

  const handleBankAccountSetup = () => {
    addUserMessage("Open business bank account")
    
    setTimeout(() => {
      const bankMessage = "**Let's set up your business bank account!** 🏦\n\nChoose your preferred bank for your business account:";
      addBotMessage(bankMessage, [
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
      ]);
    }, 1000)
  }

  const showPaymentSetup = () => {
    addUserMessage("Set up digital payment")
    
    setTimeout(() => {
      const paymentMessage = "**Let's activate your payment channels!** \n\nChoose one or more payment methods to accept customer payments:";
      addBotMessage(paymentMessage, [], 'payment-setup');
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
      const completeMessage = "**Setup Complete!**\n\nYour **DuitNow QR is processing** and will be ready in **3–5 days**.\n\nYou'll receive a notification when it's activated.";
      addBotMessage(completeMessage);
      
      // Mark payment step as completed immediately after complete message
      setCompletedSteps(prev => new Set([...prev, 'payments']))
      
      setTimeout(() => {
        console.log('Showing onboarding completion after payment setup');
        showOnboardingCompletion()
      }, 3000) // Wait 3 seconds after complete message
    }, 1000)
  }

  const handleBankSelection = (bank: string, context: 'account' | 'payment' = 'account') => {
    addUserMessage(bank)
    
    if (context === 'account') {
      // Bank account setup flow
      setTimeout(() => {
        const choiceMessage = `**Great choice!** ${bank} is a reliable bank for business accounts.\n\nWe'll help you set up your business account with ${bank}.\n\nYou'll receive account details within 1-2 business days.`;
        addBotMessage(choiceMessage);
      }, 1000)
      
      setTimeout(() => {
        const setupMessage = "**Bank Account Setup Complete!**\n\nYour business bank account application has been submitted successfully.";
        addBotMessage(setupMessage);
        
        // Mark bank account step as completed immediately
        setCompletedSteps(prev => {
          const newSet = new Set([...prev, 'bank-account'])
          console.log('Bank account step marked as completed, total completed steps:', newSet.size)
          return newSet
        })
        
        // Show checklist immediately after setup message with backup
        setTimeout(() => {
          console.log('Showing checklist after bank account setup');
          const message = "Let us proceed with the onboarding checklist:"
          console.log('Adding checklist message:', message)
          addBotMessage(message, [], 'checklist')
          
          // Backup timer to ensure checklist appears
          setTimeout(() => {
            console.log('Backup: Checking if checklist appeared after bank setup');
            const hasChecklistMessage = messages.some(msg => 
              msg.sender === 'bot' && 
              msg.text && 
              (msg.text.includes('onboarding checklist') || msg.text.includes('Here\'s your onboarding checklist'))
            );
            
            if (!hasChecklistMessage) {
              console.log('Backup: Checklist not found after bank setup, showing it now');
              addBotMessage("Let us proceed with the onboarding checklist:", [], 'checklist')
            }
          }, 2000) // Backup after 2 seconds
        }, 1000) // Short delay to ensure setup message is processed
      }, 3000)
    } else {
      // Payment setup flow
      setTimeout(() => {
        const consentMessage = "**Consent Required** \n\nWe need your consent to share your SSM details with **" + bank + "** for merchant QR setup.\n\nThis will enable you to accept QR payments from customers.";
        addBotMessage(consentMessage);
      }, 1000)
      
      setTimeout(() => {
        const completeMessage = "**Setup Complete!**\n\nYour **DuitNow QR is processing** and will be ready in **3–5 days**.\n\nYou'll receive a notification when it's activated.";
        addBotMessage(completeMessage);
        
        setTimeout(() => {
          console.log('Showing onboarding completion after bank payment setup');
          showOnboardingCompletion()
        }, 3000) // Wait 3 seconds after complete message
      }, 3000) // Increased delay to ensure proper sequencing
    }
  }

  const showOnboardingCompletion = () => {
    setTimeout(() => {
      const successMessage = "**Onboarding Successful!**\n\n**Congratulations!** Your business setup is now complete.\n\nYou can now:\n\n• Access your business dashboard\n\n• Track sales and customers\n\n• Apply for funding\n\n• Use digital payment tools\n\n\n\n**Ready to start your business journey?**";
      addBotMessage(successMessage);
    }, 1000)
    
    setTimeout(() => {
      const continueMessage = "**Continue to your Dashboard**";
      addBotMessage(continueMessage, [
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
      ], 'completion');
    }, 2000)
  }

  const handleSendMessage = async (messageText?: string, autoSubmit = false) => {
    // Ensure we always work with strings
    const textToSend = String(messageText || inputMessage || '').trim()
    if (!textToSend && selectedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    
    // Check if user uploaded files after MyKad request - maintain existing onboarding flow
    if (selectedFiles.length > 0 && userData.journey === 'just-starting') {
      setInputMessage('')
      setSelectedFiles([])
      showBasicInfoForm()
      return
    }
    
    // Clear input if it's not from speech recognition (autoSubmit = false)
    if (!autoSubmit) {
      setInputMessage('') 
    }
    setSelectedFiles([])
    setIsLoading(true)

    try {
      // Replace with your actual API endpoint
      const API_URL = 'http://localhost:8000/api/onboarding-chat'
      
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: userMessage.text,
          message_history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: msg.text
          })),
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || `I received your message: "${userMessage.text}"${selectedFiles.length > 0 ? ` and ${selectedFiles.length} file(s)` : ''}. This is a demo response.`,
        sender: 'bot'
      }

      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      console.error(err);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}"${selectedFiles.length > 0 ? ` and ${selectedFiles.length} file(s)` : ''}. This is a demo response.`,
        sender: 'bot'
      }
      
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
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
                      buttonText: completedSteps.has('ssm-registration') ? 'Processing' : 'Start Now',
                      completed: completedSteps.has('ssm-registration'),
                      action: completedSteps.has('ssm-registration') ? undefined : () => handleSSMApplication()
                    },
                    {
                      id: 'bank-account',
                      title: 'Step 2',
                      description: 'Open a business bank account',
                      buttonText: completedSteps.has('bank-account') ? 'Processing' : 'Start Now',
                      completed: completedSteps.has('bank-account'),
                      action: completedSteps.has('bank-account') ? undefined : () => handleBankAccountSetup()
                    },
                    {
                      id: 'payments',
                      title: 'Step 3',
                      description: 'Set up digital payment',
                      buttonText: completedSteps.has('payments') ? 'Processing' : 'Start Now',
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
                        <div className="ml-6 px-5 py-2 bg-gray-400 text-white text-sm rounded-md w-fit font-medium">
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
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      {/* Skip Onboarding Button - Top Left */}
      <div className="absolute top-6 left-16 z-20">
        <button
          onClick={() => router.push('/home')}
          className="bg-white/30 backdrop-blur-md text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white/50 transition-colors"
        >
          Skip Onboarding
        </button>
      </div>
      
      <div className="relative z-10 flex h-screen">
        {/* Left Side - Avatar Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-xl md:text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              MSME Onboarding Assistant
            </span>
          </h2>
          {/* Avatar Container */}
          <div className="relative mb-8">
            <AzureAvatar
              onSpeechRecognized={handleSpeechRecognized}
              onSpeechStart={handleSpeechStart}
              onSpeechEnd={handleSpeechEnd}
              onAvatarReady={handleAvatarReady}
              onError={handleAvatarError}
              fallbackToRobot={true}
              autoStart={true}
              useNewImplementation={true}
              className="mx-auto"
            />
            
            {/* Microphone Permission Indicator */}
            {microphonePermission === 'pending' && (
              <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-700">Requesting microphone access...</span>
                </div>
              </div>
            )}
            
            {microphonePermission === 'denied' && (
              <div className="absolute top-4 right-4 bg-red-100 border border-red-300 rounded-lg px-3 py-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700">Microphone access denied</span>
                </div>
              </div>
            )}
            
            {microphonePermission === 'granted' && (
              <div className="absolute top-4 right-4 bg-green-100 border border-green-300 rounded-lg px-3 py-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700">Microphone ready</span>
                </div>
              </div>
            )}
          
            {/* Minimal Error Display */}
            {avatarError && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg max-w-sm backdrop-blur-sm bg-opacity-90">
                <p className="text-xs text-red-600 text-center">
                  {avatarError}
                </p>
                <button
                  onClick={clearError}
                  className="block mx-auto mt-2 text-xs text-red-500 hover:text-red-700 underline"
                >
                  {language === 'ms' ? 'Tutup' : 'Dismiss'}
                </button>
              </div>
            )}
          </div>
          
          {/* Avatar Status Indicator */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  avatarReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                }`}></div>
                <span className="text-xs text-gray-600">
                  {avatarReady ? 'Avatar Ready' : 'Initializing Avatar...'}
                </span>
              </div>
            </div>
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-1/2 flex flex-col px-8 py-6">
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-0">
            <div className="space-y-4">
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

          {/* Chat Input Area */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
            {/* File Preview */}
            {selectedFiles.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
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
                
                {/* Voice Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (avatarReady && !isListening && !isSpeaking && !isLoading && !isProcessing && microphonePermission === 'granted') {
                      startListening();
                    } else if (microphonePermission !== 'granted') {
                      // Request microphone permission again
                      navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(stream => {
                          setMicrophonePermission('granted');
                          stream.getTracks().forEach(track => track.stop());
                        })
                        .catch(error => {
                          console.error('Microphone permission denied:', error);
                          setMicrophonePermission('denied');
                        });
                    }
                  }}
                  disabled={!avatarReady || isListening || isLoading || isProcessing}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : avatarReady && microphonePermission === 'granted'
                      ? 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title={
                    !avatarReady
                      ? (language === 'ms' ? 'Avatar tidak siap' : 'Avatar not ready')
                      : microphonePermission !== 'granted'
                      ? (language === 'ms' ? 'Perlu kebenaran mikrofon' : 'Microphone permission needed')
                      : isListening
                      ? (language === 'ms' ? 'Mendengar...' : 'Listening...')
                      : (language === 'ms' ? 'Mesej suara' : 'Voice message')
                  }
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                {/* Add Stop Speaking Button */}
                {isAvatarSpeaking && (
                  <button
                    onClick={handleStopSpeaking}
                    className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-200 transform hover:scale-105"
                    title={language === 'ms' ? 'Hentikan bercakap' : 'Stop speaking'}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
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

      {/* CSS for avatar animation */}
      <style jsx>{`
        @keyframes avatarPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.5);
          }
        }
        
        .animate-avatar-pulse {
          animation: avatarPulse 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}