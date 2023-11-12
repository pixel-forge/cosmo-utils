import {Cosmo_LogClient_Base} from './log-clients/Cosmo_LogClient_Base';
import {removeItemFromArray} from '../../utils/array-tools';
import {Cosmo_LogLevel, Cosmo_LogParam} from '../Cosmo_Logger/types';

class Cosmo_ClientLogger_Class {

	// ################## Class Properties ##################

	private logClients: Cosmo_LogClient_Base[] = [];

	// ################## Class Methods ##################

	public addClient = (client: Cosmo_LogClient_Base) => {
		if (this.logClients.includes(client))
			return;

		this.logClients.push(client);
	};

	public removeClient = (client: Cosmo_LogClient_Base) => {
		if (!this.logClients.includes(client))
			return;

		removeItemFromArray(this.logClients, client);
	};

	public log = (logLevel: Cosmo_LogLevel, bold: boolean, tag: string, toLog: Cosmo_LogParam[]) => {
		this.logClients.forEach(client => {
			client.log(logLevel, bold, tag, toLog);
		});
	};
}

export const Cosmo_ClientLogger = new Cosmo_ClientLogger_Class();