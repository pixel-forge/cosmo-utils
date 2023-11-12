export enum Cosmo_LogLevel {
	Verbose = "Verbose",
	Debug = "Debug",
	Info = "Info",
	Warning = "Warning",
	Error = "Error"
}

export const cosmo_LogLevelOrder = [
	Cosmo_LogLevel.Verbose,
	Cosmo_LogLevel.Debug,
	Cosmo_LogLevel.Info,
	Cosmo_LogLevel.Warning,
	Cosmo_LogLevel.Error,
]

export type Cosmo_LogParam = string | number | boolean | undefined | null | object | any[] | Error;

export const cosmo_PrimitiveLogParams: Cosmo_LogParam[] = ['string', 'number', 'boolean'];