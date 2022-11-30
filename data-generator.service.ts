import { Injectable } from '@angular/core';
import { PageList } from '@app/shared/models/helper-models/pageList-model';
import { TServiceResult } from '@app/shared/models/helper-models/service-result';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  readonly alphabet: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor() { }

  randomNumber(range: number) {
    return Math.floor(Math.random() * range);
  }

  randomString() {
    let generatedString = '';
    for (var i = 0; i < 20; i++) {
      generatedString += this.alphabet[this.randomNumber(this.alphabet.length)];
    }
    return generatedString.toLowerCase();
  }

  randomBoolean() {
    return Math.random() < 0.5 ? true : false;
  }

  randomDate() {
    return new Date().toISOString();
  }

  // ? create a fake array based on a given model
  createFakeArray(model: any, count: number): any[] {
    const list: any[] = []
    for (let index = 0; index < count; index++) {
      list.push(Object.assign({}, this.createFakeObject(model)));
    }

    return list

  }

  // ? create a fake object based on a given model
  createFakeObject<T>(obj: T): T {
    for (const key in obj) {
      if (typeof obj[key] == 'string')
        obj[key] = this.randomString() as unknown as T[typeof key];
      if (typeof obj[key] == 'number')
        obj[key] = this.randomNumber(100) as unknown as T[typeof key];
      if (typeof obj[key] == 'boolean')
        obj[key] = this.randomBoolean() as unknown as T[typeof key];
      if (obj[key] instanceof Date)
        obj[key] = this.randomDate() as unknown as T[typeof key];
      if (Array.isArray(obj[key]))
        obj[key] = this.createFakeArray(obj[key][0], 2) as unknown as T[typeof key];
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]))
        obj[key] = this.createFakeObject(obj[key]) as unknown as T[typeof key];
    }

    return obj;

  }

  // ? create a fake instance of page list
  createFakePageList(model: any, count: number) {
    return new TServiceResult<PageList<any>>(new PageList<any>(
      this.randomNumber(20),
      this.randomNumber(20),
      this.randomNumber(20),
      this.randomNumber(20),
      this.randomNumber(20),
      this.createFakeArray(model, count),
      this.randomBoolean(),
      this.randomBoolean()), this.randomString(), 'error', this.randomBoolean(), this.randomString())
  }

  // ? create a fake instance of Tservice result
  createFakeTservice<T>(model: T) {
    return new TServiceResult<T>(this.createFakeObject(model), this.randomString(), 'error', this.randomBoolean(), this.randomString());
  }

}
