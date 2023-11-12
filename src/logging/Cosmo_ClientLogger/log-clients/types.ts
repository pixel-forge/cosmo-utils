import {Cosmo_LogLevel} from '../../Cosmo_Logger/types';

export type LogPrefixComposer = (logLevel: Cosmo_LogLevel, tag: string) => string;

export type Cosmo_LoggerStyleObject = {
	color?: string;
	'background-color'?:string;
	'font-weight'?: 'bold' | 'normal';
	padding?: string;
}