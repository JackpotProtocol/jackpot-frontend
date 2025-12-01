export const JACKPOT_API = {
    BASE_URL: 'http://13.159.31.92:3002',
    
    ENDPOINTS: {
        HEALTH: '/health',
        CONTRACTS: '/api/contracts',
        STATUS: '/api/status',
        LATEST_SNAPSHOT: '/api/snapshot/latest'
    }
}

export async function fetchJackpotAPI(endpoint: string) {
    const url = `${JACKPOT_API.BASE_URL}${endpoint}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('API请求失败')
    return response.json()
}
