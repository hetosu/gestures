var app={
	inicio: function(){
		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciaBotones: function(){
		var botonClaro = document.querySelector('#claro');
		var botonOscuro = document.querySelector('#oscuro');

		botonClaro.addEventListener('click',this.ponloClaro,false);
		botonOscuro.addEventListener('click',this.ponloOscuro,false);
	},

	iniciaHammer: function(){
		var zona = document.getElementById('zona-gestos');
		var hammertime = new Hammer(zona);

		//Se activa este evento de la liberería hammer porque por defecto no está
		hammertime.get('pinch').set({ enable: true });
		//Se activa este evento de la liberería hammer porque por defecto no está
		hammertime.get('rotate').set({ enable: true });

		zona.addEventListener('webkitAnimationEnd', function(e) {
			zona.className='';
		});

		hammertime.on('doubletap', function(ev) {
			zona.className='doubletap';	
		// rotate y swipe no se puede ver porque se captura pan y pinch respectivamente
		//hammertime.on('tap doubletap pan swipe press pinch rotate', function(ev) {
		//		document.querySelector('#info').innerHTML= ev.type+'!';
		});

		hammertime.on('press', function(ev) {
			zona.className='press';	
		});

		hammertime.on('swipe', function(ev) {
			var clase=undefined;
			direccion=ev.direction;

            // 4 es movimiento a la derecha
			if (direccion==4) clase='swipe-derecha';
			// 2 es movimiento a la izquierda
			if (direccion==2) clase='swipe-izquierda';

			//zona.className=clase2;
			zona.className=clase;
		});

		hammertime.on('rotate', function(ev) {
			var umbral=25;
			if (ev.distance > umbral) zona.className='rotate';
		});	
	},

	ponloClaro: function(){
		document.body.className = 'claro';
	},

	ponloOscuro: function(){
		document.body.className = 'oscuro';
	},

};

if ('addEventListener' in document) {
	// DOMContentLoaded -> Quiere decir que están todos los ficheros (css, javascript, html) cargados en el dispositivo 
	document.addEventListener('DOMContentLoaded', function(){
		FastClick.attach(document.body);
		app.inicio();		
	}, false);
}

