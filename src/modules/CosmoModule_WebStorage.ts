import {exists} from '../utils/general-tools';
import {_keys} from '../utils/object-tools';
import {Cosmo_Module} from './base/Cosmo_Module';

class CosmoModule_WebStorage_Class
	extends Cosmo_Module {

	private readonly withstandDeletionMap: { [k: string]: boolean } = {};

	// ################## Class Life Cycle ##################

	constructor() {
		super();
	}

	public registerWebStorageKey(key: string, withstandDeletion: boolean, persist: boolean) {
		this.withstandDeletionMap[key] = withstandDeletion;
		const env = this.getEnv(persist);
		const value = env.getItem(key);
		return value ? JSON.parse(value) : undefined;
	};

	// ################## Class Logic ##################

	private getEnv = (persist: boolean) => persist ? localStorage : sessionStorage;

	public get(key: string, persist: boolean) {
		const env = this.getEnv(persist);
		const value = env.getItem(key);
		if (!exists(value))
			return;

		return JSON.parse(value) as any;
	}

	public set(key: string, value: any, persist: boolean) {
		const env = this.getEnv(persist);
		env.setItem(key, JSON.stringify(value));
	}

	public delete(key: string, persist: boolean) {
		const env = this.getEnv(persist);
		env.removeItem(key);
	}

	public deleteAll(forceDelete: boolean = false) {
		const keys = _keys(this.withstandDeletionMap) as string [];
		for (const key of keys) {
			//If forcing deletion or key is not set to withstand deletion
			if (forceDelete || !this.withstandDeletionMap[key]) {
				localStorage.removeItem(key);
				sessionStorage.removeItem(key);
			}
		}
	}
}

export const CosmoModule_WebStorage = new CosmoModule_WebStorage_Class();

export class Cosmo_WebStorage<V extends any> {
	private readonly key: string;
	private readonly persist: boolean;
	private value?: V;

	// ################## Class Life Cycle ##################

	constructor(key: string, withstandDeletion: boolean = false, persist: boolean = true) {
		this.key = key;
		this.persist = persist;
		this.value = CosmoModule_WebStorage.registerWebStorageKey(key, withstandDeletion, persist) as V | undefined;
	}

	// ################## Class Logic ##################

	get(defaultValue?: V): V {
		return (this.value ?? defaultValue) as V;
	}

	set(value: V) {
		this.value = value;
		CosmoModule_WebStorage.set(this.key, value, this.persist);
	}

	delete() {
		this.value = undefined;
		CosmoModule_WebStorage.delete(this.key, this.persist);
	}
}