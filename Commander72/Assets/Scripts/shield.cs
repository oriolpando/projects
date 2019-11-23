using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class shield : MonoBehaviour {

    public GameObject target;
    public bool active;
    public int count = 0;
    private DaPower power;
    private DaMove up;


    // Use this for initialization
    void Start () {
        power = target.GetComponent<DaPower>();

        GetComponent<Renderer>().enabled = false;
        GetComponent<Collider>().enabled = false;
        up = target.GetComponentInParent<DaMove>();

        active = false;
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = target.transform.position;

            if (up.up)
            {
                transform.position = new Vector3(transform.position.x, transform.position.y + (float)0.08, transform.position.z);
                if (up.shieldChange)
                {
                    transform.localRotation *= Quaternion.Euler(0, 0, 180);
                    up.shieldChange = false;
                }
            }
            else
            {
                Debug.Log(up.shieldChange);

                transform.position = new Vector3(transform.position.x, transform.position.y - (float)0.08, transform.position.z);
                if (up.shieldChange)
                {
                    transform.localRotation *= Quaternion.Euler(0, 0, 180);
                    up.shieldChange = false;
                }
            }

        if (Input.GetKeyDown(KeyCode.R) || Input.GetKeyDown("joystick button 3") && power.shield && target.GetComponent<PlayerStats>().energy >= 20)
        {
            active = true;
            target.GetComponent<PlayerStats>().energy = target.GetComponent<PlayerStats>().energy - 20;
            GetComponent<Renderer>().enabled = true;
            GetComponent<Collider>().enabled = true;
        }

        if (active && count < 100)
        {
            //5 seg aprox
            count++;
        }
        else
        {
            count = 0;
            active = false;
            GetComponent<Renderer>().enabled = false;
            GetComponent<Collider>().enabled = false;
        }

        

        if (Input.GetKeyUp(KeyCode.X))
        {
            active = false;
            GetComponent<Renderer>().enabled = false;
            GetComponent<Collider>().enabled = false;

        }
    }
}
