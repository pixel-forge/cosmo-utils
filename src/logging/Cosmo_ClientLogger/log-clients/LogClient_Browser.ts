import {Cosmo_LogClient_Base} from './Cosmo_LogClient_Base';
import {Cosmo_LogLevel, Cosmo_LogParam, cosmo_PrimitiveLogParams} from '../../Cosmo_Logger/types';
import {Cosmo_LoggerStyleObject} from './types';
import {_keys} from '../../../utils/object-tools';

class LogClient_Browser_Class
	extends Cosmo_LogClient_Base {

	// ################## Class Methods ##################

	protected logImpl(logLevel: Cosmo_LogLevel, bold: boolean, prefix: string, ...toLog: Cosmo_LogParam[]) {
		//If the first log param is a primitive combine it with the prefix
		if (cosmo_PrimitiveLogParams.includes(typeof toLog[0])) {
			prefix += ` ${toLog[0]}`;
			toLog.shift();
		}

		//If no more items to log
		if (!toLog.length)
			return this.logSingle(logLevel, bold, prefix);

		this.logGroup(logLevel, bold, prefix, toLog);
	}

	private logSingle = (logLevel: Cosmo_LogLevel, bold: boolean, toLog: string) => {
		console.log(
			toLog,
			this.getLogLevelStyling(logLevel, bold),
			this.getTimestampStyling(bold),
			this.getTagStyling(logLevel, bold)
		);
	};

	private logGroup = (logLevel: Cosmo_LogLevel, bold: boolean, prefix: string, ...toLog: Cosmo_LogParam[]) => {
		console.group(
			toLog,
			this.getLogLevelStyling(logLevel, bold),
			this.getTimestampStyling(bold),
			this.getTagStyling(logLevel, bold)
		);
		toLog.forEach(logParam => console.log(logParam));
		console.groupEnd();
	};

	// ################## Class Methods - Styling ##################

	private getLogLevelColor = (logLevel: Cosmo_LogLevel): string => {
		switch (logLevel) {
			case Cosmo_LogLevel.Verbose:
				return '#444444';
			case Cosmo_LogLevel.Debug:
				return '#aa00d7';
			case Cosmo_LogLevel.Info:
				return '#52a447';
			case Cosmo_LogLevel.Warning:
				return '#ed820e';
			case Cosmo_LogLevel.Error:
				return '#d14348';
			default:
				return 'transparent';
		}
	};

	private composeStyleString = (styleObject: Cosmo_LoggerStyleObject): string => {
		const style = '';
		const styleArr = _keys(styleObject).map(key => `${key}: ${styleObject[key]}`);
		return styleArr.join(';') + ';';
	};

	private getLogLevelStyling = (logLevel: Cosmo_LogLevel, bold: boolean): string => {
		return this.composeStyleString({
			color: '#ffffff',
			'background-color': this.getLogLevelColor(logLevel),
			'font-weight': bold ? 'bold' : 'normal',
			padding: '2px 5px',
		});
	};

	private getTimestampStyling = (bold: boolean): string => {
		return this.composeStyleString({
			color: '#ffffff',
			'background-color': '#3066be',
			'font-weight': bold ? 'bold' : 'normal',
			padding: '2px 5px',
		});
	};

	private getTagStyling = (logLevel: Cosmo_LogLevel, bold: boolean): string => {
		return this.composeStyleString({
			color: this.getLogLevelColor(logLevel),
			'font-weight': bold ? 'bold' : 'normal',
			padding: '2px 5px',
		});
	};
}

export const Cosmo_LogClient_Browser = new LogClient_Browser_Class();