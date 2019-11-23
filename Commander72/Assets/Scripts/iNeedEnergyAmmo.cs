using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class iNeedEnergyAmmo : MonoBehaviour {

    public GameObject target;
    public GameObject targetEnergy;
    public GameObject interact;

    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        float dist = Vector3.Distance(target.transform.position, transform.position);


        if (Mathf.Abs(dist) <= 0.09 && Input.GetKeyDown("joystick button 2"))
        {
            targetEnergy.GetComponent<PlayerStats>().energy = targetEnergy.GetComponent<PlayerStats>().energy + 40;
            interact.SetActive(false);
            transform.gameObject.SetActive(false);
        }

    }
}
