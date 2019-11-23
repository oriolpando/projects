using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DaShoot : MonoBehaviour {

    public GameObject paused;
    public GameObject shotBy;
    public GameObject bala;
    public Camera cam;
    public AudioClip fire;
    private Actions actions;
    private bool shoot = false;
    static AudioSource audio;



    // Use this for initialization
    void Start () {
        actions = shotBy.GetComponent<Actions>();
        fire = Resources.Load<AudioClip>("fire");
        audio = gameObject.GetComponent<AudioSource>();
   
    }

    // Update is called once per frame
    void Update () {
        bool isPaused = paused.GetComponent<GameStats>().paused;

        Vector3 screenPos = cam.WorldToScreenPoint(transform.position);

        if(!isPaused){

            if (bala != null && (Input.GetMouseButtonDown(0) || Input.GetAxis("Disp") == 1))
            {

                if (shoot == false){
                    actions.Aiming();
                    DaShootMove script = bala.GetComponent<DaShootMove>();
                    DaMove script2 = shotBy.GetComponent<DaMove>();
                    script.shotBy = shotBy;



                    script.direction = !script2.direction;
                    var rotation = Quaternion.identity;

                    if (!script2.direction)
                    {
                        //Creamos una instancia del prefab en nuestra escena, concretamente en la posición de nuestro personaje
                        rotation *= Quaternion.Euler(0, 180, 0);
                        Instantiate(bala, new Vector3(transform.position.x + 0.05f, transform.position.y, transform.position.z), rotation);
                    }
                    else
                    {
                        //Creamos una instancia del prefab en nuestra escena, concretamente en la posición de nuestro personaje
                        Instantiate(bala, new Vector3(transform.position.x - 0.05f, transform.position.y, transform.position.z), rotation);
                    }
                    shoot = true;
                    audio.PlayOneShot(fire);
                }

            
            }
            if (Input.GetAxis("Disp") != 1)
            {
                shoot = false;
            }
        }

    }
}
