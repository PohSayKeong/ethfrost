export async function callAPI({
    url,
    method,
    body,
    headers
  }: {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    headers?: Record<string, string>
  }) {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })
  
    if (!response.ok) {
      const data = await response.json()
      throw new Error(`HTTP error! status: ${data.message}`)
    }
  
    const data = await response.json()
  
    return data
  }

  export async function getSite() {
    return callAPI({
      url: `https://api.bifrost.app/api/site`,
      method: 'GET'
    })
  }

  export async function getPrices() {
    return callAPI({
      url: `https://api.bifrost.app/api/dapp/prices`,
      method: 'GET'
    })
  }