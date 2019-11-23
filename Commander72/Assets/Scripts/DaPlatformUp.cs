using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DaPlatformUp : MonoBehaviour {

    private bool comeUp = false;
    public GameObject target;
    private DaPlatformAction actions;


    // Use this for initialization
    void Start () {

        actions = GetComponent<DaPlatformAction>();

    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, target.transform.position) < 0.7)
        {
            if (transform.tag == "Plat0")
            {
                actions.Plat();
            }


        }

        if (Vector3.Distance(transform.position, target.transform.position) < 1)
        {

            if (transform.tag == "Plat2")
            {
                Debug.Log("2");
                actions.Plat2();
            }
        }

        if (transform.position.x + target.transform.position.x <= 0.2)
        {   

            if (transform.tag == "Plat1")
            {
                Debug.Log("2");
                actions.Plat1();
            }

        }
    }


}
