import {Cosmo_Logger, Cosmo_LogLevel, Cosmo_LogParam} from '../logging/Cosmo_Logger';

type _Config<C> = C & { minLogLevel?: Cosmo_LogLevel }

export class CosmoModule<C extends {} = {}, Config extends _Config<C> = _Config<C>>
	extends Cosmo_Logger {

	protected config: Config = {} as Config;

	constructor() {
		super();
		const name = this.constructor.name;
		if(!name.endsWith('_Class'))
			throw new Error(`Invalid module class name ${name}, must end with "_Class"`);
		this.setTag(name.replace('_Class',''));
	}

	// ################## Class Methods - Logging ##################

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