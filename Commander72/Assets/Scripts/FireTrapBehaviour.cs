﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FireTrapBehaviour : MonoBehaviour
{
    [SerializeField] private GameObject colliderCarrier;
    [SerializeField] private ParticleSystem flameThrower;

    private bool state;
    private float nextActionTime = 0.0f;
    public float period = 0.1f;

    
    // Start is called before the first frame update
    void Start()
    {
        state = false;
        colliderCarrier.GetComponent<BoxCollider>().enabled = false;
        flameThrower.Stop();
    }

    // Update is called once per frame
    void Update()
    {
        if (Time.time > nextActionTime)
        {
            nextActionTime = Time.time + period;
            state = !state;
        }

        if (state)
        {
            colliderCarrier.GetComponent<BoxCollider>().enabled = true;
            flameThrower.Play();
        }
        else
        {
            colliderCarrier.GetComponent<BoxCollider>().enabled = false;
            flameThrower.Stop();
        }
        
    }
}
