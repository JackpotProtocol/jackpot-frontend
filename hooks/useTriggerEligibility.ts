// hooks/useTriggerEligibility.ts
'use client'
import { useEffect, useState } from 'react'
import { usePoolInfo } from './usePoolInfo'

interface TriggerEligibility {
  canTrigger: boolean
  nextTriggerTime: Date | null
  timeUntilTrigger: string
  isWithinTriggerWindow: boolean
}

export function useTriggerEligibility(poolType: 'weekly' | 'monthly') {
  const { poolInfo } = usePoolInfo(poolType)
  const [eligibility, setEligibility] = useState<TriggerEligibility>({
    canTrigger: false,
    nextTriggerTime: null,
    timeUntilTrigger: '',
    isWithinTriggerWindow: false
  })

  useEffect(() => {
    const calculateEligibility = () => {
      if (!poolInfo.nextDrawTime || poolInfo.drawWindow <= 0) {
        setEligibility({
          canTrigger: false,
          nextTriggerTime: null,
          timeUntilTrigger: 'Awaiting schedule',
          isWithinTriggerWindow: false
        })
        return
      }

      const now = new Date()
      const triggerWindowStart = poolInfo.nextDrawTime
      const triggerWindowEnd = new Date(
        triggerWindowStart.getTime() + poolInfo.drawWindow * 1000
      )

      let nextTriggerTime: Date | null = triggerWindowStart
      let timeUntilTrigger = ''
      const withinWindow = now >= triggerWindowStart && now <= triggerWindowEnd
      const isWithinTriggerWindow = withinWindow && poolInfo.poolState === 'SnapshotLocked' && !poolInfo.paused

      if (withinWindow) {
        timeUntilTrigger = getTimeUntil(triggerWindowEnd)
      } else if (now < triggerWindowStart) {
        timeUntilTrigger = getTimeUntil(triggerWindowStart)
      } else if (poolInfo.drawPeriod > 0) {
        nextTriggerTime = new Date(
          triggerWindowStart.getTime() + poolInfo.drawPeriod * 1000
        )
        timeUntilTrigger = getTimeUntil(nextTriggerTime)
      } else {
        nextTriggerTime = null
        timeUntilTrigger = 'Awaiting next round'
      }

      setEligibility({
        canTrigger: isWithinTriggerWindow,
        nextTriggerTime,
        timeUntilTrigger,
        isWithinTriggerWindow
      })
    }

    // 立即计算一次
    calculateEligibility()

    // 每秒更新一次倒计时
    const interval = setInterval(calculateEligibility, 1000)
    return () => clearInterval(interval)
  }, [poolType, poolInfo.nextDrawTime, poolInfo.drawWindow, poolInfo.drawPeriod])

  return eligibility
}

function getTimeUntil(targetDate: Date): string {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  
  if (diff <= 0) return 'Now'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}
