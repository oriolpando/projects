


function init(){
    function execute(){
	var renderer	= new THREE.WebGLRenderer({
		antialiasing	: false
	});
	renderer.shadowMapEnabled	= true
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
    var maze;
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000)
    camera.position.z = 5
    camera.position.x = 0
    camera.position.y = 0

	//////////////////////////////////////////////////////////////////////////////////
	//		set 3 point lighting						//
	//////////////////////////////////////////////////////////////////////////////////

	;(function(){
		// add a ambient light
		var light	= new THREE.AmbientLight( 0x020202 )
		scene.add( light )
		// add a light front right
		var light	= new THREE.DirectionalLight('white', 0.5)
		light.position.set(100,60,-100)
		scene.add( light )
		// light.castShadow	= true
		light.shadowCameraNear	= 0.01
		light.shadowCameraFar	= 250
		light.shadowCameraFov	= 45

		light.shadowCameraLeft	= -100
		light.shadowCameraRight	=  100
		light.shadowCameraTop	=  100
		light.shadowCameraBottom= -100
		// light.shadowCameraVisible	= true

		light.shadowBias	= 0.001
		light.shadowDarkness	= 0.6

		light.shadowMapWidth	= 1024
		light.shadowMapHeight	= 1024
	
		scene.add( light )		


		// add a light front left
		var light	= new THREE.DirectionalLight('white', 0.7)
		light.position.set(-50,60,100)
		scene.add( light )
		light.castShadow	= true
		light.shadowCameraNear	= 0.01
		light.shadowCameraFar	= 250
		light.shadowCameraFov	= 45

		light.shadowCameraLeft	= -100
		light.shadowCameraRight	=  100
		light.shadowCameraTop	=  100
		light.shadowCameraBottom= -100
		// light.shadowCameraVisible	= true 

		light.shadowBias	= 0.002
		light.shadowDarkness	= 0.3

		light.shadowMapWidth	= 1024
		light.shadowMapHeight	= 1024
	
		scene.add( light )		
	})()

	//////////////////////////////////////////////////////////////////////////////////
	//		oimo world							//
	//////////////////////////////////////////////////////////////////////////////////

	var world	= new OIMO.World(1/360, 1, 8)
	setInterval(function(){
		world.step()
	}, 1000/180);



        //////////////////////////////////////////////////////////////////////////////////
        //                starfield
        //////////////////////////////////////////////////////////////////////////////////
	var starfield	= THREEx.Planets.createStarfield()
	starfield.scale.multiplyScalar(10)
	scene.add(starfield)
	

	//////////////////////////////////////////////////////////////////////////////////
	//		Maze								//
	//////////////////////////////////////////////////////////////////////////////////

        
    var field = generateSquareMaze(30);
    maze = generate_maze_mesh(field);
    
    document.onkeydown = function(){
        if (window.event){
            keycode = window.event.keyCode;
            console.log(keycode);
            
            if (keycode == 40 && world.gravity.y != -0.3) {  // 27 is the ESC key
                world.gravity = new OIMO.Vec3(0,-0.3,0);                 
            }
            if (keycode == 38 && world.gravity.y != 0.3) {  // 27 is the ESC key
                world.gravity = new OIMO.Vec3(0,0.3,0);                
            }
            if (keycode == 39 && world.gravity.x != 0.3) {  // 27 is the ESC key
                world.gravity = new OIMO.Vec3(0.3,0,0);                            
            }
            if (keycode == 37&& world.gravity.x != -0.3) {  // 27 is the ESC key
                world.gravity = new OIMO.Vec3(-0.3,0,0);                            
            }
        }
    }
    
    /// Add ball

    var ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    var ballMaterial = new THREE.MeshLambertMaterial({ color: "white"});
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.castShadow = true;
    scene.add(ball);
    ball.position.set(1,1,0);
    

    var body = THREEx.Oimo.createBodyFromMesh(world, ball)

    // add an updater for them
    onRenderFcts.push(function(delta){
        THREEx.Oimo.updateObject3dWithBody(ball, body)
        camera.position.x = ball.position.x;
        camera.position.y = ball.position.y
    })

    // if the position.y < 20, reset the position
    onRenderFcts.push(function(delta){
        if( ball.position.y < -80 ){
            ball.position.x	= (Math.random()-0.5)*20
            ball.position.y	= 150 + (Math.random()-0.5)*50
            ball.position.z	= (Math.random()-0.5)*20
            body.resetPosition(mesh.position.x, mesh.position.y, mesh.position.z);	
        }
    })


    //////////////////////////////////////////////////////////////////////////////////
        //		comment								//
        //////////////////////////////////////////////////////////////////////////////////
        
        
        var iomoStats	= new THREEx.Oimo.Stats(world)
        document.body.appendChild(iomoStats.domElement)
        onRenderFcts.push(function(delta){
            iomoStats.update()
        })

        //////////////////////////////////////////////////////////////////////////////////
        //		Camera Controls							//
        //////////////////////////////////////////////////////////////////////////////////

        onRenderFcts.push(function(delta, now){
            var target	= ball.position;
            camera.lookAt( target )
        })


        //////////////////////////////////////////////////////////////////////////////////
        //		render the scene						//
        //////////////////////////////////////////////////////////////////////////////////
        onRenderFcts.push(function(){
            renderer.render( scene, camera );		
        })
        
        //////////////////////////////////////////////////////////////////////////////////
        //		loop runner							//
        //////////////////////////////////////////////////////////////////////////////////
        var lastTimeMsec= null
        requestAnimationFrame(function animate(nowMsec){
            // keep looping
            requestAnimationFrame( animate );
            // measure time
            

            lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
            var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
            lastTimeMsec	= nowMsec
            // call each update function
            onRenderFcts.forEach(function(onRenderFct){
                onRenderFct(deltaMsec/1000, nowMsec/1000)
            })
        })
        
        function generateSquareMaze(dimension) {

    function iterate(field, x, y) {
        field[x][y] = false;
        while(true) {
            directions = [];
            if(x > 1 && field[x-2][y] == true) {
                directions.push([-1, 0]);
            }
            if(x < field.dimension - 2 && field[x+2][y] == true) {
                directions.push([1, 0]);
            }
            if(y > 1 && field[x][y-2] == true) {
                directions.push([0, -1]);
            }
            if(y < field.dimension - 2 && field[x][y+2] == true) {
                directions.push([0, 1]);
            }
            if(directions.length == 0) {
                return field;
            }
            dir = directions[Math.floor(Math.random()*directions.length)];
            field[x+dir[0]][y+dir[1]] = false;
            field = iterate(field, x+dir[0]*2, y+dir[1]*2);
        }
    }

    // Initialize the field.
    var field = new Array(dimension);
    field.dimension = dimension;
    for(var i = 0; i < dimension; i++) {
        field[i] = new Array(dimension);
        for (var j = 0; j < dimension; j++) {
            field[i][j] = true;
        }
    }

    // Gnerate the maze recursively.
    field = iterate(field, 1, 1);

    return field;

    }

    function generate_maze_mesh(field) {
    var dummy = new THREE.Geometry();
    for (var i = 0; i < field.dimension; i++) {
        for (var j = 0; j < field.dimension; j++) {
            if (field[i][j]) {
                var geometry = new THREE.BoxGeometry(1,1,2);
                var mat = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('/blockText.jpg')});

                var mesh_ij = new THREE.Mesh(geometry,mat);

                mesh_ij.position.x = i;
                mesh_ij.position.y = j;
                mesh_ij.position.z = 0.5;
                mesh_ij.receiveShadow = true;
                var stepBody = THREEx.Oimo.createBodyFromMesh(world, mesh_ij, {
                    move : false
                })
                scene.add(mesh_ij)
                //dummy.merge(dummy, mesh_ij);

                mesh_ij.updateMatrix()
                dummy.merge(geometry, mesh_ij.matrix);
                //THREE.GeometryUtils.merge(dummy, mesh_ij);
            }
        }
    }
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(dummy, material)
    return mesh;
    }
            
    }
}

function startGame(){
    $(".menu").css("display", "none");
    $("body").css("grid-template-areas", "'canvas canvas canvas' 'canvas canvas canvas' 'canvas canvas canvas';");
    init();
}