using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Flash : MonoBehaviour {

    public GameObject target;
    private DaPower power;
    
	// Use this for initialization
	void Start () {
        power = this.gameObject.GetComponent<DaPower>();
	}

    // Update is called once per frame
    void FixedUpdate() {
        
        if ((Input.GetKeyDown(KeyCode.R) || Input.GetKeyDown("joystick button 3")) && power.flash && gameObject.GetComponent<PlayerStats>().energy >= 20)
        {
            checkFlash((float)0.04, 0);
            gameObject.GetComponent<PlayerStats>().energy = gameObject.GetComponent<PlayerStats>().energy - 20;

        }

    }


    private bool checkFlash(float y, float height)
    {

        Vector3 fwd = transform.TransformDirection(Vector3.forward);

        RaycastHit hit;
        float yDif = 0;
        float dist = 0;
        if (Physics.Raycast(transform.position, new Vector3(0, -1, 0), out hit, 2))
        {
            yDif = hit.distance;

        }

        if (Physics.Raycast(transform.position + new Vector3(0, height + (float)0.02, 0), fwd, out hit, (float)0.3))
        {
            dist = hit.distance;


            if (Physics.Raycast(transform.position + new Vector3((float)hit.distance * fwd.x, fwd.y, fwd.z), new Vector3(0, -1, 0), out hit, 2))
            {

                yDif = yDif - hit.distance;
                if (Physics.Raycast(transform.position + new Vector3((float)hit.distance * fwd.x, fwd.y, fwd.z), new Vector3(0, 1, 0), out hit, (float)0.2))
                {

                    checkFlash((float)0.04 - hit.distance, hit.distance);
                }
                else
                {
                    if (yDif < 0)
                    {
                        if (yDif > -0.16)
                        {
                            transform.position = new Vector3(transform.position.x + dist * fwd.x, transform.position.y - yDif + y, transform.position.z);
                        }
                        else
                        {
                            Debug.Log("Fuck1: " +yDif);
                        }
                    }
                    else
                    {
                        if (yDif < 0.16)
                        {

                            target.transform.position = new Vector3(transform.position.x + dist * fwd.x, transform.position.y + yDif + y, transform.position.z);

                        }
                        else
                        {
                            Debug.Log("Fuck2" + yDif);

                        }
                    }
                }


            }
            else
            {

                if (Physics.Raycast(transform.position + new Vector3((float)hit.distance * fwd.x, fwd.y, fwd.z), new Vector3(0, 1, 0), out hit, (float)0.102))
                {
                    checkFlash((float)0.04 - hit.distance, hit.distance);

                }
                else
                {
                    if (yDif < 0.16)
                    {
                        target.transform.position = new Vector3(transform.position.x + dist * fwd.x, transform.position.y + yDif + y, transform.position.z);
                    }
                    else
                    {
                        Debug.Log("Fuck3");

                    }
                }
            }
        }
        else
        {

            if (Physics.Raycast(target.transform.position + new Vector3((float)0.3 * fwd.x, fwd.y, fwd.z), new Vector3(0, -1, 0), out hit, (float)0.5))
            {
                yDif = yDif - hit.distance;
                if (yDif < 0)
                {

                        target.transform.position = new Vector3(transform.position.x + (float)0.3 * fwd.x, transform.position.y + y, transform.position.z);
                    
                }
                else
                {

                        target.transform.position = new Vector3(transform.position.x + (float)0.3 * fwd.x, transform.position.y + yDif + y, transform.position.z);

                }
            }
            else
            {
                target.transform.position = new Vector3(transform.position.x + (float)0.3 * fwd.x, transform.position.y + y, transform.position.z);
            }
        }

        return true;
    }

}
