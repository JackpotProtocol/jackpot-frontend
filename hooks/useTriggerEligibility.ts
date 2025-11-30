// hooks/useTriggerEligibility.ts
'use client'
import { PublicKey, Connection } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { JACKPOT_PROTOCOL_ADDRESSES } from '../config/addresses'

interface TriggerEligibility {
  canTrigger: boolean
  nextTriggerTime: Date | null
  timeUntilTrigger: string
  isWithinTriggerWindow: boolean
}

export function useTriggerEligibility(poolType: 'weekly' | 'monthly') {
  const [eligibility, setEligibility] = useState<TriggerEligibility>({
    canTrigger: false,
    nextTriggerTime: null,
    timeUntilTrigger: '',
    isWithinTriggerWindow: false
  })

  useEffect(() => {
    const calculateEligibility = () => {
      const now = new Date()
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      
      // 计算下一次开奖时间（周五 UTC 12:00）
      let nextDrawTime: Date
      if (poolType === 'weekly') {
        // 每周五 UTC 12:00
        nextDrawTime = new Date(utcNow)
        const daysUntilFriday = (5 - nextDrawTime.getDay() + 7) % 7
        nextDrawTime.setDate(nextDrawTime.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday))
        nextDrawTime.setHours(12, 0, 0, 0)
      } else {
        // 每月最后一个周五 UTC 12:00
        const nextMonth = new Date(utcNow)
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        nextMonth.setDate(0)
        
        let lastFriday = new Date(nextMonth)
        while (lastFriday.getDay() !== 5) {
          lastFriday.setDate(lastFriday.getDate() - 1)
        }
        lastFriday.setHours(12, 0, 0, 0)
        nextDrawTime = lastFriday
      }

      // 触发窗口：开奖时间到开奖时间+1小时
      const triggerWindowStart = new Date(nextDrawTime)
      const triggerWindowEnd = new Date(nextDrawTime.getTime() + 60 * 60 * 1000) // +1小时

      const isWithinTriggerWindow = now >= triggerWindowStart && now <= triggerWindowEnd
      const timeUntilTrigger = now < triggerWindowStart 
        ? getTimeUntil(triggerWindowStart)
        : getTimeUntil(triggerWindowEnd)

      setEligibility({
        canTrigger: isWithinTriggerWindow,
        nextTriggerTime: nextDrawTime,
        timeUntilTrigger,
        isWithinTriggerWindow
      })
    }

    // 立即计算一次
    calculateEligibility()

    // 每秒更新一次倒计时
    const interval = setInterval(calculateEligibility, 1000)
    return () => clearInterval(interval)
  }, [poolType])

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
