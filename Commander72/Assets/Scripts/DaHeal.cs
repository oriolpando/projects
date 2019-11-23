using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DaHeal : MonoBehaviour {

    public GameObject target;
    private DaPower power;

    // Use this for initialization
    void Start()
    {
        power = this.gameObject.GetComponent<DaPower>();
    }

    // Update is called once per frame
    void FixedUpdate()
    {

        if ((Input.GetKeyDown(KeyCode.R) || Input.GetKeyDown("joystick button 3")) && power.heal && gameObject.GetComponent<PlayerStats>().energy >= 20)
        {
            gameObject.GetComponent<PlayerStats>().energy = gameObject.GetComponent<PlayerStats>().energy - 20;
            gameObject.GetComponent<PlayerStats>().life = gameObject.GetComponent<PlayerStats>().life + 20;

        }

    }
}
