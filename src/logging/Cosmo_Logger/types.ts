export enum Cosmo_LogLevel {
	Verbose = 0,
	Debug = 1,
	Info = 2,
	Warning = 3,
	Error = 4
}

export type Cosmo_LogParam = string | number | boolean | undefined | null | object | any[] | Error;

export const cosmo_PrimitiveLogParams: Cosmo_LogParam[] = ['string', 'number', 'boolean'];