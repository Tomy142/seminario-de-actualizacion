import { APIModelAccess } from './ApplicationModel.js';
import { Application } from './Application.js';


function main()
{
	console.log("main() function executed!");
	let model = new APIModelAccess();
	let app = new Application(model);

	app.init();
	app.run();

}

main();
