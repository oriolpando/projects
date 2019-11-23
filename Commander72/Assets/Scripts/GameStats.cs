using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameStats : MonoBehaviour {
    
    public bool paused;
    [SerializeField] private GameObject pausePanel;

    // Use this for initialization

    void Start () {
        paused = false;
	}
	
	// Update is called once per frame
	void Update () {



        if (paused)
        {

        }
        if (Input.GetKeyDown(KeyCode.P) || Input.GetKeyDown("joystick button 7"))
        {

            if (paused)
            {
                paused = false;

                Time.timeScale = 1.0f;
            }
            else
            {
                paused = true;
                Time.timeScale = 0.0f;
            }
        }
        

    }
}
