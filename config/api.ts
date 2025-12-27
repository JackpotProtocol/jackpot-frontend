export const WALAWOW_API = {
    BASE_URL: 'https://api.walawow.fun',
    
    ENDPOINTS: {
        HEALTH: '/health',
        CONTRACTS: '/api/contracts',
        STATUS: '/api/status',
        STATS: '/api/stats',
        LATEST_SNAPSHOT: '/api/snapshot/latest',
        CLAIM_PROOF: '/api/claim',
        LATEST_WINNER: '/api/winner/latest'
    }
}

export async function fetchWalawowAPI(endpoint: string) {
    const url = `${WALAWOW_API.BASE_URL}${endpoint}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('API请求失败')
    return response.json()
}
