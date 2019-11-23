using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyShoot : MonoBehaviour {

    public GameObject target;
    public GameObject bala;
    public GameObject weapon;
    private bool direction = true;
    public int shotCount = 0;
    private Actions actions;


    // Use this for initialization
    void Start () {
        actions = GetComponent<Actions>();
        actions.Stay();
    }

    // Update is called once per frame
    void Update () {

        if (target.transform.position.x < transform.position.x && direction == true)
        {
            transform.localRotation *= Quaternion.Euler(0, 180, 0);
            direction = false;
        }

        if (target.transform.position.x > transform.position.x && direction == false)
        {
            transform.localRotation *= Quaternion.Euler(0, 180, 0);
            direction = true;
        }


        if ((System.Math.Round(target.transform.position.y,0) == System.Math.Round(transform.position.y,0)) && Vector3.Distance(transform.position, target.transform.position) < 0.5) 
        {
            actions.Aiming();
            shotCount++;
            DaShootMove script = bala.GetComponent<DaShootMove>();
            script.shotBy = gameObject;


            if (target.transform.position.x > transform.position.x)
            {
                //Ataque hacia la derecha
                script.direction = true;
            }
            if (target.transform.position.x < transform.position.x )
            {
                //Ataque hacia la izquierda
                script.direction = false;
            }
            if (shotCount == 40)
            {
                if (!direction)
                {
                    if (Time.timeScale != 0)
                    {
                        //Creamos una instancia del prefab en nuestra escena, concretamente en la posición de nuestro personaje
                        Instantiate(bala, new Vector3(weapon.transform.position.x - 0.05f, weapon.transform.position.y, -2.13f), Quaternion.identity);
                    }
                }
                else
                {
                    if(Time.timeScale != 0)
                    {
                        //Creamos una instancia del prefab en nuestra escena, concretamente en la posición de nuestro personaje
                        Instantiate(bala, new Vector3(weapon.transform.position.x + 0.05f, weapon.transform.position.y, -2.13f), Quaternion.identity);
                    }
                    
                }
                shotCount = 0;
            }

            //Creamos una instancia del prefab en nuestra escena, concretamente en la posición de nuestro personaje
        }

    }
}
