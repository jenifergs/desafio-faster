export interface DrinkCategory {
  id: number
  name: string
}

export class DrinksCategoriesApi {
  constructor(private baseUrl: string, private authToken: string) {}

  async getDrinkCategories(): Promise<DrinkCategory[]> {
    const url = `${this.baseUrl}/drinks-categories`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers,
    }

    try {
      const response = await this.fetchJson(url, options)
      return response
    } catch (error) {
      console.error('Erro ao obter categorias de bebidas:', error)
      throw error
    }
  }

  private getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
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
