using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PlayerStats : MonoBehaviour {

    public int life;
    public int energy;
    private Actions actions;
    public GameObject obj;
    public bool active;
    public Slider sliderHealth;
    public Slider sliderEnergy;

    bool death = false;


    // Use this for initialization
    void Start () {
        actions = obj.GetComponent<Actions>();
        life = 100;
        energy = 100;
    }
	
	// Update is called once per frame
	void Update () {

        if (life > 100)
        {
            life = 100;
        }
        if (energy > 100)
        {
            energy = 100;
        }

        sliderEnergy.value = energy;
        sliderHealth.value = life;

        if (SceneManager.GetActiveScene().name.Equals("SampleScene"))
        {
            if (obj.transform.position.y > 2 || obj.transform.position.y < -1.5)
            {
                life = 0;
            }
        }
       


        if(life <= 0 && !death){
            Time.timeScale = 0.0f;
            actions.Death();
            death = true;

            SceneManager.LoadScene("youDiedScene", LoadSceneMode.Single);
            //Application.Quit();
            //transform.parent.gameObject.active = false;
        }
	}
}
