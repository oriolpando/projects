using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DaPower : MonoBehaviour {

    public bool shield;
    public bool flash;
    public bool heal;
    private int select;

	// Use this for initialization
	void Start () {
        select = 0;
        shield = true;
        flash = false;
        heal = false;
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
            select = 0;

        }
        if (Input.GetKey(KeyCode.LeftArrow) || (V <= 0 && H < 0))
        {
            select = 1;
        }
        if (Input.GetKey(KeyCode.RightArrow) || (V <= 0 && H > 0))
        {
            select = 2;
        }
    
        switch (select)
        {
            case 0:
                shield = true;
                flash = false;
                heal = false;
                break;
            case 1:
                shield = false;
                flash = true;
                heal = false;
                break;
            case 2:
                shield = false;
                flash = false;
                heal = true;
                break;
        }

    }
}
