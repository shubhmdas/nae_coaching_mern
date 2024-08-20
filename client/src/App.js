import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function App() {
	return (
		<div className="App">
			<nav class="navbar navbar-expand-lg bg-light px-3">
				<div class="container-fluid">
					<a class="navbar-brand" href="/">
						Navbar
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarText">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a
									class="nav-link active"
									aria-current="page"
									href="/"
								>
									Home
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/">
									Features
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/">
									Pricing
								</a>
							</li>
						</ul>
						<ul class="navbar-nav mb-2 mb-lg-0">
							<li class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="/"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Sam
								</a>
								<ul class="dropdown-menu">
									<li>
										<a class="dropdown-item" href="/">
											Logout
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default App;
