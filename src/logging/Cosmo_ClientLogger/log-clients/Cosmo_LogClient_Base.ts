import {LogPrefixComposer} from './types';
import {Cosmo_LogLevel, Cosmo_LogParam} from '../../Cosmo_Logger/types';

export abstract class Cosmo_LogClient_Base {

	// ################## Class Properties ##################

	private logPrefixComposer: LogPrefixComposer = this.defaultLogPrefixComposer;

	// ################## Class Methods ##################

	protected abstract logImpl(logLevel: Cosmo_LogLevel, bold: boolean, prefix: string, ...toLog: Cosmo_LogParam[]): void;

	public log(logLevel: Cosmo_LogLevel, bold: boolean, tag: string, ...toLog: Cosmo_LogParam[]) {
		this.logImpl(logLevel, bold, this.logPrefixComposer(logLevel, tag), toLog);
	}

	public setLogPrefixComposer(logPrefixComposer: LogPrefixComposer) {
		this.logPrefixComposer = logPrefixComposer;
	}

	// ################## Class Methods - Default Log Prefix Composer ##################

	private defaultLogPrefixComposer(logLevel: Cosmo_LogLevel, tag: string): string {
		const now = new Date();
		return `%c${this.getLogLevelPrefix(logLevel)} %c${this.getLocalizedTimeString(now)} %c${tag}:`;
	};

	private getLogLevelPrefix = (logLevel: Cosmo_LogLevel): string => {
		switch (logLevel) {
			case Cosmo_LogLevel.Verbose:
				return '| V ';
			case Cosmo_LogLevel.Debug:
				return '| D ';
			case Cosmo_LogLevel.Info:
				return '| I ';
			case Cosmo_LogLevel.Warning:
				return '| W ';
			case Cosmo_LogLevel.Error:
				return '| E ';
			default:
				return '| * ';
		}
	};

	private getLocalizedTimeString = (date: Date): string => {
		return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.toLocaleDateString()}`;
	};
}