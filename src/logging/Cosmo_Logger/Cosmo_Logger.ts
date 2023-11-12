import {Cosmo_LogLevel, Cosmo_LogParam} from './types';
import {Cosmo_ClientLogger} from '../Cosmo_ClientLogger/Cosmo_ClientLogger';

export class Cosmo_Logger {

	// ################## Class Properties ##################

	private tag: string;
	private logLevel: Cosmo_LogLevel;

	// ################## Class Life Cycle ##################

	constructor(tag?: string) {
		this.tag = tag ?? this.constructor['name'];
		//By default, all loggers should start with info
		this.logLevel = Cosmo_LogLevel.Info;
	}

	// ################## Class Methods ##################

	setMinLevel = (logLevel: Cosmo_LogLevel) => {
		this.logLevel = logLevel;
	};

	log = (logLevel: Cosmo_LogLevel, bold: boolean, toLog: Cosmo_LogParam[]) => {
		if (this.logLevel < logLevel)
			return;

		Cosmo_ClientLogger.log(logLevel, bold, this.tag, toLog);
	};
}