using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DaShootMove : MonoBehaviour
{


    public bool direction;
    public GameObject shotBy;
    private float speed = 1f;
    private Rigidbody rb;
    private int count = 0;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {
        if (direction)
        {
            transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z) + new Vector3(speed * Time.deltaTime, 0, 0);
        }
        else
        {
            transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z) + new Vector3(-speed * Time.deltaTime, 0, 0);
        }
    }


    void OnTriggerEnter(Collider hit)
    {
        
        count++;

        if (hit.tag == "Enemy" && shotBy.tag != "Enemy")
        {

            hit.gameObject.GetComponent<enemyStats>().life--;

            Destroy(gameObject);
        }
        if (hit.tag == "Shield" && shotBy.tag != "Player")
        {

            Destroy(gameObject);
        }
        if (hit.tag == "Player" && shotBy.tag != "Player")
        {

            Destroy(gameObject);

            hit.gameObject.GetComponent<PlayerStats>().life = hit.gameObject.GetComponent<PlayerStats>().life - 20;

        }
        if (hit.tag == "Floor")
        {
            Destroy(gameObject);
        }
    }
}
