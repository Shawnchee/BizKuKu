'use client'

import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface TimelineEvent {
  id: string
  time: string
  icon: keyof typeof Icons
  title: string
  description: string
  audioText: string
}

interface RefinedStoryTimelineProps {
  language: string
  onAudioPlay: (text: string) => void
  events: TimelineEvent[]
}

const RefinedStoryTimeline = memo<RefinedStoryTimelineProps>(({ language, onAudioPlay, events }) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  const goNext = () => setCurrentEventIndex(i => (i + 1) % events.length)
  const goPrev = () => setCurrentEventIndex(i => (i - 1 + events.length) % events.length)

  const currentEvent = events[currentEventIndex]
  const IconComponent = Icons[currentEvent.icon] as React.ElementType

  return (
    <div className="relative w-full max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl flex items-center gap-6"
        >
          <div className="flex-shrink-0 text-6xl">
            {IconComponent && <IconComponent className="w-16 h-16 text-gray-800" />}
          </div>
          <div>
            <p className="font-bold text-gray-500">{currentEvent.time}</p>
            <h3 className="text-2xl font-bold text-gray-900">{currentEvent.title}</h3>
            <p className="text-gray-700">{currentEvent.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto rounded-full"
            onClick={() => onAudioPlay(currentEvent.audioText)}
          >
            <Icons.Volume2 className="w-6 h-6" />
          </Button>
        </motion.div>
      </AnimatePresence>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <Button onClick={goPrev} size="sm" className="rounded-full shadow-lg">
          <Icons.ChevronLeft />
        </Button>
        <Button onClick={goNext} size="sm" className="rounded-full shadow-lg">
          <Icons.ChevronRight />
        </Button>
      </div>
    </div>
  )
})

RefinedStoryTimeline.displayName = 'RefinedStoryTimeline'
export default RefinedStoryTimeline 