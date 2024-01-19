import { Drink } from './DrinksApi'

interface User {
  name: string
  password: string
  email: string
  birthday: string
}

export class UsersApi {
  constructor(private baseUrl: string, private authToken?: string) {}

  async createUser(
    user: User
  ): Promise<{ user: { email: string; id: number } }> {
    const url = `${this.baseUrl}/users`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(user),
    }

    try {
      const response = await this.fetchJson(url, options)
      return response
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      throw error
    }
  }

  async getLikedDrinks(): Promise<Drink[]> {
    const url = `${this.baseUrl}/users/liked-drinks`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${this.authToken}`,
      },
    }

    try {
      const response = await this.fetchJson(url, options)
      return response
    } catch (error) {
      console.error('Erro ao obter bebidas favoritadas:', error)
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
