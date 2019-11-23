
var scene;
var camera;
var renderer;
var loader;
var world;
var ball;
var body;
var body2;
var maze;
var oimoStats
var updateFcts = [];

function createWorld(){
    /*
    world = new OIMO.World({ 
        timestep: 1/60, 
        worldscale: 1, // scale full world 
        info: true,   // calculate statistic or not
        gravity: [0,-0,0] 
    });   
    */

   world = new THREEx.CannonWorld().start();

}

function createRenderer(){
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
}

function createLoader(){
    var material = new THREE.MeshPhongMaterial();
    loader = new THREE.OBJLoader();
    loader.load('mazes/labyrinth.obj', function(object){
        object.traverse(function(child){
            if(child instanceof THREE.Mesh){
                child.material = material;
                child.recieveShadow = true;
                child.castShadow = true;
            }
        });
        object.position.set(0,-10,0);
        maze = object;
        scene.add(object);
        //body2 = THREEx.Oimo.createBodyFromMesh(world, object);
        //body2 = new THREEx.CannonBody(object);
        //world.add(body2);
        //updateFcts.push(function(delta, now){
            //body2.update(delta, now);		
        //});
    });
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 0;
    
    camera.lookAt(scene.getObjectById(4, true ).position);
}

function createBall(){

    var ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    var ballMaterial = new THREE.MeshLambertMaterial({ color: "black"});
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.castShadow = true;
    ball.position.set(0,-9.6,0);
    scene.add(ball);
    //body = THREEx.Oimo.createBodyFromMesh(world, ball);
    body = new THREEx.CannonBody(ball).addTo(world);
    updateFcts.push(function(delta, now){
        body.update(delta, now);		
    });
}

function createLight(){
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0,90,10);
    spotLight.shadow.camera.near = 5;
    spotLight.shadow.camera.far = 6;
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log(body);

}

function render(){     
    renderer.render(scene, camera);
    //world.step();
    //oimoStats.update();

    
    body.body.applyForce(new CANNON.Vec3(200,-100,0), new CANNON.Vec3(ball.position));
    
    var keycode;
    //console.log(ball.position);

    document.onkeydown = function(){
        if (window.event){
            keycode = window.event.keyCode;
            console.log(keycode);
            if (keycode == 82) {  // 27 is the ESC key
                console.log(scene)
                maze.rotation.y = maze.rotation.y + Math.PI/2;                
            }
        }
    }
    requestAnimationFrame(render);
}


function init(){
    scene = new THREE.Scene();

    createWorld();
    createRenderer();
    createLoader();
    createBall();
    createLight();
    //oimoStats = new THREEx.Oimo.Stats(world);
    //document.body.appendChild(oimoStats.domElement);
    createCamera();

    render();
}

function startGame(){
    $(".menu").css("display", "none");
    $("body").css("grid-template-areas", "'canvas canvas canvas' 'canvas canvas canvas' 'canvas canvas canvas';");
    init();
}


