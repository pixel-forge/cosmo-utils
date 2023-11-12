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

	private log = (logLevel: Cosmo_LogLevel, bold: boolean, toLog: Cosmo_LogParam[]) => {
		if (this.logLevel < logLevel)
			return;

		Cosmo_ClientLogger.log(logLevel, bold, this.tag, toLog);
	};

	// ################## Class Methods - Log Variations ##################

	logVerbose = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Verbose, false, toLog);
	};

	logVerboseBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Verbose, true, toLog);
	};

	logDebug = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Debug, false, toLog);
	};

	logDebugBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Debug, true, toLog);
	};

	logInfo = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Info, false, toLog);
	};

	logInfoBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Info, true, toLog);
	};

	logWarning = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Warning, false, toLog);
	};

	logWarningBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Warning, true, toLog);
	};

	logError = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Error, false, toLog);
	};

	logErrorBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Error, true, toLog);
	};
}