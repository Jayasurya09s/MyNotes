import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export default ratelimit
