export interface Drink {
  categoryId: number
  categoryName: string
  description: string
  id: number
  name: string
  price: number
  imageUrl: string
  isLiked: boolean
}

export class DrinksApi {
  private baseUrl: string
  private authToken: string

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl
    this.authToken = authToken
  }

  private getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    }
  }

  private async fetchJson(url: string, options: RequestInit): Promise<any> {
    const response = await fetch(url, options)
    if (
      !(
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      )
    ) {
      throw new Error(`Erro na solicitação: ${response.statusText}`)
    }

    if (response.status === 204) {
      return
    }

    return response.json()
  }

  public async getDrinks(): Promise<Drink[]> {
    const url = `${this.baseUrl}/drinks`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers,
    }

    try {
      const drinks: Drink[] = await this.fetchJson(url, options)
      return drinks
    } catch (error) {
      console.error('Erro ao obter bebidas:', error)
      throw error
    }
  }

  public async searchDrinks(name: string): Promise<Drink[]> {
    const url = `${this.baseUrl}/drinks/search?name=${encodeURIComponent(name)}`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers,
    }

    try {
      const drinks: Drink[] = await this.fetchJson(url, options)
      return drinks
    } catch (error) {
      console.error(`Erro ao buscar bebidas com o nome '${name}':`, error)
      throw error
    }
  }

  public async searchDrinksInCategory(
    categoryId: number,
    name: string
  ): Promise<Drink[]> {
    const url = `${
      this.baseUrl
    }/drinks/categories/${categoryId}/search?name=${encodeURIComponent(name)}`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers,
    }

    try {
      const drinks: Drink[] = await this.fetchJson(url, options)
      return drinks
    } catch (error) {
      console.error(
        `Erro ao buscar bebidas na categoria ${categoryId} com o nome '${name}':`,
        error
      )
      throw error
    }
  }

  public async getDrinksInCategory(categoryId: number): Promise<Drink[]> {
    const url = `${this.baseUrl}/drinks/categories/${categoryId}`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'GET',
      headers,
    }

    try {
      const drinks: Drink[] = await this.fetchJson(url, options)
      return drinks
    } catch (error) {
      console.error(`Erro ao obter bebidas na categoria ${categoryId}:`, error)
      throw error
    }
  }

  public async toggleLikeDrink(drinkId: number): Promise<void> {
    const url = `${this.baseUrl}/drinks/${drinkId}/like`
    const headers = this.getDefaultHeaders()

    const options: RequestInit = {
      method: 'PATCH',
      headers,
    }

    try {
      await this.fetchJson(url, options)
    } catch (error) {
      console.error(`Erro ao favoritar/desfavoritar bebida ${drinkId}:`, error)
      throw error
    }
  }
}
