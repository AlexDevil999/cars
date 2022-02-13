
import $api from './API'
import { AxiosResponse } from 'axios'
import { AuthResponse } from './response';

export default class AuthService  {
  static async login (phone:string,code:string):Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login/',{phone,code})
  }
}