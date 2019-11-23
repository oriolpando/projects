using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;


public class DaAudio : MonoBehaviour {


    //public AudioSource audio;

    void Awake()
    {
        DontDestroyOnLoad(this.gameObject);
    }

    void Update()
    {

        if (SceneManager.GetActiveScene().name.Equals("SampleScene"))
        {
            this.gameObject.GetComponent<AudioSource>().volume = (float)0.4;
        }
    }
}
