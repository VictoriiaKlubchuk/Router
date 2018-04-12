
window.onload = function(){
	//create constructor
	var Router = function(name,routes){
		return {
			name: name,
			routes: routes
		}
	};
	// grab all active attr routes
	var activeRoutes = Array.from(document.querySelectorAll('[route]'));
	var root = document.getElementById('root');
	var currentPath = window.location.pathname;

	let loginForm = 
	`<form>
		<input type="text" class="login" required></input>
		<input type="text" class="password" required></input>
		<button>LogIn</button>
	</form>`;

	let signupForm = 
	`<form>
		<p>Registration form</p>
		<label for="firstName">
			<span>Enter your first name</span>
			<input type="text" id="firstName" required></input>
		</label>
	</form>`;
	let errorMessage = 'No route exists with this path';


	var myFirstRouter = new Router('myFirstRouter', [
		{
	 		path: '/',
	 		name: 'Root'
	 	},
	 	{
	 		path: '/login',
	 		name: 'Login'
	 	},
	 	{
	 		path: '/signup',
	 		name: 'SignUp'
	 	}

	]);

	function navigate(event){
		var route = event.target.attributes[0].value;
		var routeInfo = myFirstRouter.routes.filter(function(r){
			return r.path === route;
		})[0];
		if(!routeInfo) {
			window.history.pushState({},'', 'error')
			root.innerHTML = errorMessage;
		} else if (routeInfo.path === '/login' || routeInfo.path === '/'){
			window.history.pushState({}, '', routeInfo.path);
			root.innerHTML = loginForm;
		} else if (routeInfo.path === '/signup') {
			window.history.pushState({}, '', routeInfo.path);
			root.innerHTML = signupForm;
		}
	}

	function renderHTML(){
		root.innerHTML = loginForm;
	
		if (currentPath === '/' || currentPath === '/login') {
			root.innerHTML = loginForm;
		} else {
			var route = myFirstRouter.routes.filter(function(r){
				return r.path === currentPath;
			})[0];
			if (route) {
				root.innerHTML = signupForm;
			} else {
				root.innerHTML = errorMessage;; 
			}
		}
	}
	activeRoutes.forEach(function(route){
		console.log(route);
		route.addEventListener('click', navigate, false);
		renderHTML();
	});
}