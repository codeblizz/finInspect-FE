import axiosClient from 'helpers/httpClient/axiosClient';
import { MainRepositoryInterface } from '../types/mainRepository.type';

class MainRepository<T> implements MainRepositoryInterface {
  constructor(public resource: String) {}

  get(payload: any): Promise<T[]> {
    return axiosClient.get(`/api/${this.resource}`, { params: { ...payload } });
  }

  post(payload: any): Promise<T[]> {
    return axiosClient.post(`/api/${this.resource}`, { params: { ...payload } });
  }

  create(payload: any): Promise<T> {
    return axiosClient.post(`/api/${this.resource}`, { params: { ...payload }});
  }
}

export default MainRepository;
