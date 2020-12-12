//@ts-ignore
import Bucket from './Bucket';
//@ts-ignore
import { LocalStorageInterface } from './interfaces/LocalStorage';
import { ThreadDBInterface } from './interfaces/ThreadDB';

interface Interface {
  _retrieve: CallableFunction,
  _update: CallableFunction,
  _store: CallableFunction,
  _key: CallableFunction,
}

interface Creds {
  id: string,
  pass: string,
  extras: Extras,
}

interface Extras {
  client: any,
}


/* eslint-disable */
export default class Database {
  name: string;
  prefix: string;
  interface: any;
  availableInterfaces: any[];
  creds: Creds | undefined;
  /** @constructor
   * Construct a Database
   * Provides key-value and relational storage
   * @argument name the name of the database
   */
  constructor(name: string) {
    this.name = name;
    this.prefix = 'vdb.';
    this.interface;
    this.availableInterfaces = [
      LocalStorageInterface,
    ];

    this.creds = undefined;
  }

  /** 
   * @method
   * Used to authenticate connections and encrypt data
   * @argument id identity
   * @argument pass password
   */
  authenticate(intrface: string, id: string, pass: string, extras: Extras) {
    this.creds = {
      id,
      pass,
      extras,
    };
    switch (intrface) {
      case 'localStorage':
        this.interface = new LocalStorageInterface(
          this.prefix,
          this.creds,
        );
        break;
      case 'textile':
        this.interface = new ThreadDBInterface(
          this.prefix,
          this.creds,
          extras,
        );
        break;
      default:
        this.interface = new LocalStorageInterface(
          this.prefix,
          this.creds,
        );
        break;
    }
  }

  /**
   * @method
   * Construct a Drawer
   * A drawer stores data in a key-value structure
   * @argument name the name of the bucket
   */
  Drawer(name: string) {
    // TODO
    return null;
  }

  /** 
   * @method
   * Construct a Bucket
   * A bucket stores data in a relational structure
   * @argument name the name of the bucket
   */
  Bucket(name: string) {
    return new Bucket(name, this);
  }
}