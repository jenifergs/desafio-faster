export class AuthApi {
  constructor(private baseUrl: string) {}

  async login(email: string, password: string): Promise<string> {
    const url = `${this.baseUrl}/auth/login`
    const headers = this.getDefaultHeaders()

    const requestBody = {
      email,
      password,
    }

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    }

    try {
      const response = await this.fetchJson(url, options)
      return response.token
    } catch (error) {
      console.error('Erro ao realizar login:', error)
      throw error
    }
  }

  private getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
    }
  }

  private async fetchJson(url: string, options: RequestInit): Promise<any> {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`)
    }

    return response.json()
  }
}
