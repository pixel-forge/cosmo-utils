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

	protected logVerbose = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Verbose, false, toLog);
	};

	protected logVerboseBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Verbose, true, toLog);
	};

	protected logDebug = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Debug, false, toLog);
	};

	protected logDebugBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Debug, true, toLog);
	};

	protected logInfo = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Info, false, toLog);
	};

	protected logInfoBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Info, true, toLog);
	};

	protected logWarning = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Warning, false, toLog);
	};

	protected logWarningBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Warning, true, toLog);
	};

	protected logError = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Error, false, toLog);
	};

	protected logErrorBold = (...toLog: Cosmo_LogParam[]) => {
		this.log(Cosmo_LogLevel.Error, true, toLog);
	};
}