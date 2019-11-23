using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class habilities : MonoBehaviour {


	public GameObject shield;
	public GameObject teleport;
	public GameObject heal;

	// Use this for initialization
	void Start (){
	//	arma.gameObject.SetActive(false);
	//	proteccion.gameObject.SetActive(false);
	//	tiempo.gameObject.SetActive(false);
	//	vida.gameObject.SetActive(false);

	}
	// Update is called once per frame
	void Update () {

        int V = 0;
        int H = 0;

        if (Input.GetAxis("hudV") > 0.3)
        {
            V = 1;
        }
        else
        {
            if (Input.GetAxis("hudV") < -0.3)
            {
                V = -1;
            }
            else
            {
                V = 0;
            }
        }

        if (Input.GetAxis("hudH") > 0.3)
        {
            H = 1;
        }
        else
        {
            if (Input.GetAxis("hudH") < -0.3)
            {
                H = -1;
            }
            else
            {
                H = 0;
            }
        }


        if (Input.GetKey(KeyCode.UpArrow) || V == 1)
        {
			shield.SetActive(true);

	    }else{
			shield.SetActive(false);
		}

		if (Input.GetKey(KeyCode.LeftArrow) || (V <= 0 && H < 0)){
			teleport.SetActive(true);
		}else{
			teleport.SetActive(false);

		}
		if (Input.GetKey(KeyCode.RightArrow) || (V <= 0 && H > 0))
        {
			heal.SetActive(true);
		}else{
			heal.SetActive(false);
		}
	}

}
