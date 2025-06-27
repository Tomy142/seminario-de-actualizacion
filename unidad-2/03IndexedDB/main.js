import { APIModelAccess } from './ApplicationModel.js';
import { Application } from './Application.js';


function main()
{
	console.log("main() function executed!");
	let model = null;
	let app = null;

	model = new APIModelAccess(function(){
		app = new Application(model);
		app.init();
		app.run();
	});
}

main();
