import {Cosmo_Logger, Cosmo_LogLevel} from '../../logging/Cosmo_Logger';
import {Cosmo_Module} from './Cosmo_Module';
import {exists} from '../../utils/general-tools';

export abstract class Cosmo_ModuleManager
	extends Cosmo_Logger {

	// ################## Class Properties ##################

	protected modules: Cosmo_Module[] = [];
	protected config: any = {};

	// ################## Class Logic ##################

	public setConfig = (config: object) => {
		this.config = config ?? {};
		return this;
	};

	public init = () => {
		this.setMinLevel(this.config?.logLevel ?? Cosmo_LogLevel.Info);
		this.log(Cosmo_LogLevel.Info, false, ['Initializing App']);

		//Validate modules
		const invalidModules = this.getModules(module => !exists(module));
		if (invalidModules.length) {
			this.log(Cosmo_LogLevel.Error, true, [
				'Modules came back as undefined, check your imports!',
				'List of modules:',
				...this.modules.map(module => module.getTag() ?? 'undefined'),
			]);
			throw new Error('Failed to validate modules');
		}

		//Set module configs
		this.log(Cosmo_LogLevel.Info, false, ['Setting Module Configs']);
		this.modules.forEach(module => {
			module.setConfig(this.config[module.getTag()]);
		});

		//Initialize modules
		this.log(Cosmo_LogLevel.Info, false, ['Initializing Modules']);
		this.modules.forEach(module => {
			try {
				//@ts-ignore - this is the one place to call init on modules
				module.init();
			} catch (error: any) {
				this.log(Cosmo_LogLevel.Error, true, [
					`Failed to initiate module ${module.getTag()}`,
					error
				]);
			}
		});
	};

	// ################## Class Logic - Module Management ##################

	public addModules = (modules: Cosmo_Module[]) => {
		modules.forEach(module => {
			if (!this.modules.includes(module))
				this.modules.push(module);
		});
		return this;
	};

	public getModules = (filter: (module: Cosmo_Module) => boolean = () => true) => {
		return this.modules.filter(filter);
	};
}