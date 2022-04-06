import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class YotpoClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://api.yotpo.com', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        'Proxy-Authorization': context.authToken,
      },
    })
  }

  public async getToken(clientId: string, body: any): Promise<string> {
    return this.http.post(`/core/v3/stores/${clientId}/access_tokens`, body)
  }

  public async postOrderInfo(
    token: string,
    clientId: string,
    body: any
  ): Promise<string> {
    return this.http.post(
      `/core/v3/stores/${clientId}/register_purchase`,
      body,
      {
        headers: { 'X-Yotpo-Token': token },
      }
    )
  }

  public async postProductInfo(
    token: string,
    clientId: string,
    body: {
      external_id: string
      name: string
      url: string
    }
  ): Promise<string> {
    return this.http.post(`/core/v3/stores/${clientId}/products`, body, {
      headers: { 'X-Yotpo-Token': token },
    })
  }
}
