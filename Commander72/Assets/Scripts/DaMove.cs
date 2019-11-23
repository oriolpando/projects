using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class DaMove : MonoBehaviour {

    float x;
    public bool up = true;
    public bool direction = true;
    private float speed = 0.3f;
    private float maxSpeed = 0.8f;
    private float jumpSpeed = 200f;
    private float gravSpeed;
    private Rigidbody rb;
    private Actions actions;
    private CharacterController controller;
    private int doubleJump = 0;
    private int gravityChange = 0;
    private bool grChange = false;
    private bool sit = false;
    public bool shieldChange = false;



    // Use this for initialization
    void Start () {
        actions = GetComponent<Actions>();
        actions.Stay();
        rb = GetComponent<Rigidbody>();
        gravSpeed = Physics.gravity.y;
        rb.AddForce(0, gravSpeed, 0);
    }
	
	// Update is called once per frame
	void FixedUpdate () {


        if (SceneManager.GetActiveScene().name.Equals("SampleScene"))
        {
            if (transform.position.x <= -2.8 && Input.GetKeyDown("joystick button 2"))
            {
                SceneManager.LoadScene("Level2Scene", LoadSceneMode.Single);
                //Application.Quit();

            }

            if ((Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown("joystick button 1")) && !sit)
            {
                actions.Sitting();
                sit = true;
            }
            if (sit)
            {
                actions.Sitting();
            }




            if ((Input.GetKeyUp(KeyCode.LeftShift) || Input.GetKeyUp("joystick button 1")) && sit)
            {
                actions.Up();
                sit = false;
            }


            actions.Stay();


            rb.AddForce(0, gravSpeed, 0);
            if (rb.velocity.magnitude > maxSpeed)
            {
                rb.velocity = rb.velocity.normalized * maxSpeed;
            }



            x = Input.GetAxis("Horizontal");
            Vector3 movement = new Vector3(-x, 0.0f, 0.0f);
            transform.position += movement * Time.deltaTime * speed;





            if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D) || x > 0.5)
            {

                actions.Run();
            }

            if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A) || x < -0.5)
            {
                actions.Run();

            }


            if (direction == true)
            {
                if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A) || x < 0)
                {
                    transform.localRotation *= Quaternion.Euler(0, 180, 0);
                    direction = false;
                }
            }
            else
            {
                if (Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D) || x > 0)
                {
                    transform.localRotation *= Quaternion.Euler(0, 180, 0);
                    direction = true;

                }
            }

            if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown("joystick button 0"))
            {

                if (doubleJump < 2)
                {
                    actions.FuckItImJumping();
                    actions.Jump();
                    doubleJump++;

                    if (up)
                    {
                        rb.AddForce(0, jumpSpeed, 0);
                    }
                    else
                    {
                        rb.AddForce(0, -jumpSpeed, 0);
                    }
                }

            }




            if ((Input.GetKeyDown(KeyCode.C) || Input.GetAxis("ChangeGrav") == 1) && ((transform.position.x <= 13 && transform.position.x >= 7.74) || (transform.position.x <= 0.25 && transform.position.x >= -3.15)))
            {

                if (grChange == false)
                {
                    if (gravityChange < 2)
                    {

                        if (up)
                        {
                            transform.position = new Vector3(transform.position.x, transform.position.y + (float)0.1, transform.position.z);

                        }
                        else
                        {
                            transform.position = new Vector3(transform.position.x, transform.position.y - (float)0.1, transform.position.z);

                        }
                        transform.localRotation *= Quaternion.Euler(0, 0, 180);

                        gravSpeed = -gravSpeed;
                        rb.AddForce(0, gravSpeed, 0);
                        up = !up;
                        gravityChange++;
                        shieldChange = true;


                    }
                    grChange = true;
                }

            }
            if (Input.GetAxis("ChangeGrav") != 1)
            {
                grChange = false;

            }
        }
        else
        {
            if (transform.position.x <= -3.5 && Input.GetKeyDown("joystick button 2"))
            {
                //SceneManager.LoadScene("Level2Scene", LoadSceneMode.Single);
                Application.Quit();

            }

            if ((Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown("joystick button 1")) && !sit)
            {
                actions.Sitting();
                sit = true;
            }
            if (sit)
            {
                actions.Sitting();
            }




            if ((Input.GetKeyUp(KeyCode.LeftShift) || Input.GetKeyUp("joystick button 1")) && sit)
            {
                actions.Up();
                sit = false;
            }


            actions.Stay();


            rb.AddForce(0, gravSpeed, 0);
            if (rb.velocity.magnitude > maxSpeed)
            {
                rb.velocity = rb.velocity.normalized * maxSpeed;
            }



            x = Input.GetAxis("Horizontal");
            Vector3 movement = new Vector3(-x, 0.0f, 0.0f);
            transform.position += movement * Time.deltaTime * speed;


            if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D) || x > 0.5)
            {

                actions.Run();
            }

            if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A) || x < -0.5)
            {
                actions.Run();

            }


            if (direction == true)
            {
                if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A) || x < 0)
                {
                    transform.localRotation *= Quaternion.Euler(0, 180, 0);
                    direction = false;
                }
            }
            else
            {
                if (Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D) || x > 0)
                {
                    transform.localRotation *= Quaternion.Euler(0, 180, 0);
                    direction = true;

                }
            }

            if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown("joystick button 0"))
            {

                if (doubleJump < 2)
                {
                    actions.FuckItImJumping();
                    actions.Jump();
                    doubleJump++;

                    if (up)
                    {
                        rb.AddForce(0, jumpSpeed, 0);
                    }
                    else
                    {
                        rb.AddForce(0, -jumpSpeed, 0);
                    }
                }

            }




            if ((Input.GetKeyDown(KeyCode.C) || Input.GetAxis("ChangeGrav") == 1))
            {

                if (grChange == false)
                {
                    if (gravityChange < 2)
                    {

                        if (up)
                        {
                            transform.position = new Vector3(transform.position.x, transform.position.y + (float)0.1, transform.position.z);

                        }
                        else
                        {
                            transform.position = new Vector3(transform.position.x, transform.position.y - (float)0.1, transform.position.z);

                        }
                        transform.localRotation *= Quaternion.Euler(0, 0, 180);

                        gravSpeed = -gravSpeed;
                        rb.AddForce(0, gravSpeed, 0);
                        up = !up;
                        gravityChange++;
                        shieldChange = true;


                    }
                    grChange = true;
                }

            }
            if (Input.GetAxis("ChangeGrav") != 1)
            {
                grChange = false;

            }
        }

    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "Floor" || collision.gameObject.tag == "Plat0" || collision.gameObject.tag == "Plat1" || collision.gameObject.tag == "Plat2")
        {
            doubleJump = 0;
            gravityChange = 0;
            actions.FuckItImStopingJumping();
            
        }

        if (collision.gameObject.tag == "Lava")
        {
            SceneManager.LoadScene("youDiedScene", LoadSceneMode.Single);

            transform.gameObject.active = false;
            actions.FuckItImStopingJumping();

        }
    }

}
