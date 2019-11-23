using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class enemyStats : MonoBehaviour {

    public int life = 5;

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (life <= 0)
        {

            //Destroy(transform.parent.gameObject);
            transform.parent.gameObject.active = false;
        }
    }
}
