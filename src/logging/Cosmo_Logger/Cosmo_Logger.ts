import {Cosmo_LogLevel, cosmo_LogLevelOrder, Cosmo_LogParam} from './types';
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

	protected setMinLevel = (logLevel: Cosmo_LogLevel) => {
		this.logLevel = logLevel;
	};

	protected setTag = (tag: string) => {
		this.tag = tag;
	};

	protected log(logLevel: Cosmo_LogLevel, bold: boolean, toLog: Cosmo_LogParam[]) {
		if (cosmo_LogLevelOrder.indexOf(logLevel) < cosmo_LogLevelOrder.indexOf(this.logLevel))
			return;

		Cosmo_ClientLogger.log(logLevel, bold, this.tag, toLog);
	};
}